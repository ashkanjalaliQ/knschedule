const CACHE_NAME = 'weekly-schedule-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/schedule-app.js',
    '/schedule-data.js',
    'https://cdn.tailwindcss.com',
    'https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
    'https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js',
    // Add paths to your icons here
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});