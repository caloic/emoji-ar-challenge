/**
 * Interaction pour l'emoji Informatique (💻)
 * Mini-défi: corriger une erreur dans un petit programme
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function computerInteraction(container, emojiData, onComplete) {
    // Liste de codes avec erreurs à corriger
    const codeChallenges = [
        {
            language: "Python",
            title: "Trouvez l'erreur",
            buggyCode: "def salutation():\n    message = \"Hello, World!\"\nprint(message)",
            fixedCode: "def salutation():\n    message = \"Hello, World!\"\n    print(message)",
            errorHint: "Indice: Regardez l'indentation. En Python, l'indentation est cruciale!",
            solution: "La solution: Le print() doit être indenté pour faire partie de la fonction.",
            explanation: "En Python, l'indentation définit les blocs de code. Ici, la ligne 'print(message)' devait être indentée pour être dans la fonction."
        },
        {
            language: "JavaScript",
            title: "Trouvez l'erreur",
            buggyCode: "function afficherMessage() {\n    const mesage = \"Hello, World!\";\n    console.log(mesage);\n}",
            fixedCode: "function afficherMessage() {\n    const message = \"Hello, World!\";\n    console.log(message);\n}",
            errorHint: "Indice: Regardez attentivement les noms de variables.",
            solution: "La solution: 'mesage' est mal orthographié, il fallait écrire 'message'.",
            explanation: "En JavaScript, les variables sont sensibles à la casse. Ici, la variable 'mesage' a été mal orthographiée et ne correspondait pas à 'message'."
        },
        {
            language: "HTML",
            title: "Trouvez l'erreur",
            buggyCode: "<h1>Mon titre</h1>\n<p>Ceci est un paragraphe.<p>\n<div>Section importante</div>",
            fixedCode: "<h1>Mon titre</h1>\n<p>Ceci est un paragraphe.</p>\n<div>Section importante</div>",
            errorHint: "Indice: Regardez si toutes les balises sont correctement fermées.",
            solution: "La solution: La balise <p> n'était pas fermée correctement. Il fallait </p> à la fin du paragraphe.",
            explanation: "En HTML, chaque balise ouvrante doit avoir une balise fermante correspondante. Ici, la balise <p> n'était pas fermée correctement."
        },
        {
            language: "Java",
            title: "Trouvez l'erreur",
            buggyCode: "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\")\n    }\n}",
            fixedCode: "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}",
            errorHint: "Indice: En Java, chaque instruction doit se terminer d'une certaine façon.",
            solution: "La solution: Il manque un point-virgule (;) après println(\"Hello, World!\").",
            explanation: "En Java, chaque instruction doit se terminer par un point-virgule. Ici, le point-virgule était manquant après l'instruction System.out.println()."
        }
    ];

    // Sélectionner un défi aléatoire
    const randomIndex = Math.floor(Math.random() * codeChallenges.length);
    const challenge = codeChallenges[randomIndex];

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card informatique-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Pour démontrer vos compétences en codage, trouvez et corrigez l'erreur dans ce code ${challenge.language} !</p>
            </div>
            
            <div class="code-container">
                <div class="language-selector">
                    <h3 class="challenge-title">${challenge.title} (${challenge.language})</h3>
                </div>
                <pre id="code-editor" class="code-editor" contenteditable="true" spellcheck="false">${challenge.buggyCode}</pre>
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
        
        .code-editor {
            font-family: 'Courier New', monospace;
            color: #fff;
            padding: 15px;
            width: 100%;
            white-space: pre;
            overflow-x: auto;
            outline: none;
            font-size: 14px;
            min-height: 120px;
            background-color: #263238;
            border: none;
            resize: none;
            cursor: text;
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
                font-size: 13px;
                line-height: 1.4;
            }
            
            .hint-container {
                flex-direction: column;
            }
            
            .hint-button, .solution-button {
                width: 100%;
                padding: 10px;
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

    // Assurer que l'élément est éditable
    if (codeEditor) {
        codeEditor.focus();

        // Placer le curseur à la fin du contenu
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(codeEditor);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
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
            codeEditor.textContent = challenge.fixedCode;
            codeEditor.classList.add('code-correct');
            verifyButton.style.display = 'none';
            continueButton.style.display = 'block';
        }
    });

    verifyButton.addEventListener('click', () => {
        const userCode = codeEditor.textContent.trim();
        const correctCode = challenge.fixedCode.trim();

        // Méthode de vérification simple - comparer les codes après normalisation
        const normalizedUserCode = userCode.replace(/\s+/g, ' ').replace(/\s*([{}()[\],;])\s*/g, '$1');
        const normalizedCorrectCode = correctCode.replace(/\s+/g, ' ').replace(/\s*([{}()[\],;])\s*/g, '$1');

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

    // Au bout de 3 essais infructueux, proposer automatiquement la solution
    let attempts = 0;

    codeEditor.addEventListener('input', () => {
        attempts++;
        if (attempts >= 3 && solutionButton.style.display === 'none') {
            solutionButton.style.display = 'block';
        }
    });
}