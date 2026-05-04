const CACHE = 'control-v1'
const PRECACHE = ['/', '/login']

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)))
  self.skipWaiting()
})

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
  )
  self.clients.claim()
})

self.addEventListener('fetch', (e) => {
  // Let API and Next.js internals go straight to the network
  const url = new URL(e.request.url)
  if (url.pathname.startsWith('/api/') || url.pathname.startsWith('/_next/')) return

  e.respondWith(
    caches
      .match(e.request)
      .then((cached) => cached ?? fetch(e.request).then((res) => {
        const clone = res.clone()
        caches.open(CACHE).then((c) => c.put(e.request, clone))
        return res
      }))
  )
})
