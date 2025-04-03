/**
 * Interaction pour l'emoji Intelligence Artificielle & Data (🤖)
 * Interaction avec un mini-chatbot humoristique qui prédit votre parcours idéal
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function aiInteraction(container, emojiData, onComplete) {
    // Base de données de questions et réponses du chatbot
    const chatbotDatabase = {
        questions: [
            {
                id: "tech_preference",
                text: "Quelle technologie vous attire le plus?",
                options: [
                    { text: "Programmation et développement", value: "dev" },
                    { text: "Analyse de données et statistiques", value: "data" },
                    { text: "Design et interfaces", value: "design" },
                    { text: "Réseaux et sécurité", value: "security" }
                ]
            },
            {
                id: "work_style",
                text: "Comment préférez-vous travailler?",
                options: [
                    { text: "En résolvant des problèmes complexes", value: "problem_solver" },
                    { text: "En créant des choses visuelles", value: "creative" },
                    { text: "En collaborant avec d'autres personnes", value: "team" },
                    { text: "En analysant des données", value: "analytical" }
                ]
            },
            {
                id: "future_vision",
                text: "Quelle vision du futur vous passionne?",
                options: [
                    { text: "Un monde où l'IA nous aide au quotidien", value: "ai_world" },
                    { text: "Un internet ultra-sécurisé", value: "secure_web" },
                    { text: "Des expériences numériques immersives", value: "immersive" },
                    { text: "Des entreprises innovantes", value: "business" }
                ]
            }
        ],

        careers: [
            {
                id: "ia_expert",
                title: "Expert(e) en IA",
                description: "Vous êtes fait(e) pour créer les intelligences artificielles de demain! Algorithmes, machine learning et analyse prédictive seront votre quotidien.",
                emoji: "🧠",
                match: {
                    tech_preference: ["dev", "data"],
                    work_style: ["problem_solver", "analytical"],
                    future_vision: ["ai_world"]
                }
            },
            {
                id: "security_expert",
                title: "Expert(e) en Cybersécurité",
                description: "Protéger les données et les systèmes sera votre mission! Vous traquerez les failles et défendrez contre les cyberattaques.",
                emoji: "🔐",
                match: {
                    tech_preference: ["security", "dev"],
                    work_style: ["problem_solver", "analytical"],
                    future_vision: ["secure_web"]
                }
            },
            {
                id: "ux_designer",
                title: "UX/UI Designer",
                description: "Votre créativité et votre sens de l'esthétique seront essentiels pour créer des interfaces intuitives et agréables!",
                emoji: "🎨",
                match: {
                    tech_preference: ["design"],
                    work_style: ["creative"],
                    future_vision: ["immersive"]
                }
            },
            {
                id: "data_scientist",
                title: "Data Scientist",
                description: "Les données n'auront aucun secret pour vous! Vous excellerez dans l'analyse et l'extraction d'insights pertinents.",
                emoji: "📊",
                match: {
                    tech_preference: ["data"],
                    work_style: ["analytical"],
                    future_vision: ["ai_world", "business"]
                }
            },
            {
                id: "game_dev",
                title: "Développeur(se) de Jeux Vidéo",
                description: "Votre passion pour les jeux et votre créativité vous conduiront à créer des expériences ludiques innovantes!",
                emoji: "🎮",
                match: {
                    tech_preference: ["dev", "design"],
                    work_style: ["creative", "team"],
                    future_vision: ["immersive"]
                }
            },
            {
                id: "tech_entrepreneur",
                title: "Entrepreneur(e) Tech",
                description: "Vous avez l'âme d'un leader et la vision nécessaire pour créer votre propre startup technologique!",
                emoji: "💼",
                match: {
                    tech_preference: ["dev", "data", "security", "design"],
                    work_style: ["team"],
                    future_vision: ["business"]
                }
            }
        ],

        funFacts: [
            "Saviez-vous que 90% des données mondiales ont été créées ces deux dernières années?",
            "L'IA peut désormais composer de la musique, écrire des poèmes et même peindre des tableaux!",
            "Un développeur passe en moyenne 30% de son temps à chercher des bugs.",
            "Le premier 'bug' informatique était un vrai insecte coincé dans un ordinateur en 1947!",
            "En moyenne, un utilisateur clique sur 'J'accepte' pour les cookies sans lire 99% du temps.",
            "Le cerveau humain peut stocker environ 2,5 pétaoctets de données, bien plus que la plupart des ordinateurs!",
            "Le premier jeu vidéo commercial, Pong, a été créé en 1972.",
            "L'acronyme 'PNG' signifie 'PNG's Not GIF' - c'est un acronyme récursif!"
        ]
    };

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card ai-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Discutez avec notre IA pour découvrir votre parcours idéal!</p>
            </div>
            
            <div class="chatbot-container">
                <div class="chat-header">
                    <div class="bot-info">
                        <div class="bot-avatar">${emojiData.emoji}</div>
                        <div class="bot-name">YnovBot</div>
                    </div>
                    <div class="bot-status">En ligne</div>
                </div>
                
                <div class="chat-messages" id="chat-messages">
                    <!-- Messages générés dynamiquement -->
                </div>
                
                <div class="chat-input-container" id="chat-input-container">
                    <!-- Contenu généré dynamiquement -->
                </div>
            </div>
            
            <div class="interaction-content-spacer"></div>
        </div>
        
        <div class="interaction-footer">
            <button class="button continue-btn" id="continue-button">Continuer</button>
        </div>
    `;

    // Insérer le contenu dans le conteneur
    container.innerHTML = content;

    // Appliquer des styles spécifiques à cette interaction
    const style = document.createElement('style');
    style.textContent = `
        .chatbot-container {
            background-color: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            margin: 20px 0;
            max-height: 400px;
            display: flex;
            flex-direction: column;
            color: #333;
        }
        
        .chat-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f5f5f5;
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }
        
        .bot-info {
            display: flex;
            align-items: center;
        }
        
        .bot-avatar {
            width: 30px;
            height: 30px;
            background-color: #1e3c72;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            font-size: 1.2rem;
        }
        
        .bot-name {
            font-weight: 600;
            color: #333;
        }
        
        .bot-status {
            font-size: 0.8rem;
            color: #4caf50;
        }
        
        .chat-messages {
            padding: 15px;
            overflow-y: auto;
            flex: 1;
            min-height: 200px;
            max-height: 300px;
            background-color: #f9f9f9;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .message {
            max-width: 80%;
            padding: 10px 15px;
            border-radius: 15px;
            margin-bottom: 5px;
            position: relative;
            animation: messageAppear 0.3s ease-out;
        }
        
        @keyframes messageAppear {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .bot-message {
            background-color: #e3f2fd;
            color: #333;
            align-self: flex-start;
            border-bottom-left-radius: 5px;
        }
        
        .user-message {
            background-color: #1e3c72;
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 5px;
        }
        
        .thinking {
            display: flex;
            padding: 10px;
            align-self: flex-start;
        }
        
        .thinking-dot {
            width: 8px;
            height: 8px;
            background-color: #bbb;
            border-radius: 50%;
            margin: 0 2px;
            animation: thinking 1.4s infinite ease-in-out;
        }
        
        .thinking-dot:nth-child(1) {
            animation-delay: 0s;
        }
        
        .thinking-dot:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .thinking-dot:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes thinking {
            0%, 60%, 100% {
                transform: translateY(0);
            }
            30% {
                transform: translateY(-5px);
            }
        }
        
        .chat-input-container {
            padding: 15px;
            border-top: 1px solid #eee;
            background-color: white;
        }
        
        .text-input-container {
            display: flex;
            gap: 10px;
        }
        
        .chat-input {
            flex: 1;
            padding: 10px 15px;
            border: 1px solid #ddd;
            border-radius: 20px;
            outline: none;
            font-size: 0.9rem;
        }
        
        .chat-input:focus {
            border-color: #1e3c72;
        }
        
        .send-button {
            background-color: #1e3c72;
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .send-button:hover {
            background-color: #2a5298;
            transform: scale(1.05);
        }
        
        .options-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 10px;
            justify-content: center;
        }
        
        .option-button {
            background-color: #e3f2fd;
            border: 1px solid #bbdefb;
            border-radius: 20px;
            padding: 8px 15px;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
            color: #1e3c72;
            min-height: 44px;
            min-width: 130px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
        
        .option-button:hover {
            background-color: #bbdefb;
            transform: translateY(-2px);
        }
        
        .result-container {
            background-color: #e3f2fd;
            border: 2px solid #bbdefb;
            border-radius: 10px;
            padding: 15px;
            margin-top: 15px;
            text-align: center;
        }
        
        .result-emoji {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .result-title {
            font-weight: 600;
            color: #1e3c72;
            margin-bottom: 5px;
            font-size: 1.2rem;
        }
        
        .result-description {
            color: #333;
            margin-bottom: 15px;
        }
        
        .fun-fact {
            font-style: italic;
            font-size: 0.85rem;
            color: #555;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 1px solid #ddd;
        }
        
        .interaction-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(30, 60, 114, 0.95);
            padding: 15px;
            display: flex;
            justify-content: center;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
            z-index: 100;
        }
        
        .continue-btn {
            background-color: #2ecc71 !important;
            color: white;
            font-weight: bold;
            padding: 12px 30px;
            font-size: 1.1rem;
            border-radius: 30px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            animation: pulse 2s infinite;
            width: 80%;
            max-width: 300px;
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
        
        .interaction-content-spacer {
            height: 70px; /* Espace pour le footer fixe */
        }

        /* Améliorations pour mobile */
        @media (max-width: 480px) {
            .options-container {
                justify-content: center;
            }
            
            .option-button {
                min-height: 44px;
                min-width: 130px;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: 10px 15px;
            }
            
            .chat-messages {
                max-height: 250px;
            }
            
            .interaction-content-spacer {
                height: 80px;
            }
        }
    `;

    document.head.appendChild(style);

    // Éléments interactifs
    const chatMessages = document.getElementById('chat-messages');
    const chatInputContainer = document.getElementById('chat-input-container');
    const continueButton = document.getElementById('continue-button');

    // État de la conversation
    const conversationState = {
        step: 0,
        answers: {},
        result: null
    };

    // Démarrer la conversation
    startConversation();

    /**
     * Démarre la conversation avec le chatbot
     */
    function startConversation() {
        // Initialiser le conteneur de messages
        chatMessages.innerHTML = '';

        // Afficher le message d'accueil
        setTimeout(() => {
            addBotMessage("Bonjour! Je suis YnovBot, l'assistant intelligent d'Ynov Campus!");

            setTimeout(() => {
                addBotMessage("Je vais vous poser quelques questions pour déterminer quel parcours dans le numérique vous conviendrait le mieux! 🚀");

                setTimeout(() => {
                    // Poser la première question
                    askQuestion(0);
                }, 1000);
            }, 1500);
        }, 500);
    }

    /**
     * Pose une question à l'utilisateur
     * @param {number} questionIndex - Index de la question à poser
     */
    function askQuestion(questionIndex) {
        if (questionIndex >= chatbotDatabase.questions.length) {
            // Toutes les questions ont été posées, montrer le résultat
            showResult();
            return;
        }

        const question = chatbotDatabase.questions[questionIndex];

        // Afficher la question
        addBotMessage(question.text);

        // Afficher les options
        setTimeout(() => {
            showOptions(question.options, question.id, questionIndex);
        }, 800);
    }

    /**
     * Affiche les options de réponse
     * @param {Array} options - Liste des options disponibles
     * @param {string} questionId - Identifiant de la question
     * @param {number} questionIndex - Index de la question
     */
    function showOptions(options, questionId, questionIndex) {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';

        options.forEach((option) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text;

            button.addEventListener('click', () => {
                // Enregistrer la réponse
                conversationState.answers[questionId] = option.value;

                // Afficher la réponse de l'utilisateur
                addUserMessage(option.text);

                // Désactiver tous les boutons
                const buttons = optionsContainer.querySelectorAll('button');
                buttons.forEach((btn) => {
                    btn.disabled = true;
                    btn.style.opacity = '0.5';
                    btn.style.cursor = 'default';
                });

                // Montrer que le bot réfléchit
                const thinking = document.createElement('div');
                thinking.className = 'thinking';
                thinking.innerHTML = `
                    <div class="thinking-dot"></div>
                    <div class="thinking-dot"></div>
                    <div class="thinking-dot"></div>
                `;
                chatMessages.appendChild(thinking);

                // Faire défiler vers le bas
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Répondre après un délai
                setTimeout(() => {
                    // Supprimer l'animation de réflexion
                    chatMessages.removeChild(thinking);

                    // Réponse du bot
                    const responses = [
                        "Excellent choix!",
                        "Très intéressant!",
                        "Je vois, c'est noté!",
                        "Parfait, continuons!"
                    ];
                    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

                    addBotMessage(randomResponse);

                    // Passer à la question suivante
                    setTimeout(() => {
                        askQuestion(questionIndex + 1);
                    }, 1000);
                }, 1500);
            });

            optionsContainer.appendChild(button);
        });

        chatInputContainer.innerHTML = '';
        chatInputContainer.appendChild(optionsContainer);
    }

    /**
     * Affiche le résultat de l'analyse
     */
    function showResult() {
        // Déterminer le meilleur parcours en fonction des réponses
        const result = findBestCareerMatch(conversationState.answers);
        conversationState.result = result;

        // Afficher un message de préparation des résultats
        addBotMessage("Analyse en cours de vos réponses... 🧮");

        // Montrer que le bot réfléchit
        const thinking = document.createElement('div');
        thinking.className = 'thinking';
        thinking.innerHTML = `
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
            <div class="thinking-dot"></div>
        `;
        chatMessages.appendChild(thinking);

        // Simuler un temps de calcul
        setTimeout(() => {
            // Supprimer l'animation de réflexion
            chatMessages.removeChild(thinking);

            // Afficher le message de résultat
            addBotMessage("D'après mon analyse, voici le parcours qui vous correspondrait le mieux:");

            // Créer le conteneur de résultat
            const resultContainer = document.createElement('div');
            resultContainer.className = 'result-container';

            // Ajouter le contenu du résultat
            resultContainer.innerHTML = `
                <div class="result-emoji">${result.emoji}</div>
                <div class="result-title">${result.title}</div>
                <div class="result-description">${result.description}</div>
                <div class="fun-fact">Le saviez-vous? ${getRandomFunFact()}</div>
            `;

            // Ajouter un délai avant d'afficher le résultat
            setTimeout(() => {
                const messageDiv = document.createElement('div');
                messageDiv.className = 'message bot-message';
                messageDiv.appendChild(resultContainer);
                chatMessages.appendChild(messageDiv);

                // Faire défiler vers le bas
                chatMessages.scrollTop = chatMessages.scrollHeight;

                // Afficher un message final
                setTimeout(() => {
                    addBotMessage("N'hésitez pas à découvrir nos formations dans ce domaine chez Ynov Campus! 🎓");

                    // Définir un inputContainer vide
                    chatInputContainer.innerHTML = '';
                }, 1500);
            }, 1000);
        }, 2500);
    }

    /**
     * Ajoute un message du bot à la conversation
     * @param {string} text - Texte du message
     */
    function addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);

        // Faire défiler vers le bas
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /**
     * Ajoute un message de l'utilisateur à la conversation
     * @param {string} text - Texte du message
     */
    function addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user-message';
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);

        // Faire défiler vers le bas
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    /**
     * Détermine le meilleur parcours en fonction des réponses
     * @param {Object} answers - Réponses aux questions
     * @returns {Object} - Parcours correspondant le mieux
     */
    function findBestCareerMatch(answers) {
        // Calculer un score pour chaque parcours
        const scores = {};

        chatbotDatabase.careers.forEach(career => {
            scores[career.id] = 0;

            // Parcourir chaque critère de correspondance
            Object.keys(career.match).forEach(criterion => {
                if (answers[criterion] && career.match[criterion].includes(answers[criterion])) {
                    scores[career.id]++;
                }
            });
        });

        // Trouver le parcours avec le score le plus élevé
        let bestCareerId = null;
        let highestScore = -1;

        Object.keys(scores).forEach(careerId => {
            if (scores[careerId] > highestScore) {
                highestScore = scores[careerId];
                bestCareerId = careerId;
            }
        });

        // Retourner le parcours correspondant
        return chatbotDatabase.careers.find(career => career.id === bestCareerId);
    }

    /**
     * Retourne un fait amusant aléatoire
     * @returns {string} - Fait amusant
     */
    function getRandomFunFact() {
        const randomIndex = Math.floor(Math.random() * chatbotDatabase.funFacts.length);
        return chatbotDatabase.funFacts[randomIndex];
    }

    // Événement pour le bouton continuer
    continueButton.addEventListener('click', () => {
        // Appeler le callback pour terminer l'interaction
        onComplete();
    });
}