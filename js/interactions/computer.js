/**
 * Interaction pour l'emoji Informatique (💻)
 * Mini-défi: corriger une erreur dans un code HTML simple
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function computerInteraction(container, emojiData, onComplete) {
    // Défi HTML avec des balises échappées pour un affichage correct sur tous les appareils
    const challenge = {
        language: "HTML",
        title: "Trouvez l'erreur",
        buggyCode: "&lt;h1&gt;Mon titre&lt;/h1&gt;\n&lt;p&gt;Ceci est un paragraphe.&lt;p&gt;\n&lt;div&gt;Section importante&lt;/div&gt;",
        fixedCode: "&lt;h1&gt;Mon titre&lt;/h1&gt;\n&lt;p&gt;Ceci est un paragraphe.&lt;/p&gt;\n&lt;div&gt;Section importante&lt;/div&gt;",
        errorHint: "Indice: Regardez si toutes les balises sont correctement fermées.",
        solution: "La solution: La balise &lt;p&gt; n'était pas fermée correctement. Il fallait &lt;/p&gt; à la fin du paragraphe.",
        explanation: "En HTML, chaque balise ouvrante doit avoir une balise fermante correspondante. Ici, la balise &lt;p&gt; n'était pas fermée correctement avec &lt;/p&gt;."
    };

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card informatique-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Pour démontrer vos compétences en codage, trouvez et corrigez l'erreur dans ce code HTML !</p>
            </div>
            
            <div class="code-container">
                <div class="language-selector">
                    <h3 class="challenge-title">${challenge.title} (HTML)</h3>
                </div>
                <div class="code-editor-wrapper">
                    <textarea id="code-editor" class="code-editor" spellcheck="false">${challenge.buggyCode}</textarea>
                </div>
                <div class="hint-container">
                    <button class="button hint-button" id="hint-button">Besoin d'un indice?</button>
                    <button class="button solution-button" id="solution-button" style="display:none;">Voir la solution</button>
                    <div class="hint-text" id="hint-text" style="display: none;">
                        <p>${challenge.errorHint}</p>
                    </div>
                    <div class="solution-text" id="solution-text" style="display: none;">
                        <p>${challenge.solution}</p>
                        <p>${challenge.explanation}</p>
                    </div>
                </div>
            </div>
            
            <div class="interaction-buttons">
                <button class="button" id="verify-button">Vérifier</button>
                <button class="button" id="continue-button" style="display: none;">Continuer</button>
            </div>
        </div>
    `;

    // Insérer le contenu dans le conteneur
    container.innerHTML = content;

    // Appliquer des styles spécifiques à cette interaction
    const style = document.createElement('style');
    style.textContent = `
        .informatique-card {
            background: linear-gradient(135deg, #3498db 0%, #2c3e50 100%);
            color: white;
        }
        
        .challenge-title {
            font-size: 1.1rem;
            margin: 0;
            color: white;
        }
        
        .code-container {
            background-color: #263238;
            border-radius: 8px;
            margin: 15px 0;
            position: relative;
            overflow: hidden;
        }
        
        .language-selector {
            padding: 10px 15px;
            background-color: #1e272c;
            border-bottom: 1px solid #37474f;
        }
        
        .code-editor-wrapper {
            padding: 0;
            position: relative;
        }
        
        .code-editor {
            font-family: 'Courier New', monospace;
            color: #fff;
            padding: 15px;
            width: 100%;
            box-sizing: border-box;
            height: 150px;
            overflow-y: auto;
            outline: none;
            font-size: 16px;
            background-color: #263238;
            border: none;
            resize: none;
            line-height: 1.5;
        }
        
        .code-editor:focus {
            outline: 1px solid #3498db;
        }
        
        .hint-container {
            padding: 10px 15px;
            background-color: #1e272c;
            border-top: 1px solid #37474f;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .hint-button, .solution-button {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
            flex: 1;
        }
        
        .hint-button:hover, .solution-button:hover {
            background-color: rgba(255, 255, 255, 0.3);
        }
        
        .hint-text, .solution-text {
            width: 100%;
            background-color: #37474f;
            padding: 10px 15px;
            border-radius: 4px;
            margin-top: 10px;
            font-size: 14px;
            color: #fff;
        }
        
        .interaction-buttons {
            display: flex;
            justify-content: space-between;
            margin-top: 20px;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .code-correct {
            background-color: rgba(76, 175, 80, 0.2) !important;
        }
        
        .code-incorrect {
            background-color: rgba(244, 67, 54, 0.2) !important;
        }
        
        /* Amélioration pour le mobile */
        @media (max-width: 480px) {
            .code-editor {
                font-size: 16px;
                line-height: 1.4;
            }
            
            .hint-container {
                flex-direction: column;
            }
            
            .interaction-buttons {
                flex-direction: column;
            }
            
            .interaction-buttons .button {
                width: 100%;
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

    // Assurer que l'élément est éditable et a le focus
    if (codeEditor) {
        setTimeout(() => {
            codeEditor.focus();
        }, 500);
    }

    // Définir les événements
    hintButton.addEventListener('click', () => {
        hintText.style.display = hintText.style.display === 'none' ? 'block' : 'none';
        // Montrer le bouton de solution après avoir vu l'indice
        solutionButton.style.display = 'block';
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
        const userCode = codeEditor.value.trim();
        const correctCode = challenge.fixedCode.trim();

        // Normaliser les espaces dans les deux codes pour la comparaison
        const normalizedUserCode = userCode.replace(/\s+/g, ' ');
        const normalizedCorrectCode = correctCode.replace(/\s+/g, ' ');

        if (normalizedUserCode === normalizedCorrectCode || userCode === correctCode) {
            // Code correct
            codeEditor.classList.add('code-correct');
            hintText.style.display = 'none';
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
    });

    continueButton.addEventListener('click', () => {
        // Appeler le callback pour terminer l'interaction
        onComplete();
    });

    // Afficher automatiquement la solution après un certain temps
    setTimeout(() => {
        if (solutionButton.style.display === 'none') {
            solutionButton.style.display = 'block';
        }
    }, 30000); // Après 30 secondes
}