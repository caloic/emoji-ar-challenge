/**
 * Interaction pour l'emoji Tech & Business (💼)
 * Simulation amusante d'investissement dans une startup virtuelle
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function businessInteraction(container, emojiData, onComplete) {
    // Liste des startups disponibles
    const startups = [
        {
            name: "EcoTech",
            description: "Solutions technologiques pour l'environnement et le développement durable.",
            domain: "Écologie",
            logo: "🌱",
            risk: "medium",
            baseGrowth: 25,
            growthVariance: 20
        },
        {
            name: "HealthAI",
            description: "Intelligence artificielle appliquée au secteur de la santé.",
            domain: "Santé",
            logo: "🩺",
            risk: "high",
            baseGrowth: 45,
            growthVariance: 40
        },
        {
            name: "SecureNet",
            description: "Sécurité informatique et protection des données personnelles.",
            domain: "Cybersécurité",
            logo: "🔒",
            risk: "low",
            baseGrowth: 15,
            growthVariance: 10
        },
        {
            name: "VRLearn",
            description: "Plateforme éducative en réalité virtuelle pour les étudiants.",
            domain: "Éducation",
            logo: "🎓",
            risk: "medium",
            baseGrowth: 30,
            growthVariance: 25
        },
        {
            name: "SmartHome",
            description: "Objets connectés et domotique pour la maison intelligente.",
            domain: "IoT",
            logo: "🏠",
            risk: "low",
            baseGrowth: 20,
            growthVariance: 15
        }
    ];

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card business-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Investissez dans une startup et voyez comment évolue votre investissement!</p>
            </div>
            
            <div class="startup-simulator">
                <div class="simulator-step" id="startup-selection">
                    <h3 class="step-title">Choisissez une startup</h3>
                    <div class="startups-grid" id="startups-grid">
                        <!-- Startups générées dynamiquement -->
                    </div>
                    <div class="startup-details" id="startup-details">
                        <div class="details-placeholder">Sélectionnez une startup pour voir les détails</div>
                    </div>
                </div>
                
                <div class="simulator-step" id="investment-step" style="display: none;">
                    <h3 class="step-title">Montant de l'investissement</h3>
                    <div class="investment-controls">
                        <div class="investment-slider-container">
                            <input type="range" id="investment-slider" min="10000" max="100000" step="5000" value="50000" class="investment-slider">
                            <div class="slider-labels">
                                <span>10K€</span>
                                <span>100K€</span>
                            </div>
                        </div>
                        <div class="investment-amount">
                            <span id="investment-value">50,000</span> €
                        </div>
                    </div>
                    <div class="risk-reward-container">
                        <div class="risk-meter">
                            <div class="meter-label">Risque</div>
                            <div class="meter-bar">
                                <div class="meter-fill" id="risk-meter-fill"></div>
                            </div>
                        </div>
                        <div class="reward-meter">
                            <div class="meter-label">Potentiel</div>
                            <div class="meter-bar">
                                <div class="meter-fill" id="reward-meter-fill"></div>
                            </div>
                        </div>
                    </div>
                    <button class="action-button" id="invest-button">Investir</button>
                </div>
                
                <div class="simulator-step" id="results-step" style="display: none;">
                    <h3 class="step-title">Résultats de l'investissement</h3>
                    <div class="results-animation" id="results-animation">
                        <div class="startup-logo" id="result-logo"></div>
                        <div class="growth-graph">
                            <canvas id="growth-canvas" width="280" height="150"></canvas>
                        </div>
                    </div>
                    <div class="investment-results" id="investment-results">
                        <!-- Résultats générés dynamiquement -->
                    </div>
                    <button class="action-button" id="restart-button">Nouvel investissement</button>
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
        .startup-simulator {
            background-color: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            margin: 20px 0;
            color: #333;
            padding: 15px;
        }
        
        .simulator-step {
            padding: 5px;
        }
        
        .step-title {
            font-size: 1.2rem;
            font-weight: 600;
            margin-bottom: 15px;
            color: #24243e;
            text-align: center;
        }
        
        .startups-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
            gap: 15px;
            margin-bottom: 20px;
        }
        
        .startup-card {
            border: 2px solid #eee;
            border-radius: 8px;
            padding: 15px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .startup-card:hover {
            border-color: #302b63;
            transform: translateY(-3px);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }
        
        .startup-card.selected {
            border-color: #302b63;
            background-color: #f0f0f7;
        }
        
        .startup-logo {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        .startup-name {
            font-weight: 600;
            font-size: 0.9rem;
            margin-bottom: 5px;
        }
        
        .startup-domain {
            font-size: 0.8rem;
            color: #666;
        }
        
        .startup-details {
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 15px;
            min-height: 100px;
        }
        
        .details-placeholder {
            color: #999;
            text-align: center;
            padding: 20px 0;
        }
        
        .details-content {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .detail-title {
            font-weight: 600;
            display: flex;
            align-items: center;
            gap: 10px;
            color: #333;
        }
        
        .detail-description {
            font-size: 0.9rem;
            line-height: 1.4;
            color: #333;
        }
        
        .risk-indicator {
            display: inline-block;
            padding: 3px 8px;
            border-radius: 10px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-left: 5px;
        }
        
        .risk-low {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .risk-medium {
            background-color: #fff8e1;
            color: #f57f17;
        }
        
        .risk-high {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .select-button {
            background-color: #302b63;
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            margin-top: 15px;
            min-height: 44px;
        }
        
        .select-button:hover {
            background-color: #24243e;
            transform: translateY(-2px);
        }
        
        .investment-controls {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
        }
        
        .investment-slider-container {
            width: 80%;
            margin-bottom: 15px;
        }
        
        .investment-slider {
            width: 100%;
            height: 10px;
            -webkit-appearance: none;
            appearance: none;
            background: #eee;
            outline: none;
            border-radius: 5px;
        }
        
        .investment-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #302b63;
            cursor: pointer;
        }
        
        .slider-labels {
            display: flex;
            justify-content: space-between;
            width: 100%;
            font-size: 0.8rem;
            color: #666;
            margin-top: 5px;
        }
        
        .investment-amount {
            font-size: 1.8rem;
            font-weight: 700;
            color: #24243e;
            margin-bottom: 20px;
        }
        
        .risk-reward-container {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .risk-meter, .reward-meter {
            flex: 1;
            background-color: #f5f5f5;
            border-radius: 8px;
            padding: 10px;
        }
        
        .meter-label {
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 8px;
            text-align: center;
            color: #333;
        }
        
        .meter-bar {
            height: 15px;
            background-color: #eee;
            border-radius: 10px;
            overflow: hidden;
        }
        
        .meter-fill {
            height: 100%;
            border-radius: 10px;
            transition: width 0.5s;
        }
        
        #risk-meter-fill {
            background-color: #ff5252;
        }
        
        #reward-meter-fill {
            background-color: #4caf50;
        }
        
        .action-button {
            background-color: #302b63;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: block;
            margin: 0 auto;
            min-width: 150px;
            min-height: 44px;
        }
        
        .action-button:hover {
            background-color: #24243e;
            transform: translateY(-2px);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
        }
        
        .results-animation {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 20px;
        }
        
        #result-logo {
            font-size: 3rem;
            margin-bottom: 15px;
            animation: pulse 2s infinite;
        }
        
        .growth-graph {
            width: 100%;
            margin-bottom: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            padding: 10px;
        }
        
        .investment-results {
            background-color: #f0f0f7;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 20px;
        }
        
        .result-summary {
            text-align: center;
            margin-bottom: 15px;
        }
        
        .result-amount {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 10px 0;
            color: #333;
        }
        
        .result-profit {
            display: inline-block;
            padding: 5px 10px;
            border-radius: 20px;
            font-weight: 600;
            margin: 10px 0;
        }
        
        .profit-positive {
            background-color: #e8f5e9;
            color: #2e7d32;
        }
        
        .profit-negative {
            background-color: #ffebee;
            color: #c62828;
        }
        
        .result-message {
            font-style: italic;
            color: #666;
        }
        
        .result-stats {
            display: flex;
            justify-content: space-around;
            margin-top: 15px;
            border-top: 1px solid #ddd;
            padding-top: 15px;
        }
        
        .stat-item {
            text-align: center;
        }
        
        .stat-value {
            font-size: 1.2rem;
            font-weight: 700;
            color: #24243e;
        }
        
        .stat-label {
            font-size: 0.8rem;
            color: #666;
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
            }
        }
        
        .interaction-footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(36, 36, 62, 0.95);
            padding: 15px;
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
        }
        
        .interaction-content-spacer {
            height: 70px; /* Espace pour le footer fixe */
        }

        /* Améliorations pour mobile */
        @media (max-width: 480px) {
            .startups-grid {
                grid-template-columns: repeat(2, 1fr);
            }
            
            .startup-logo {
                font-size: 2rem;
            }
            
            .action-button, .select-button {
                min-height: 44px;
                width: 100%;
            }
            
            .risk-reward-container {
                flex-direction: column;
                gap: 10px;
            }
            
            .stat-item {
                padding: 0 5px;
            }
            
            .investment-amount {
                font-size: 1.5rem;
            }
            
            .interaction-content-spacer {
                height: 80px;
            }
        }
    `;

    document.head.appendChild(style);

    // Éléments interactifs
    const startupsGrid = document.getElementById('startups-grid');
    const startupDetails = document.getElementById('startup-details');

    const startupSelection = document.getElementById('startup-selection');
    const investmentStep = document.getElementById('investment-step');
    const resultsStep = document.getElementById('results-step');

    const investmentSlider = document.getElementById('investment-slider');
    const investmentValue = document.getElementById('investment-value');
    const riskMeterFill = document.getElementById('risk-meter-fill');
    const rewardMeterFill = document.getElementById('reward-meter-fill');

    const investButton = document.getElementById('invest-button');
    const restartButton = document.getElementById('restart-button');
    const continueButton = document.getElementById('continue-button');

    // Variables d'état
    let selectedStartup = null;
    let investmentAmount = 50000;
    let investmentResult = null;

    // Créer les cartes de startups
    startups.forEach((startup) => {
        const card = document.createElement('div');
        card.className = 'startup-card';
        card.dataset.name = startup.name;

        card.innerHTML = `
            <div class="startup-logo">${startup.logo}</div>
            <div class="startup-name">${startup.name}</div>
            <div class="startup-domain">${startup.domain}</div>
        `;

        card.addEventListener('click', () => {
            // Mettre à jour la sélection
            document.querySelectorAll('.startup-card').forEach(c => {
                c.classList.remove('selected');
            });
            card.classList.add('selected');

            selectedStartup = startup;

            // Afficher les détails
            showStartupDetails(startup);
        });

        startupsGrid.appendChild(card);
    });

    /**
     * Affiche les détails d'une startup
     * @param {Object} startup - Données de la startup
     */
    function showStartupDetails(startup) {
        let riskClass = '';
        let riskText = '';

        switch (startup.risk) {
            case 'low':
                riskClass = 'risk-low';
                riskText = 'Faible';
                break;
            case 'medium':
                riskClass = 'risk-medium';
                riskText = 'Moyen';
                break;
            case 'high':
                riskClass = 'risk-high';
                riskText = 'Élevé';
                break;
        }

        startupDetails.innerHTML = `
            <div class="details-content">
                <div class="detail-title">
                    ${startup.logo} ${startup.name}
                    <span class="risk-indicator ${riskClass}">${riskText}</span>
                </div>
                <div class="detail-description">
                    ${startup.description}
                </div>
                <button class="select-button" id="select-startup-button">Sélectionner cette startup</button>
            </div>
        `;

        // Ajouter l'événement pour le bouton de sélection
        document.getElementById('select-startup-button').addEventListener('click', () => {
            // Passer à l'étape d'investissement
            startupSelection.style.display = 'none';
            investmentStep.style.display = 'block';

            // Initialiser les compteurs de risque/récompense
            updateRiskRewardMeters();
        });
    }

    // Événement pour le curseur d'investissement
    investmentSlider.addEventListener('input', () => {
        investmentAmount = parseInt(investmentSlider.value);
        investmentValue.textContent = investmentAmount.toLocaleString();
    });

    // Événement pour le bouton d'investissement
    investButton.addEventListener('click', () => {
        // Simuler le résultat de l'investissement
        simulateInvestment();

        // Passer à l'étape des résultats
        investmentStep.style.display = 'none';
        resultsStep.style.display = 'block';

        // Afficher les résultats
        displayResults();
    });

    // Événement pour le bouton de redémarrage
    restartButton.addEventListener('click', () => {
        // Réinitialiser l'application
        selectedStartup = null;
        investmentAmount = 50000;
        investmentResult = null;

        // Réinitialiser le curseur
        investmentSlider.value = 50000;
        investmentValue.textContent = '50,000';

        // Désélectionner la startup
        document.querySelectorAll('.startup-card').forEach(card => {
            card.classList.remove('selected');
        });

        // Revenir à l'étape de sélection
        resultsStep.style.display = 'none';
        startupSelection.style.display = 'block';

        // Réinitialiser les détails
        startupDetails.innerHTML = `
            <div class="details-placeholder">Sélectionnez une startup pour voir les détails</div>
        `;
    });

    // Événement pour le bouton continuer
    continueButton.addEventListener('click', () => {
        // Appeler le callback pour terminer l'interaction
        onComplete();
    });

    /**
     * Met à jour les indicateurs de risque et de récompense
     */
    function updateRiskRewardMeters() {
        if (!selectedStartup) return;

        // Définir le niveau de risque en fonction de la startup
        let riskLevel = 0;
        switch (selectedStartup.risk) {
            case 'low':
                riskLevel = 30;
                break;
            case 'medium':
                riskLevel = 60;
                break;
            case 'high':
                riskLevel = 90;
                break;
        }

        // Définir le niveau de récompense potentielle
        const rewardLevel = selectedStartup.baseGrowth + selectedStartup.growthVariance;

        // Mettre à jour les barres
        riskMeterFill.style.width = `${riskLevel}%`;
        rewardMeterFill.style.width = `${rewardLevel}%`;
    }

    /**
     * Simule le résultat de l'investissement
     */
    function simulateInvestment() {
        const baseGrowth = selectedStartup.baseGrowth;
        const variance = selectedStartup.growthVariance;

        // Calculer un pourcentage de croissance aléatoire
        const growthPercentage = baseGrowth + (Math.random() * 2 - 1) * variance;

        // Nombre de périodes (mois)
        const periods = 12;

        // Valeurs mensuelles
        const monthlyValues = [];
        let currentValue = investmentAmount;

        for (let i = 0; i <= periods; i++) {
            monthlyValues.push({
                month: i,
                value: currentValue
            });

            // Application d'une petite variation mensuelle
            const monthlyGrowth = growthPercentage / periods;
            const monthlyVariance = variance / (periods * 2);
            const adjustedGrowth = monthlyGrowth + (Math.random() * 2 - 1) * monthlyVariance;

            currentValue = currentValue * (1 + adjustedGrowth / 100);
        }

        // Valeur finale arrondie
        const finalValue = Math.round(monthlyValues[periods].value);
        const profit = finalValue - investmentAmount;
        const profitPercentage = (profit / investmentAmount * 100).toFixed(1);

        // Stocker le résultat
        investmentResult = {
            initialInvestment: investmentAmount,
            finalValue: finalValue,
            profit: profit,
            profitPercentage: profitPercentage,
            monthlyValues: monthlyValues,
            growthPercentage: growthPercentage.toFixed(1)
        };
    }

    /**
     * Affiche les résultats de l'investissement
     */
    function displayResults() {
        // Afficher le logo de la startup
        document.getElementById('result-logo').textContent = selectedStartup.logo;

        // Créer le graphique de croissance
        drawGrowthChart();

        // Afficher les informations de résultat
        const profitClass = investmentResult.profit >= 0 ? 'profit-positive' : 'profit-negative';
        const profitSign = investmentResult.profit >= 0 ? '+' : '';
        const resultMessage = getResultMessage(investmentResult.profitPercentage);

        document.getElementById('investment-results').innerHTML = `
            <div class="result-summary">
                <div class="startup-name">${selectedStartup.name}</div>
                <div class="result-amount">${investmentResult.finalValue.toLocaleString()} €</div>
                <div class="result-profit ${profitClass}">
                    ${profitSign}${investmentResult.profit.toLocaleString()} € (${profitSign}${investmentResult.profitPercentage}%)
                </div>
                <div class="result-message">${resultMessage}</div>
            </div>
            <div class="result-stats">
                <div class="stat-item">
                    <div class="stat-value">${investmentResult.initialInvestment.toLocaleString()} €</div>
                    <div class="stat-label">Investissement</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${investmentResult.growthPercentage}%</div>
                    <div class="stat-label">Croissance</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">12 mois</div>
                    <div class="stat-label">Période</div>
                </div>
            </div>
        `;
    }

    /**
     * Dessine le graphique de croissance
     */
    function drawGrowthChart() {
        const canvas = document.getElementById('growth-canvas');
        const ctx = canvas.getContext('2d');

        const values = investmentResult.monthlyValues;
        const minValue = Math.min(...values.map(v => v.value)) * 0.9;
        const maxValue = Math.max(...values.map(v => v.value)) * 1.1;
        const valueRange = maxValue - minValue;

        // Effacer le canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dessiner les axes
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(40, 10);
        ctx.lineTo(40, 130);
        ctx.lineTo(270, 130);
        ctx.stroke();

        // Dessiner la courbe de croissance
        ctx.strokeStyle = investmentResult.profit >= 0 ? '#4caf50' : '#f44336';
        ctx.lineWidth = 3;
        ctx.beginPath();

        values.forEach((point, index) => {
            const x = 40 + (230 / values.length) * index;
            const y = 130 - ((point.value - minValue) / valueRange) * 100;

            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Ajouter une ombre sous la courbe
        const gradient = ctx.createLinearGradient(0, 0, 0, 130);
        gradient.addColorStop(0, investmentResult.profit >= 0 ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(40, 130);

        values.forEach((point, index) => {
            const x = 40 + (230 / values.length) * index;
            const y = 130 - ((point.value - minValue) / valueRange) * 100;
            ctx.lineTo(x, y);
        });

        ctx.lineTo(40 + 230, 130);
        ctx.closePath();
        ctx.fill();

        // Ajouter des points sur la courbe
        values.forEach((point, index) => {
            const x = 40 + (230 / values.length) * index;
            const y = 130 - ((point.value - minValue) / valueRange) * 100;

            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = investmentResult.profit >= 0 ? '#4caf50' : '#f44336';
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        });

        // Ajouter les étiquettes
        ctx.fillStyle = '#666';
        ctx.font = '10px Arial';
        ctx.textAlign = 'right';
        ctx.fillText(Math.round(maxValue).toLocaleString() + ' €', 35, 15);
        ctx.fillText(Math.round(minValue).toLocaleString() + ' €', 35, 130);

        ctx.textAlign = 'center';
        ctx.fillText('0', 40, 145);
        ctx.fillText('12', 270, 145);
        ctx.fillText('Mois', 155, 145);
    }

    /**
     * Obtient un message en fonction du pourcentage de profit
     * @param {number} profitPercentage - Pourcentage de profit
     * @returns {string} - Message correspondant
     */
    function getResultMessage(profitPercentage) {
        const percentage = parseFloat(profitPercentage);

        if (percentage >= 30) {
            return "Félicitations! Votre investissement a été extrêmement fructueux.";
        } else if (percentage >= 15) {
            return "Beau travail! Votre investissement a été très rentable.";
        } else if (percentage >= 5) {
            return "Bien joué! Votre investissement est rentable.";
        } else if (percentage >= 0) {
            return "Votre investissement est légèrement rentable.";
        } else if (percentage >= -10) {
            return "Votre investissement a subi une légère perte.";
        } else if (percentage >= -25) {
            return "Votre investissement a subi une perte significative.";
        } else {
            return "Votre investissement a malheureusement subi une forte perte.";
        }
    }
}