/**
 * Interaction pour l'emoji Informatique (💻)
 * Mini-défi: corriger une erreur dans un code HTML simple
 * Version corrigée pour l'affichage littéral des balises et le défilement
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function computerInteraction(container, emojiData, onComplete) {
    // Masquer les boutons d'action en bas
    const actionButtons = document.getElementById('action-buttons');
    if (actionButtons) {
        actionButtons.style.display = 'none';
    }

    // Code HTML avec les balises visibles directement (sans encodage HTML)
    // Utiliser des caractères littéraux pour < et > afin qu'ils s'affichent tels quels
    const challenge = {
        language: "HTML",
        title: "Trouvez l'erreur",
        buggyCode: "<h1>Mon titre</h1>\n<p>Ceci est un paragraphe.<p>\n<div>Section importante</div>",
        fixedCode: "<h1>Mon titre</h1>\n<p>Ceci est un paragraphe.</p>\n<div>Section importante</div>",
        errorHint: "Indice: Regardez si toutes les balises sont correctement fermées.",
        solution: "La solution: La balise <p> n'était pas fermée correctement. Il fallait </p> à la fin du paragraphe.",
        explanation: "En HTML, chaque balise ouvrante doit avoir une balise fermante correspondante. Ici, la balise <p> n'était pas fermée correctement avec </p>."
    };

    // Créer le contenu de l'interaction avec une structure simplifiée
    const content = `
        <div class="interaction-card informatique-card">
            <div class="interaction-header">
                <div class="interaction-emoji">${emojiData.emoji}</div>
                <h2 class="interaction-title">Informatique</h2>
            </div>
            
            <div class="challenge-description">
                <p>Concevez et développez des applications et systèmes informatiques innovants.</p>
                <p>Pour démontrer vos compétences en codage, trouvez et corrigez l'erreur dans ce code HTML !</p>
            </div>
            
            <div class="code-container">
                <h3 class="challenge-title">Trouvez l'erreur (HTML)</h3>
                
                <div class="code-editor-wrapper">
                    <textarea id="code-editor" class="code-editor" spellcheck="false"></textarea>
                </div>
                
                <div class="hint-solution-container">
                    <button class="button hint-button" id="hint-button">Besoin d'un indice?</button>
                    <button class="button solution-button" id="solution-button" style="display:none;">Voir la solution</button>
                </div>
                
                <div class="hint-text" id="hint-text" style="display: none;">
                    <p>Indice: Regardez si toutes les balises sont correctement fermées.</p>
                </div>
                
                <div class="solution-text" id="solution-text" style="display: none;">
                    <p>La solution: La balise &lt;p&gt; n'était pas fermée correctement. Il fallait &lt;/p&gt; à la fin du paragraphe.</p>
                    <p>En HTML, chaque balise ouvrante doit avoir une balise fermante correspondante.</p>
                </div>
            </div>
            
            <div class="action-container">
                <button class="button verify-button" id="verify-button">Vérifier</button>
                <button class="button continue-btn" id="continue-button" style="display: none;">Continuer</button>
            </div>
        </div>
    `;

    // Insérer le contenu dans le conteneur
    container.innerHTML = content;

    // Appliquer des styles spécifiques à cette interaction avec des correctifs pour le défilement
    const style = document.createElement('style');
    style.textContent = `
        .informatique-card {
            background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
            color: white;
            padding: 20px;
            padding-bottom: 80px;
            box-sizing: border-box;
            min-height: 100%;
            touch-action: pan-y;
        }
        
        .interaction-header {
            text-align: center;
            margin-bottom: 20px;
        }
        
        .interaction-emoji {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .interaction-title {
            font-size: 1.8rem;
            font-weight: 700;
        }
        
        .challenge-description {
            margin-bottom: 20px;
            text-align: center;
        }
        
        .code-container {
            background-color: #263238;
            border-radius: 8px;
            margin: 0 0 20px 0;
            padding: 15px;
        }
        
        .challenge-title {
            font-size: 1.2rem;
            color: white;
            margin: 0 0 15px 0;
            text-align: center;
        }
        
        .code-editor-wrapper {
            margin-bottom: 15px;
        }
        
        .code-editor {
            font-family: 'Courier New', monospace;
            color: #fff;
            padding: 15px;
            width: 100%;
            box-sizing: border-box;
            height: 150px;
            outline: none;
            font-size: 16px;
            background-color: #1e272c;
            border: none;
            border-radius: 5px;
            resize: none;
            line-height: 1.4;
        }
        
        .hint-solution-container {
            display: flex;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .hint-button, .solution-button {
            flex: 1;
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 5px;
            font-size: 0.9rem;
            cursor: pointer;
        }
        
        .hint-text, .solution-text {
            background-color: #37474f;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .action-container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(52, 152, 219, 0.9);
            padding: 15px;
            display: flex;
            justify-content: center;
            z-index: 100;
        }
        
        .verify-button, .continue-btn {
            width: 100%;
            max-width: 300px;
            padding: 12px;
            border: none;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
        }
        
        .verify-button {
            background-color: #3498db;
            color: white;
        }
        
        .continue-btn {
            background-color: #2ecc71 !important;
            color: white;
        }
        
        .code-correct {
            background-color: rgba(76, 175, 80, 0.2) !important;
        }
        
        .code-incorrect {
            background-color: rgba(244, 67, 54, 0.2) !important;
        }
        
        /* Correctifs pour éviter les problèmes de défilement tactile */
        .interaction-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow-y: auto;
            touch-action: pan-y;
        }
        
        .interaction-wrapper {
            min-height: 100%;
            padding-bottom: 80px;
        }
        
        /* Adaptations mobiles */
        @media (max-width: 480px) {
            .code-editor {
                font-size: 16px;
            }
            
            .hint-solution-container {
                flex-direction: column;
            }
            
            .action-container {
                padding: 12px;
            }
            
            .verify-button, .continue-btn {
                font-size: 1rem;
                padding: 14px;
            }
        }
    `;

    document.head.appendChild(style);

    // Éléments interactifs
    const codeEditor = document.getElementById('code-editor');
    const hintButton = document.getElementById('hint-button');
    const solutionButton = document.getElementById('solution-button');
    const hintText = document.getElementById('hint-text');
    const solutionText = document.getElementById('solution-text');
    const verifyButton = document.getElementById('verify-button');
    const continueButton = document.getElementById('continue-button');

    // Définir le code initial avec les balises visibles directement
    codeEditor.value = challenge.buggyCode;

    // Événements des boutons
    hintButton.addEventListener('click', () => {
        hintText.style.display = hintText.style.display === 'none' ? 'block' : 'none';
        if (solutionButton.style.display === 'none') {
            solutionButton.style.display = 'block';
        }
    });

    solutionButton.addEventListener('click', () => {
        solutionText.style.display = solutionText.style.display === 'none' ? 'block' : 'none';

        if (solutionText.style.display === 'block') {
            // Si la solution est affichée, mettre le code correct dans l'éditeur
            codeEditor.value = challenge.fixedCode;
            codeEditor.classList.add('code-correct');
            verifyButton.style.display = 'none';
            continueButton.style.display = 'block';
        }
    });

    verifyButton.addEventListener('click', () => {
        validateSolution();
    });

    continueButton.addEventListener('click', () => {
        // Réafficher les boutons d'action en bas
        if (actionButtons) {
            actionButtons.style.display = 'flex';
        }

        // Appeler le callback pour terminer l'interaction
        onComplete();
    });

    // Fonction pour valider la solution
    function validateSolution() {
        const userCode = codeEditor.value.trim();

        // Vérifier spécifiquement si l'utilisateur a corrigé la balise </p>
        const correctionMade = userCode.includes("</p>");

        if (correctionMade) {
            // Code correct
            codeEditor.classList.add('code-correct');
            solutionText.style.display = 'block';
            verifyButton.style.display = 'none';
            continueButton.style.display = 'block';
        } else {
            // Code incorrect
            codeEditor.classList.add('code-incorrect');
            setTimeout(() => {
                codeEditor.classList.remove('code-incorrect');
            }, 1000);

            // Montrer l'indice après un essai incorrect
            hintText.style.display = 'block';
            solutionButton.style.display = 'block';
        }
    }

    // Ajouter des correctifs pour le défilement
    document.body.style.overflow = 'hidden';

    // Capture les événements de défilement pour éviter qu'ils ne se propagent
    container.addEventListener('touchmove', (e) => {
        e.stopPropagation();
    }, { passive: true });

    // Gérer la position de défilement
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);

    // Afficher automatiquement le bouton de solution après un délai
    setTimeout(() => {
        if (solutionButton.style.display === 'none') {
            solutionButton.style.display = 'block';
        }
    }, 20000); // Après 20 secondes
}