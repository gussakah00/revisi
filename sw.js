// sw.js - SIMPLE VERSION (NO WORKBOX)
const CACHE_NAME = "cerita-sekitarmu-v1";

const URLS_TO_CACHE = [
  "./",
  "./index.html",
  "./main.bundle.js",
  "./styles.css",
  "./manifest.json",
  "./favicon.png",
];

self.addEventListener("install", (event) => {
  console.log("🔧 SW: Installing...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("💾 Caching files...");
        return cache.addAll(URLS_TO_CACHE).catch((err) => {
          console.warn("Some files failed to cache:", err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
