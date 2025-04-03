/**
 * Script principal pour l'application "Chasse aux Emoji Secrets"
 * Gère l'initialisation de l'application et la coordination entre les différents modules
 */

/**
 * Récupère le paramètre emoji de l'URL
 * @returns {string|null} - L'ID de l'emoji ou null si non trouvé
 */
function getEmojiFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('emoji');
}

// Mapping des interactions aux fonctions
const interactions = {
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

/**
 * Ouvre l'application d'appareil photo du téléphone si possible
 * Note: Cette fonction peut ne pas fonctionner sur tous les appareils
 * en raison des restrictions de sécurité des navigateurs
 */
function openCamera() {
    // Pour Android, essayer d'ouvrir l'application appareil photo native
    if (/Android/i.test(navigator.userAgent)) {
        window.location.href = "intent://media/camera/#Intent;scheme=content;package=com.android.camera;end";
        return;
    }

    // Pour iOS, essayer d'ouvrir l'application appareil photo
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        window.location.href = "photos-redirect://";
        return;
    }

    // Fallback: montrer une alerte avec des instructions
    alert("Pour scanner un QR code, veuillez ouvrir l'appareil photo de votre téléphone et pointer vers un QR code.");
}

// Attendre que le DOM soit chargé
document.addEventListener('DOMContentLoaded', () => {
    console.log("Application Chasse aux Emoji Secrets - Initialisation...");

    // Éléments DOM principaux
    const introScreen = document.getElementById('intro-screen');
    const startButton = document.getElementById('start-button');
    const progressBar = document.getElementById('progress-bar');
    const helpButton = document.getElementById('help-button');
    const interactionContainer = document.getElementById('interaction-container');
    const completeScreen = document.getElementById('complete-screen');
    const continueButton = document.getElementById('continue-button');
    const downloadButton = document.getElementById('download-button');
    const shareButton = document.getElementById('share-button');

    // Cache le progressBar au début
    if (progressBar) {
        progressBar.style.display = 'none';
    }

    // Configuration de l'application
    const appConfig = {
        minEmojisRequired: 5, // Nombre minimum d'emojis nécessaires pour débloquer la carte
        emojiData: {
            'informatique': {
                emoji: '💻',
                title: 'Informatique',
                description: 'Concevez et développez des applications et systèmes informatiques innovants.'
            },
            'cybersecurite': {
                emoji: '🔒',
                title: 'Cybersécurité',
                description: 'Protégez les systèmes d\'information contre les menaces et attaques.'
            },
            'gaming': {
                emoji: '🎮',
                title: '3D, Animation & Jeux Vidéo',
                description: 'Créez des univers virtuels, des personnages et des expériences interactives.'
            },
            'architecture': {
                emoji: '🏠',
                title: 'Architecture d\'intérieur',
                description: 'Concevez des espaces fonctionnels, esthétiques et innovants.'
            },
            'audiovisuel': {
                emoji: '🎬',
                title: 'Audiovisuel',
                description: 'Réalisez des productions audiovisuelles professionnelles et créatives.'
            },
            'design': {
                emoji: '🎨',
                title: 'Création & Digital Design',
                description: 'Créez des expériences utilisateur et des interfaces attractives.'
            },
            'ai': {
                emoji: '🤖',
                title: 'Intelligence Artificielle & Data',
                description: 'Exploitez les données et l\'IA pour créer des solutions intelligentes.'
            },
            'marketing': {
                emoji: '📱',
                title: 'Marketing & Communication Digitale',
                description: 'Élaborez des stratégies marketing efficaces dans l\'univers numérique.'
            },
            'business': {
                emoji: '💼',
                title: 'Tech & Business',
                description: 'Combinez compétences techniques et managériales pour piloter des projets innovants.'
            }
        }
    };

    // Initialisation du gestionnaire d'emojis
    const emojiManager = new EmojiManager(appConfig.emojiData);

    // Initialisation du contrôleur AR (conservé pour les interactions)
    const arController = new ARController(emojiManager);

    // Initialisation du générateur de carte
    const cardGenerator = new CardGenerator(emojiManager, appConfig);

    // Ajouter un bouton pour ouvrir l'appareil photo (si c'est possible de l'ajouter à l'UI)
    const openCameraButton = document.getElementById('open-camera-button');
    if (openCameraButton) {
        openCameraButton.addEventListener('click', openCamera);
    }

    // Vérifier si un emoji est spécifié dans l'URL (pour les QR codes)
    const emojiFromUrl = getEmojiFromUrl();
    console.log("Emoji from URL:", emojiFromUrl);

    if (emojiFromUrl && appConfig.emojiData[emojiFromUrl]) {
        console.log("Emoji valide trouvé dans l'URL:", emojiFromUrl);

        // Masquer l'écran d'introduction
        if (introScreen) {
            console.log("Masquage de l'écran d'introduction");
            introScreen.style.display = 'none';
        } else {
            console.error("Élément introScreen non trouvé");
        }

        // Afficher la barre de progression
        if (progressBar) {
            console.log("Affichage de la barre de progression");
            progressBar.style.display = 'flex';
            progressBar.classList.add('fade-in');
        } else {
            console.error("Élément progressBar non trouvé");
        }

        // Marquer l'emoji comme trouvé
        console.log("Marquage de l'emoji comme trouvé");
        emojiManager.markAsFound(emojiFromUrl);

        // Mettre à jour l'interface utilisateur
        console.log("Mise à jour de l'interface utilisateur");
        updateUI();

        // Vérification de la disponibilité de la fonction d'interaction
        console.log("Vérification des interactions disponibles:", Object.keys(interactions));

        // Récupérer la fonction d'interaction
        const interactionFunction = interactions[emojiFromUrl];
        console.log("Fonction d'interaction trouvée pour", emojiFromUrl, ":", !!interactionFunction);

        const emojiData = appConfig.emojiData[emojiFromUrl];
        console.log("Données de l'emoji trouvées:", !!emojiData);

        // Déclencher l'interaction avec un délai plus important
        if (interactionFunction && emojiData && interactionContainer) {
            console.log("Préparation de l'interaction avec délai");

            // Utiliser un délai plus long pour s'assurer que tout est chargé
            setTimeout(() => {
                console.log("Démarrage de l'interaction pour", emojiFromUrl);

                interactionContainer.style.display = 'flex';
                interactionContainer.classList.add('fade-in');

                // Appeler directement la fonction d'interaction
                try {
                    interactionFunction(interactionContainer, emojiData, () => {
                        console.log("Interaction terminée");

                        interactionContainer.classList.add('fade-out');

                        setTimeout(() => {
                            interactionContainer.style.display = 'none';
                            interactionContainer.classList.remove('fade-out');
                            interactionContainer.innerHTML = '';

                            // Vérifier si l'utilisateur a trouvé assez d'emojis
                            checkCompletion();
                        }, 500);
                    });
                } catch (error) {
                    console.error("Erreur lors du lancement de l'interaction:", error);
                }
            }, 1500); // Augmenter le délai à 1500ms pour s'assurer que tout est initialisé
        } else {
            console.error("Impossible de déclencher l'interaction, fonction ou données manquantes");
            if (!interactionContainer) console.error("Élément interactionContainer non trouvé");
        }
    }

    // Événement du bouton d'aide
    if (helpButton) {
        helpButton.addEventListener('click', () => {
            // Afficher une aide rapide
            showHelp();
        });
    }

    // Événement du bouton continuer (après avoir obtenu la carte)
    if (continueButton) {
        continueButton.addEventListener('click', () => {
            // Cacher l'écran de félicitations
            completeScreen.classList.add('fade-out');
            setTimeout(() => {
                completeScreen.style.display = 'none';
            }, 500);
        });
    }

    // Événement du bouton télécharger
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            downloadCard();
        });
    }

    // Événement du bouton partager
    if (shareButton) {
        shareButton.addEventListener('click', () => {
            shareCard();
        });
    }

    // Fonction pour télécharger la carte
    function downloadCard() {
        html2canvas(document.getElementById('digital-card')).then(canvas => {
            const link = document.createElement('a');
            link.download = 'carte-ynov-campus.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    }

    // Fonction pour partager la carte
    function shareCard() {
        html2canvas(document.getElementById('digital-card')).then(canvas => {
            canvas.toBlob(blob => {
                // Si l'API Web Share est disponible
                if (navigator.share) {
                    const file = new File([blob], 'carte-ynov-campus.png', { type: 'image/png' });

                    navigator.share({
                        title: 'Ma carte d\'identité digitale Ynov Campus',
                        text: 'Voici ma carte d\'identité digitale Ynov Campus obtenue lors de la Chasse aux Emoji Secrets!',
                        files: [file]
                    }).catch(error => {
                        console.error('Erreur lors du partage:', error);
                        // Fallback: ouvrir dans un nouvel onglet
                        window.open(canvas.toDataURL('image/png'));
                    });
                } else {
                    // Fallback: ouvrir dans un nouvel onglet
                    window.open(canvas.toDataURL('image/png'));
                }
            });
        });
    }

    // Fonction pour afficher l'aide
    function showHelp() {
        const helpContent = `
            <div class="interaction-card">
                <div class="interaction-emoji">🔍</div>
                <h2 class="interaction-title">Comment jouer?</h2>
                <div class="interaction-description">
                    <p>Explorez l'Atrium à la recherche des 9 QR codes.</p>
                    <p>Utilisez l'appareil photo de votre téléphone pour scanner les QR codes.</p>
                    <p>Chaque QR code vous fait découvrir une filière d'Ynov Campus avec une interaction unique!</p>
                    <p>Trouvez au moins 5 filières pour obtenir votre carte d'identité digitale.</p>
                </div>
                <button class="button" id="scan-qr-button">Scanner un QR Code</button>
                <button class="button" id="close-help">Fermer</button>
            </div>
        `;

        interactionContainer.innerHTML = helpContent;
        interactionContainer.style.display = 'flex';
        interactionContainer.classList.add('fade-in');

        // Bouton pour ouvrir l'appareil photo
        document.getElementById('scan-qr-button').addEventListener('click', () => {
            openCamera();
        });

        document.getElementById('close-help').addEventListener('click', () => {
            interactionContainer.classList.add('fade-out');
            setTimeout(() => {
                interactionContainer.style.display = 'none';
                interactionContainer.classList.remove('fade-out');
                interactionContainer.innerHTML = '';
            }, 500);
        });
    }

    // Écouteur pour la détection d'emoji
    document.addEventListener('emojiFound', (event) => {
        const { emojiId } = event.detail;
        console.log("Événement emojiFound détecté pour:", emojiId);

        // Mettre à jour l'interface utilisateur
        updateUI();

        // Vérifier si l'utilisateur a trouvé assez d'emojis pour la carte
        checkCompletion();
    });

    // Mise à jour de l'interface utilisateur
    function updateUI() {
        console.log("Mise à jour de l'UI - Emojis trouvés:", emojiManager.getFoundCount());

        // Mettre à jour le compteur
        const foundCount = document.getElementById('found-count');
        if (foundCount) {
            foundCount.textContent = emojiManager.getFoundCount();
        }

        // Mettre à jour les icônes d'emoji
        const emojiIcons = document.querySelectorAll('.emoji-icon');
        emojiIcons.forEach(icon => {
            const emojiId = icon.getAttribute('data-emoji');
            if (emojiId && emojiManager.isFound(emojiId)) {
                icon.classList.add('emoji-found');
                console.log("Marquage de l'emoji", emojiId, "comme trouvé dans l'UI");
            }
        });
    }

    // Vérifier si l'utilisateur a trouvé assez d'emojis
    function checkCompletion() {
        console.log("Vérification de la complétion:", emojiManager.getFoundCount(), "/", appConfig.minEmojisRequired);
        console.log("Carte déjà générée:", emojiManager.isCardGenerated());

        if (emojiManager.getFoundCount() >= appConfig.minEmojisRequired && !emojiManager.isCardGenerated()) {
            console.log("Conditions remplies pour générer la carte");

            // Générer la carte
            cardGenerator.generateCard();
            emojiManager.setCardGenerated(true);

            // Afficher l'écran de félicitations
            const digitalCard = document.getElementById('digital-card');
            if (digitalCard) {
                digitalCard.innerHTML = cardGenerator.getCardHTML();
                console.log("Contenu de la carte généré");
            } else {
                console.error("Élément digital-card non trouvé");
            }

            if (completeScreen) {
                completeScreen.style.display = 'flex';
                completeScreen.classList.add('fade-in');
                console.log("Écran de félicitations affiché");
            } else {
                console.error("Élément complete-screen non trouvé");
            }
        }
    }

    // Vérifier que toutes les interactions sont disponibles
    console.log("Vérification des interactions disponibles:");
    Object.keys(interactions).forEach(key => {
        console.log(`- ${key}: ${typeof interactions[key] === 'function' ? 'OK' : 'MANQUANT'}`);
    });

    // Exposer quelques fonctions/objets pour le debug
    window.app = {
        emojiManager,
        arController,
        cardGenerator,
        showHelp,
        openCamera
    };
});