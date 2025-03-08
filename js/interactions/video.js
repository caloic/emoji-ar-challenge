/**
 * Interaction pour l'emoji Audiovisuel (🎬)
 * Transforme le visiteur en réalisateur avec des effets spéciaux cinématographiques
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function videoInteraction(container, emojiData, onComplete) {
    // Effets cinématographiques disponibles
    const filmEffects = [
        {
            name: "Film Noir",
            filter: "grayscale(100%) contrast(120%) brightness(90%)",
            border: "20px solid black",
            description: "Un style classique en noir et blanc avec contraste prononcé, popularisé dans les films policiers des années 40."
        },
        {
            name: "Western",
            filter: "sepia(80%) contrast(110%) brightness(110%)",
            border: "20px solid #a57e4a",
            description: "Teintes sépia évoquant les paysages désertiques et l'ambiance des films de cowboys."
        },
        {
            name: "Science-Fiction",
            filter: "hue-rotate(180deg) saturate(130%) brightness(110%)",
            border: "20px solid #0a84ff",
            description: "Teintes bleues futuristes avec effet colorisé, typiques des univers de science-fiction."
        },
        {
            name: "Horreur",
            filter: "contrast(130%) brightness(60%) saturate(80%)",
            border: "20px solid #2e0000",
            description: "Ambiance sombre et inquiétante, parfaite pour créer une atmosphère de suspense."
        },
        {
            name: "Animation",
            filter: "saturate(150%) contrast(120%) brightness(120%)",
            border: "20px solid #ff9500",
            description: "Couleurs vives et contrastées rappelant l'univers des films d'animation."
        }
    ];

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card video-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Devenez réalisateur et ajoutez des effets cinématographiques à votre caméra!</p>
            </div>
            
            <div class="video-container">
                <div class="film-frame" id="film-frame">
                    <video id="camera-feed" autoplay playsinline></video>
                    <div class="film-overlay" id="film-overlay">
                        <div class="scene-info" id="scene-info">
                            <div class="scene-title">SCÈNE 1</div>
                            <div class="scene-action">ACTION!</div>
                        </div>
                    </div>
                </div>
                
                <div class="permission-message" id="permission-message">
                    <p>Pour vivre l'expérience complète, veuillez autoriser l'accès à la caméra.</p>
                    <button class="button" id="request-camera">Autoriser la caméra</button>
                </div>
                
                <div class="film-effects">
                    <div class="effects-title">Choisissez un genre cinématographique:</div>
                    <div class="effects-buttons" id="effects-buttons">
                        <!-- Boutons générés dynamiquement -->
                    </div>
                </div>
                
                <div class="effect-info" id="effect-info">
                    <div class="effect-name" id="effect-name">Choisissez un effet</div>
                    <div class="effect-description" id="effect-description">Cliquez sur un des genres pour transformer votre vidéo.</div>
                </div>
                
                <div class="director-controls">
                    <button class="control-button" id="action-button">ACTION!</button>
                    <button class="control-button" id="cut-button">COUPEZ!</button>
                </div>
            </div>
            
            <div class="interaction-buttons">
                <button class="button" id="continue-button">Continuer</button>
            </div>
        </div>
    `;

    // Insérer le contenu dans le conteneur
    container.innerHTML = content;

    // Appliquer des styles spécifiques à cette interaction
    const style = document.createElement('style');
    style.textContent = `
        .video-card {
            background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%);
            color: white;
        }
        
        .video-container {
            background-color: #222;
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .film-frame {
            position: relative;
            width: 100%;
            height: 200px;
            margin-bottom: 15px;
            border: 20px solid black;
            box-sizing: content-box;
            overflow: hidden;
            background-color: #000;
        }
        
        #camera-feed {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .film-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 10px;
            box-sizing: border-box;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .scene-info {
            background-color: rgba(0, 0, 0, 0.7);
            padding: 10px;
            border-radius: 5px;
            text-align: center;
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.5s;
        }
        
        .scene-title {
            font-weight: bold;
            margin-bottom: 5px;
        }
        
        .scene-action {
            color: #ff4040;
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .permission-message {
            background-color: rgba(0, 0, 0, 0.8);
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 20px;
            border-radius: 5px;
        }
        
        .film-effects {
            margin: 15px 0;
        }
        
        .effects-title {
            font-weight: 600;
            margin-bottom: 10px;
            color: #ddd;
        }
        
        .effects-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
        }
        
        .effect-button {
            padding: 8px 12px;
            border: none;
            border-radius: 20px;
            background-color: #444;
            color: #fff;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
        }
        
        .effect-button:hover {
            background-color: #555;
            transform: translateY(-2px);
        }
        
        .effect-button.active {
            background-color: #ff4040;
            color: white;
            font-weight: 600;
        }
        
        .effect-info {
            background-color: #333;
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 15px;
            color: #ddd;
        }
        
        .effect-name {
            font-weight: 600;
            margin-bottom: 5px;
        }
        
        .effect-description {
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .director-controls {
            display: flex;
            justify-content: center;
            gap: 15px;
        }
        
        .control-button {
            background-color: #ff4040;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .control-button:hover {
            background-color: #ff6060;
            transform: translateY(-2px);
        }
        
        #action-button {
            background-color: #4caf50;
        }
        
        #action-button:hover {
            background-color: #5dbd61;
        }
        
        #cut-button {
            background-color: #f44336;
        }
        
        #cut-button:hover {
            background-color: #f55a4e;
        }
        
        #continue-button {
            background-color: #fdbb2d;
            color: #333;
        }
    `;

    document.head.appendChild(style);

    // Éléments interactifs
    const filmFrame = document.getElementById('film-frame');
    const cameraFeed = document.getElementById('camera-feed');
    const filmOverlay = document.getElementById('film-overlay');
    const sceneInfo = document.getElementById('scene-info');
    const permissionMessage = document.getElementById('permission-message');
    const requestCameraButton = document.getElementById('request-camera');
    const effectsButtons = document.getElementById('effects-buttons');
    const effectName = document.getElementById('effect-name');
    const effectDescription = document.getElementById('effect-description');
    const actionButton = document.getElementById('action-button');
    const cutButton = document.getElementById('cut-button');
    const continueButton = document.getElementById('continue-button');

    // Variables d'état
    let cameraStream = null;
    let currentScene = 1;
    let isActionActive = false;

    // Créer les boutons d'effets
    filmEffects.forEach((effect, index) => {
        const button = document.createElement('button');
        button.className = 'effect-button';
        button.textContent = effect.name;
        button.dataset.index = index;

        button.addEventListener('click', () => {
            // Mettre à jour la classe active
            document.querySelectorAll('.effect-button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Appliquer l'effet au flux vidéo
            cameraFeed.style.filter = effect.filter;
            filmFrame.style.border = effect.border;

            // Mettre à jour l'affichage des informations
            effectName.textContent = effect.name;
            effectDescription.textContent = effect.description;
        });

        effectsButtons.appendChild(button);
    });

    // Fonction pour démarrer la caméra
    function startCamera() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    cameraStream = stream;
                    cameraFeed.srcObject = stream;
                    permissionMessage.style.display = 'none';

                    // Appliquer l'effet par défaut
                    const defaultEffect = filmEffects[0];
                    cameraFeed.style.filter = defaultEffect.filter;
                    filmFrame.style.border = defaultEffect.border;

                    // Activer le premier bouton
                    document.querySelector('.effect-button').classList.add('active');
                    effectName.textContent = defaultEffect.name;
                    effectDescription.textContent = defaultEffect.description;
                })
                .catch(error => {
                    console.error('Erreur d\'accès à la caméra:', error);
                    permissionMessage.innerHTML = `
                        <p>Impossible d'accéder à la caméra. Erreur: ${error.message}</p>
                        <p>Vous pouvez quand même explorer les effets visuels sans caméra.</p>
                    `;
                });
        } else {
            permissionMessage.innerHTML = `
                <p>Votre navigateur ne prend pas en charge l'accès à la caméra.</p>
                <p>Vous pouvez quand même explorer les effets visuels sans caméra.</p>
            `;
        }
    }

    // Événement pour le bouton de demande d'accès à la caméra
    requestCameraButton.addEventListener('click', startCamera);

    // Événement pour le bouton ACTION
    actionButton.addEventListener('click', () => {
        if (isActionActive) return;

        isActionActive = true;

        // Afficher l'overlay
        filmOverlay.style.opacity = '1';
        sceneInfo.style.transform = 'translateY(0)';
        sceneInfo.style.opacity = '1';

        // Mettre à jour le numéro de scène
        sceneInfo.querySelector('.scene-title').textContent = `SCÈNE ${currentScene}`;

        // Cacher automatiquement après 3 secondes
        setTimeout(() => {
            sceneInfo.style.transform = 'translateY(20px)';
            sceneInfo.style.opacity = '0';

            setTimeout(() => {
                filmOverlay.style.opacity = '0';
                isActionActive = false;
            }, 500);
        }, 3000);

        // Incrémenter le numéro de scène pour la prochaine utilisation
        currentScene++;
    });

    // Événement pour le bouton COUPEZ
    cutButton.addEventListener('click', () => {
        if (!isActionActive) return;

        // Arrêter immédiatement l'animation
        sceneInfo.style.transform = 'translateY(20px)';
        sceneInfo.style.opacity = '0';

        setTimeout(() => {
            filmOverlay.style.opacity = '0';
            isActionActive = false;
        }, 500);
    });

    // Événement pour le bouton continuer
    continueButton.addEventListener('click', () => {
        // Arrêter le flux de la caméra si actif
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }

        // Appeler le callback pour terminer l'interaction
        onComplete();
    });

    // Essayer de démarrer automatiquement la caméra si déjà autorisée
    startCamera();
}