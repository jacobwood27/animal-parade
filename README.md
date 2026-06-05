# Animal Parade

Animal Parade is a static iPad-first PWA for toddlers to browse real animal photos.

## Run locally

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## What it includes

- 183 curated animals across pets, farm animals, wildlife, ocean animals, birds, reptiles, amphibians, bugs, and unusual species.
- 183 bundled WebP animal photos sourced from Wikipedia and Wikimedia Commons, optimized locally for iPad.
- Large iPad-friendly cards, full-screen image viewing, favorites, shuffle, and spoken animal names.
- PWA manifest, touch icons, local SVG icons, and service worker caching for the app shell plus the full 38 MB animal photo bundle.

## Offline use

Open the app once while online and leave it open until the service worker finishes installing. After that first cache pass, the app shell and every bundled animal photo are available offline, including on an airplane. Source links to Wikipedia require internet.
