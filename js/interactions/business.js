/**
 * Interaction pour l'emoji Tech & Business (💼)
 * Simulation simplifiée d'investissement dans une startup - Optimisée pour mobile
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function businessInteraction(container, emojiData, onComplete) {
    // Masquer les boutons d'action en bas
    const actionButtons = document.getElementById('action-buttons');
    if (actionButtons) {
        actionButtons.style.display = 'none';
    }

    // Liste des startups disponibles - Simplifiée avec des données claires
    const startups = [
        {
            name: "EcoTech",
            description: "Produits durables et technologies vertes",
            icon: "🌱",
            category: "Écologie",
            riskLevel: "moyen",
            potential: 65,
            multiplier: { min: 0.8, max: 1.7 }
        },
        {
            name: "MediHealth",
            description: "Intelligence artificielle pour la santé",
            icon: "⚕️",
            category: "Santé",
            riskLevel: "élevé",
            potential: 85,
            multiplier: { min: 0.6, max: 2.2 }
        },
        {
            name: "CyberShield",
            description: "Protection des données personnelles",
            icon: "🔒",
            category: "Cybersécurité",
            riskLevel: "faible",
            potential: 50,
            multiplier: { min: 0.9, max: 1.4 }
        },
        {
            name: "LearnVR",
            description: "Éducation en réalité virtuelle",
            icon: "🎓",
            category: "Éducation",
            riskLevel: "moyen",
            potential: 70,
            multiplier: { min: 0.7, max: 1.8 }
        }
    ];

    // Montants d'investissement prédéfinis pour simplifier le choix
    const investmentOptions = [
        { label: "10K€", value: 10000 },
        { label: "25K€", value: 25000 },
        { label: "50K€", value: 50000 },
        { label: "100K€", value: 100000 }
    ];

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card business-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Choisissez une startup, investissez et découvrez votre rentabilité!</p>
            </div>
            
            <div class="business-simulator">
                <!-- Étape 1: Sélection de la startup -->
                <div class="simulator-step" id="startup-selection">
                    <h3 class="step-title">Sélectionnez une startup</h3>
                    <div class="startups-grid" id="startups-grid">
                        <!-- Généré dynamiquement -->
                    </div>
                </div>
                
                <!-- Étape 2: Choix d'investissement -->
                <div class="simulator-step" id="investment-step" style="display: none;">
                    <div class="step-header">
                        <button class="back-button" id="back-to-startups">
                            <span>←</span>
                        </button>
                        <h3 class="step-title">Montant d'investissement</h3>
                    </div>
                    
                    <div class="startup-summary" id="startup-summary">
                        <!-- Généré dynamiquement -->
                    </div>
                    
                    <div class="investment-options">
                        <div class="options-title">Choisissez votre investissement:</div>
                        <div class="amount-buttons" id="amount-buttons">
                            <!-- Généré dynamiquement -->
                        </div>
                    </div>
                    
                    <button class="action-button primary-button" id="invest-button">Investir maintenant</button>
                </div>
                
                <!-- Étape 3: Résultats -->
                <div class="simulator-step" id="results-step" style="display: none;">
                    <div class="step-header">
                        <button class="back-button" id="back-to-investment">
                            <span>←</span>
                        </button>
                        <h3 class="step-title">Résultats à 1 an</h3>
                    </div>
                    
                    <div class="results-container" id="results-container">
                        <!-- Généré dynamiquement -->
                    </div>
                    
                    <button class="action-button primary-button" id="restart-button">Nouvel investissement</button>
                </div>
            </div>
            
            <div class="interaction-button-container">
                <button class="button continue-btn" id="continue-button">Continuer</button>
            </div>
        </div>
    `;

    // Insérer le contenu dans le conteneur
    container.innerHTML = content;

    // Appliquer des styles spécifiques à cette interaction - Optimisés pour mobile
    const style = document.createElement('style');
    style.textContent = `
        .business-card {
            background: linear-gradient(135deg, #24243e 0%, #302b63 50%, #0f0c29 100%);
            color: white;
            padding: 20px;
            padding-bottom: 100px; /* Espace pour les boutons */
            min-height: 100vh; /* Assurer que la carte remplit toute la hauteur */
            position: relative; /* Pour le positionnement absolu des boutons */
            box-sizing: border-box;
        }
        
        .business-simulator {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            margin: 20px 0;
            color: white;
        }
        
        .simulator-step {
            padding: 20px;
        }
        
        .step-header {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .back-button {
            background-color: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            cursor: pointer;
            font-size: 1.2rem;
            min-height: 44px;
            min-width: 44px;
        }
        
        .back-button:hover {
            background-color: rgba(255, 255, 255, 0.3);
        }
        
        .step-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
            flex: 1;
        }
        
        .startups-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 15px;
        }
        
        .startup-card {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 15px;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            flex-direction: column;
            border: 2px solid transparent;
            min-height: 100px;
        }
        
        .startup-card:hover, .startup-card:active {
            background-color: rgba(255, 255, 255, 0.2);
            transform: translateY(-3px);
            border-color: rgba(255, 255, 255, 0.4);
        }
        
        .startup-header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .startup-icon {
            font-size: 2rem;
            margin-right: 10px;
            background-color: rgba(255, 255, 255, 0.15);
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .startup-info {
            flex: 1;
        }
        
        .startup-name {
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 3px;
        }
        
        .startup-category {
            font-size: 0.8rem;
            opacity: 0.8;
        }
        
        .startup-description {
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .startup-metrics {
            display: flex;
            justify-content: space-between;
            margin-top: 10px;
            font-size: 0.85rem;
        }
        
        .metric {
            display: flex;
            align-items: center;
        }
        
        .metric-icon {
            margin-right: 5px;
            font-size: 1rem;
        }
        
        .metric-value {
            font-weight: 600;
        }
        
        .risk-low {
            color: #4caf50;
        }
        
        .risk-medium {
            color: #ffeb3b;
        }
        
        .risk-high {
            color: #ff5252;
        }
        
        .startup-summary {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 20px;
        }
        
        .investment-options {
            margin-bottom: 20px;
        }
        
        .options-title {
            font-size: 1rem;
            margin-bottom: 10px;
            text-align: center;
        }
        
        .amount-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        
        .amount-button {
            background-color: rgba(255, 255, 255, 0.1);
            border: 2px solid transparent;
            border-radius: 10px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 1.1rem;
            font-weight: 600;
            min-height: 60px;
        }
        
        .amount-button:hover, .amount-button:active {
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        .amount-button.selected {
            border-color: #7c4dff;
            background-color: rgba(124, 77, 255, 0.3);
        }
        
        .action-button {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            padding: 15px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.2s;
            width: 100%;
            margin-top: 10px;
            min-height: 50px;
        }
        
        .primary-button {
            background-color: #7c4dff;
        }
        
        .primary-button:hover, .primary-button:active {
            background-color: #6039e0;
            transform: translateY(-2px);
        }
        
        .results-container {
            text-align: center;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            margin-bottom: 20px;
        }
        
        .result-header {
            margin-bottom: 15px;
        }
        
        .result-startup {
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .result-startup-icon {
            font-size: 1.5rem;
            margin-right: 10px;
        }
        
        .result-investment {
            font-size: 0.9rem;
            opacity: 0.8;
        }
        
        .result-value {
            font-size: 2.2rem;
            font-weight: 700;
            margin: 20px 0;
        }
        
        .result-comparison {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            margin-bottom: 15px;
        }
        
        .result-profit {
            font-weight: 600;
            margin-left: 10px;
        }
        
        .profit-positive {
            color: #4caf50;
        }
        
        .profit-negative {
            color: #ff5252;
        }
        
        .result-message {
            font-style: italic;
            margin-top: 15px;
            font-size: 0.9rem;
            opacity: 0.9;
        }
        
        .result-progress {
            height: 10px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 5px;
            margin: 15px 0;
            overflow: hidden;
        }
        
        .result-progress-fill {
            height: 100%;
            border-radius: 5px;
            transition: width 1.5s cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        
        .positive-fill {
            background-color: #4caf50;
        }
        
        .negative-fill {
            background-color: #ff5252;
        }
        
        .interaction-button-container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(36, 36, 62, 0.95);
            padding: 20px;
            display: flex;
            justify-content: center;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.2);
            z-index: 100;
        }
        
        .continue-btn {
            background-color: #0f0c29 !important;
            color: white;
            font-weight: bold;
            padding: 12px 30px;
            font-size: 1.1rem;
            border-radius: 30px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            animation: pulse 2s infinite;
            width: 80%;
            max-width: 300px;
            min-height: 50px;
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

        /* Ajustements pour mobile */
        @media (max-width: 480px) {
            .simulator-step {
                padding: 15px;
            }
            
            .startups-grid {
                gap: 10px;
            }
            
            .startup-card {
                padding: 12px;
            }
            
            .startup-icon {
                width: 44px;
                height: 44px;
                font-size: 1.6rem;
            }
            
            .startup-name {
                font-size: 1rem;
            }
            
            .action-button {
                min-height: 54px;
            }
            
            .interaction-button-container {
                padding: 15px;
            }
            
            .continue-btn {
                width: 100%;
            }
        }
    `;

    document.head.appendChild(style);

    // Variables d'état
    let selectedStartup = null;
    let selectedAmount = null;
    let investmentResult = null;

    // Éléments d'interface
    const startupsGrid = document.getElementById('startups-grid');
    const startupSelection = document.getElementById('startup-selection');
    const investmentStep = document.getElementById('investment-step');
    const resultsStep = document.getElementById('results-step');
    const startupSummary = document.getElementById('startup-summary');
    const amountButtons = document.getElementById('amount-buttons');
    const investButton = document.getElementById('invest-button');
    const resultsContainer = document.getElementById('results-container');
    const backToStartups = document.getElementById('back-to-startups');
    const backToInvestment = document.getElementById('back-to-investment');
    const restartButton = document.getElementById('restart-button');
    const continueButton = document.getElementById('continue-button');

    // Générer les cartes de startups
    startups.forEach(startup => {
        const card = document.createElement('div');
        card.className = 'startup-card';

        // Définir les classes de risque
        let riskClass, riskIcon;
        switch(startup.riskLevel) {
            case 'faible':
                riskClass = 'risk-low';
                riskIcon = '🔍'; // Icône de risque faible
                break;
            case 'moyen':
                riskClass = 'risk-medium';
                riskIcon = '⚠️'; // Icône de risque moyen
                break;
            case 'élevé':
                riskClass = 'risk-high';
                riskIcon = '🔥'; // Icône de risque élevé
                break;
        }

        card.innerHTML = `
            <div class="startup-header">
                <div class="startup-icon">${startup.icon}</div>
                <div class="startup-info">
                    <div class="startup-name">${startup.name}</div>
                    <div class="startup-category">${startup.category}</div>
                </div>
            </div>
            <div class="startup-description">${startup.description}</div>
            <div class="startup-metrics">
                <div class="metric">
                    <span class="metric-icon ${riskClass}">${riskIcon}</span>
                    <span class="metric-value">Risque ${startup.riskLevel}</span>
                </div>
                <div class="metric">
                    <span class="metric-icon">⭐</span>
                    <span class="metric-value">Potentiel ${startup.potential}%</span>
                </div>
            </div>
        `;

        card.addEventListener('click', () => {
            selectedStartup = startup;
            showInvestmentStep();
        });

        startupsGrid.appendChild(card);
    });

    // Générer les boutons de montant
    investmentOptions.forEach(option => {
        const button = document.createElement('div');
        button.className = 'amount-button';
        button.textContent = option.label;

        button.addEventListener('click', () => {
            // Désélectionner tous les boutons
            document.querySelectorAll('.amount-button').forEach(btn => {
                btn.classList.remove('selected');
            });

            // Sélectionner ce bouton
            button.classList.add('selected');

            // Mettre à jour le montant sélectionné
            selectedAmount = option.value;

            // Activer le bouton d'investissement
            investButton.disabled = false;
            investButton.classList.add('primary-button');
        });

        amountButtons.appendChild(button);
    });

    // Fonction pour afficher l'étape d'investissement
    function showInvestmentStep() {
        // Mettre à jour le récapitulatif de la startup
        startupSummary.innerHTML = `
            <div class="startup-header">
                <div class="startup-icon" style="font-size:1.5rem">${selectedStartup.icon}</div>
                <div class="startup-info">
                    <div class="startup-name">${selectedStartup.name}</div>
                    <div class="startup-category">${selectedStartup.category}</div>
                </div>
            </div>
            <div class="startup-description">${selectedStartup.description}</div>
        `;

        // Afficher l'étape d'investissement
        startupSelection.style.display = 'none';
        investmentStep.style.display = 'block';

        // Désactiver le bouton d'investissement jusqu'à ce qu'un montant soit sélectionné
        investButton.disabled = true;
        investButton.classList.remove('primary-button');
    }

    // Fonction pour simuler l'investissement
    function simulateInvestment() {
        // Vérifier que les sélections sont faites
        if (!selectedStartup || !selectedAmount) return;

        // Générer un multiplicateur aléatoire basé sur le profil de risque
        const multiplierRange = selectedStartup.multiplier;
        const multiplier = multiplierRange.min + (Math.random() * (multiplierRange.max - multiplierRange.min));

        // Calculer la valeur finale
        const finalValue = Math.round(selectedAmount * multiplier);
        const profit = finalValue - selectedAmount;
        const percentageChange = ((finalValue - selectedAmount) / selectedAmount * 100).toFixed(1);
        const isPositive = profit >= 0;

        // Sauvegarder le résultat
        investmentResult = {
            startupName: selectedStartup.name,
            startupIcon: selectedStartup.icon,
            initialInvestment: selectedAmount,
            finalValue: finalValue,
            profit: profit,
            percentageChange: percentageChange,
            isPositive: isPositive
        };

        // Générer un message basé sur le résultat
        let resultMessage;
        if (percentageChange >= 50) {
            resultMessage = "Félicitations! Votre investissement a été extrêmement fructueux.";
        } else if (percentageChange >= 20) {
            resultMessage = "Beau travail! Votre investissement a été très rentable.";
        } else if (percentageChange >= 0) {
            resultMessage = "Votre investissement est rentable.";
        } else if (percentageChange >= -20) {
            resultMessage = "Votre investissement a subi une légère perte.";
        } else {
            resultMessage = "Votre investissement a malheureusement subi une forte perte.";
        }

        investmentResult.message = resultMessage;

        // Afficher les résultats
        showResults();
    }

    // Fonction pour afficher les résultats
    function showResults() {
        // Préparer le contenu des résultats
        resultsContainer.innerHTML = `
            <div class="result-header">
                <div class="result-startup">
                    <span class="result-startup-icon">${investmentResult.startupIcon}</span>
                    <span>${investmentResult.startupName}</span>
                </div>
                <div class="result-investment">Investissement: ${investmentResult.initialInvestment.toLocaleString()}€</div>
            </div>
            
            <div class="result-value">${investmentResult.finalValue.toLocaleString()}€</div>
            
            <div class="result-progress">
                <div class="result-progress-fill ${investmentResult.isPositive ? 'positive-fill' : 'negative-fill'}" 
                     style="width: 0%;"></div>
            </div>
            
            <div class="result-comparison">
                <span>Rendement:</span>
                <span class="result-profit ${investmentResult.isPositive ? 'profit-positive' : 'profit-negative'}">
                    ${investmentResult.isPositive ? '+' : ''}${investmentResult.profit.toLocaleString()}€ 
                    (${investmentResult.isPositive ? '+' : ''}${investmentResult.percentageChange}%)
                </span>
            </div>
            
            <div class="result-message">${investmentResult.message}</div>
        `;

        // Afficher l'étape des résultats
        investmentStep.style.display = 'none';
        resultsStep.style.display = 'block';

        // Animer la barre de progression
        setTimeout(() => {
            const progressFill = resultsContainer.querySelector('.result-progress-fill');
            const percentage = Math.abs(parseFloat(investmentResult.percentageChange));
            const normalizedWidth = Math.min(100, Math.max(10, percentage * 2)); // Limiter entre 10% et 100%

            progressFill.style.width = `${normalizedWidth}%`;
        }, 300);
    }

    // Événements
    investButton.addEventListener('click', () => {
        if (selectedAmount) {
            simulateInvestment();
        }
    });

    backToStartups.addEventListener('click', () => {
        investmentStep.style.display = 'none';
        startupSelection.style.display = 'block';
    });

    backToInvestment.addEventListener('click', () => {
        resultsStep.style.display = 'none';
        investmentStep.style.display = 'block';
    });

    restartButton.addEventListener('click', () => {
        // Réinitialiser l'état
        selectedStartup = null;
        selectedAmount = null;
        investmentResult = null;

        // Désélectionner tous les boutons de montant
        document.querySelectorAll('.amount-button').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Revenir à la sélection de startup
        resultsStep.style.display = 'none';
        startupSelection.style.display = 'block';
    });

    continueButton.addEventListener('click', () => {
        // Réafficher les boutons d'action en bas
        if (actionButtons) {
            actionButtons.style.display = 'flex';
        }

        // Appeler le callback pour terminer l'interaction
        onComplete();
    });
}