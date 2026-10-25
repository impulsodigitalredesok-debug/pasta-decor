const CACHE_NAME = 'pastas-decor-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Controla el número rojo (badge) en el ícono de la app instalada
self.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'UPDATE_BADGE') {
        const count = event.data.count || 0;
        if (navigator.setAppBadge) {
            if (count > 0) {
                navigator.setAppBadge(count).catch(err => console.error(err));
            } else {
                navigator.clearAppBadge().catch(err => console.error(err));
            }
        }
    }
});