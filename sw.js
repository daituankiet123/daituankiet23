/* Service worker – Đăng ký thăm thân
   - Lưu bộ khung ứng dụng để mở lại được khi ngoại tuyến.
   - Trang chính: ưu tiên mạng (tối đa 3,5 giây) rồi dùng bản đã lưu.
   - Ảnh/manifest: dùng bản đã lưu và cập nhật ngầm.
   - Google Fonts: lưu lại sau lần tải đầu.
   - Bản mới chỉ kích hoạt khi người dùng bấm "Cập nhật" (tránh mất thao tác đang làm). */
const VERSION = 'tham-than-v3';
const CORE_CACHE = VERSION + '-core';
const RUNTIME_CACHE = VERSION + '-runtime';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './logo.png',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];
const NAV_TIMEOUT = 3500;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CORE_CACHE).then(cache =>
      // Từng file một: thiếu một file (ví dụ đổi tên trang chính) không làm hỏng cả bước cài đặt.
      Promise.all(CORE.map(url => cache.add(new Request(url, { cache: 'reload' })).catch(() => {})))
    )
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CORE_CACHE && k !== RUNTIME_CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

const stripSearch = url => { const u = new URL(url); u.search = ''; return u.href; };

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    promise.then(v => { clearTimeout(t); resolve(v); }, e => { clearTimeout(t); reject(e); });
  });
}

async function handleNavigation(request) {
  const cache = await caches.open(CORE_CACHE);
  const key = stripSearch(request.url);
  try {
    const net = fetch(request);
    const res = await withTimeout(net, NAV_TIMEOUT);
    if (res && res.ok) cache.put(key, res.clone());
    return res;
  } catch (err) {
    const hit = (await cache.match(key)) ||
                (await caches.match(request, { ignoreSearch: true })) ||
                (await cache.match('./')) ||
                (await cache.match('./index.html'));
    if (hit) return hit;
    return new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><body style="font-family:system-ui;padding:32px;text-align:center"><h2>Đang ngoại tuyến</h2><p>Hãy kết nối mạng và mở lại ứng dụng một lần để lưu dữ liệu giao diện.</p>',
      { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const refresh = fetch(request).then(res => {
    if (res && (res.ok || res.type === 'opaque')) cache.put(request, res.clone());
    return res;
  }).catch(() => null);
  return cached || (await refresh) || Response.error();
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  if (req.mode === 'navigate') {
    event.respondWith(handleNavigation(req));
    return;
  }
  if (url.origin === self.location.origin) {
    if (url.pathname.endsWith('/sw.js')) return;
    event.respondWith(staleWhileRevalidate(req, CORE_CACHE));
    return;
  }
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(staleWhileRevalidate(req, RUNTIME_CACHE));
  }
});
