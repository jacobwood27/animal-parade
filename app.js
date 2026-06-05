"use strict";

const LOCAL_IMAGE_ASSETS = globalThis.ANIMAL_IMAGE_ASSETS || {};
const GROUPS = ["All", "Pets", "Farm", "Wild", "Ocean", "Birds", "Reptiles", "Amphibians", "Bugs", "Wonders"];

const ICONS = {
  "chevron-left": '<polyline points="15 18 9 12 15 6"></polyline>',
  "chevron-right": '<polyline points="9 18 15 12 9 6"></polyline>',
  heart: '<path d="M19.5 12.6 12 20l-7.5-7.4a5 5 0 0 1 7.1-7.1l.4.4.4-.4a5 5 0 0 1 7.1 7.1z"></path>',
  "maximize-2": '<polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line>',
  shuffle: '<polyline points="16 3 21 3 21 8"></polyline><line x1="4" y1="20" x2="21" y2="3"></line><polyline points="21 16 21 21 16 21"></polyline><line x1="15" y1="15" x2="21" y2="21"></line><line x1="4" y1="4" x2="9" y2="9"></line>',
  "volume-2": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.5 8.5a5 5 0 0 1 0 7"></path><path d="M19 5a10 10 0 0 1 0 14"></path>',
  "volume-x": '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="22" y1="9" x2="16" y2="15"></line><line x1="16" y1="9" x2="22" y2="15"></line>',
  x: '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>'
};

const RAW_ANIMALS = [
  { name: "Dog", group: "Pets", title: "Dog" },
  { name: "Cat", group: "Pets", title: "Cat" },
  { name: "Rabbit", group: "Pets", title: "Rabbit" },
  { name: "Guinea Pig", group: "Pets", title: "Guinea pig" },
  { name: "Hamster", group: "Pets", title: "Hamster" },
  { name: "Ferret", group: "Pets", title: "Ferret" },
  { name: "Goldfish", group: "Pets", title: "Goldfish" },
  { name: "Budgie", group: "Pets", title: "Budgerigar" },
  { name: "Parrot", group: "Pets", title: "Parrot" },
  { name: "Tortoise", group: "Pets", title: "Tortoise" },
  { name: "Mouse", group: "Pets", title: "House mouse" },
  { name: "Rat", group: "Pets", title: "Brown rat" },

  { name: "Horse", group: "Farm", title: "Horse" },
  { name: "Cow", group: "Farm", title: "Cattle" },
  { name: "Pig", group: "Farm", title: "Pig" },
  { name: "Sheep", group: "Farm", title: "Sheep" },
  { name: "Goat", group: "Farm", title: "Goat" },
  { name: "Chicken", group: "Farm", title: "Chicken" },
  { name: "Duck", group: "Farm", title: "Duck" },
  { name: "Goose", group: "Farm", title: "Goose" },
  { name: "Turkey", group: "Farm", title: "Turkey (bird)" },
  { name: "Donkey", group: "Farm", title: "Donkey" },
  { name: "Llama", group: "Farm", title: "Llama" },
  { name: "Alpaca", group: "Farm", title: "Alpaca" },
  { name: "Camel", group: "Farm", title: "Camel" },
  { name: "Yak", group: "Farm", title: "Domestic yak" },
  { name: "Water Buffalo", group: "Farm", title: "Water buffalo" },

  { name: "Lion", group: "Wild", title: "Lion" },
  { name: "Tiger", group: "Wild", title: "Tiger" },
  { name: "Cheetah", group: "Wild", title: "Cheetah" },
  { name: "Leopard", group: "Wild", title: "Leopard" },
  { name: "Jaguar", group: "Wild", title: "Jaguar" },
  { name: "Snow Leopard", group: "Wild", title: "Snow leopard" },
  { name: "Wolf", group: "Wild", title: "Wolf" },
  { name: "Red Fox", group: "Wild", title: "Red fox" },
  { name: "Fennec Fox", group: "Wild", title: "Fennec fox" },
  { name: "Brown Bear", group: "Wild", title: "Brown bear" },
  { name: "Polar Bear", group: "Wild", title: "Polar bear" },
  { name: "Giant Panda", group: "Wild", title: "Giant panda" },
  { name: "Red Panda", group: "Wild", title: "Red panda" },
  { name: "Elephant", group: "Wild", title: "African bush elephant" },
  { name: "Giraffe", group: "Wild", title: "Giraffe" },
  { name: "Zebra", group: "Wild", title: "Zebra" },
  { name: "Rhinoceros", group: "Wild", title: "Rhinoceros" },
  { name: "Hippopotamus", group: "Wild", title: "Hippopotamus" },
  { name: "Kangaroo", group: "Wild", title: "Kangaroo" },
  { name: "Koala", group: "Wild", title: "Koala" },
  { name: "Sloth", group: "Wild", title: "Sloth" },
  { name: "Meerkat", group: "Wild", title: "Meerkat" },
  { name: "Otter", group: "Wild", title: "Otter" },
  { name: "Beaver", group: "Wild", title: "Beaver" },
  { name: "Moose", group: "Wild", title: "Moose" },
  { name: "Bison", group: "Wild", title: "Bison" },
  { name: "Gorilla", group: "Wild", title: "Gorilla" },
  { name: "Chimpanzee", group: "Wild", title: "Chimpanzee" },
  { name: "Orangutan", group: "Wild", title: "Orangutan" },
  { name: "Lemur", group: "Wild", title: "Lemur" },
  { name: "Hyena", group: "Wild", title: "Hyena" },
  { name: "Warthog", group: "Wild", title: "Warthog" },
  { name: "Wildebeest", group: "Wild", title: "Wildebeest" },
  { name: "Gazelle", group: "Wild", title: "Gazelle" },
  { name: "Deer", group: "Wild", title: "Deer" },
  { name: "Elk", group: "Wild", title: "Elk" },
  { name: "Badger", group: "Wild", title: "Badger" },
  { name: "Skunk", group: "Wild", title: "Skunk" },
  { name: "Porcupine", group: "Wild", title: "Porcupine" },
  { name: "Hedgehog", group: "Wild", title: "Hedgehog" },
  { name: "Squirrel", group: "Wild", title: "Squirrel" },
  { name: "Chipmunk", group: "Wild", title: "Chipmunk" },
  { name: "Bat", group: "Wild", title: "Bat" },

  { name: "Dolphin", group: "Ocean", title: "Dolphin" },
  { name: "Orca", group: "Ocean", title: "Orca" },
  { name: "Humpback Whale", group: "Ocean", title: "Humpback whale" },
  { name: "Blue Whale", group: "Ocean", title: "Blue whale" },
  { name: "Seal", group: "Ocean", title: "Pinniped" },
  { name: "Sea Lion", group: "Ocean", title: "Sea lion" },
  { name: "Walrus", group: "Ocean", title: "Walrus" },
  { name: "Sea Otter", group: "Ocean", title: "Sea otter" },
  { name: "Manatee", group: "Ocean", title: "Manatee" },
  { name: "Sea Turtle", group: "Ocean", title: "Green sea turtle" },
  { name: "Clownfish", group: "Ocean", title: "Amphiprioninae" },
  { name: "Great White Shark", group: "Ocean", title: "Great white shark" },
  { name: "Hammerhead Shark", group: "Ocean", title: "Hammerhead shark" },
  { name: "Whale Shark", group: "Ocean", title: "Whale shark" },
  { name: "Manta Ray", group: "Ocean", title: "Manta ray" },
  { name: "Stingray", group: "Ocean", title: "Stingray" },
  { name: "Seahorse", group: "Ocean", title: "Seahorse" },
  { name: "Octopus", group: "Ocean", title: "Octopus" },
  { name: "Squid", group: "Ocean", title: "Squid" },
  { name: "Jellyfish", group: "Ocean", title: "Jellyfish" },
  { name: "Starfish", group: "Ocean", title: "Starfish" },
  { name: "Crab", group: "Ocean", title: "Crab" },
  { name: "Lobster", group: "Ocean", title: "Lobster" },
  { name: "Shrimp", group: "Ocean", title: "Shrimp" },
  { name: "Sea Urchin", group: "Ocean", title: "Sea urchin" },
  { name: "Eel", group: "Ocean", title: "Eel" },
  { name: "Nudibranch", group: "Ocean", title: "Nudibranch" },

  { name: "Eagle", group: "Birds", title: "Bald eagle" },
  { name: "Owl", group: "Birds", title: "Owl" },
  { name: "Flamingo", group: "Birds", title: "Flamingo" },
  { name: "Peacock", group: "Birds", title: "Peafowl" },
  { name: "Swan", group: "Birds", title: "Swan" },
  { name: "Toucan", group: "Birds", title: "Toucan" },
  { name: "Hummingbird", group: "Birds", title: "Hummingbird" },
  { name: "Kingfisher", group: "Birds", title: "Kingfisher" },
  { name: "Puffin", group: "Birds", title: "Puffin" },
  { name: "Ostrich", group: "Birds", title: "Ostrich" },
  { name: "Emu", group: "Birds", title: "Emu" },
  { name: "Pelican", group: "Birds", title: "Pelican" },
  { name: "Macaw", group: "Birds", title: "Macaw" },
  { name: "Robin", group: "Birds", title: "American robin" },
  { name: "Cardinal", group: "Birds", title: "Northern cardinal" },
  { name: "Woodpecker", group: "Birds", title: "Woodpecker" },
  { name: "Penguin", group: "Birds", title: "Penguin" },
  { name: "Albatross", group: "Birds", title: "Albatross" },
  { name: "Heron", group: "Birds", title: "Heron" },
  { name: "Crane", group: "Birds", title: "Crane (bird)" },
  { name: "Stork", group: "Birds", title: "Stork" },
  { name: "Kiwi", group: "Birds", title: "Kiwi (bird)" },

  { name: "Crocodile", group: "Reptiles", title: "Crocodile" },
  { name: "Alligator", group: "Reptiles", title: "Alligator" },
  { name: "Komodo Dragon", group: "Reptiles", title: "Komodo dragon" },
  { name: "Chameleon", group: "Reptiles", title: "Chameleon" },
  { name: "Iguana", group: "Reptiles", title: "Iguana" },
  { name: "Gecko", group: "Reptiles", title: "Gecko" },
  { name: "Cobra", group: "Reptiles", title: "Cobra" },
  { name: "Python", group: "Reptiles", title: "Pythonidae" },
  { name: "Rattlesnake", group: "Reptiles", title: "Rattlesnake" },
  { name: "Anaconda", group: "Reptiles", title: "Anaconda" },
  { name: "Gila Monster", group: "Reptiles", title: "Gila monster" },
  { name: "Bearded Dragon", group: "Reptiles", title: "Pogona" },
  { name: "Monitor Lizard", group: "Reptiles", title: "Monitor lizard" },
  { name: "Tegu", group: "Reptiles", title: "Tegu" },

  { name: "Frog", group: "Amphibians", title: "Frog" },
  { name: "Toad", group: "Amphibians", title: "Toad" },
  { name: "Salamander", group: "Amphibians", title: "Salamander" },
  { name: "Axolotl", group: "Amphibians", title: "Axolotl" },
  { name: "Newt", group: "Amphibians", title: "Newt" },
  { name: "Poison Dart Frog", group: "Amphibians", title: "Poison dart frog" },
  { name: "Tree Frog", group: "Amphibians", title: "Hylidae" },
  { name: "Caecilian", group: "Amphibians", title: "Caecilian" },

  { name: "Butterfly", group: "Bugs", title: "Butterfly" },
  { name: "Moth", group: "Bugs", title: "Moth" },
  { name: "Honey Bee", group: "Bugs", title: "Honey bee" },
  { name: "Bumblebee", group: "Bugs", title: "Bumblebee" },
  { name: "Ladybug", group: "Bugs", title: "Coccinellidae" },
  { name: "Dragonfly", group: "Bugs", title: "Dragonfly" },
  { name: "Grasshopper", group: "Bugs", title: "Grasshopper" },
  { name: "Praying Mantis", group: "Bugs", title: "Mantis" },
  { name: "Beetle", group: "Bugs", title: "Beetle" },
  { name: "Ant", group: "Bugs", title: "Ant" },
  { name: "Firefly", group: "Bugs", title: "Firefly" },
  { name: "Stick Insect", group: "Bugs", title: "Phasmatodea" },
  { name: "Cicada", group: "Bugs", title: "Cicada" },
  { name: "Tarantula", group: "Bugs", title: "Tarantula" },
  { name: "Spider", group: "Bugs", title: "Spider" },
  { name: "Scorpion", group: "Bugs", title: "Scorpion" },
  { name: "Centipede", group: "Bugs", title: "Centipede" },
  { name: "Millipede", group: "Bugs", title: "Millipede" },
  { name: "Snail", group: "Bugs", title: "Snail" },
  { name: "Earthworm", group: "Bugs", title: "Earthworm" },

  { name: "Platypus", group: "Wonders", title: "Platypus" },
  { name: "Echidna", group: "Wonders", title: "Echidna" },
  { name: "Armadillo", group: "Wonders", title: "Armadillo" },
  { name: "Pangolin", group: "Wonders", title: "Pangolin" },
  { name: "Aardvark", group: "Wonders", title: "Aardvark" },
  { name: "Anteater", group: "Wonders", title: "Anteater" },
  { name: "Capybara", group: "Wonders", title: "Capybara" },
  { name: "Tapir", group: "Wonders", title: "Tapir" },
  { name: "Wombat", group: "Wonders", title: "Wombat" },
  { name: "Quokka", group: "Wonders", title: "Quokka" },
  { name: "Narwhal", group: "Wonders", title: "Narwhal" },
  { name: "Okapi", group: "Wonders", title: "Okapi" },
  { name: "Proboscis Monkey", group: "Wonders", title: "Proboscis monkey" },
  { name: "Slow Loris", group: "Wonders", title: "Slow loris" },
  { name: "Kinkajou", group: "Wonders", title: "Kinkajou" },
  { name: "Sugar Glider", group: "Wonders", title: "Sugar glider" },
  { name: "Tasmanian Devil", group: "Wonders", title: "Tasmanian devil" },
  { name: "Kakapo", group: "Wonders", title: "Kakapo" },
  { name: "Shoebill", group: "Wonders", title: "Shoebill" },
  { name: "Aye-aye", group: "Wonders", title: "Aye-aye" },
  { name: "Tenrec", group: "Wonders", title: "Tenrec" },
  { name: "Numbat", group: "Wonders", title: "Numbat" }
];

const animals = RAW_ANIMALS.map((animal, index) => ({
  ...animal,
  id: `${slugify(animal.name)}-${index}`
}));

const els = {
  filters: document.querySelector("#filters"),
  gallery: document.querySelector("#gallery"),
  count: document.querySelector("#animal-count"),
  favoritesOnly: document.querySelector("#favorites-only"),
  openBigPicture: document.querySelector("#open-big-picture"),
  soundToggle: document.querySelector("#sound-toggle"),
  viewer: document.querySelector("#viewer"),
  closeViewer: document.querySelector("#close-viewer"),
  viewerTitle: document.querySelector("#viewer-title"),
  viewerCategory: document.querySelector("#viewer-category"),
  viewerPhoto: document.querySelector("#viewer-photo"),
  viewerPhotoFrame: document.querySelector("#viewer-photo-frame"),
  viewerLoading: document.querySelector("#viewer-loading"),
  viewerFavorite: document.querySelector("#viewer-favorite"),
  previousAnimal: document.querySelector("#previous-animal"),
  nextAnimal: document.querySelector("#next-animal"),
  speakAnimal: document.querySelector("#speak-animal"),
  shuffleAnimal: document.querySelector("#shuffle-animal"),
  viewerSource: document.querySelector("#viewer-source")
};

const state = {
  group: "All",
  favoritesOnly: false,
  selectedId: null,
  soundOn: localStorage.getItem("animalParadeSound") !== "off"
};

const favorites = new Set(readStoredJson("animalParadeFavorites", []));
let viewerLoadToken = 0;
let lastFocus = null;
let dragStartX = 0;

const cardObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(onCardIntersection, { rootMargin: "640px 0px" })
  : null;

init();

function init() {
  renderFilters();
  updateSoundButton();
  renderGallery();
  wireEvents();
  registerServiceWorker();
  runIcons();
  prefetchFirstAnimals();
}

function wireEvents() {
  els.filters.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-button");
    if (!button) return;
    state.group = button.dataset.group;
    renderFilters();
    renderGallery();
  });

  els.favoritesOnly.addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    syncFavoriteOnlyButton();
    renderGallery();
  });

  els.openBigPicture.addEventListener("click", () => {
    const visible = filteredAnimals();
    if (!visible.length) return;
    openViewer(visible[Math.floor(Math.random() * visible.length)].id);
  });

  els.soundToggle.addEventListener("click", () => {
    state.soundOn = !state.soundOn;
    localStorage.setItem("animalParadeSound", state.soundOn ? "on" : "off");
    updateSoundButton();
  });

  els.gallery.addEventListener("click", (event) => {
    const favoriteButton = event.target.closest(".card-favorite");
    if (favoriteButton) {
      event.stopPropagation();
      toggleFavorite(favoriteButton.dataset.id);
      return;
    }

    const card = event.target.closest(".animal-card");
    if (card) openViewer(card.dataset.id);
  });

  els.gallery.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest(".animal-card");
    if (!card || event.target.closest("button")) return;
    event.preventDefault();
    openViewer(card.dataset.id);
  });

  els.closeViewer.addEventListener("click", closeViewer);
  els.viewer.addEventListener("click", (event) => {
    if (event.target === els.viewer) closeViewer();
  });

  els.previousAnimal.addEventListener("click", () => moveViewer(-1));
  els.nextAnimal.addEventListener("click", () => moveViewer(1));
  els.shuffleAnimal.addEventListener("click", shuffleViewer);
  els.speakAnimal.addEventListener("click", () => {
    const animal = selectedAnimal();
    if (animal) speak(animal.name);
  });
  els.viewerFavorite.addEventListener("click", () => {
    if (state.selectedId) toggleFavorite(state.selectedId);
  });

  els.viewerPhotoFrame.addEventListener("pointerdown", (event) => {
    dragStartX = event.clientX;
  });

  els.viewerPhotoFrame.addEventListener("pointerup", (event) => {
    const delta = event.clientX - dragStartX;
    if (Math.abs(delta) < 54) return;
    moveViewer(delta > 0 ? -1 : 1);
  });

  window.addEventListener("keydown", (event) => {
    if (els.viewer.hidden) return;
    if (event.key === "Escape") closeViewer();
    if (event.key === "ArrowLeft") moveViewer(-1);
    if (event.key === "ArrowRight") moveViewer(1);
  });
}

function renderFilters() {
  const counts = groupCounts();
  els.filters.innerHTML = GROUPS.map((group) => {
    const count = group === "All" ? animals.length : counts.get(group) || 0;
    const selected = state.group === group;
    return `
      <button
        class="filter-button"
        type="button"
        role="tab"
        aria-selected="${selected}"
        data-group="${escapeAttr(group)}"
      >
        ${escapeHtml(group)} <span class="count">${count}</span>
      </button>
    `;
  }).join("");
  runIcons();
}

function renderGallery() {
  const visible = filteredAnimals();
  syncFavoriteOnlyButton();
  updateCount(visible.length);

  if (!visible.length) {
    els.gallery.innerHTML = `<div class="empty-state">No favorites yet</div>`;
    return;
  }

  els.gallery.innerHTML = visible.map(renderAnimalCard).join("");
  runIcons();
  observeCards();
}

function renderAnimalCard(animal) {
  const isFavorite = favorites.has(animal.id);
  return `
    <article class="animal-card" tabindex="0" role="button" aria-label="${escapeAttr(animal.name)}" data-id="${escapeAttr(animal.id)}">
      <img alt="${escapeAttr(animal.name)}" loading="lazy" referrerpolicy="no-referrer">
      <button class="card-favorite" type="button" aria-pressed="${isFavorite}" title="Favorite ${escapeAttr(animal.name)}" data-id="${escapeAttr(animal.id)}">
        <i data-lucide="heart" aria-hidden="true"></i>
        <span class="sr-only">Favorite ${escapeHtml(animal.name)}</span>
      </button>
      <div class="card-shade" aria-hidden="true"></div>
      <div class="card-title">
        <h2>${escapeHtml(animal.name)}</h2>
        <span>${escapeHtml(animal.group)}</span>
      </div>
    </article>
  `;
}

function observeCards() {
  const cards = [...els.gallery.querySelectorAll(".animal-card")];
  if (!cardObserver) {
    cards.forEach(loadCardImage);
    return;
  }
  cards.forEach((card) => {
    if (!card.classList.contains("loaded")) cardObserver.observe(card);
  });
}

function onCardIntersection(entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    cardObserver.unobserve(entry.target);
    loadCardImage(entry.target);
  });
}

async function loadCardImage(card) {
  const animal = animalById(card.dataset.id);
  const img = card.querySelector("img");
  if (!animal || !img || card.classList.contains("loaded")) return;

  try {
    const image = await resolveAnimalImage(animal);
    if (!image?.src) throw new Error("No image returned");

    img.onload = () => {
      card.classList.add("loaded");
      card.classList.remove("failed");
    };
    img.onerror = () => {
      card.classList.add("failed");
      card.classList.remove("loaded");
    };
    img.src = image.src;
    if (img.complete && img.naturalWidth > 0) img.onload();
  } catch {
    card.classList.add("failed");
  }
}

async function resolveAnimalImage(animal) {
  const local = LOCAL_IMAGE_ASSETS[animal.id];
  if (local?.src) return local;
  throw new Error(`Missing bundled image for ${animal.name}`);
}

function openViewer(id) {
  const animal = animalById(id);
  if (!animal) return;

  lastFocus = document.activeElement;
  state.selectedId = id;
  els.viewer.hidden = false;
  document.body.style.overflow = "hidden";
  renderViewer();
  els.closeViewer.focus({ preventScroll: true });
}

async function renderViewer() {
  const animal = selectedAnimal();
  if (!animal) return;

  const token = ++viewerLoadToken;
  els.viewerTitle.textContent = animal.name;
  els.viewerCategory.textContent = animal.group;
  els.viewerPhoto.alt = animal.name;
  els.viewerPhoto.removeAttribute("src");
  els.viewerSource.href = `https://en.wikipedia.org/wiki/${encodeURIComponent(animal.title.replaceAll(" ", "_"))}`;
  els.viewerPhotoFrame.classList.remove("loaded");
  els.viewerLoading.textContent = "Loading photo";
  syncFavoriteButtons();

  if (state.soundOn) speak(animal.name);

  try {
    const image = await resolveAnimalImage(animal);
    if (token !== viewerLoadToken) return;
    if (!image?.src) throw new Error("No image returned");
    els.viewerSource.href = image.source;
    els.viewerPhoto.onload = () => {
      if (token === viewerLoadToken) els.viewerPhotoFrame.classList.add("loaded");
    };
    els.viewerPhoto.onerror = () => {
      if (token === viewerLoadToken) els.viewerLoading.textContent = "Photo unavailable";
    };
    els.viewerPhoto.src = image.src;
    if (els.viewerPhoto.complete && els.viewerPhoto.naturalWidth > 0) els.viewerPhoto.onload();
  } catch {
    if (token === viewerLoadToken) els.viewerLoading.textContent = "Photo unavailable";
  }
}

function closeViewer() {
  els.viewer.hidden = true;
  document.body.style.overflow = "";
  state.selectedId = null;
  window.speechSynthesis?.cancel();
  if (lastFocus && "focus" in lastFocus) lastFocus.focus({ preventScroll: true });
}

function moveViewer(direction) {
  const list = filteredAnimals();
  if (!list.length) return;
  const currentIndex = Math.max(0, list.findIndex((animal) => animal.id === state.selectedId));
  const nextIndex = (currentIndex + direction + list.length) % list.length;
  state.selectedId = list[nextIndex].id;
  renderViewer();
}

function shuffleViewer() {
  const list = filteredAnimals();
  if (!list.length) return;
  if (list.length === 1) {
    state.selectedId = list[0].id;
    renderViewer();
    return;
  }

  let next = list[Math.floor(Math.random() * list.length)].id;
  while (next === state.selectedId) next = list[Math.floor(Math.random() * list.length)].id;
  state.selectedId = next;
  renderViewer();
}

function toggleFavorite(id) {
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }

  localStorage.setItem("animalParadeFavorites", JSON.stringify([...favorites]));
  syncFavoriteButtons();
  renderFilters();

  if (state.favoritesOnly && !favorites.has(id)) {
    renderGallery();
  } else {
    updateFavoriteControls(id);
  }
}

function updateFavoriteControls(id) {
  const pressed = String(favorites.has(id));
  els.gallery.querySelectorAll(`.card-favorite[data-id="${cssEscape(id)}"]`).forEach((button) => {
    button.setAttribute("aria-pressed", pressed);
  });
}

function syncFavoriteButtons() {
  const animal = selectedAnimal();
  const selectedFavorite = animal ? favorites.has(animal.id) : false;
  els.viewerFavorite.setAttribute("aria-pressed", String(selectedFavorite));
  els.viewerFavorite.title = selectedFavorite ? "Remove favorite" : "Favorite";
  if (animal) updateFavoriteControls(animal.id);
}

function syncFavoriteOnlyButton() {
  els.favoritesOnly.setAttribute("aria-pressed", String(state.favoritesOnly));
  els.favoritesOnly.title = state.favoritesOnly ? "Show all animals" : "Favorites";
}

function updateSoundButton() {
  els.soundToggle.setAttribute("aria-pressed", String(state.soundOn));
  els.soundToggle.title = state.soundOn ? "Sound on" : "Sound off";
  const label = els.soundToggle.querySelector(".sr-only");
  if (label) label.textContent = state.soundOn ? "Sound on" : "Sound off";
  replaceIcon(els.soundToggle, state.soundOn ? "volume-2" : "volume-x");
}

function speak(text) {
  if (!state.soundOn || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.82;
  utterance.pitch = 1.05;
  window.speechSynthesis.speak(utterance);
}

function filteredAnimals() {
  return animals.filter((animal) => {
    const groupMatch = state.group === "All" || animal.group === state.group;
    const favoriteMatch = !state.favoritesOnly || favorites.has(animal.id);
    return groupMatch && favoriteMatch;
  });
}

function groupCounts() {
  return animals.reduce((counts, animal) => {
    counts.set(animal.group, (counts.get(animal.group) || 0) + 1);
    return counts;
  }, new Map());
}

function updateCount(count) {
  const total = animals.length;
  if (state.favoritesOnly) {
    els.count.textContent = `${count} favorite ${count === 1 ? "animal" : "animals"}`;
    return;
  }
  if (state.group === "All") {
    els.count.textContent = `${total} real animal photos`;
    return;
  }
  els.count.textContent = `${count} ${state.group.toLowerCase()} ${count === 1 ? "animal" : "animals"}`;
}

function selectedAnimal() {
  return animalById(state.selectedId);
}

function animalById(id) {
  return animals.find((animal) => animal.id === id);
}

function prefetchFirstAnimals() {
  filteredAnimals().slice(0, 8).forEach((animal) => {
    resolveAnimalImage(animal).catch(() => {});
  });
}

function readStoredJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function cssEscape(value) {
  if (window.CSS?.escape) return CSS.escape(value);
  return String(value).replace(/["\\]/g, "\\$&");
}

function runIcons() {
  document.querySelectorAll("[data-lucide]").forEach((placeholder) => {
    const name = placeholder.getAttribute("data-lucide");
    const svg = makeIcon(name);
    if (!svg) return;
    placeholder.replaceWith(svg);
  });
}

function replaceIcon(container, name) {
  const current = container.querySelector("svg, [data-lucide]");
  const svg = makeIcon(name);
  if (current && svg) current.replaceWith(svg);
}

function makeIcon(name) {
  const paths = ICONS[name];
  if (!paths) return null;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-linecap", "round");
  svg.setAttribute("stroke-linejoin", "round");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  svg.innerHTML = paths;
  return svg;
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || !location.protocol.startsWith("http")) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {});
  });
}
