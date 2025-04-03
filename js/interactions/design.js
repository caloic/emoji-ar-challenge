/**
 * Interaction pour l'emoji Création & Digital Design (🎨)
 * Permet de créer un poster digital en combinant des formes, couleurs et textes
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function designInteraction(container, emojiData, onComplete) {
    // Masquer les boutons d'action en bas
    const actionButtons = document.getElementById('action-buttons');
    if (actionButtons) {
        actionButtons.style.display = 'none';
    }

    // Modèles de posters disponibles
    const posterTemplates = [
        {
            name: "Minimaliste",
            background: "#ffffff",
            color: "#000000",
            accent: "#ff3366"
        },
        {
            name: "Rétro",
            background: "#f5e9be",
            color: "#2d4059",
            accent: "#ea5455"
        },
        {
            name: "Tech",
            background: "#1e1e2e",
            color: "#ffffff",
            accent: "#00d9ff"
        },
        {
            name: "Nature",
            background: "#e0f2e9",
            color: "#335c67",
            accent: "#66c29a"
        }
    ];

    // Éléments de design disponibles
    const designElements = [
        {
            type: "shape",
            name: "Cercle",
            draw: (ctx, x, y, size, color) => {
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            }
        },
        {
            type: "shape",
            name: "Carré",
            draw: (ctx, x, y, size, color) => {
                ctx.fillStyle = color;
                ctx.fillRect(x - size, y - size, size * 2, size * 2);
            }
        },
        {
            type: "shape",
            name: "Triangle",
            draw: (ctx, x, y, size, color) => {
                ctx.beginPath();
                ctx.moveTo(x, y - size);
                ctx.lineTo(x + size, y + size);
                ctx.lineTo(x - size, y + size);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
            }
        },
        {
            type: "shape",
            name: "Étoile",
            draw: (ctx, x, y, size, color) => {
                const spikes = 5;
                const outerRadius = size;
                const innerRadius = size / 2;

                ctx.beginPath();
                let rot = Math.PI / 2 * 3;
                let step = Math.PI / spikes;

                ctx.moveTo(x, y - outerRadius);
                for (let i = 0; i < spikes; i++) {
                    ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
                    rot += step;
                    ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
                    rot += step;
                }
                ctx.lineTo(x, y - outerRadius);
                ctx.closePath();
                ctx.fillStyle = color;
                ctx.fill();
            }
        },
        {
            type: "emoji",
            name: "👍",
            value: "👍"
        },
        {
            type: "emoji",
            name: "❤️",
            value: "❤️"
        },
        {
            type: "emoji",
            name: "🚀",
            value: "🚀"
        },
        {
            type: "emoji",
            name: "✨",
            value: "✨"
        }
    ];

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card design-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Créez votre poster digital avec des formes, couleurs et textes!</p>
            </div>
            
            <div class="poster-creator">
                <div class="poster-preview-container">
                    <canvas id="poster-canvas" width="300" height="400"></canvas>
                </div>
                
                <div class="design-controls">
                    <div class="control-section">
                        <h3 class="section-title">Style</h3>
                        <div class="template-selector" id="template-selector">
                            <!-- Boutons générés dynamiquement -->
                        </div>
                    </div>
                    
                    <div class="control-section">
                        <h3 class="section-title">Éléments</h3>
                        <div class="elements-grid" id="elements-grid">
                            <!-- Éléments générés dynamiquement -->
                        </div>
                    </div>
                    
                    <div class="control-section">
                        <h3 class="section-title">Texte</h3>
                        <div class="text-editor">
                            <input type="text" id="poster-text" class="poster-text-input" placeholder="Ajouter un texte..." maxlength="20">
                            <div class="font-size-control">
                                <button id="font-smaller" class="size-button">-</button>
                                <span id="font-size-label">24px</span>
                                <button id="font-larger" class="size-button">+</button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="poster-actions">
                        <button id="reset-button" class="action-button reset-button">Réinitialiser</button>
                        <button id="download-button" class="action-button download-button">Télécharger</button>
                    </div>
                </div>
            </div>
            
            <div class="interaction-button-container">
                <button class="button continue-btn" id="continue-button">Continuer</button>
            </div>
        </div>
    `;

    // Insérer le contenu dans le conteneur
    container.innerHTML = content;

    // Appliquer des styles spécifiques à cette interaction
    const style = document.createElement('style');
    style.textContent = `
        .design-card {
            background: linear-gradient(135deg, #654ea3 0%, #eaafc8 100%);
            color: white;
            padding: 20px;
            padding-bottom: 100px; /* Espace pour les boutons */
            min-height: 100vh; /* Assurer que la carte remplit toute la hauteur */
            position: relative; /* Pour le positionnement absolu des boutons */
            box-sizing: border-box;
        }
        
        .poster-creator {
            background-color: white;
            border-radius: 15px;
            padding: 15px;
            margin: 20px 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            color: #333;
        }
        
        .poster-preview-container {
            background-color: #f8f8f8;
            border-radius: 10px;
            padding: 15px;
            display: flex;
            justify-content: center;
            margin-bottom: 15px;
        }
        
        #poster-canvas {
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
            border-radius: 5px;
            max-width: 100%;
            height: auto;
            cursor: pointer;
            touch-action: manipulation;
        }
        
        .design-controls {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .control-section {
            background-color: #f8f8f8;
            border-radius: 10px;
            padding: 12px;
            margin-bottom: 10px;
        }
        
        .section-title {
            font-size: 1rem;
            font-weight: 600;
            margin-bottom: 10px;
            color: #654ea3;
        }
        
        .template-selector {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            justify-content: center;
        }
        
        .template-button {
            padding: 8px 12px;
            border: 2px solid #eee;
            border-radius: 20px;
            background-color: white;
            color: #333;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            min-height: 44px;
            min-width: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .template-button:hover {
            transform: translateY(-2px);
            border-color: #654ea3;
        }
        
        .template-button.active {
            background-color: #654ea3;
            color: white;
            border-color: #654ea3;
        }
        
        .elements-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            justify-content: center;
        }
        
        .element-button {
            width: 50px;
            height: 50px;
            border-radius: 8px;
            border: 1px solid #ddd;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 1.2rem;
        }
        
        .element-button:hover {
            transform: scale(1.1);
            border-color: #654ea3;
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
        }
        
        .element-button.emoji {
            font-size: 1.8rem;
        }
        
        .text-editor {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .poster-text-input {
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            min-height: 44px;
        }
        
        .poster-text-input:focus {
            outline: none;
            border-color: #654ea3;
        }
        
        .font-size-control {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
        }
        
        .size-button {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            border: 1px solid #ddd;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 1.2rem;
            min-height: 44px;
            min-width: 44px;
        }
        
        .size-button:hover {
            background-color: #f0f0f0;
        }
        
        #font-size-label {
            width: 50px;
            text-align: center;
            font-weight: 600;
        }
        
        .poster-actions {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            margin-top: 15px;
        }
        
        .action-button {
            padding: 12px 15px;
            border: none;
            border-radius: 20px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            min-height: 44px;
            flex: 1;
        }
        
        .reset-button {
            background-color: #f1f1f1;
            color: #666;
        }
        
        .reset-button:hover {
            background-color: #e0e0e0;
        }
        
        .download-button {
            background-color: #654ea3;
            color: white;
        }
        
        .download-button:hover {
            background-color: #563d99;
            transform: translateY(-2px);
        }
        
        .interaction-button-container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(101, 78, 163, 0.95);
            padding: 20px;
            display: flex;
            justify-content: center;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
            z-index: 100;
        }
        
        .continue-btn {
            background-color: #eaafc8 !important;
            color: #333;
            font-weight: bold;
            padding: 12px 30px;
            font-size: 1.1rem;
            border-radius: 30px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            animation: pulse 2s infinite;
            width: 80%;
            max-width: 300px;
            min-height: 50px;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
            100% {
                transform: scale(1);
            }
        }

        /* Améliorations pour mobile */
        @media (max-width: 480px) {
            .elements-grid {
                grid-template-columns: repeat(4, 1fr);
                gap: 8px;
            }
            
            .element-button {
                width: 100%;
                height: 60px;
            }
            
            .template-button {
                flex: 1;
                min-width: auto;
            }
            
            .poster-actions {
                flex-direction: column;
            }
            
            .action-button {
                width: 100%;
            }
            
            .interaction-button-container {
                padding: 15px;
            }
            
            .continue-btn {
                width: 100%;
                min-height: 50px;
            }
        }
    `;

    document.head.appendChild(style);

    // Éléments interactifs
    const canvas = document.getElementById('poster-canvas');
    const ctx = canvas.getContext('2d');
    const templateSelector = document.getElementById('template-selector');
    const elementsGrid = document.getElementById('elements-grid');
    const posterText = document.getElementById('poster-text');
    const fontSmallerBtn = document.getElementById('font-smaller');
    const fontLargerBtn = document.getElementById('font-larger');
    const fontSizeLabel = document.getElementById('font-size-label');
    const resetButton = document.getElementById('reset-button');
    const downloadButton = document.getElementById('download-button');
    const continueButton = document.getElementById('continue-button');

    // Variables d'état
    let currentTemplate = posterTemplates[0];
    let fontSize = 24;
    let placedElements = [];
    const canvasRatio = canvas.height / canvas.width;

    // Ajuster la taille du canvas et le rapport hauteur/largeur
    function resizeCanvas() {
        const containerWidth = canvas.parentElement.clientWidth;
        const maxWidth = Math.min(300, containerWidth - 30);

        canvas.style.width = maxWidth + 'px';
        canvas.style.height = (maxWidth * canvasRatio) + 'px';
    }

    // Créer les boutons de templates
    posterTemplates.forEach((template, index) => {
        const button = document.createElement('button');
        button.className = 'template-button' + (index === 0 ? ' active' : '');
        button.textContent = template.name;
        button.dataset.index = index;

        button.addEventListener('click', () => {
            // Mettre à jour la classe active
            document.querySelectorAll('.template-button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Mettre à jour le template actif
            currentTemplate = template;

            // Redessiner le poster
            drawPoster();
        });

        templateSelector.appendChild(button);
    });

    // Créer les boutons d'éléments
    designElements.forEach((element, index) => {
        const button = document.createElement('button');
        button.className = `element-button ${element.type === 'emoji' ? 'emoji' : ''}`;

        if (element.type === 'emoji') {
            button.textContent = element.value;
        } else {
            // Créer un mini-canvas pour afficher la forme
            const miniCanvas = document.createElement('canvas');
            miniCanvas.width = 30;
            miniCanvas.height = 30;
            const miniCtx = miniCanvas.getContext('2d');

            element.draw(miniCtx, 15, 15, 10, '#654ea3');

            button.appendChild(miniCanvas);
        }

        button.dataset.index = index;

        button.addEventListener('click', () => {
            const selectedElement = designElements[index];

            // Ajouter l'élément au centre du canvas
            const elemX = canvas.width / 2;
            const elemY = canvas.height / 2;
            const elemSize = element.type === 'emoji' ? fontSize : 30;

            placedElements.push({
                type: selectedElement.type,
                x: elemX,
                y: elemY,
                size: elemSize,
                color: currentTemplate.accent,
                value: selectedElement.type === 'emoji' ? selectedElement.value : null,
                draw: selectedElement.draw
            });

            // Redessiner le poster
            drawPoster();
        });

        elementsGrid.appendChild(button);
    });

    // Initialiser la taille de la police
    updateFontSize(fontSize);

    // Fonction pour mettre à jour la taille de la police
    function updateFontSize(size) {
        fontSize = size;
        fontSizeLabel.textContent = `${fontSize}px`;

        // Redessiner le poster pour refléter la nouvelle taille de police
        drawPoster();
    }

    // Événements pour les boutons de taille de police
    fontSmallerBtn.addEventListener('click', () => {
        if (fontSize > 12) {
            updateFontSize(fontSize - 2);
        }
    });

    fontLargerBtn.addEventListener('click', () => {
        if (fontSize < 48) {
            updateFontSize(fontSize + 2);
        }
    });

    // Événement pour le champ de texte
    posterText.addEventListener('input', () => {
        drawPoster();
    });

    // Événement pour le bouton de réinitialisation
    resetButton.addEventListener('click', () => {
        placedElements = [];
        posterText.value = '';
        drawPoster();
    });

    // Événement pour le bouton de téléchargement
    downloadButton.addEventListener('click', () => {
        // Créer un lien temporaire pour télécharger l'image
        const link = document.createElement('a');
        link.download = 'mon-poster-ynov.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    });

    // Événement pour le canvas (ajouter des éléments en cliquant)
    canvas.addEventListener('click', (e) => {
        // Obtenir les coordonnées du clic dans le canvas
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (e.clientX - rect.left) * scaleX;
        const y = (e.clientY - rect.top) * scaleY;

        // Vérifier si un élément est sélectionné dans la grille
        const activeElementBtn = document.querySelector('.element-button.active');
        if (activeElementBtn) {
            const index = parseInt(activeElementBtn.dataset.index);
            const selectedElement = designElements[index];

            // Ajouter l'élément à l'emplacement du clic
            const elemSize = selectedElement.type === 'emoji' ? fontSize : 30;

            placedElements.push({
                type: selectedElement.type,
                x: x,
                y: y,
                size: elemSize,
                color: currentTemplate.accent,
                value: selectedElement.type === 'emoji' ? selectedElement.value : null,
                draw: selectedElement.draw
            });

            // Redessiner le poster
            drawPoster();

            // Désélectionner l'élément
            activeElementBtn.classList.remove('active');
        }
    });

    // Support tactile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (touch.clientX - rect.left) * scaleX;
        const y = (touch.clientY - rect.top) * scaleY;

        // Vérifier si un élément est sélectionné dans la grille
        const activeElementBtn = document.querySelector('.element-button.active');
        if (activeElementBtn) {
            const index = parseInt(activeElementBtn.dataset.index);
            const selectedElement = designElements[index];

            // Ajouter l'élément à l'emplacement du toucher
            const elemSize = selectedElement.type === 'emoji' ? fontSize : 30;

            placedElements.push({
                type: selectedElement.type,
                x: x,
                y: y,
                size: elemSize,
                color: currentTemplate.accent,
                value: selectedElement.type === 'emoji' ? selectedElement.value : null,
                draw: selectedElement.draw
            });

            // Redessiner le poster
            drawPoster();

            // Désélectionner l'élément
            activeElementBtn.classList.remove('active');
        }
    });

    // Événement pour cliquer sur un élément (le sélectionner)
    elementsGrid.addEventListener('click', (e) => {
        const button = e.target.closest('.element-button');
        if (button) {
            // Désélectionner tous les boutons
            document.querySelectorAll('.element-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Sélectionner le bouton cliqué
            button.classList.add('active');
        }
    });

    // Événement pour le bouton continuer
    continueButton.addEventListener('click', () => {
        // Réafficher les boutons d'action en bas
        if (actionButtons) {
            actionButtons.style.display = 'flex';
        }

        // Appeler le callback pour terminer l'interaction
        onComplete();
    });

    // Fonction pour dessiner le poster
    function drawPoster() {
        // Effacer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dessiner le fond
        ctx.fillStyle = currentTemplate.background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner une bordure
        ctx.strokeStyle = currentTemplate.accent;
        ctx.lineWidth = 10;
        ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

        // Dessiner les éléments placés
        placedElements.forEach(element => {
            if (element.type === 'shape') {
                element.draw(ctx, element.x, element.y, element.size, element.color);
            } else if (element.type === 'emoji') {
                ctx.font = `${element.size}px Arial`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(element.value, element.x, element.y);
            }
        });

        // Dessiner le texte
        const text = posterText.value;
        if (text) {
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = currentTemplate.color;

            // Ajouter un léger contour pour améliorer la lisibilité
            ctx.strokeStyle = currentTemplate.background === '#ffffff' ? '#ffffff' : '#000000';
            ctx.lineWidth = 1;

            // Placer le texte en bas du poster
            ctx.fillText(text, canvas.width / 2, canvas.height - 50);
        }
    }

    // Initialiser le canvas
    resizeCanvas();
    drawPoster();

    // Ajuster le canvas en cas de redimensionnement
    window.addEventListener('resize', () => {
        resizeCanvas();
        drawPoster();
    });
}