/**
 * Interaction pour l'emoji Informatique (💻)
 * Mini-jeu de debug : trouver et corriger une erreur dans un code
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function computerInteraction(container, emojiData, onComplete) {
    // Liste de snippets de code avec des erreurs à corriger
    const codeSnippets = [
        {
            code: `function calculerSomme(tableau) {
  let somme = 0;
  for (let i = 0; i <= tableau.length; i++) {
    somme += tableau[i];
  }
  return somme;
}`,
            error: "La boucle va trop loin et provoque une erreur d'index",
            hint: "Attention aux limites de la boucle",
            solution: `function calculerSomme(tableau) {
  let somme = 0;
  for (let i = 0; i < tableau.length; i++) {
    somme += tableau[i];
  }
  return somme;
}`
        },
        {
            code: `function estPremier(nombre) {
  for (let i = 2; i < nombre; i++) {
    if (nombre % i = 0) {
      return false;
    }
  }
  return nombre > 1;
}`,
            error: "Utilisation d'un = au lieu de == ou ===",
            hint: "Attention à l'opérateur de comparaison",
            solution: `function estPremier(nombre) {
  for (let i = 2; i < nombre; i++) {
    if (nombre % i === 0) {
      return false;
    }
  }
  return nombre > 1;
}`
        },
        {
            code: `function inverserChaine(chaine) {
  let resultat = "";
  for (let i = chaine.length; i >= 0; i--) {
    resultat += chaine[i];
  }
  return resultat;
}`,
            error: "L'index commence à la longueur de la chaîne et inclut -1",
            hint: "La première et dernière lettre ne sont pas traitées correctement",
            solution: `function inverserChaine(chaine) {
  let resultat = "";
  for (let i = chaine.length - 1; i >= 0; i--) {
    resultat += chaine[i];
  }
  return resultat;
}`
        }
    ];

    // Choisir un snippet aléatoire
    const randomIndex = Math.floor(Math.random() * codeSnippets.length);
    const selectedSnippet = codeSnippets[randomIndex];

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Pouvez-vous trouver et corriger l'erreur dans ce code?</p>
            </div>
            
            <div class="code-container">
                <pre><code class="code-editor" id="code-editor" contenteditable="true">${selectedSnippet.code}</code></pre>
                <div class="hint-container">
                    <button class="button hint-button" id="hint-button">Indice</button>
                    <div class="hint-text" id="hint-text" style="display: none;">
                        <p><strong>Indice:</strong> ${selectedSnippet.hint}</p>
                    </div>
                </div>
            </div>
            
            <div class="interaction-buttons">
                <button class="button" id="verify-button">Vérifier</button>
                <button class="button" id="solution-button" style="display: none;">Voir la solution</button>
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
        
        .code-editor {
            font-family: monospace;
            color: #fff;
            padding: 15px;
            width: 100%;
            white-space: pre;
            overflow-x: auto;
            outline: none;
            font-size: 14px;
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
    const codeEditor = document.getElementById('code-editor');
    const hintButton = document.getElementById('hint-button');
    const hintText = document.getElementById('hint-text');
    const verifyButton = document.getElementById('verify-button');
    const solutionButton = document.getElementById('solution-button');
    const continueButton = document.getElementById('continue-button');

    // Événements
    hintButton.addEventListener('click', () => {
        hintText.style.display = hintText.style.display === 'none' ? 'block' : 'none';
    });

    verifyButton.addEventListener('click', () => {
        // Vérifier le code
        const userCode = codeEditor.textContent;
        const isCorrect = verifyCode(userCode, selectedSnippet.solution);

        if (isCorrect) {
            // Code correct
            codeEditor.classList.add('code-correct');
            verifyButton.style.display = 'none';
            continueButton.style.display = 'block';

            // Afficher un message de réussite
            hintText.innerHTML = '<p><strong>Bravo!</strong> Vous avez corrigé le code avec succès!</p>';
            hintText.style.display = 'block';
        } else {
            // Code incorrect
            codeEditor.classList.add('code-incorrect');
            setTimeout(() => {
                codeEditor.classList.remove('code-incorrect');
            }, 1000);

            // Afficher un message d'erreur et le bouton de solution
            hintText.innerHTML = '<p><strong>Pas tout à fait.</strong> Essayez encore ou consultez la solution.</p>';
            hintText.style.display = 'block';
            solutionButton.style.display = 'block';
        }
    });

    solutionButton.addEventListener('click', () => {
        codeEditor.textContent = selectedSnippet.solution;
        codeEditor.classList.add('code-correct');
        solutionButton.style.display = 'none';
        verifyButton.style.display = 'none';
        continueButton.style.display = 'block';

        hintText.innerHTML = '<p><strong>Solution:</strong> Voici le code corrigé.</p>';
        hintText.style.display = 'block';
    });

    continueButton.addEventListener('click', () => {
        // Appeler le callback pour terminer l'interaction
        onComplete();
    });

    /**
     * Vérifie si le code de l'utilisateur est similaire à la solution
     * (Utilise une comparaison simplifiée en normalisant les espaces)
     *
     * @param {string} userCode - Code saisi par l'utilisateur
     * @param {string} solutionCode - Code de la solution
     * @returns {boolean} - true si le code est similaire à la solution
     */
    function verifyCode(userCode, solutionCode) {
        // Normaliser les espaces et supprimer les sauts de ligne pour la comparaison
        const normalizeCode = (code) => {
            return code
                .replace(/\s+/g, ' ')
                .replace(/\n/g, '')
                .trim();
        };

        const normalizedUserCode = normalizeCode(userCode);
        const normalizedSolutionCode = normalizeCode(solutionCode);

        // Vérifier si les erreurs spécifiques ont été corrigées
        if (selectedSnippet.error.includes("boucle")) {
            return !userCode.includes("<= tableau.length");
        } else if (selectedSnippet.error.includes("=")) {
            return !userCode.includes("nombre % i = 0");
        } else if (selectedSnippet.error.includes("index")) {
            return !userCode.includes("i = chaine.length") && !userCode.includes("i >= 0");
        }

        // Si la vérification spécifique échoue, comparer les codes normalisés
        return normalizedUserCode === normalizedSolutionCode;
    }
}