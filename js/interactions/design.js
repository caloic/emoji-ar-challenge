/**
 * Interaction pour l'emoji Création & Digital Design (🎨)
 * Offre une toile virtuelle pour créer une œuvre digitale en quelques secondes
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function designInteraction(container, emojiData, onComplete) {
    // Outils de dessin disponibles
    const drawingTools = [
        {
            name: "Pinceau",
            icon: "🖌️",
            size: 10,
            type: "brush"
        },
        {
            name: "Stylo",
            icon: "✒️",
            size: 3,
            type: "pen"
        },
        {
            name: "Spray",
            icon: "💨",
            size: 20,
            type: "spray"
        },
        {
            name: "Formes",
            icon: "⭐",
            size: 30,
            type: "shapes"
        },
        {
            name: "Gomme",
            icon: "🧽",
            size: 15,
            type: "eraser"
        }
    ];

    // Palettes de couleurs disponibles
    const colorPalettes = [
        {
            name: "Primaire",
            colors: ["#ff0000", "#0000ff", "#ffff00", "#000000", "#ffffff"]
        },
        {
            name: "Pastel",
            colors: ["#ffb6c1", "#add8e6", "#fffacd", "#98fb98", "#e6e6fa"]
        },
        {
            name: "Néon",
            colors: ["#ff00ff", "#00ffff", "#39ff14", "#ff3131", "#fcf340"]
        },
        {
            name: "Terre",
            colors: ["#8b4513", "#cd853f", "#d2b48c", "#556b2f", "#006400"]
        }
    ];

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card design-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Exprimez votre créativité sur cette toile virtuelle!</p>
            </div>
            
            <div class="canvas-container">
                <canvas id="drawing-canvas" width="300" height="300"></canvas>
                
                <div class="drawing-tools">
                    <div class="tools-section">
                        <div class="section-title">Outils</div>
                        <div class="tools-buttons" id="tools-buttons">
                            <!-- Boutons générés dynamiquement -->
                        </div>
                    </div>
                    
                    <div class="tools-section">
                        <div class="section-title">Couleurs</div>
                        <div class="palette-container" id="palette-container">
                            <!-- Palettes générées dynamiquement -->
                        </div>
                    </div>
                </div>
                
                <div class="canvas-actions">
                    <button class="action-button" id="clear-button">Effacer tout</button>
                    <button class="action-button" id="download-button">Télécharger</button>
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
        .canvas-container {
            background-color: white;
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            color: #333;
        }
        
        #drawing-canvas {
            width: 100%;
            height: 300px;
            background-color: white;
            border-radius: 5px;
            border: 1px solid #ddd;
            margin-bottom: 15px;
            touch-action: none;
            cursor: crosshair;
        }
        
        .drawing-tools {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .tools-section {
            background-color: #f5f5f5;
            border-radius: 8px;
            padding: 10px;
        }
        
        .section-title {
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
            font-size: 0.9rem;
        }
        
        .tools-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .tool-button {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid #ddd;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            font-size: 1.2rem;
            transition: all 0.2s;
        }
        
        .tool-button:hover {
            transform: scale(1.1);
            border-color: #bbb;
        }
        
        .tool-button.active {
            border-color: #654ea3;
            background-color: #f0ebfa;
        }
        
        .palette-container {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .color-palette {
            display: flex;
            gap: 8px;
        }
        
        .palette-name {
            font-size: 0.8rem;
            margin-bottom: 5px;
        }
        
        .color-swatch {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            border: 2px solid #ddd;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .color-swatch:hover {
            transform: scale(1.2);
        }
        
        .color-swatch.active {
            border-color: #333;
            transform: scale(1.2);
        }
        
        .canvas-actions {
            display: flex;
            justify-content: space-between;
            gap: 10px;
        }
        
        .action-button {
            padding: 8px 15px;
            border: none;
            border-radius: 20px;
            background-color: #f5f5f5;
            color: #333;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 600;
            flex: 1;
        }
        
        .action-button:hover {
            background-color: #e0e0e0;
            transform: translateY(-2px);
        }
        
        #clear-button {
            background-color: #ff6b6b;
            color: white;
        }
        
        #download-button {
            background-color: #4ecdc4;
            color: white;
        }
        
        #continue-button {
            background-color: #654ea3;
        }

        /* Améliorations pour mobile */
        @media (max-width: 480px) {
            #drawing-canvas {
                height: 250px;
            }
            
            .tool-button {
                width: 35px;
                height: 35px;
                font-size: 1rem;
            }
            
            .color-swatch {
                width: 20px;
                height: 20px;
            }
            
            .action-button {
                min-height: 44px;
                font-size: 0.9rem;
            }
        }
    `;

    document.head.appendChild(style);

    // Éléments interactifs
    const canvas = document.getElementById('drawing-canvas');
    const toolsButtons = document.getElementById('tools-buttons');
    const paletteContainer = document.getElementById('palette-container');
    const clearButton = document.getElementById('clear-button');
    const downloadButton = document.getElementById('download-button');
    const continueButton = document.getElementById('continue-button');

    // Obtenir le contexte de dessin
    const ctx = canvas.getContext('2d');

    // Initialiser le canvas
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Variables pour le dessin
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Configuration du dessin
    const drawingConfig = {
        tool: drawingTools[0],
        color: colorPalettes[0].colors[0],
        size: drawingTools[0].size
    };

    // Créer les boutons d'outils
    drawingTools.forEach((tool, index) => {
        const button = document.createElement('div');
        button.className = 'tool-button' + (index === 0 ? ' active' : '');
        button.innerHTML = tool.icon;
        button.title = tool.name;
        button.dataset.index = index;

        button.addEventListener('click', () => {
            // Mettre à jour la classe active
            document.querySelectorAll('.tool-button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Mettre à jour l'outil actif
            drawingConfig.tool = tool;
            drawingConfig.size = tool.size;

            // Mettre à jour le curseur pour l'eraser
            if (tool.type === 'eraser') {
                canvas.style.cursor = 'cell';
            } else {
                canvas.style.cursor = 'crosshair';
            }
        });

        toolsButtons.appendChild(button);
    });

    // Créer les palettes de couleurs
    colorPalettes.forEach((palette, paletteIndex) => {
        const paletteDiv = document.createElement('div');
        paletteDiv.className = 'palette';

        const paletteName = document.createElement('div');
        paletteName.className = 'palette-name';
        paletteName.textContent = palette.name;
        paletteDiv.appendChild(paletteName);

        const colorPaletteDiv = document.createElement('div');
        colorPaletteDiv.className = 'color-palette';

        palette.colors.forEach((color, colorIndex) => {
            const swatch = document.createElement('div');
            swatch.className = 'color-swatch';
            swatch.style.backgroundColor = color;

            // Définir la première couleur de la première palette comme active
            if (paletteIndex === 0 && colorIndex === 0) {
                swatch.classList.add('active');
            }

            swatch.addEventListener('click', () => {
                // Mettre à jour la classe active
                document.querySelectorAll('.color-swatch').forEach(s => {
                    s.classList.remove('active');
                });
                swatch.classList.add('active');

                // Mettre à jour la couleur active
                drawingConfig.color = color;
            });

            colorPaletteDiv.appendChild(swatch);
        });

        paletteDiv.appendChild(colorPaletteDiv);
        paletteContainer.appendChild(paletteDiv);
    });

    // Fonctions de dessin
    function startDrawing(e) {
        isDrawing = true;

        // Récupérer les coordonnées du pointeur
        const pos = getPointerPosition(e);
        [lastX, lastY] = [pos.x, pos.y];

        // Commencer un nouveau tracé
        ctx.beginPath();

        // Pour les formes et le spray, dessiner immédiatement
        if (drawingConfig.tool.type === 'shapes') {
            drawShape(pos.x, pos.y);
        } else if (drawingConfig.tool.type === 'spray') {
            drawSpray(pos.x, pos.y);
        }
    }

    function draw(e) {
        if (!isDrawing) return;

        // Récupérer les coordonnées du pointeur
        const pos = getPointerPosition(e);

        // Dessiner selon l'outil sélectionné
        switch (drawingConfig.tool.type) {
            case 'brush':
                drawBrush(pos.x, pos.y);
                break;
            case 'pen':
                drawPen(pos.x, pos.y);
                break;
            case 'spray':
                drawSpray(pos.x, pos.y);
                break;
            case 'shapes':
                // Les formes sont dessinées uniquement lors du clic/toucher
                break;
            case 'eraser':
                erase(pos.x, pos.y);
                break;
        }

        // Mettre à jour les dernières coordonnées
        [lastX, lastY] = [pos.x, pos.y];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function drawBrush(x, y) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = drawingConfig.size;
        ctx.strokeStyle = drawingConfig.color;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function drawPen(x, y) {
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = drawingConfig.size;
        ctx.strokeStyle = drawingConfig.color;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
    }

    function drawSpray(x, y) {
        const density = 30;
        const radius = drawingConfig.size;

        ctx.fillStyle = drawingConfig.color;

        for (let i = 0; i < density; i++) {
            const offsetX = getRandomInt(-radius, radius);
            const offsetY = getRandomInt(-radius, radius);

            // Vérifier si le point est dans le cercle
            if (offsetX * offsetX + offsetY * offsetY <= radius * radius) {
                ctx.beginPath();
                ctx.arc(x + offsetX, y + offsetY, 1, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    function drawShape(x, y) {
        const shapes = ['circle', 'square', 'triangle', 'star'];
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const size = drawingConfig.size;

        ctx.fillStyle = drawingConfig.color;

        switch (randomShape) {
            case 'circle':
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
                break;

            case 'square':
                ctx.fillRect(x - size, y - size, size * 2, size * 2);
                break;

            case 'triangle':
                ctx.beginPath();
                ctx.moveTo(x, y - size);
                ctx.lineTo(x + size, y + size);
                ctx.lineTo(x - size, y + size);
                ctx.closePath();
                ctx.fill();
                break;

            case 'star':
                drawStar(x, y, 5, size, size / 2);
                break;
        }
    }

    function drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(cx, cy - outerRadius);

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            ctx.lineTo(x, y);
            rot += step;

            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            ctx.lineTo(x, y);
            rot += step;
        }

        ctx.lineTo(cx, cy - outerRadius);
        ctx.closePath();
        ctx.fill();
    }

    function erase(x, y) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = drawingConfig.size;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Rétablir le mode de composition normal
        ctx.globalCompositeOperation = 'source-over';
    }

    function clearCanvas() {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function downloadDrawing() {
        const link = document.createElement('a');
        link.download = 'mon-oeuvre-ynov.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    // Utilitaire pour récupérer la position du pointeur
    function getPointerPosition(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        if (e.touches && e.touches[0]) {
            // Événement tactile
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        } else {
            // Événement souris
            return {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            };
        }
    }

    // Utilitaire pour générer un nombre aléatoire entier
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Événements du canvas
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Support tactile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e);
    });
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e);
    });
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopDrawing();
    });

    // Événements des boutons
    clearButton.addEventListener('click', clearCanvas);
    downloadButton.addEventListener('click', downloadDrawing);

    continueButton.addEventListener('click', () => {
        // Appeler le callback pour terminer l'interaction
        onComplete();
    });
}