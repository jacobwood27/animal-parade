import { spawn } from "node:child_process";
import { mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const APP_JS = join(ROOT, "app.js");
const OUT_DIR = join(ROOT, "assets", "animals");
const TMP_DIR = join(ROOT, ".tmp-images");
const ASSET_MANIFEST = join(ROOT, "animal-assets.js");
const CREDITS = join(ROOT, "ANIMAL_SOURCES.md");
const WIKI_API = "https://en.wikipedia.org/w/api.php";
const THUMB_SIZE = "1280";
const CONCURRENCY = 1;
const FETCH_HEADERS = {
  "User-Agent": "AnimalParadeOfflineBuilder/1.0"
};

await mkdir(OUT_DIR, { recursive: true });
await mkdir(TMP_DIR, { recursive: true });

const animals = await readAnimals();
const imageInfoById = await fetchAllImageInfo(animals);
const results = new Array(animals.length);
let completed = 0;

await runPool(animals, CONCURRENCY, async (animal, index) => {
  const output = join(OUT_DIR, `${animal.id}.webp`);
  const existing = await exists(output);

  const image = imageInfoById.get(animal.id) || {};
  if (!image.src) {
    throw new Error(`No image found for ${animal.name} (${animal.title})`);
  }

  if (!existing) {
    const tmp = join(TMP_DIR, `${animal.id}${safeExtension(image.src)}`);
    await download(image.src, tmp);
    await magick([
      tmp,
      "-auto-orient",
      "-resize",
      "1280x1280>",
      "-strip",
      "-quality",
      "84",
      output
    ]);
    await rm(tmp, { force: true });
  }

  const info = await stat(output);
  results[index] = {
    id: animal.id,
    name: animal.name,
    src: `./assets/animals/${animal.id}.webp`,
    source: image.source,
    bytes: info.size
  };

  completed += 1;
  console.log(`${String(completed).padStart(3, " ")}/${animals.length} ${animal.name}`);
  await delay(350);
});

await writeAssetManifest(results);
await writeCredits(results);
await rm(TMP_DIR, { recursive: true, force: true });

const totalBytes = results.reduce((sum, item) => sum + item.bytes, 0);
console.log(`Downloaded ${results.length} animal images, ${(totalBytes / 1024 / 1024).toFixed(1)} MB total.`);

async function readAnimals() {
  const source = await readFile(APP_JS, "utf8");
  const matches = [...source.matchAll(/\{ name: "([^"]+)", group: "([^"]+)", title: "([^"]+)" \}/g)];
  return matches.map((match, index) => ({
    name: match[1],
    group: match[2],
    title: match[3],
    id: `${slugify(match[1])}-${index}`
  }));
}

async function fetchAllImageInfo(animals) {
  const output = new Map();

  for (const batch of chunk(animals, 45)) {
    const params = new URLSearchParams({
      action: "query",
      origin: "*",
      format: "json",
      prop: "pageimages|info",
      piprop: "thumbnail|original",
      pithumbsize: THUMB_SIZE,
      inprop: "url",
      redirects: "1",
      titles: batch.map((animal) => animal.title).join("|")
    });
    const response = await fetchWithRetry(`${WIKI_API}?${params.toString()}`);
    if (!response.ok) throw new Error(`Wikipedia batch request failed: ${response.status}`);

    const data = await response.json();
    const pages = Object.values(data?.query?.pages || {});
    const pageByTitle = new Map(pages.map((page) => [normalizeTitle(page.title), page]));
    const aliases = new Map();

    (data?.query?.normalized || []).forEach((entry) => {
      aliases.set(normalizeTitle(entry.from), normalizeTitle(entry.to));
    });
    (data?.query?.redirects || []).forEach((entry) => {
      aliases.set(normalizeTitle(entry.from), normalizeTitle(entry.to));
    });

    batch.forEach((animal) => {
      const original = normalizeTitle(animal.title);
      const page = pageByTitle.get(aliases.get(original) || original) || pageByTitle.get(original);
      if (!page) return;
      const src = page.thumbnail?.source || page.original?.source || "";
      output.set(animal.id, {
        src: wikimediaThumbnailUrl(src),
        source: page.fullurl || `https://en.wikipedia.org/wiki/${encodeURIComponent(animal.title.replaceAll(" ", "_"))}`
      });
    });

    await delay(1200);
  }

  return output;
}

async function download(url, file) {
  const response = await fetchWithRetry(url);
  if (!response.ok) throw new Error(`Download failed ${response.status}: ${url}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  await writeFile(file, bytes);
}

async function fetchWithRetry(url) {
  const waits = [0, 5000, 15000, 30000, 60000];
  let lastResponse = null;

  for (let attempt = 0; attempt < waits.length; attempt += 1) {
    if (waits[attempt]) await delay(waits[attempt]);
    const response = await fetch(url, { headers: FETCH_HEADERS });
    if (response.ok || ![429, 500, 502, 503, 504].includes(response.status)) return response;
    const retryAfter = Number(response.headers.get("retry-after"));
    if (Number.isFinite(retryAfter) && retryAfter > 0) {
      const waitMs = Math.min(retryAfter * 1000, 10 * 60 * 1000);
      console.log(`Rate limited; waiting ${Math.ceil(waitMs / 1000)} seconds.`);
      await delay(waitMs);
    }
    lastResponse = response;
  }

  return lastResponse;
}

async function magick(args) {
  await new Promise((resolve, reject) => {
    const child = spawn("magick", args, { stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`magick failed with ${code}: ${stderr}`));
      }
    });
  });
}

async function runPool(items, size, worker) {
  let cursor = 0;
  const workers = Array.from({ length: size }, async () => {
    while (cursor < items.length) {
      const index = cursor;
      cursor += 1;
      await worker(items[index], index);
    }
  });
  await Promise.all(workers);
}

async function writeAssetManifest(items) {
  const map = Object.fromEntries(items.map((item) => [item.id, {
    src: item.src,
    source: item.source
  }]));
  const js = [
    "globalThis.ANIMAL_IMAGE_ASSETS = ",
    JSON.stringify(map, null, 2),
    ";\n"
  ].join("");
  await writeFile(ASSET_MANIFEST, js);
}

async function writeCredits(items) {
  const lines = [
    "# Animal Photo Sources",
    "",
    "Photos are sourced from Wikipedia and Wikimedia Commons page images, then optimized locally for offline use.",
    "",
    "| Animal | Source |",
    "| --- | --- |"
  ];
  items.forEach((item) => {
    lines.push(`| ${escapeTable(item.name)} | ${item.source} |`);
  });
  await writeFile(CREDITS, `${lines.join("\n")}\n`);
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

function safeExtension(url) {
  const clean = basename(new URL(url).pathname);
  const ext = extname(clean).toLowerCase();
  return ext && ext.length <= 8 ? ext : ".img";
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeTable(value) {
  return String(value).replaceAll("|", "\\|");
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function chunk(items, size) {
  const chunks = [];
  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size));
  }
  return chunks;
}

function normalizeTitle(value) {
  return String(value).trim().replaceAll("_", " ").toLowerCase();
}

function wikimediaThumbnailUrl(url) {
  if (!url) return "";
  const parsed = new URL(url);
  if (parsed.hostname !== "upload.wikimedia.org" || parsed.pathname.includes("/thumb/")) return url;

  const match = parsed.pathname.match(/^\/wikipedia\/commons\/([^/]+)\/([^/]+)\/(.+)$/);
  if (!match) return url;

  const [, first, second, encodedFile] = match;
  const fileName = decodeURIComponent(encodedFile);
  const thumbName = `${THUMB_SIZE}px-${fileName}${fileName.toLowerCase().endsWith(".svg") ? ".png" : ""}`;
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/${first}/${second}/${encodedFile}/${encodeURIComponent(thumbName).replaceAll("%2F", "/")}`;
}
