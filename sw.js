/*
  Niyet — service worker
  İki iş görür:
  1) Uygulama kabuğunu (shell) önbelleğe alıp çevrimdışı ve "ana ekrana ekle"
     kurulabilirliğini sağlamak.
  2) Sayfa açıkken planlanan güne dair yerel bildirimi göstermek
     (gerçek push değil — arka planda çalışan bir sunucu yok).
*/
const CACHE = "niyet-v1";
const SHELL = ["./", "./index.html", "./manifest.json",
  "./icons/icon-192.png", "./icons/icon-512.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then((cached) => {
      const network = fetch(e.request)
        .then((res) => {
          if (res && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});

/* Sayfa, o günün planlı bir kaza orucu olduğunu tespit ettiğinde
   buraya postMessage ile haber verir; biz de cihaz bildirimini göstererek
   uygulama kapalıyken bile (ama cihaz açıkken, tarayıcı süreci hayattayken)
   görünür kılarız. */
self.addEventListener("message", (e) => {
  const msg = e.data || {};
  if (msg.type === "show-notification") {
    self.registration.showNotification(msg.title, {
      body: msg.body,
      icon: "icons/icon-192.png",
      badge: "icons/icon-192.png",
      tag: msg.tag || "niyet-reminder",
      renotify: false
    });
  }
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: "window" }).then((list) => {
      for (const c of list) { if ("focus" in c) return c.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow("./index.html");
    })
  );
});
