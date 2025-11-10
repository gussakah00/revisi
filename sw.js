import { precacheAndRoute } from "workbox-precaching";
const manifest = self.__WB_MANIFEST;

precacheAndRoute(manifest);
self.addEventListener("push", (event) => {
  console.log("Service worker pushing...");
  async function chainPromise() {
    await self.registration.showNotification("Ada laporan baru untuk Anda!", {
      body: "Terjadi kerusakan lampu jalan di Jl. Melati",
    });
  }

  event.waitUntil(chainPromise());
});

const CACHE_NAME = "cerita-app-v5";

const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./main.bundle.js",
  "./styles.css",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png",
  "./app.webmanifest",
];

self.addEventListener("install", (event) => {
  console.log("🔧 Service Worker: Installing...");

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("💾 Opening cache...");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log("✅ Installation complete");
        return self.skipWaiting();
      })
  );
});

self.addEventListener("activate", (event) => {
  console.log("🔧 Service Worker: Activating...");

  event.waitUntil(
    Promise.all([
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log("🗑️ Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim(),
    ])
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Skip API requests
  if (url.href.includes("story-api.dicoding.dev")) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request)
        .then((response) => {
          if (response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          if (event.request.destination === "document") {
            return caches.match("./index.html");
          }
        });
    })
  );
});

self.addEventListener("push", (event) => {
  const options = {
    body: "Ada cerita baru di sekitarmu! 📖",
    icon: "./icons/icon-192x192.png",
    badge: "./icons/icon-72x72.png",
    tag: "story-notification",
  };

  event.waitUntil(
    self.registration.showNotification("Cerita di Sekitarmu", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow("./");
      }
    })
  );
});
