const CACHE_NAME = "zavix-cache-v1";

const urlsToCache = [
  "/",
  "/static/style.css",
  "/static/script.js"
];

// تثبيت الكاش
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// تشغيل الخدمة
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
