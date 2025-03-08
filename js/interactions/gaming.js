/**
 * Interaction pour l'emoji 3D, Animation & Jeux Vidéo (🎮)
 * Permet au visiteur d'interagir avec un personnage 3D qui réagit aux mouvements
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function gamingInteraction(container, emojiData, onComplete) {
    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card gaming-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Interagissez avec le personnage en touchant l'écran ou en bougeant votre souris!</p>
            </div>
            
            <div class="game-container">
                <canvas id="game-canvas" width="300" height="300"></canvas>
                <div class="game-controls">
                    <button class="control-button" id="jump-button">Sauter</button>
                    <button class="control-button" id="dance-button">Danser</button>
                    <button class="control-button" id="wave-button">Saluer</button>
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
        .gaming-card {
            background: linear-gradient(135deg, #2c3e50 0%, #4a69bd 100%);
            color: white;
        }
        
        .game-container {
            position: relative;
            width: 100%;
            margin: 20px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        #game-canvas {
            background-color: #1e272e;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            cursor: pointer;
        }
        
        .game-controls {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 15px;
        }
        
        .control-button {
            background-color: #4a69bd;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
        }
        
        .control-button:hover {
            background-color: #5a7de2;
            transform: translateY(-2px);
        }
        
        .control-button:active {
            transform: translateY(1px);
        }
        
        #continue-button {
            background-color: #4a69bd;
        }
    `;

    document.head.appendChild(style);

    // Éléments interactifs
    const canvas = document.getElementById('game-canvas');
    const jumpButton = document.getElementById('jump-button');
    const danceButton = document.getElementById('dance-button');
    const waveButton = document.getElementById('wave-button');
    const continueButton = document.getElementById('continue-button');

    // Obtenir le contexte de dessin
    const ctx = canvas.getContext('2d');

    // Paramètres du personnage
    const character = {
        x: canvas.width / 2,
        y: canvas.height * 0.75,
        size: 50,
        color: '#4a69bd',
        eyes: {
            color: 'white',
            size: 8
        },
        mouth: {
            y: 15,
            width: 20,
            height: 5
        },
        arms: {
            length: 20,
            angle: Math.PI / 4
        },
        legs: {
            length: 25,
            angle: Math.PI / 12
        },
        animation: {
            jumping: false,
            dancing: false,
            waving: false,
            jumpHeight: 0,
            danceAngle: 0,
            waveAngle: 0
        }
    };

    // Animation du personnage
    let animationFrame;

    // Variables pour le suivi de la souris ou du toucher
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    // Fonction de dessin du personnage
    function drawCharacter() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculer la position y en fonction de l'animation de saut
        const jumpOffset = character.animation.jumping ?
            -Math.sin(character.animation.jumpHeight * Math.PI) * 40 : 0;

        // Calculer l'angle de danse
        const danceOffset = character.animation.dancing ?
            Math.sin(character.animation.danceAngle) * 10 : 0;

        // Calculer l'angle de salut
        const waveAngle = character.animation.waving ?
            Math.sin(character.animation.waveAngle * 2) * Math.PI / 4 + Math.PI / 4 :
            Math.PI / 4;

        // Dessiner le corps
        ctx.beginPath();
        ctx.arc(
            character.x + danceOffset,
            character.y + jumpOffset,
            character.size,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = character.color;
        ctx.fill();

        // Dessiner les yeux
        const eyeDistanceFromCenter = character.size / 3;
        const eyeY = character.y + jumpOffset - character.size / 5;

        // Calculer la direction des yeux en fonction de la position de la souris
        const eyeDirectionX = (mouseX - character.x) / canvas.width * 5;
        const eyeDirectionY = (mouseY - eyeY) / canvas.height * 3;

        // Œil gauche
        ctx.beginPath();
        ctx.arc(
            character.x + danceOffset - eyeDistanceFromCenter + eyeDirectionX,
            eyeY + eyeDirectionY,
            character.eyes.size,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = character.eyes.color;
        ctx.fill();

        // Pupille gauche
        ctx.beginPath();
        ctx.arc(
            character.x + danceOffset - eyeDistanceFromCenter + eyeDirectionX * 2,
            eyeY + eyeDirectionY * 2,
            character.eyes.size / 2,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = 'black';
        ctx.fill();

        // Œil droit
        ctx.beginPath();
        ctx.arc(
            character.x + danceOffset + eyeDistanceFromCenter + eyeDirectionX,
            eyeY + eyeDirectionY,
            character.eyes.size,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = character.eyes.color;
        ctx.fill();

        // Pupille droite
        ctx.beginPath();
        ctx.arc(
            character.x + danceOffset + eyeDistanceFromCenter + eyeDirectionX * 2,
            eyeY + eyeDirectionY * 2,
            character.eyes.size / 2,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = 'black';
        ctx.fill();

        // Dessiner la bouche
        ctx.beginPath();
        ctx.rect(
            character.x + danceOffset - character.mouth.width / 2,
            character.y + jumpOffset + character.mouth.y,
            character.mouth.width,
            character.mouth.height
        );
        ctx.fillStyle = character.animation.dancing ? 'red' : 'black';
        ctx.fill();

        // Dessiner les bras
        // Bras gauche
        ctx.beginPath();
        ctx.moveTo(
            character.x + danceOffset - character.size,
            character.y + jumpOffset - character.size / 3
        );
        ctx.lineTo(
            character.x + danceOffset - character.size - Math.cos(character.animation.waving ? waveAngle : character.arms.angle) * character.arms.length,
            character.y + jumpOffset - character.size / 3 + Math.sin(character.animation.waving ? waveAngle : character.arms.angle) * character.arms.length
        );
        ctx.lineWidth = 10;
        ctx.strokeStyle = character.color;
        ctx.stroke();

        // Bras droit
        ctx.beginPath();
        ctx.moveTo(
            character.x + danceOffset + character.size,
            character.y + jumpOffset - character.size / 3
        );
        ctx.lineTo(
            character.x + danceOffset + character.size + Math.cos(character.arms.angle) * character.arms.length,
            character.y + jumpOffset - character.size / 3 + Math.sin(character.arms.angle) * character.arms.length
        );
        ctx.stroke();

        // Dessiner les jambes
        // Jambe gauche
        ctx.beginPath();
        ctx.moveTo(
            character.x + danceOffset - character.size / 2,
            character.y + jumpOffset + character.size
        );
        ctx.lineTo(
            character.x + danceOffset - character.size / 2 - Math.cos(character.animation.dancing ? -character.animation.danceAngle : character.legs.angle) * character.legs.length,
            character.y + jumpOffset + character.size + Math.sin(character.animation.dancing ? -character.animation.danceAngle : character.legs.angle) * character.legs.length
        );
        ctx.stroke();

        // Jambe droite
        ctx.beginPath();
        ctx.moveTo(
            character.x + danceOffset + character.size / 2,
            character.y + jumpOffset + character.size
        );
        ctx.lineTo(
            character.x + danceOffset + character.size / 2 + Math.cos(character.animation.dancing ? character.animation.danceAngle : character.legs.angle) * character.legs.length,
            character.y + jumpOffset + character.size + Math.sin(character.animation.dancing ? character.animation.danceAngle : character.legs.angle) * character.legs.length
        );
        ctx.stroke();
    }

    // Fonction d'animation
    function animate() {
        drawCharacter();

        // Mettre à jour les animations
        if (character.animation.jumping) {
            character.animation.jumpHeight += 0.05;
            if (character.animation.jumpHeight >= 1) {
                character.animation.jumping = false;
                character.animation.jumpHeight = 0;
            }
        }

        if (character.animation.dancing) {
            character.animation.danceAngle += 0.1;
            if (character.animation.danceAngle >= Math.PI * 4) {
                character.animation.dancing = false;
                character.animation.danceAngle = 0;
            }
        }

        if (character.animation.waving) {
            character.animation.waveAngle += 0.1;
            if (character.animation.waveAngle >= Math.PI * 2) {
                character.animation.waving = false;
                character.animation.waveAngle = 0;
            }
        }

        animationFrame = requestAnimationFrame(animate);
    }

    // Démarrer l'animation
    animate();

    // Événements
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
    });

    canvas.addEventListener('click', () => {
        // Faire sauter le personnage lorsqu'on clique sur le canvas
        if (!character.animation.jumping) {
            character.animation.jumping = true;
            character.animation.jumpHeight = 0;
        }
    });

    jumpButton.addEventListener('click', () => {
        if (!character.animation.jumping) {
            character.animation.jumping = true;
            character.animation.jumpHeight = 0;
        }
    });

    danceButton.addEventListener('click', () => {
        if (!character.animation.dancing) {
            character.animation.dancing = true;
            character.animation.danceAngle = 0;
        }
    });

    waveButton.addEventListener('click', () => {
        if (!character.animation.waving) {
            character.animation.waving = true;
            character.animation.waveAngle = 0;
        }
    });

    continueButton.addEventListener('click', () => {
        // Arrêter l'animation
        cancelAnimationFrame(animationFrame);
        // Appeler le callback pour terminer l'interaction
        onComplete();
    });
}