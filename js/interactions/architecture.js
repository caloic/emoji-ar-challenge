/**
 * Interaction pour l'emoji Architecture d'intérieur (🏠)
 * Affiche un espace 3D que le visiteur peut transformer avec différents styles
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function architectureInteraction(container, emojiData, onComplete) {
    // Styles d'intérieur disponibles
    const interiorStyles = [
        {
            name: "Moderne",
            colors: {
                wall: "#f5f5f5",
                floor: "#d9d9d9",
                furniture: "#3498db"
            },
            description: "Lignes épurées, minimalisme et fonctionnalité."
        },
        {
            name: "Industriel",
            colors: {
                wall: "#b3b3b3",
                floor: "#8c8c8c",
                furniture: "#e67e22"
            },
            description: "Matériaux bruts, aspect usine et robustesse."
        },
        {
            name: "Scandinave",
            colors: {
                wall: "#ffffff",
                floor: "#f5efe0",
                furniture: "#95a5a6"
            },
            description: "Simplicité, luminosité et naturel."
        },
        {
            name: "Art Déco",
            colors: {
                wall: "#e5d1b8",
                floor: "#4a4a4a",
                furniture: "#ffd700"
            },
            description: "Élégance, géométrie et matériaux luxueux."
        }
    ];

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card architecture-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Choisissez un style et transformez cet espace intérieur!</p>
            </div>
            
            <div class="interior-container">
                <canvas id="interior-canvas" width="320" height="240"></canvas>
                
                <div class="style-selector">
                    <div class="style-title">Styles d'intérieur</div>
                    <div class="style-buttons" id="style-buttons">
                        <!-- Boutons générés dynamiquement -->
                    </div>
                </div>
                
                <div class="style-info" id="style-info">
                    <div class="style-name" id="style-name">Choisissez un style</div>
                    <div class="style-description" id="style-description">Cliquez sur un des styles pour transformer l'espace.</div>
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
        .interior-container {
            background-color: white;
            border-radius: 10px;
            padding: 15px;
            margin: 20px 0;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            color: #333;
        }
        
        #interior-canvas {
            width: 100%;
            height: auto;
            border-radius: 5px;
            margin-bottom: 15px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
        }
        
        .style-selector {
            margin-bottom: 15px;
        }
        
        .style-title {
            font-weight: 600;
            margin-bottom: 10px;
            color: #333;
        }
        
        .style-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .style-button {
            padding: 8px 12px;
            border: none;
            border-radius: 20px;
            background-color: #f0f0f0;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
        }
        
        .style-button:hover {
            background-color: #e0e0e0;
            transform: translateY(-2px);
        }
        
        .style-button.active {
            background-color: #8ec5fc;
            color: white;
            font-weight: 600;
        }
        
        .style-info {
            background-color: #f7f7f7;
            border-radius: 8px;
            padding: 12px;
        }
        
        .style-name {
            font-weight: 600;
            margin-bottom: 5px;
            color: #333;
        }
        
        .style-description {
            font-size: 0.9rem;
            color: #666;
        }

        /* Améliorations pour mobile */
        @media (max-width: 480px) {
            .style-buttons {
                justify-content: center;
            }
            
            .style-button {
                min-height: 40px;
                min-width: 90px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    `;

    document.head.appendChild(style);

    // Éléments interactifs
    const canvas = document.getElementById('interior-canvas');
    const styleButtons = document.getElementById('style-buttons');
    const styleName = document.getElementById('style-name');
    const styleDescription = document.getElementById('style-description');
    const continueButton = document.getElementById('continue-button');

    // Obtenir le contexte de dessin
    const ctx = canvas.getContext('2d');

    // Créer les boutons de style
    interiorStyles.forEach((style, index) => {
        const button = document.createElement('button');
        button.className = 'style-button';
        button.textContent = style.name;
        button.dataset.index = index;

        button.addEventListener('click', () => {
            // Mettre à jour la classe active
            document.querySelectorAll('.style-button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Mettre à jour l'affichage du style
            styleName.textContent = style.name;
            styleDescription.textContent = style.description;

            // Dessiner l'intérieur avec le style sélectionné
            drawInterior(style);
        });

        styleButtons.appendChild(button);
    });

    // Fonction pour dessiner l'intérieur
    function drawInterior(style) {
        // Effacer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dessiner les murs (arrière-plan)
        ctx.fillStyle = style.colors.wall;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dessiner le sol
        ctx.fillStyle = style.colors.floor;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.7);
        ctx.lineTo(canvas.width, canvas.height * 0.7);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();

        // Dessiner une perspective simple pour le sol
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.7);
        ctx.lineTo(canvas.width / 2, canvas.height * 0.6);
        ctx.lineTo(canvas.width, canvas.height * 0.7);
        ctx.strokeStyle = '#00000033';
        ctx.stroke();

        // Dessiner un canapé
        const sofaWidth = canvas.width * 0.4;
        const sofaHeight = canvas.height * 0.15;
        const sofaX = canvas.width * 0.3;
        const sofaY = canvas.height * 0.75;

        // Corps du canapé
        ctx.fillStyle = style.colors.furniture;
        ctx.fillRect(sofaX, sofaY, sofaWidth, sofaHeight);

        // Dossier du canapé
        ctx.fillRect(sofaX, sofaY - sofaHeight * 0.6, sofaWidth, sofaHeight * 0.6);

        // Accoudoirs
        ctx.fillRect(sofaX - 10, sofaY - sofaHeight * 0.3, 10, sofaHeight);
        ctx.fillRect(sofaX + sofaWidth, sofaY - sofaHeight * 0.3, 10, sofaHeight);

        // Coussins
        ctx.fillStyle = lightenColor(style.colors.furniture, 20);
        ctx.fillRect(sofaX + 10, sofaY + 5, sofaWidth / 2 - 15, sofaHeight - 10);
        ctx.fillRect(sofaX + sofaWidth / 2 + 5, sofaY + 5, sofaWidth / 2 - 15, sofaHeight - 10);

        // Dessiner une table basse
        const tableWidth = canvas.width * 0.25;
        const tableHeight = canvas.height * 0.05;
        const tableX = canvas.width * 0.375;
        const tableY = sofaY + sofaHeight + 20;

        ctx.fillStyle = darkenColor(style.colors.furniture, 20);
        ctx.fillRect(tableX, tableY, tableWidth, tableHeight);

        // Pieds de la table
        ctx.fillRect(tableX + 10, tableY + tableHeight, 5, 15);
        ctx.fillRect(tableX + tableWidth - 15, tableY + tableHeight, 5, 15);

        // Dessiner une fenêtre
        const windowWidth = canvas.width * 0.2;
        const windowHeight = canvas.height * 0.3;
        const windowX = canvas.width * 0.7;
        const windowY = canvas.height * 0.2;

        // Cadre de la fenêtre
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(windowX, windowY, windowWidth, windowHeight);

        // Croisillons de la fenêtre
        ctx.fillStyle = darkenColor(style.colors.wall, 30);
        ctx.fillRect(windowX + windowWidth / 2 - 2, windowY, 4, windowHeight);
        ctx.fillRect(windowX, windowY + windowHeight / 2 - 2, windowWidth, 4);

        // Dessiner une lampe
        const lampBaseX = canvas.width * 0.15;
        const lampBaseY = canvas.height * 0.85;
        const lampBaseWidth = 20;
        const lampBaseHeight = 10;

        // Pied de la lampe
        ctx.fillStyle = darkenColor(style.colors.furniture, 10);
        ctx.fillRect(lampBaseX + lampBaseWidth / 2 - 3, lampBaseY - 40, 6, 40);

        // Base de la lampe
        ctx.fillStyle = style.colors.furniture;
        ctx.beginPath();
        ctx.ellipse(lampBaseX + lampBaseWidth / 2, lampBaseY, lampBaseWidth / 2, lampBaseHeight / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Abat-jour
        ctx.beginPath();
        ctx.moveTo(lampBaseX, lampBaseY - 40);
        ctx.lineTo(lampBaseX + 10, lampBaseY - 80);
        ctx.lineTo(lampBaseX + 30, lampBaseY - 80);
        ctx.lineTo(lampBaseX + 40, lampBaseY - 40);
        ctx.closePath();
        ctx.fillStyle = lightenColor(style.colors.furniture, 30);
        ctx.fill();

        // Dessiner une plante
        const plantX = canvas.width * 0.8;
        const plantY = canvas.height * 0.85;

        // Pot de la plante
        ctx.fillStyle = darkenColor(style.colors.furniture, 30);
        ctx.beginPath();
        ctx.moveTo(plantX, plantY);
        ctx.lineTo(plantX + 25, plantY);
        ctx.lineTo(plantX + 20, plantY - 30);
        ctx.lineTo(plantX + 5, plantY - 30);
        ctx.closePath();
        ctx.fill();

        // Feuilles de la plante
        ctx.fillStyle = '#4CAF50';
        ctx.beginPath();
        ctx.arc(plantX + 13, plantY - 40, 15, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(plantX + 5, plantY - 50, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(plantX + 20, plantY - 55, 12, 0, Math.PI * 2);
        ctx.fill();
    }

    // Fonction pour éclaircir une couleur
    function lightenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;

        return '#' + (
            0x1000000 +
            (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)
        ).toString(16).slice(1);
    }

    // Fonction pour assombrir une couleur
    function darkenColor(color, percent) {
        const num = parseInt(color.replace('#', ''), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) - amt;
        const G = (num >> 8 & 0x00FF) - amt;
        const B = (num & 0x0000FF) - amt;

        return '#' + (
            0x1000000 +
            (R > 0 ? R : 0) * 0x10000 +
            (G > 0 ? G : 0) * 0x100 +
            (B > 0 ? B : 0)
        ).toString(16).slice(1);
    }

    // Dessiner l'intérieur par défaut (premier style)
    drawInterior(interiorStyles[0]);

    // Activer le premier bouton
    document.querySelector('.style-button').classList.add('active');
    styleName.textContent = interiorStyles[0].name;
    styleDescription.textContent = interiorStyles[0].description;

    // Événement pour le bouton continuer
    continueButton.addEventListener('click', () => {
        // Appeler le callback pour terminer l'interaction
        onComplete();
    });
}