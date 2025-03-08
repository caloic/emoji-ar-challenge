/**
 * Interaction pour l'emoji Cybersécurité (🔒)
 * Mini-jeu de déchiffrement avec indices visuels
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function securityInteraction(container, emojiData, onComplete) {
    // Liste de messages chiffrés avec leurs solutions
    const cryptoMessages = [
        {
            encrypted: "QOPV TBNQVT FTU MB HSBOEF FDPMF EV OVNFSJRVF",
            hint: "Décalage d'une lettre (chiffre de César)",
            solution: "YNOV CAMPUS EST LA GRANDE ECOLE DU NUMERIQUE"
        },
        {
            encrypted: "01011001 01001110 01001111 01010110",
            hint: "Conversion binaire en texte",
            solution: "YNOV"
        },
        {
            encrypted: "89 78 79 86",
            hint: "Code ASCII (décimal)",
            solution: "YNOV"
        }
    ];

    // Choisir un message aléatoire
    const randomIndex = Math.floor(Math.random() * cryptoMessages.length);
    const selectedMessage = cryptoMessages[randomIndex];

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Déchiffrez le message crypté pour débloquer le secret.</p>
            </div>
            
            <div class="crypto-container">
                <div class="encrypted-message">${selectedMessage.encrypted}</div>
                
                <div class="crypto-clues">
                    <div class="clue-item" id="clue-1">
                        <div class="clue-icon">🔍</div>
                        <div class="clue-content">Message mystérieux détecté</div>
                    </div>
                    
                    <div class="clue-item" id="clue-2" style="opacity: 0.3">
                        <div class="clue-icon">🧩</div>
                        <div class="clue-content">Analyse en cours...</div>
                    </div>
                    
                    <div class="clue-item" id="clue-3" style="opacity: 0.3">
                        <div class="clue-icon">💡</div>
                        <div class="clue-content">Indice découvert!</div>
                    </div>
                </div>
                
                <div class="solution-input-container">
                    <input type="text" id="solution-input" class="solution-input" placeholder="Votre réponse ici..." maxlength="50">
                    <button id="validate-button" class="button">Valider</button>
                </div>
                
                <div class="crypto-hint" id="crypto-hint" style="display: none;">
                    <p><strong>Indice:</strong> <span id="hint-text"></span></p>
                </div>
            </div>
            
            <div class="interaction-buttons">
                <button class="button" id="hint-button">Demander un indice</button>
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
        .crypto-container {
            background-color: #1a1a2e;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
            color: #e2e2e2;
        }
        
        .encrypted-message {
            font-family: 'Courier New', monospace;
            font-size: 1.2rem;
            text-align: center;
            padding: 15px;
            background-color: #16213e;
            border-radius: 5px;
            letter-spacing: 2px;
            font-weight: bold;
            margin-bottom: 20px;
            word-break: break-all;
        }
        
        .crypto-clues {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .clue-item {
            background-color: #0f3460;
            border-radius: 5px;
            padding: 10px;
            flex: 1;
            margin: 0 5px;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        .clue-icon {
            font-size: 1.5rem;
            margin-bottom: 5px;
        }
        
        .clue-content {
            font-size: 0.8rem;
        }
        
        .solution-input-container {
            display: flex;
            margin-bottom: 15px;
        }
        
        .solution-input {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 5px 0 0 5px;
            font-family: 'Courier New', monospace;
            font-size: 1rem;
        }
        
        .solution-input:focus {
            outline: none;
            box-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
        }
        
        .solution-input-container .button {
            border-radius: 0 5px 5px 0;
        }
        
        .crypto-hint {
            background-color: #0f3460;
            border-radius: 5px;
            padding: 10px;
            margin-top: 15px;
            font-size: 0.9rem;
        }
        
        .input-correct {
            border: 2px solid #4caf50 !important;
            background-color: rgba(76, 175, 80, 0.1);
        }
        
        .input-incorrect {
            border: 2px solid #f44336 !important;
            background-color: rgba(244, 67, 54, 0.1);
        }
    `;

    document.head.appendChild(style);

    // Éléments interactifs
    const clue1 = document.getElementById('clue-1');
    const clue2 = document.getElementById('clue-2');
    const clue3 = document.getElementById('clue-3');
    const solutionInput = document.getElementById('solution-input');
    const validateButton = document.getElementById('validate-button');
    const hintButton = document.getElementById('hint-button');
    const cryptoHint = document.getElementById('crypto-hint');
    const hintText = document.getElementById('hint-text');
    const solutionButton = document.getElementById('solution-button');
    const continueButton = document.getElementById('continue-button');

    // Animation des indices
    setTimeout(() => {
        clue2.style.opacity = '1';
        clue2.style.transform = 'scale(1.05)';
        setTimeout(() => {
            clue2.style.transform = 'scale(1)';
        }, 200);
    }, 1500);

    // Événements
    hintButton.addEventListener('click', () => {
        // Afficher l'indice
        cryptoHint.style.display = 'block';
        hintText.textContent = selectedMessage.hint;

        // Animer le troisième indice
        clue3.style.opacity = '1';
        clue3.style.transform = 'scale(1.05)';
        setTimeout(() => {
            clue3.style.transform = 'scale(1)';
        }, 200);

        // Masquer le bouton d'indice
        hintButton.style.display = 'none';

        // Afficher le bouton de solution après un certain temps
        setTimeout(() => {
            solutionButton.style.display = 'block';
        }, 10000); // 10 secondes avant d'afficher la solution
    });

    validateButton.addEventListener('click', () => {
        validateSolution();
    });

    solutionInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            validateSolution();
        }
    });

    solutionButton.addEventListener('click', () => {
        // Afficher la solution
        solutionInput.value = selectedMessage.solution;
        solutionInput.classList.add('input-correct');
        validateButton.style.display = 'none';
        solutionButton.style.display = 'none';
        continueButton.style.display = 'block';

        // Modifier le texte d'indice
        cryptoHint.style.display = 'block';
        hintText.innerHTML = '<strong>Solution:</strong> ' + selectedMessage.solution;
    });

    continueButton.addEventListener('click', () => {
        // Appeler le callback pour terminer l'interaction
        onComplete();
    });

    /**
     * Valide la solution proposée par l'utilisateur
     */
    function validateSolution() {
        const userSolution = solutionInput.value.trim().toUpperCase();
        const correctSolution = selectedMessage.solution;

        if (userSolution === correctSolution) {
            // Solution correcte
            solutionInput.classList.add('input-correct');
            validateButton.style.display = 'none';
            continueButton.style.display = 'block';

            // Afficher un message de réussite
            cryptoHint.style.display = 'block';
            hintText.innerHTML = '<strong>Bravo!</strong> Vous avez déchiffré le message secret!';
        } else {
            // Solution incorrecte
            solutionInput.classList.add('input-incorrect');
            setTimeout(() => {
                solutionInput.classList.remove('input-incorrect');
            }, 1000);

            // Afficher le bouton de solution après plusieurs tentatives
            if (!solutionButton.style.display || solutionButton.style.display === 'none') {
                setTimeout(() => {
                    solutionButton.style.display = 'block';
                }, 5000); // 5 secondes après une erreur
            }
        }
    }
}