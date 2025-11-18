
self.addEventListener('install', (event) => {
  (self as any).skipWaiting();
});

self.addEventListener('activate', (event) => {
  (self as any).clients.claim();
});

self.addEventListener('fetch', (event: any) => {
  // Minimal service worker: implement caching strategy per needs.
});
