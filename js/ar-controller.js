/**
 * Classe ARController
 * Gère la détection des marqueurs AR et l'affichage des emojis en 3D
 */
class ARController {
    /**
     * Constructeur
     * @param {EmojiManager} emojiManager - Instance du gestionnaire d'emojis
     */
    constructor(emojiManager) {
        this.emojiManager = emojiManager;
        this.isRunning = false;
        this.interactionTimeout = null;
        this.lastDetectedMarker = null;

        // Mapping des marqueurs vers les IDs d'emojis
        this.markerMapping = {
            'marker-informatique': 'informatique',
            'marker-cybersecurite': 'cybersecurite',
            'marker-gaming': 'gaming',
            'marker-architecture': 'architecture',
            'marker-audiovisuel': 'audiovisuel',
            'marker-design': 'design',
            'marker-ai': 'ai',
            'marker-marketing': 'marketing',
            'marker-business': 'business'
        };

        // Interactions associées à chaque emoji
        this.interactions = {
            'informatique': computerInteraction,
            'cybersecurite': securityInteraction,
            'gaming': gamingInteraction,
            'architecture': architectureInteraction,
            'audiovisuel': videoInteraction,
            'design': designInteraction,
            'ai': aiInteraction,
            'marketing': marketingInteraction,
            'business': businessInteraction
        };

        // Initialiser les écouteurs d'événements
        this.initEventListeners();
    }

    /**
     * Initialiser les écouteurs d'événements
     */
    initEventListeners() {
        // Détecter quand un marqueur est trouvé
        document.addEventListener('markerFound', (event) => {
            if (!this.isRunning) return;

            const markerId = event.target.id;
            const emojiId = this.markerMapping[markerId];

            if (emojiId) {
                this.onMarkerDetected(markerId, emojiId);
            }
        });

        // Détecter quand un marqueur est perdu
        document.addEventListener('markerLost', (event) => {
            if (!this.isRunning) return;

            // Ne rien faire pour l'instant, peut-être ajouter un comportement plus tard
        });

        // Configuration manuelle des écouteurs pour chaque marqueur
        // (puisque les événements standard d'AR.js peuvent ne pas fonctionner comme prévu)
        this.setupMarkerListeners();
    }

    /**
     * Configurer les écouteurs pour chaque marqueur individuellement
     */
    setupMarkerListeners() {
        Object.keys(this.markerMapping).forEach(markerId => {
            const marker = document.getElementById(markerId);
            if (marker) {
                // Écouteur markerFound
                marker.addEventListener('markerFound', () => {
                    if (!this.isRunning) return;

                    const emojiId = this.markerMapping[markerId];
                    if (emojiId) {
                        this.onMarkerDetected(markerId, emojiId);
                    }
                });
            }
        });

        // Appliquer la configuration après que tous les éléments soient chargés
        setTimeout(() => {
            this.setupAFrameMarkerListeners();
        }, 1000);
    }

    /**
     * Configuration spécifique pour les marqueurs A-Frame
     */
    setupAFrameMarkerListeners() {
        const markers = document.querySelectorAll('a-marker');
        markers.forEach(marker => {
            const markerId = marker.id;
            const emojiId = this.markerMapping[markerId];

            // Utiliser l'API spécifique d'A-Frame
            marker.addEventListener('markerFound', () => {
                if (!this.isRunning) return;

                if (emojiId) {
                    this.onMarkerDetected(markerId, emojiId);
                }
            });
        });
    }

    /**
     * Démarrer la détection AR
     */
    start() {
        this.isRunning = true;
        console.log("Détection AR démarrée");

        // Créer les modèles 3D pour les emojis
        this.setupEmojiModels();
    }

    /**
     * Arrêter la détection AR
     */
    stop() {
        this.isRunning = false;
        console.log("Détection AR arrêtée");
    }

    /**
     * Configurer les modèles 3D pour les emojis
     */
    setupEmojiModels() {
        Object.keys(this.markerMapping).forEach(markerId => {
            const emojiId = this.markerMapping[markerId];
            const emojiData = this.emojiManager.getEmojiData(emojiId);

            if (emojiData) {
                const emojiEntity = document.getElementById(`emoji-${emojiId}`);

                if (emojiEntity) {
                    // Créer le modèle 3D de l'emoji (texte 3D pour commencer)
                    emojiEntity.innerHTML = `
                        <a-text value="${emojiData.emoji}" 
                               scale="2 2 2" 
                               position="0 0 0" 
                               align="center"
                               animation="property: rotation; to: 0 360 0; loop: true; dur: 10000; easing: linear">
                        </a-text>
                    `;
                }
            }
        });
    }

    /**
     * Gérer la détection d'un marqueur
     * @param {string} markerId - ID du marqueur détecté
     * @param {string} emojiId - ID de l'emoji associé
     */
    onMarkerDetected(markerId, emojiId) {
        // Éviter les détections multiples rapides
        if (this.lastDetectedMarker === markerId && Date.now() - this.lastDetectionTime < 3000) {
            return;
        }

        this.lastDetectedMarker = markerId;
        this.lastDetectionTime = Date.now();

        console.log(`Marqueur détecté: ${markerId}, Emoji: ${emojiId}`);

        // Marquer l'emoji comme trouvé
        const isFirstDiscovery = this.emojiManager.markAsFound(emojiId);

        // Si c'est la première fois que l'utilisateur trouve cet emoji, lancer l'interaction
        if (isFirstDiscovery) {
            this.triggerInteraction(emojiId);
        }
    }

    /**
     * Déclencher l'interaction associée à un emoji
     * @param {string} emojiId - ID de l'emoji
     */
    triggerInteraction(emojiId) {
        const interactionFunction = this.interactions[emojiId];
        const emojiData = this.emojiManager.getEmojiData(emojiId);

        if (interactionFunction && emojiData) {
            // Arrêter temporairement la détection AR pendant l'interaction
            this.isRunning = false;

            // Appeler la fonction d'interaction
            const interactionContainer = document.getElementById('interaction-container');
            interactionContainer.style.display = 'flex';
            interactionContainer.classList.add('fade-in');

            // Créer l'interface de l'interaction
            interactionFunction(interactionContainer, emojiData, () => {
                // Callback lorsque l'interaction est terminée
                interactionContainer.classList.add('fade-out');

                // Délai avant de masquer le conteneur
                setTimeout(() => {
                    interactionContainer.style.display = 'none';
                    interactionContainer.classList.remove('fade-out');
                    interactionContainer.innerHTML = '';

                    // Redémarrer la détection AR
                    this.isRunning = true;
                }, 500);
            });
        }
    }
}