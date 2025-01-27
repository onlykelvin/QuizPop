const CACHE_NAME = 'quizpop-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/src/main.tsx',
  '/src/index.css',
  '/assets/audio/music/track1.mp3',
  '/assets/audio/music/track2.mp3',
  '/assets/audio/music/track3.mp3',
  '/assets/audio/music/track4.mp3',
  '/assets/audio/music/track5.mp3',
  '/assets/audio/music/track6.mp3',
  '/assets/audio/music/track7.mp3',
  '/assets/audio/sfx/correct.mp3',
  '/assets/audio/sfx/incorrect.mp3',
  '/assets/audio/sfx/scorePlus.mp3',
  '/assets/audio/sfx/scoreMinus.mp3'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });
            return response;
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});