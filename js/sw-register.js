/**
 * Script d'enregistrement du Service Worker pour l'application Chasse aux Emoji Secrets
 */

// Vérifier si les Service Workers sont supportés
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('./serviceWorker.js')
            .then(function(registration) {
                console.log('Service Worker enregistré avec succès:', registration.scope);

                // Vérifier les mises à jour du Service Worker
                registration.addEventListener('updatefound', function() {
                    // Un nouveau Service Worker est en cours d'installation
                    const newWorker = registration.installing;

                    newWorker.addEventListener('statechange', function() {
                        // Le nouveau Service Worker a changé d'état
                        console.log('Nouveau Service Worker - État:', newWorker.state);

                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // Une mise à jour est disponible, proposer de rafraîchir
                            showUpdateNotification();
                        }
                    });
                });
            })
            .catch(function(error) {
                console.error('Échec de l\'enregistrement du Service Worker:', error);
            });
    });

    // Écouter les messages du Service Worker
    navigator.serviceWorker.addEventListener('message', function(event) {
        console.log('Message du Service Worker:', event.data);

        // Traiter le message
        if (event.data && event.data.type === 'CACHE_UPDATED') {
            // Une mise à jour du cache a été effectuée
            showUpdateNotification();
        }
    });
}

/**
 * Affiche une notification de mise à jour à l'utilisateur
 */
function showUpdateNotification() {
    // Vérifier si les notifications sont prises en charge et autorisées
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification('Mise à jour disponible', {
            body: 'Une nouvelle version de l\'application est disponible. Cliquez pour rafraîchir.',
            icon: './assets/images/icons/icon-192x192.png'
        });

        notification.onclick = function() {
            // Fermer la notification
            notification.close();
            // Rafraîchir la page
            window.location.reload();
        };
    } else {
        // Fallback : afficher une notification dans l'interface
        const updateBar = document.createElement('div');
        updateBar.style.position = 'fixed';
        updateBar.style.top = '0';
        updateBar.style.left = '0';
        updateBar.style.right = '0';
        updateBar.style.backgroundColor = '#4CAF50';
        updateBar.style.color = 'white';
        updateBar.style.padding = '10px';
        updateBar.style.textAlign = 'center';
        updateBar.style.zIndex = '9999';

        updateBar.innerHTML = `
            Une nouvelle version de l'application est disponible.
            <button style="margin-left: 10px; padding: 5px 10px; background-color: white; color: #4CAF50; border: none; border-radius: 3px; cursor: pointer;">
                Rafraîchir
            </button>
        `;

        // Ajouter au DOM
        document.body.appendChild(updateBar);

        // Ajouter l'événement au bouton
        updateBar.querySelector('button').addEventListener('click', function() {
            window.location.reload();
        });
    }
}

/**
 * Demande l'autorisation pour les notifications push
 */
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                console.log('Autorisation de notification accordée');
                subscribeToPushNotifications();
            }
        });
    }
}

/**
 * S'abonne aux notifications push (si le service existe)
 */
function subscribeToPushNotifications() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
        navigator.serviceWorker.ready.then(function(registration) {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlB64ToUint8Array('YOUR_PUBLIC_VAPID_KEY')
            })
                .then(function(subscription) {
                    console.log('Abonnement push réussi:', subscription.endpoint);
                    // À ce stade, on pourrait envoyer la souscription à un serveur
                })
                .catch(function(error) {
                    console.error('Échec de l\'abonnement push:', error);
                });
        });
    }
}

/**
 * Convertit une clé base64 en tableau Uint8Array
 * @param {string} base64String - Clé au format base64
 * @returns {Uint8Array} - Tableau Uint8Array
 */
function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}

/**
 * Vérifie si l'application peut être installée
 */
function checkInstallability() {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        // Empêcher Chrome 67+ d'afficher automatiquement l'invite
        e.preventDefault();
        // Stocker l'événement pour l'utiliser plus tard
        deferredPrompt = e;

        // Afficher un bouton d'installation personnalisé
        showInstallButton();
    });

    function showInstallButton() {
        const installButton = document.createElement('button');
        installButton.textContent = 'Installer l\'application';
        installButton.classList.add('install-button');

        // Ajouter les styles
        installButton.style.position = 'fixed';
        installButton.style.bottom = '20px';
        installButton.style.right = '20px';
        installButton.style.backgroundColor = '#6e8efb';
        installButton.style.color = 'white';
        installButton.style.border = 'none';
        installButton.style.borderRadius = '25px';
        installButton.style.padding = '10px 15px';
        installButton.style.fontWeight = 'bold';
        installButton.style.zIndex = '1000';
        installButton.style.cursor = 'pointer';
        installButton.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.2)';

        // Ajouter l'événement
        installButton.addEventListener('click', async () => {
            if (deferredPrompt) {
                // Afficher l'invite
                deferredPrompt.prompt();
                // Attendre que l'utilisateur réponde
                const { outcome } = await deferredPrompt.userChoice;
                console.log(`Résultat de l'installation: ${outcome}`);
                // On ne peut utiliser deferredPrompt qu'une fois
                deferredPrompt = null;
                // Cacher le bouton
                installButton.style.display = 'none';
            }
        });

        // Ajouter au DOM
        document.body.appendChild(installButton);
    }

    // Détecter quand l'application a été installée
    window.addEventListener('appinstalled', (evt) => {
        console.log('Application installée');
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    requestNotificationPermission();
    checkInstallability();
});