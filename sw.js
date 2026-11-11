// My Wardrobe: オフラインでも開けるように、アプリ本体と部品を端末に保存する
const APP = 'mw-app-v1', LIBS = 'mw-libs-v1';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'icon-180.png'];
// 文字のフォントと「背景を消す」の部品は、一度取ったら保存したものを使う
const LIB_HOSTS = /(^|\.)(fonts\.googleapis\.com|fonts\.gstatic\.com|esm\.sh|staticimgly\.com)$/;

self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k !== APP && k !== LIBS).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // アプリ本体:まず通信して新しい版を取り込む。4秒で届かない・圏外のときは、保存してある版を使う
    e.respondWith((async () => {
      const cache = await caches.open(APP);
      const cached = await cache.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' ? await cache.match('index.html') : undefined);
      const net = fetch(req).then(res => { if (res.ok) cache.put(req, res.clone()); return res; });
      if (!cached) return net;
      net.catch(() => {});
      const timeout = new Promise(r => setTimeout(() => r(cached), 4000));
      return Promise.race([net.catch(() => cached), timeout]);
    })());
  } else if (LIB_HOSTS.test(url.hostname)) {
    e.respondWith((async () => {
      const cache = await caches.open(LIBS);
      const hit = await cache.match(req);
      if (hit) return hit;
      const res = await fetch(req);
      if (res.ok) cache.put(req, res.clone());
      return res;
    })());
  }
});
