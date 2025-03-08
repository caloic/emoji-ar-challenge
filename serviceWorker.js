// Service Worker pour l'application "Chasse aux Emoji Secrets"
const CACHE_NAME = 'emoji-ar-cache-v1';

// Liste des ressources à mettre en cache
const CACHED_ASSETS = [
    './',
    './index.html',
    './app.html',
    './manifest.json',
    './css/main.css',
    './css/animations.css',
    './css/card.css',
    './js/main.js',
    './js/ar-controller.js',
    './js/emoji-manager.js',
    './js/card-generator.js',
    './js/utils.js',
    './js/interactions/computer.js',
    './js/interactions/security.js',
    './js/interactions/gaming.js',
    './js/interactions/architecture.js',
    './js/interactions/video.js',
    './js/interactions/design.js',
    './js/interactions/ai.js',
    './js/interactions/marketing.js',
    './js/interactions/business.js',
    './assets/images/icons/ynov-logo.png',
    './assets/images/icons/ynov-logo-white.png',
    './assets/images/icons/user-avatar.png',
    './assets/images/icons/favicon.ico',
    './assets/images/markers/pattern-informatique.patt',
    './assets/images/markers/pattern-cybersecurite.patt',
    './assets/images/markers/pattern-gaming.patt',
    './assets/images/markers/pattern-architecture.patt',
    './assets/images/markers/pattern-audiovisuel.patt',
    './assets/images/markers/pattern-design.patt',
    './assets/images/markers/pattern-ai.patt',
    './assets/images/markers/pattern-marketing.patt',
    './assets/images/markers/pattern-business.patt',
    './assets/images/markers/pattern-informatique.png',
    './assets/images/markers/pattern-cybersecurite.png',
    './assets/images/markers/pattern-gaming.png',
    './assets/images/markers/pattern-architecture.png',
    './assets/images/markers/pattern-audiovisuel.png',
    './assets/images/markers/pattern-design.png',
    './assets/images/markers/pattern-ai.png',
    './assets/images/markers/pattern-marketing.png',
    './assets/images/markers/pattern-business.png',
    'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js',
    'https://aframe.io/releases/1.3.0/aframe.min.js',
    'https://raw.githack.com/AR-js-org/AR.js/master/aframe/build/aframe-ar.js',
    'https://cdn.jsdelivr.net/npm/three@0.134.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js',
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap'
];

// Installation du Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Cache ouvert');
                return cache.addAll(CACHED_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activation du Service Worker
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        // Suppression des anciens caches
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// Interception des requêtes réseau
self.addEventListener('fetch', (event) => {
    // Stratégie Cache First avec fallback réseau
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // La ressource est dans le cache
                if (response) {
                    return response;
                }

                // Clone de la requête (car elle ne peut être utilisée qu'une fois)
                const fetchRequest = event.request.clone();

                // Tentative de récupération depuis le réseau
                return fetch(fetchRequest)
                    .then((response) => {
                        // Vérifier que la réponse est valide
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone de la réponse (car elle aussi ne peut être utilisée qu'une fois)
                        const responseToCache = response.clone();

                        // Mise en cache de la ressource
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                // Ne pas mettre en cache les requêtes contenant "markers/"
                                // pour éviter des problèmes avec les marqueurs AR
                                if (!event.request.url.includes('/markers/')) {
                                    cache.put(event.request, responseToCache);
                                }
                            });

                        return response;
                    })
                    .catch(() => {
                        // En cas d'erreur réseau pour les images, renvoyer une image par défaut
                        if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg)$/)) {
                            return caches.match('./assets/images/icons/offline-image.png');
                        }

                        // Pour les pages HTML, renvoyer la page hors ligne
                        if (event.request.headers.get('accept').includes('text/html')) {
                            return caches.match('./offline.html');
                        }

                        // Pour tout le reste, on ne fait rien
                        return new Response('Contenu non disponible hors ligne', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Gestion des notifications push (si nécessaire)
self.addEventListener('push', (event) => {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
        return;
    }

    const data = event.data?.json() ?? {};
    const title = data.title || 'Chasse aux Emoji Secrets';
    const options = {
        body: data.body || 'Une notification de l\'application Chasse aux Emoji',
        icon: './assets/images/icons/icon-192x192.png',
        badge: './assets/images/icons/badge-72x72.png',
        data: data.data
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// Gestion du clic sur une notification
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    event.waitUntil(
        clients.matchAll({ type: 'window' })
            .then((clientList) => {
                // Si une fenêtre de l'application est déjà ouverte, la mettre au premier plan
                for (const client of clientList) {
                    if (client.url.includes(self.location.origin) && 'focus' in client) {
                        return client.focus();
                    }
                }

                // Sinon, ouvrir une nouvelle fenêtre
                if (clients.openWindow) {
                    return clients.openWindow('./');
                }
            })
    );
});

// Synchronisation en arrière-plan (pour sauvegarder les progrès hors ligne)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-emoji-progress') {
        event.waitUntil(
            syncEmojiProgress()
        );
    }
});

// Fonction pour synchroniser les progrès
async function syncEmojiProgress() {
    try {
        // Récupérer les données en attente de la base de données
        const db = await openDatabase();
        const pendingData = await getPendingData(db);

        if (pendingData.length === 0) {
            return;
        }

        // Envoyer les données au serveur
        // (Dans notre cas, c'est fictif car l'application est entièrement côté client)
        console.log('Synchronisation des données en arrière-plan:', pendingData);

        // Marquer les données comme synchronisées
        await markDataAsSynced(db, pendingData);

    } catch (error) {
        console.error('Erreur lors de la synchronisation:', error);
        throw error; // Relancer l'erreur pour que la synchronisation soit réessayée
    }
}

// Fonctions fictives pour la base de données
function openDatabase() {
    return Promise.resolve({});
}

function getPendingData() {
    return Promise.resolve([]);
}

function markDataAsSynced() {
    return Promise.resolve();
}