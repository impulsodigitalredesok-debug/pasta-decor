const CACHE_NAME = 'pastas-decor-v2';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

// Escucha mensajes desde la app para actualizar el número rojo (badge) o mostrar avisos
self.addEventListener('message', async (event) => {
    if (event.data) {
        if (event.data.type === 'UPDATE_BADGE') {
            const count = event.data.count || 0;
            if (navigator.setAppBadge) {
                if (count > 0) {
                    navigator.setAppBadge(count).catch(err => console.error(err));
                } else {
                    navigator.clearAppBadge().catch(err => console.error(err));
                }
            }
        }
        
        // Muestra una notificación push flotante en la pantalla del celular
        if (event.data.type === 'SHOW_NOTIFICATION') {
            const title = event.data.title || "Pastas Décor";
            const options = {
                body: event.data.body || "Nuevo pedido recibido",
                icon: 'logo.png',
                badge: 'logo.png',
                vibrate: [200, 100, 200]
            };
            self.registration.showNotification(title, options);
        }
    }
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});
