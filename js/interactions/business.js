/**
 * Interaction pour l'emoji Tech & Business (💼)
 * Simulation simplifiée d'investissement dans une startup - Optimisée pour mobile
 * Correction des problèmes de défilement
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

    // Créer le contenu de l'interaction avec un design plus grid et visuel
    const content = `
        <div class="interaction-card business-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Investissez dans une startup et découvrez comment évolue votre investissement!</p>
            </div>
            
            <div class="business-simulator-container">
                <!-- Étape 1: Sélection de la startup -->
                <div class="simulator-step" id="startup-selection">
                    <h3 class="step-title">Choisissez une startup</h3>
                    <div class="startups-grid" id="startups-grid">
                        <!-- Cartes de startups générées dynamiquement -->
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
                        <!-- Générée dynamiquement -->
                    </div>
                    
                    <div class="investment-options">
                        <div class="options-title">Choisissez votre investissement:</div>
                        <div class="amount-buttons" id="amount-buttons">
                            <!-- Montants générés dynamiquement -->
                        </div>
                    </div>
                    
                    <button class="action-button primary-button" id="invest-button">Investir</button>
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
                        <!-- Générés dynamiquement -->
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

    // Appliquer des styles spécifiques à cette interaction - Optimisés pour empêcher les conflits de défilement
    const style = document.createElement('style');
    style.textContent = `
        .business-card {
            background: linear-gradient(135deg, #24243e 0%, #302b63 50%, #0f0c29 100%);
            color: white;
            padding: 20px;
            padding-bottom: 100px;
            position: relative;
            box-sizing: border-box;
            touch-action: pan-y; /* Autoriser seulement le défilement vertical */
            min-height: 100vh;
        }
        
        .business-simulator-container {
            position: relative;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 16px;
            overflow: visible; /* Important pour éviter les problèmes de défilement */
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            margin: 20px 0 80px 0; /* Marge supplémentaire en bas */
            color: white;
        }
        
        .simulator-step {
            padding: 20px;
            width: 100%;
            box-sizing: border-box;
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
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 10px;
            cursor: pointer;
            font-size: 1.2rem;
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
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
        }
        
        .startup-card {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 15px;
            cursor: pointer;
            transition: all 0.3s;
            border: 2px solid transparent;
            min-height: 120px;
            display: flex;
            flex-direction: column;
            touch-action: manipulation; /* Important pour les éléments tactiles */
        }
        
        .startup-card:active {
            transform: scale(0.97);
            background-color: rgba(255, 255, 255, 0.18);
        }
        
        .startup-card.selected {
            border-color: rgba(255, 255, 255, 0.4);
            background-color: rgba(255, 255, 255, 0.15);
        }
        
        .startup-icon {
            font-size: 1.8rem;
            margin-bottom: 8px;
            text-align: center;
        }
        
        .startup-name {
            font-weight: 600;
            font-size: 1.1rem;
            margin-bottom: 3px;
            text-align: center;
        }
        
        .startup-category {
            font-size: 0.9rem;
            opacity: 0.8;
            text-align: center;
            margin-bottom: 8px;
        }
        
        .startup-metrics {
            display: flex;
            justify-content: center;
            margin-top: auto;
            gap: 10px;
        }
        
        .risk-badge {
            font-size: 0.75rem;
            padding: 3px 8px;
            border-radius: 10px;
            text-transform: uppercase;
        }
        
        .risk-low {
            background-color: rgba(76, 175, 80, 0.3);
        }
        
        .risk-medium {
            background-color: rgba(255, 152, 0, 0.3);
        }
        
        .risk-high {
            background-color: rgba(244, 67, 54, 0.3);
        }
        
        .startup-summary {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 15px;
            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
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
            padding: 12px 5px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 1.1rem;
            font-weight: 600;
            min-height: 50px;
            touch-action: manipulation;
        }
        
        .amount-button:active {
            transform: scale(0.97);
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
            min-height: 54px;
            touch-action: manipulation;
        }
        
        .primary-button {
            background-color: #7c4dff;
        }
        
        .primary-button:active {
            transform: scale(0.98);
        }
        
        .results-container {
            text-align: center;
            padding: 20px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            margin-bottom: 20px;
        }
        
        .result-value {
            font-size: 2.2rem;
            font-weight: 700;
            margin: 20px 0;
        }
        
        .result-profit {
            display: inline-block;
            font-weight: 600;
            padding: 5px 10px;
            border-radius: 15px;
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
            touch-action: manipulation;
        }
        
        .continue-btn {
            background-color: #0f0c29 !important;
            color: white;
            font-weight: bold;
            padding: 12px 30px;
            font-size: 1.1rem;
            border-radius: 30px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            width: 80%;
            max-width: 300px;
            min-height: 54px;
            touch-action: manipulation;
        }
        
        /* Corrections pour éviter les problèmes de défilement sur mobile */
        body.with-active-interaction {
            overflow: auto !important;
            position: static !important;
            height: auto !important;
            touch-action: pan-y !important;
        }
        
        .interaction-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1000;
            overflow-y: auto !important;
            -webkit-overflow-scrolling: touch;
            touch-action: pan-y !important;
            height: 100% !important;
        }
        
        .interaction-wrapper {
            min-height: 100%;
            padding-bottom: 100px;
            touch-action: pan-y !important;
            overflow-y: visible !important;
        }
        
        /* Adaptations pour petits écrans */
        @media (max-width: 480px) {
            .startups-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
            }
            
            .startup-card {
                padding: 12px;
                min-height: auto;
            }
            
            .startup-icon {
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

    // Éléments interactifs
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

    // Empêcher les problèmes de défilement
    document.body.classList.add('with-active-interaction');

    // Générer les cartes de startups - Version simplifiée et visuelle
    startups.forEach(startup => {
        const card = document.createElement('div');
        card.className = 'startup-card';

        // Définir la classe de risque
        let riskClass;
        switch(startup.riskLevel) {
            case 'faible':
                riskClass = 'risk-low';
                break;
            case 'moyen':
                riskClass = 'risk-medium';
                break;
            case 'élevé':
                riskClass = 'risk-high';
                break;
        }

        // Structure simplifiée - plus visuelle
        card.innerHTML = `
            <div class="startup-icon">${startup.icon}</div>
            <div class="startup-name">${startup.name}</div>
            <div class="startup-category">${startup.category}</div>
            <div class="startup-metrics">
                <span class="risk-badge ${riskClass}">Risque ${startup.riskLevel}</span>
            </div>
        `;

        // Gestion des événements tactiles
        card.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Désélectionner toutes les cartes
            document.querySelectorAll('.startup-card').forEach(c => {
                c.classList.remove('selected');
            });

            // Sélectionner cette carte
            card.classList.add('selected');
            selectedStartup = startup;

            // Montrer l'étape d'investissement
            showInvestmentStep();
        });

        startupsGrid.appendChild(card);
    });

    // Générer les boutons de montant
    investmentOptions.forEach(option => {
        const button = document.createElement('div');
        button.className = 'amount-button';
        button.textContent = option.label;

        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

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
            <div class="startup-icon" style="font-size:2.5rem; margin-bottom:15px;">${selectedStartup.icon}</div>
            <div class="startup-name" style="font-size:1.3rem; margin-bottom:5px;">${selectedStartup.name}</div>
            <div class="startup-category">${selectedStartup.category}</div>
            <div class="startup-description" style="margin-top:10px;">${selectedStartup.description}</div>
        `;

        // Afficher l'étape d'investissement
        startupSelection.style.display = 'none';
        investmentStep.style.display = 'block';

        // Désactiver le bouton d'investissement jusqu'à ce qu'un montant soit sélectionné
        investButton.disabled = true;
        investButton.classList.remove('primary-button');

        // Faire défiler vers le haut
        container.scrollTo(0, 0);
    }

    // Fonction pour simuler l'investissement
    function simulateInvestment() {
        // Vérifier les sélections
        if (!selectedStartup || !selectedAmount) return;

        // Facteur base sur le potentiel et le risque
        const riskFactors = {
            'faible': { min: 0.9, max: 1.4 },
            'moyen': { min: 0.7, max: 1.8 },
            'élevé': { min: 0.5, max: 2.3 }
        };

        const risk = riskFactors[selectedStartup.riskLevel];

        // Générer un résultat aléatoire
        const multiplier = risk.min + (Math.random() * (risk.max - risk.min));
        const finalValue = Math.round(selectedAmount * multiplier);
        const profit = finalValue - selectedAmount;
        const percentageChange = ((finalValue - selectedAmount) / selectedAmount * 100).toFixed(1);
        const isPositive = profit >= 0;

        // Sauvegarder le résultat
        investmentResult = {
            startup: selectedStartup,
            initialInvestment: selectedAmount,
            finalValue: finalValue,
            profit: profit,
            percentageChange: percentageChange,
            isPositive: isPositive
        };

        // Générer un message
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
        // Préparer l'affichage des résultats
        resultsContainer.innerHTML = `
            <div style="margin-bottom:20px;">
                <div class="startup-icon" style="font-size:2.5rem; margin-bottom:10px;">${investmentResult.startup.icon}</div>
                <div class="startup-name" style="font-size:1.3rem;">${investmentResult.startup.name}</div>
                <div style="opacity:0.8; margin:5px 0;">Investissement: ${investmentResult.initialInvestment.toLocaleString()}€</div>
            </div>
            
            <div class="result-value">${investmentResult.finalValue.toLocaleString()}€</div>
            
            <div class="result-progress">
                <div class="result-progress-fill ${investmentResult.isPositive ? 'positive-fill' : 'negative-fill'}" 
                     style="width: 0%;"></div>
            </div>
            
            <div style="margin:15px 0;">
                <div class="result-profit ${investmentResult.isPositive ? 'profit-positive' : 'profit-negative'}">
                    ${investmentResult.isPositive ? '+' : ''}${investmentResult.profit.toLocaleString()}€ 
                    (${investmentResult.isPositive ? '+' : ''}${investmentResult.percentageChange}%)
                </div>
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
            const normalizedWidth = Math.min(100, Math.max(10, percentage * 2));

            progressFill.style.width = `${normalizedWidth}%`;
        }, 300);

        // Faire défiler vers le haut
        container.scrollTo(0, 0);
    }

    // Gérer les événements de l'interface
    investButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (selectedAmount) {
            simulateInvestment();
        }
    });

    backToStartups.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        investmentStep.style.display = 'none';
        startupSelection.style.display = 'block';

        // Faire défiler vers le haut
        container.scrollTo(0, 0);
    });

    backToInvestment.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        resultsStep.style.display = 'none';
        investmentStep.style.display = 'block';

        // Faire défiler vers le haut
        container.scrollTo(0, 0);
    });

    restartButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Réinitialiser les sélections
        selectedStartup = null;
        selectedAmount = null;
        investmentResult = null;

        // Désélectionner tous les boutons et cartes
        document.querySelectorAll('.startup-card').forEach(card => {
            card.classList.remove('selected');
        });

        document.querySelectorAll('.amount-button').forEach(btn => {
            btn.classList.remove('selected');
        });

        // Revenir à la sélection de startup
        resultsStep.style.display = 'none';
        startupSelection.style.display = 'block';

        // Faire défiler vers le haut
        container.scrollTo(0, 0);
    });

    continueButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Nettoyer le correctif de défilement
        document.body.classList.remove('with-active-interaction');

        // Réafficher les boutons d'action
        if (actionButtons) {
            actionButtons.style.display = 'flex';
        }

        // Appeler le callback de fin
        onComplete();
    });

    // Empêcher la propagation des événements de défilement
    container.addEventListener('touchmove', (e) => {
        e.stopPropagation();
    }, { passive: true });

    // S'assurer que les événements de clic sont bien gérés
    document.addEventListener('click', (e) => {
        if (e.target.closest('.startup-card, .amount-button, .action-button, .back-button')) {
            e.stopPropagation();
        }
    }, { capture: true });
}