const CACHE_NAME = "zavix-cache-v999"; // تغيير كبير لإجبار التحديث

const urlsToCache = [
  "/",
  "/static/style.css",
  "/static/script.js",
  "/manifest.json"
];

// تثبيت الكاش
self.addEventListener("install", (event) => {
  self.skipWaiting(); // 🔥 تحديث فوري
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// حذف الكاش القديم
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // 🔥 التحكم فورًا
});

// جلب البيانات
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request);
      })
  );
});
