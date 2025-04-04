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
 * Affiche un message explicatif pour scanner un QR code
 * Version simplifiée qui affiche seulement des instructions
 */
function openCamera() {
    // Message explicatif simple pour tous les appareils
    alert("Pour scanner un QR code :\n\n1. Quittez cette application\n2. Ouvrez l'appareil photo de votre téléphone\n3. Pointez vers un QR code\n4. Appuyez sur la notification qui apparaît\n5. Revenez à cette application pour voir votre progression");
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
    const viewCardButton = document.getElementById('view-card-button');
    const viewCardButtonContainer = document.getElementById('view-card-button-container');

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

    // Événement pour le bouton "Voir ma carte"
    if (viewCardButton) {
        viewCardButton.addEventListener('click', function(e) {
            e.preventDefault(); // Empêcher le comportement par défaut
            displayCardScreen();
        });
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
                completeScreen.classList.remove('fade-out');
            }, 500);
        });
    }

    // Événement du bouton télécharger
    if (downloadButton) {
        downloadButton.addEventListener('click', (e) => {
            e.preventDefault(); // Empêcher le comportement par défaut
            downloadCard();
        });
    }

    // Événement du bouton partager
    if (shareButton) {
        shareButton.addEventListener('click', (e) => {
            e.preventDefault(); // Empêcher le comportement par défaut
            shareCard();
        });
    }

    // Fonction pour afficher l'écran de la carte d'identité
    function displayCardScreen() {
        // Générer ou régénérer la carte d'identité
        cardGenerator.generateCard();

        // Mettre à jour le message de complétion
        updateCompletionMessage();

        // Mettre à jour le contenu de la carte
        const digitalCard = document.getElementById('digital-card');
        if (digitalCard) {
            digitalCard.innerHTML = cardGenerator.getCardHTML();
        }

        // Afficher l'écran de la carte
        if (completeScreen) {
            completeScreen.style.display = 'flex';
            completeScreen.classList.add('fade-in');
        }
    }

    // Fonction pour mettre à jour le message de complétion
    function updateCompletionMessage() {
        const completionMessage = document.getElementById('completion-message');
        if (!completionMessage) return;

        const foundCount = emojiManager.getFoundCount();
        const totalCount = Object.keys(appConfig.emojiData).length;

        if (foundCount === totalCount) {
            completionMessage.textContent = `Félicitations! Vous avez découvert tous les ${totalCount} emojis secrets!`;
        } else {
            completionMessage.textContent = `Vous avez découvert ${foundCount} emojis sur ${totalCount}.`;
        }
    }

    // Fonction pour télécharger la carte
    function downloadCard() {
        const digitalCard = document.getElementById('digital-card');
        if (!digitalCard) return;

        html2canvas(digitalCard).then(canvas => {
            // Créer un lien de téléchargement temporaire
            const link = document.createElement('a');
            link.download = 'carte-ynov-campus.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(err => {
            console.error("Erreur lors de la génération de l'image:", err);
            alert("Une erreur s'est produite lors de la génération de l'image.");
        });
    }

    // Fonction pour partager la carte
    function shareCard() {
        const digitalCard = document.getElementById('digital-card');
        if (!digitalCard) return;

        html2canvas(digitalCard).then(canvas => {
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
        }).catch(err => {
            console.error("Erreur lors de la génération de l'image:", err);
            alert("Une erreur s'est produite lors de la génération de l'image.");
        });
    }

    // Fonction pour afficher l'aide - VERSION AMÉLIORÉE
    function showHelp() {
        const helpContent = `
            <div class="interaction-card">
                <div class="interaction-emoji">🔍</div>
                <h2 class="interaction-title">Comment jouer?</h2>
                <div class="interaction-description">
                    <div class="help-steps">
                        <ol>
                            <li>Parcourez l'Atrium pour trouver les 9 QR codes cachés</li>
                            <li>Ouvrez l'appareil photo de votre téléphone</li>
                            <li>Pointez-le vers un QR code et cliquez sur la notification</li>
                            <li>Découvrez une filière Ynov et collectez son emoji</li>
                            <li>Trouvez au moins 5 emojis pour obtenir votre carte d'identité digitale</li>
                        </ol>
                    </div>
                    
                    <div class="qr-instructions">
                        <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNmU4ZWZiIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHJlY3QgeD0iNSIgeT0iNSIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE5IiByeD0iMiIgcnk9IjIiPjwvcmVjdD48cGF0aCBkPSJNMTIgM3YyIj48L3BhdGg+PHBhdGggZD0iTTkgMjFoNiI+PC9wYXRoPjwvc3ZnPg==" class="qr-phone-img" alt="Phone icon">
                        <div class="qr-steps">
                            <p>Sur iPhone : ouvrez directement l'appareil photo</p>
                            <p>Sur Android : utilisez l'appareil photo ou un lecteur QR code</p>
                        </div>
                    </div>
                </div>
                <div class="help-buttons">
                    <button class="button" id="scan-qr-button">Scanner un QR Code</button>
                    <button class="button" id="close-help">Fermer</button>
                </div>
            </div>
        `;

        interactionContainer.innerHTML = helpContent;
        interactionContainer.style.display = 'flex';
        interactionContainer.classList.add('fade-in');

        // Ajouter des styles spécifiques pour cette interaction
        const style = document.createElement('style');
        style.textContent = `
            .interaction-card {
                max-width: 500px;
                width: 95%;
                margin: 0 auto;
                max-height: 90vh;
                overflow-y: auto;
                padding: 20px;
                border-radius: 15px;
            }
            
            .interaction-title {
                font-size: 1.3rem;
                margin-bottom: 15px;
            }
            
            .interaction-description {
                margin-bottom: 20px;
            }
            
            .help-steps ol {
                padding-left: 20px;
            }
            
            .help-steps li {
                margin-bottom: 8px;
                text-align: left;
            }
            
            .qr-instructions {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin: 15px 0;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 10px;
            }
            
            .qr-phone-img {
                width: 80px;
                height: auto;
                margin-bottom: 10px;
            }
            
            .qr-steps {
                font-size: 0.9rem;
                line-height: 1.4;
            }
            
            .qr-steps p {
                margin-bottom: 5px;
            }
            
            .help-buttons {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 10px;
            }
            
            .help-buttons .button {
                min-width: 120px;
                min-height: 44px; /* Taille minimale pour cibles tactiles */
                font-size: 0.95rem;
            }
            
            @media (max-width: 480px) {
                .interaction-card {
                    padding: 15px;
                }
                
                .interaction-title {
                    font-size: 1.2rem;
                }
                
                .help-steps li {
                    font-size: 0.9rem;
                    margin-bottom: 6px;
                }
                
                .qr-phone-img {
                    width: 70px;
                }
                
                .qr-steps {
                    font-size: 0.85rem;
                }
            }
        `;

        document.head.appendChild(style);

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
                // Supprimer le style spécifique
                document.head.removeChild(style);
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
        const emojiItems = document.querySelectorAll('.emoji-item[data-emoji]');
        emojiItems.forEach(item => {
            const emojiId = item.getAttribute('data-emoji');
            if (emojiId && emojiManager.isFound(emojiId)) {
                item.classList.add('found');
            } else {
                item.classList.remove('found');
            }
        });

        // Afficher le bouton "Voir ma carte" si l'utilisateur a trouvé au moins 5 emojis
        if (viewCardButtonContainer) {
            if (emojiManager.getFoundCount() >= appConfig.minEmojisRequired) {
                viewCardButtonContainer.style.display = 'block';
            } else {
                viewCardButtonContainer.style.display = 'none';
            }
        }
    }

    // Vérifier si l'utilisateur a trouvé assez d'emojis
    function checkCompletion() {
        console.log("Vérification de la complétion:", emojiManager.getFoundCount(), "/", appConfig.minEmojisRequired);
        console.log("Carte déjà générée:", emojiManager.isCardGenerated());

        if (emojiManager.getFoundCount() >= appConfig.minEmojisRequired && !emojiManager.isCardGenerated()) {
            console.log("Conditions remplies pour générer la carte");

            // Marquer comme générée
            emojiManager.setCardGenerated(true);

            // Afficher le bouton "Voir ma carte"
            if (viewCardButtonContainer) {
                viewCardButtonContainer.style.display = 'block';
            }

            // Afficher l'écran de félicitations
            displayCardScreen();
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
        openCamera,
        displayCardScreen
    };
});