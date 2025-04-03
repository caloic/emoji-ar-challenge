/**
 * Interaction pour l'emoji Informatique (💻)
 * Activité simple pour écrire "Hello World"
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function computerInteraction(container, emojiData, onComplete) {
    // Liste d'exemples "Hello World" en différents langages
    const helloWorldExamples = [
        {
            language: "Python",
            code: "print('Hello, World!')"
        },
        {
            language: "JavaScript",
            code: "console.log('Hello, World!');"
        },
        {
            language: "Java",
            code: "public class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\");\n    }\n}"
        },
        {
            language: "C",
            code: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\\n\");\n    return 0;\n}"
        },
        {
            language: "HTML",
            code: "<!DOCTYPE html>\n<html>\n<head>\n    <title>Hello World</title>\n</head>\n<body>\n    <h1>Hello, World!</h1>\n</body>\n</html>"
        }
    ];

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card informatique-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Écrivez un programme "Hello World" dans le langage de votre choix !</p>
            </div>
            
            <div class="code-container">
                <div class="language-selector">
                    <label for="language-select">Choisissez un langage :</label>
                    <select id="language-select">
                        ${helloWorldExamples.map(ex => `<option value="${ex.language}">${ex.language}</option>`).join('')}
                    </select>
                </div>
                <pre><code class="code-editor" id="code-editor" contenteditable="true"></code></pre>
                <div class="hint-container">
                    <button class="button hint-button" id="hint-button">Voir un exemple</button>
                    <div class="hint-text" id="hint-text" style="display: none;">
                        <p><strong>Exemple :</strong> <span id="example-code"></span></p>
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
        .code-container {
            background-color: #263238;
            border-radius: 8px;
            margin: 15px 0;
            position: relative;
            overflow: hidden;
        }
        
        .language-selector {
            padding: 10px;
            background-color: #1e272c;
            border-bottom: 1px solid #37474f;
        }
        
        .language-selector select {
            padding: 5px 10px;
            border-radius: 4px;
            border: 1px solid #37474f;
            background-color: #263238;
            color: white;
        }
        
        .code-editor {
            font-family: monospace;
            color: #fff;
            padding: 15px;
            width: 100%;
            white-space: pre;
            overflow-x: auto;
            outline: none;
            font-size: 14px;
            min-height: 100px;
        }
        
        .hint-container {
            padding: 10px;
            background-color: #1e272c;
            border-top: 1px solid #37474f;
        }
        
        .hint-text {
            background-color: #37474f;
            padding: 10px;
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
            background-color: rgba(76, 175, 80, 0.2);
        }
        
        .code-incorrect {
            background-color: rgba(244, 67, 54, 0.2);
        }
    `;

    document.head.appendChild(style);

    // Éléments interactifs
    const languageSelect = document.getElementById('language-select');
    const codeEditor = document.getElementById('code-editor');
    const hintButton = document.getElementById('hint-button');
    const hintText = document.getElementById('hint-text');
    const exampleCode = document.getElementById('example-code');
    const verifyButton = document.getElementById('verify-button');
    const continueButton = document.getElementById('continue-button');

    // Initialiser l'éditeur avec le premier exemple
    updateLanguageExample();

    // Fonctions
    function updateLanguageExample() {
        const selectedLanguage = languageSelect.value;
        const example = helloWorldExamples.find(ex => ex.language === selectedLanguage);
        if (example) {
            exampleCode.textContent = example.code;
        }
    }

    function verifyHelloWorld() {
        const userCode = codeEditor.textContent.trim();
        const selectedLanguage = languageSelect.value;

        // Vérification simple : le code contient "Hello, World" (ou variante)
        const containsHelloWorld = /hello,?\s*world/i.test(userCode);

        if (containsHelloWorld) {
            // Code correct
            codeEditor.classList.add('code-correct');
            verifyButton.style.display = 'none';
            continueButton.style.display = 'block';

            // Afficher un message de réussite
            hintText.innerHTML = '<p><strong>Bravo!</strong> Vous avez correctement écrit un programme "Hello World" !</p>';
            hintText.style.display = 'block';

            return true;
        } else {
            // Code incorrect
            codeEditor.classList.add('code-incorrect');
            setTimeout(() => {
                codeEditor.classList.remove('code-incorrect');
            }, 1000);

            // Afficher un message d'erreur
            hintText.innerHTML = '<p><strong>Pas tout à fait.</strong> Votre code devrait afficher "Hello, World!" à l\'écran.</p>';
            hintText.style.display = 'block';

            return false;
        }
    }

    // Événements
    languageSelect.addEventListener('change', updateLanguageExample);

    hintButton.addEventListener('click', () => {
        hintText.style.display = hintText.style.display === 'none' ? 'block' : 'none';
    });

    verifyButton.addEventListener('click', verifyHelloWorld);

    continueButton.addEventListener('click', () => {
        // Appeler le callback pour terminer l'interaction
        onComplete();
    });
}