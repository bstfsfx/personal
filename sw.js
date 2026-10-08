const CACHE = 'pwa-v1';

const CORE = [
    '/',
    '/static/css/style.css',
    '/static/css/contact.css',
    '/static/js/i18n.js',
    '/static/js/contact.js',
    '/static/js/nav.js',
    '/static/manifest.json',
    '/static/images/logo.webp',
    '/static/images/logo.png',
    '/static/images/logo-192.png',
    '/static/images/logo-512.png',
    '/static/images/logo-512-maskable.png',
    '/static/images/logo-180.png',
    '/static/images/logo-32.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.addAll(CORE))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then((keys) => Promise.all(
                keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))
            ))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const request = event.request;

    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;
    if (request.headers.has('range')) return;
    if (/\.(mp4|webm|mov|m4v|avi|ogg|wav|mp3|woff2?|ttf|otf)$/i.test(url.pathname)) return;

    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    const copy = response.clone();
                    caches.open(CACHE).then((cache) => cache.put('/', copy)).catch(() => {});
                    return response;
                })
                .catch(() => caches.match('/'))
        );
        return;
    }

    if (/\.(css|js|png|webp|jpe?g|gif|svg|ico|json|webmanifest)$/i.test(url.pathname)) {
        event.respondWith(
            caches.match(request).then((cached) => {
                const network = fetch(request)
                    .then((response) => {
                        if (response && response.ok) {
                            const copy = response.clone();
                            caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
                        }
                        return response;
                    })
                    .catch(() => cached);
                return cached || network;
            })
        );
    }
});
