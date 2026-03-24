const CACHE_NAME = "zavix-cache-v2"; // غيرنا الإصدار مهم جداً

const urlsToCache = [
  "/",
  "/static/style.css",
  "/static/script.js",
  "/manifest.json",
  "/static/icon192.png",
  "/static/icon512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
