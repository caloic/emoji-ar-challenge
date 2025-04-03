/**
 * Interaction pour l'emoji Tech & Business (💼)
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

    // Liste des startups disponibles - Simplifiée et visuelle
    const startups = [
        {
            name: "EcoTech",
            description: "Solutions écologiques innovantes",
            icon: "🌱",
            category: "Écologie",
            riskLevel: "moyen",
            potential: 65
        },
        {
            name: "HealthAI",
            description: "IA pour le secteur médical",
            icon: "⚕️",
            category: "Santé",
            riskLevel: "élevé",
            potential: 85
        },
        {
            name: "SecureNet",
            description: "Protection des données",
            icon: "🔒",
            category: "Cybersécurité",
            riskLevel: "faible",
            potential: 50
        },
        {
            name: "VRLearn",
            description: "Formation en réalité virtuelle",
            icon: "🎓",
            category: "Éducation",
            riskLevel: "moyen",
            potential: 70
        },
        {
            name: "SmartHome",
            description: "Domotique intelligente",
            icon: "🏠",
            category: "IoT",
            riskLevel: "faible",
            potential: 60
        }
    ];

    // Montants d'investissement prédéfinis
    const investmentOptions = [
        { label: "10K€", value: 10000 },
        { label: "25K€", value: 25000 },
        { label: "50K€", value: 50000 },
        { label: "100K€", value: 100000 }
    ];

    // Créer le contenu de l'interaction - Version simplifiée
    const content = `
        <div class="interaction-card business-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Investissez dans une startup et découvrez votre rentabilité!</p>
            </div>
            
            <!-- Étape 1: Sélection de la startup -->
            <div id="startup-selection" class="startup-selection">
                <h3 class="section-title">Choisissez une startup</h3>
                <div id="startups-grid" class="startups-grid">
                    <!-- Les startups seront générées ici -->
                </div>
            </div>
            
            <!-- Étape 2: Choix du montant -->
            <div id="investment-step" class="investment-step" style="display:none;">
                <div class="nav-header">
                    <button id="back-to-startups" class="back-button">← Retour</button>
                    <h3 class="section-title">Choisir le montant</h3>
                </div>
                
                <div id="startup-summary" class="startup-summary">
                    <!-- Résumé de la startup sélectionnée -->
                </div>
                
                <div class="amount-selection">
                    <p class="selection-label">Sélectionnez votre investissement:</p>
                    <div id="amount-buttons" class="amount-buttons">
                        <!-- Boutons de montants -->
                    </div>
                </div>
                
                <button id="invest-button" class="action-button" disabled>
                    Investir maintenant
                </button>
            </div>
            
            <!-- Étape 3: Résultats -->
            <div id="results-step" class="results-step" style="display:none;">
                <div class="nav-header">
                    <button id="back-to-investment" class="back-button">← Retour</button>
                    <h3 class="section-title">Résultats à 1 an</h3>
                </div>
                
                <div id="results-container" class="results-container">
                    <!-- Résultats générés dynamiquement -->
                </div>
                
                <button id="restart-button" class="action-button primary-button">
                    Nouvel investissement
                </button>
            </div>
            
            <div class="interaction-button-container">
                <button class="button continue-btn" id="continue-button">Continuer</button>
            </div>
        </div>
    `;

    // Insérer le contenu dans le conteneur
    container.innerHTML = content;

    // Appliquer des styles spécifiques à cette interaction
    const style = document.createElement('style');
    style.textContent = `
        .business-card {
            background: linear-gradient(135deg, #24243e 0%, #302b63 50%, #0f0c29 100%);
            color: white;
            padding: 20px;
            padding-bottom: 100px;
            box-sizing: border-box;
        }
        
        .section-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 15px;
            text-align: center;
        }
        
        .startups-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
            margin-bottom: 30px;
        }
        
        .startup-card {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 15px;
            cursor: pointer;
            transition: all 0.2s;
            border: 2px solid transparent;
        }
        
        .startup-card:active {
            background-color: rgba(255, 255, 255, 0.2);
        }
        
        .startup-icon {
            font-size: 2rem;
            text-align: center;
            margin-bottom: 10px;
        }
        
        .startup-name {
            font-weight: 600;
            text-align: center;
            margin-bottom: 5px;
        }
        
        .startup-category {
            text-align: center;
            opacity: 0.7;
            font-size: 0.9rem;
        }
        
        .nav-header {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .back-button {
            background-color: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            font-size: 0.9rem;
        }
        
        .startup-summary {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .selection-label {
            margin-bottom: 15px;
            text-align: center;
        }
        
        .amount-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            margin-bottom: 20px;
        }
        
        .amount-button {
            background-color: rgba(255, 255, 255, 0.1);
            border: 2px solid transparent;
            border-radius: 10px;
            padding: 12px;
            text-align: center;
            cursor: pointer;
            font-size: 1.1rem;
            font-weight: 600;
        }
        
        .amount-button.selected {
            border-color: #7c4dff;
            background-color: rgba(124, 77, 255, 0.3);
        }
        
        .action-button {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            width: 100%;
            padding: 15px;
            border-radius: 12px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 30px;
        }
        
        .action-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .primary-button {
            background-color: #7c4dff;
        }
        
        .results-container {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            text-align: center;
        }
        
        .result-value {
            font-size: 2rem;
            font-weight: 700;
            margin: 15px 0;
        }
        
        .result-profit {
            display: inline-block;
            padding: 5px 12px;
            border-radius: 20px;
            font-weight: 600;
        }
        
        .profit-positive {
            background-color: rgba(76, 175, 80, 0.3);
        }
        
        .profit-negative {
            background-color: rgba(244, 67, 54, 0.3);
        }
        
        .result-message {
            font-style: italic;
            margin-top: 15px;
            opacity: 0.8;
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
            width: 100%;
            max-width: 300px;
        }
    `;

    document.head.appendChild(style);

    // Récupérer les éléments du DOM
    const startupSelection = document.getElementById('startup-selection');
    const startupsGrid = document.getElementById('startups-grid');
    const investmentStep = document.getElementById('investment-step');
    const startupSummary = document.getElementById('startup-summary');
    const resultsStep = document.getElementById('results-step');
    const resultsContainer = document.getElementById('results-container');
    const amountButtons = document.getElementById('amount-buttons');
    const investButton = document.getElementById('invest-button');
    const backToStartups = document.getElementById('back-to-startups');
    const backToInvestment = document.getElementById('back-to-investment');
    const restartButton = document.getElementById('restart-button');
    const continueButton = document.getElementById('continue-button');

    // Variables d'état
    let selectedStartup = null;
    let selectedAmount = null;

    // MISE À JOUR DE L'INTERFACE: Générer les startups avec des HTML strings
    let startupsHTML = '';
    startups.forEach((startup, index) => {
        startupsHTML += `
            <div class="startup-card" data-index="${index}">
                <div class="startup-icon">${startup.icon}</div>
                <div class="startup-name">${startup.name}</div>
                <div class="startup-category">${startup.category}</div>
            </div>
        `;
    });
    startupsGrid.innerHTML = startupsHTML;

    // Ajouter les événements de clic APRÈS avoir inséré le HTML
    document.querySelectorAll('.startup-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            console.log("Startup clicked:", startups[index].name);
            selectedStartup = startups[index];
            showInvestmentStep(selectedStartup);
        });
    });

    // MISE À JOUR DE L'INTERFACE: Générer les boutons de montant
    let amountsHTML = '';
    investmentOptions.forEach((option, index) => {
        amountsHTML += `
            <div class="amount-button" data-index="${index}" data-value="${option.value}">
                ${option.label}
            </div>
        `;
    });
    amountButtons.innerHTML = amountsHTML;

    // Ajouter les événements aux boutons de montant
    document.querySelectorAll('.amount-button').forEach((button) => {
        button.addEventListener('click', function() {
            document.querySelectorAll('.amount-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            this.classList.add('selected');

            selectedAmount = parseInt(this.getAttribute('data-value'));
            investButton.disabled = false;
            investButton.classList.add('primary-button');
        });
    });

    // Fonction pour afficher l'étape d'investissement
    function showInvestmentStep(startup) {
        // Créer le récapitulatif de la startup sélectionnée
        startupSummary.innerHTML = `
            <div class="summary-icon" style="font-size: 2.5rem; margin-bottom: 10px;">${startup.icon}</div>
            <div class="summary-name" style="font-size: 1.3rem; font-weight: 600; margin-bottom: 5px;">${startup.name}</div>
            <div class="summary-category" style="opacity: 0.7;">${startup.category}</div>
            <div class="summary-description" style="margin-top: 10px;">${startup.description}</div>
        `;

        // Passer à l'étape suivante
        startupSelection.style.display = 'none';
        investmentStep.style.display = 'block';

        // Réinitialiser la sélection de montant
        document.querySelectorAll('.amount-button').forEach(btn => {
            btn.classList.remove('selected');
        });

        investButton.disabled = true;
        investButton.classList.remove('primary-button');
    }

    // Fonction pour simuler l'investissement
    function simulateInvestment() {
        // Vérifier que les sélections sont faites
        if (!selectedStartup || !selectedAmount) return;

        // Facteurs basés sur le niveau de risque
        const riskFactors = {
            'faible': { min: 0.9, max: 1.4 },
            'moyen': { min: 0.7, max: 1.8 },
            'élevé': { min: 0.5, max: 2.3 }
        };

        const risk = riskFactors[selectedStartup.riskLevel];

        // Génération aléatoire du résultat
        const multiplier = risk.min + (Math.random() * (risk.max - risk.min));
        const finalValue = Math.round(selectedAmount * multiplier);
        const profit = finalValue - selectedAmount;
        const percentageChange = ((profit / selectedAmount) * 100).toFixed(1);
        const isPositive = profit >= 0;

        // Message basé sur le résultat
        let resultMessage;
        if (percentageChange >= 50) {
            resultMessage = "Incroyable! Votre investissement a été extrêmement rentable.";
        } else if (percentageChange >= 20) {
            resultMessage = "Excellent! Votre investissement a bien performé.";
        } else if (percentageChange >= 0) {
            resultMessage = "Bien joué! Votre investissement est rentable.";
        } else if (percentageChange >= -20) {
            resultMessage = "Votre investissement a connu une légère perte.";
        } else {
            resultMessage = "Malheureusement, votre investissement a subi une forte perte.";
        }

        // Afficher les résultats
        resultsContainer.innerHTML = `
            <div style="margin-bottom:15px;">
                <div style="font-size:2rem; margin-bottom:10px;">${selectedStartup.icon}</div>
                <div style="font-size:1.2rem; font-weight:600;">${selectedStartup.name}</div>
                <div style="opacity:0.7; margin-top:5px;">Investissement: ${selectedAmount.toLocaleString()}€</div>
            </div>
            
            <div class="result-value">${finalValue.toLocaleString()}€</div>
            
            <div style="margin:15px 0;">
                <span class="result-profit ${isPositive ? 'profit-positive' : 'profit-negative'}">
                    ${isPositive ? '+' : ''}${profit.toLocaleString()}€ (${isPositive ? '+' : ''}${percentageChange}%)
                </span>
            </div>
            
            <div class="result-message">${resultMessage}</div>
        `;

        // Passer à l'étape des résultats
        investmentStep.style.display = 'none';
        resultsStep.style.display = 'block';
    }

    // Configurer tous les événements
    investButton.addEventListener('click', function() {
        simulateInvestment();
    });

    backToStartups.addEventListener('click', function() {
        investmentStep.style.display = 'none';
        startupSelection.style.display = 'block';
    });

    backToInvestment.addEventListener('click', function() {
        resultsStep.style.display = 'none';
        investmentStep.style.display = 'block';
    });

    restartButton.addEventListener('click', function() {
        // Réinitialiser les sélections
        selectedStartup = null;
        selectedAmount = null;

        // Retourner à la sélection de startup
        resultsStep.style.display = 'none';
        startupSelection.style.display = 'block';
    });

    continueButton.addEventListener('click', function() {
        // Réafficher les boutons d'action
        if (actionButtons) {
            actionButtons.style.display = 'flex';
        }

        // Terminer l'interaction
        onComplete();
    });
}