/**
 * Interaction pour l'emoji Marketing & Communication Digitale (📱)
 * Permet de créer et partager un mini-post avec filtres et effets spéciaux
 *
 * @param {HTMLElement} container - Conteneur de l'interaction
 * @param {Object} emojiData - Données de l'emoji (emoji, titre, description)
 * @param {Function} onComplete - Fonction à appeler lorsque l'interaction est terminée
 */
function marketingInteraction(container, emojiData, onComplete) {
    // Modèles de posts disponibles
    const postTemplates = [
        {
            name: "Événement",
            background: "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
            emoji: "🎉",
            title: "Événement spécial",
            description: "Rejoignez-nous pour un événement exceptionnel!",
            cta: "Je participe!"
        },
        {
            name: "Promotion",
            background: "linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)",
            emoji: "🔥",
            title: "Offre limitée",
            description: "Ne manquez pas notre offre exceptionnelle!",
            cta: "J'en profite!"
        },
        {
            name: "Nouveauté",
            background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
            emoji: "✨",
            title: "Nouveau produit",
            description: "Découvrez notre dernière innovation!",
            cta: "Je découvre!"
        },
        {
            name: "Témoignage",
            background: "linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)",
            emoji: "💬",
            title: "Ils nous font confiance",
            description: "Découvrez ce que nos clients disent de nous!",
            cta: "Voir plus d'avis"
        }
    ];

    // Filtres d'image disponibles
    const imageFilters = [
        {
            name: "Normal",
            value: "none"
        },
        {
            name: "Vintage",
            value: "sepia(50%) contrast(110%)"
        },
        {
            name: "Frais",
            value: "brightness(110%) saturate(130%)"
        },
        {
            name: "Drama",
            value: "contrast(130%) grayscale(30%)"
        },
        {
            name: "Tech",
            value: "hue-rotate(180deg) saturate(80%)"
        }
    ];

    // Créer le contenu de l'interaction
    const content = `
        <div class="interaction-card marketing-card">
            <div class="interaction-emoji">${emojiData.emoji}</div>
            <h2 class="interaction-title">${emojiData.title}</h2>
            <div class="interaction-description">
                <p>${emojiData.description}</p>
                <p>Créez une publication captivante pour les réseaux sociaux!</p>
            </div>
            
            <div class="social-post-creator">
                <!-- Prévisualisation du post -->
                <div class="post-preview" id="post-preview">
                    <div class="post-content">
                        <div class="post-emoji" id="post-emoji">🎉</div>
                        <h3 class="post-title" id="post-title">Événement spécial</h3>
                        <p class="post-description" id="post-description">Rejoignez-nous pour un événement exceptionnel!</p>
                        <button class="post-cta" id="post-cta">Je participe!</button>
                    </div>
                </div>
                
                <!-- Éditeur de post -->
                <div class="post-editor">
                    <div class="editor-section">
                        <div class="section-title">Type de post</div>
                        <div class="template-selector" id="template-selector">
                            <!-- Templates générés dynamiquement -->
                        </div>
                    </div>
                    
                    <div class="editor-section">
                        <div class="section-title">Personnalisation</div>
                        <div class="customization-fields">
                            <div class="input-group">
                                <label for="custom-title">Titre:</label>
                                <input type="text" id="custom-title" class="custom-input" placeholder="Entrez un titre accrocheur" maxlength="30">
                            </div>
                            <div class="input-group">
                                <label for="custom-description">Description:</label>
                                <textarea id="custom-description" class="custom-input" placeholder="Décrivez votre message" maxlength="80"></textarea>
                            </div>
                            <div class="input-group">
                                <label for="custom-emoji">Emoji:</label>
                                <div class="emoji-selector">
                                    <button class="emoji-button" data-emoji="🎉">🎉</button>
                                    <button class="emoji-button" data-emoji="✨">✨</button>
                                    <button class="emoji-button" data-emoji="🔥">🔥</button>
                                    <button class="emoji-button" data-emoji="💬">💬</button>
                                    <button class="emoji-button" data-emoji="🎁">🎁</button>
                                    <button class="emoji-button" data-emoji="🚀">🚀</button>
                                </div>
                            </div>
                            <div class="input-group">
                                <label for="custom-cta">Bouton d'action:</label>
                                <input type="text" id="custom-cta" class="custom-input" placeholder="Texte du bouton" maxlength="20">
                            </div>
                        </div>
                    </div>
                    
                    <div class="editor-section">
                        <div class="section-title">Apparence</div>
                        <div class="appearance-options">
                            <div class="input-group">
                                <label>Filtre:</label>
                                <div class="filter-selector" id="filter-selector">
                                    <!-- Filtres générés dynamiquement -->
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="editor-actions">
                        <button class="action-button" id="reset-button">Réinitialiser</button>
                        <button class="action-button" id="download-button">Télécharger</button>
                    </div>
                </div>
            </div>
            
            <div class="interaction-buttons">
                <button class="button" id="continue-button">Continuer</button>
            </div>
        </div>
    `;

    // Insérer le contenu dans le conteneur
    container.innerHTML = content;

    // Appliquer des styles spécifiques à cette interaction
    const style = document.createElement('style');
    style.textContent = `
        .marketing-card {
            background: linear-gradient(135deg, #5B247A 0%, #1BCEDF 100%);
            color: white;
        }
        
        .social-post-creator {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin: 20px 0;
        }
        
        @media (min-width: 768px) {
            .social-post-creator {
                flex-direction: row;
            }
            
            .post-preview, .post-editor {
                flex: 1;
            }
        }
        
        .post-preview {
            background-color: #f5f5f5;
            border-radius: 10px;
            padding: 20px;
            min-height: 350px;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .post-content {
            width: 280px;
            height: 320px;
            border-radius: 10px;
            overflow: hidden;
            background: linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%);
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .post-emoji {
            font-size: 3rem;
            margin-bottom: 15px;
        }
        
        .post-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .post-description {
            margin-bottom: 20px;
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        .post-cta {
            background-color: white;
            color: #333;
            border: none;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        }
        
        .post-cta:hover {
            transform: translateY(-2px);
            box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
        }
        
        .post-editor {
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            color: #333;
        }
        
        .editor-section {
            border-bottom: 1px solid #eee;
            padding-bottom: 15px;
        }
        
        .editor-section:last-child {
            border-bottom: none;
        }
        
        .section-title {
            font-weight: 600;
            margin-bottom: 10px;
            color: #5B247A;
        }
        
        .template-selector {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        
        .template-button {
            padding: 8px 12px;
            border: 2px solid #eee;
            border-radius: 20px;
            background-color: white;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.9rem;
        }
        
        .template-button:hover {
            border-color: #5B247A;
            transform: translateY(-2px);
        }
        
        .template-button.active {
            background-color: #5B247A;
            color: white;
            border-color: #5B247A;
        }
        
        .customization-fields {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .input-group {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }
        
        .input-group label {
            font-size: 0.9rem;
            color: #666;
        }
        
        .custom-input {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 0.9rem;
        }
        
        .custom-input:focus {
            outline: none;
            border-color: #5B247A;
        }
        
        textarea.custom-input {
            min-height: 60px;
            resize: vertical;
        }
        
        .emoji-selector {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .emoji-button {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            border: 1px solid #ddd;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 1.2rem;
        }
        
        .emoji-button:hover {
            border-color: #5B247A;
            transform: scale(1.1);
        }
        
        .emoji-button.active {
            border-color: #5B247A;
            background-color: #f0e6f5;
        }
        
        .filter-selector {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }
        
        .filter-button {
            padding: 6px 10px;
            border: 1px solid #ddd;
            border-radius: 15px;
            background-color: white;
            cursor: pointer;
            transition: all 0.2s;
            font-size: 0.8rem;
        }
        
        .filter-button:hover {
            border-color: #5B247A;
        }
        
        .filter-button.active {
            background-color: #5B247A;
            color: white;
            border-color: #5B247A;
        }
        
        .editor-actions {
            display: flex;
            justify-content: space-between;
            gap: 10px;
            margin-top: 10px;
        }
        
        .action-button {
            padding: 8px 15px;
            border: none;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s;
            font-weight: 600;
            flex: 1;
        }
        
        #reset-button {
            background-color: #f1f1f1;
            color: #666;
        }
        
        #reset-button:hover {
            background-color: #e0e0e0;
        }
        
        #download-button {
            background-color: #5B247A;
            color: white;
        }
        
        #download-button:hover {
            background-color: #4a1d65;
            transform: translateY(-2px);
        }
        
        #continue-button {
            background-color: #1BCEDF;
        }
    `;

    document.head.appendChild(style);

    // Éléments interactifs
    const postPreview = document.getElementById('post-preview');
    const postContent = postPreview.querySelector('.post-content');
    const postEmoji = document.getElementById('post-emoji');
    const postTitle = document.getElementById('post-title');
    const postDescription = document.getElementById('post-description');
    const postCta = document.getElementById('post-cta');

    const templateSelector = document.getElementById('template-selector');
    const filterSelector = document.getElementById('filter-selector');

    const customTitle = document.getElementById('custom-title');
    const customDescription = document.getElementById('custom-description');
    const customCta = document.getElementById('custom-cta');

    const resetButton = document.getElementById('reset-button');
    const downloadButton = document.getElementById('download-button');
    const continueButton = document.getElementById('continue-button');

    // État du post
    let currentTemplate = postTemplates[0];
    let currentFilter = imageFilters[0];

    // Créer les boutons de templates
    postTemplates.forEach((template, index) => {
        const button = document.createElement('button');
        button.className = 'template-button' + (index === 0 ? ' active' : '');
        button.textContent = template.name;
        button.dataset.index = index;

        button.addEventListener('click', () => {
            // Mettre à jour la classe active
            document.querySelectorAll('.template-button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Mettre à jour le template actif
            currentTemplate = template;
            updatePostPreview();

            // Mettre à jour les champs de personnalisation
            customTitle.value = template.title;
            customDescription.value = template.description;
            customCta.value = template.cta;

            // Activer l'emoji correspondant
            document.querySelectorAll('.emoji-button').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.emoji === template.emoji) {
                    btn.classList.add('active');
                }
            });
        });

        templateSelector.appendChild(button);
    });

    // Créer les boutons de filtres
    imageFilters.forEach((filter, index) => {
        const button = document.createElement('button');
        button.className = 'filter-button' + (index === 0 ? ' active' : '');
        button.textContent = filter.name;
        button.dataset.index = index;

        button.addEventListener('click', () => {
            // Mettre à jour la classe active
            document.querySelectorAll('.filter-button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Mettre à jour le filtre actif
            currentFilter = filter;
            updatePostPreview();
        });

        filterSelector.appendChild(button);
    });

    // Configurer les boutons d'emoji
    document.querySelectorAll('.emoji-button').forEach(button => {
        // Définir le premier emoji comme actif
        if (button.dataset.emoji === postTemplates[0].emoji) {
            button.classList.add('active');
        }

        button.addEventListener('click', () => {
            // Mettre à jour la classe active
            document.querySelectorAll('.emoji-button').forEach(btn => {
                btn.classList.remove('active');
            });
            button.classList.add('active');

            // Mettre à jour l'emoji
            postEmoji.textContent = button.dataset.emoji;
        });
    });

    // Événements pour les champs de personnalisation
    customTitle.addEventListener('input', () => {
        postTitle.textContent = customTitle.value || currentTemplate.title;
    });

    customDescription.addEventListener('input', () => {
        postDescription.textContent = customDescription.value || currentTemplate.description;
    });

    customCta.addEventListener('input', () => {
        postCta.textContent = customCta.value || currentTemplate.cta;
    });

    // Événement pour le bouton réinitialiser
    resetButton.addEventListener('click', () => {
        // Réinitialiser le template
        document.querySelector('.template-button[data-index="0"]').click();

        // Réinitialiser le filtre
        document.querySelector('.filter-button[data-index="0"]').click();

        // Réinitialiser les champs de personnalisation
        customTitle.value = postTemplates[0].title;
        customDescription.value = postTemplates[0].description;
        customCta.value = postTemplates[0].cta;

        // Réinitialiser l'emoji
        document.querySelectorAll('.emoji-button').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.emoji === postTemplates[0].emoji) {
                btn.classList.add('active');
            }
        });
        postEmoji.textContent = postTemplates[0].emoji;

        // Mettre à jour l'aperçu
        updatePostPreview();
    });

    // Événement pour le bouton télécharger
    downloadButton.addEventListener('click', () => {
        html2canvas(postContent).then(canvas => {
            const link = document.createElement('a');
            link.download = 'mon-post-ynov.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // Événement pour le bouton continuer
    continueButton.addEventListener('click', () => {
        // Appeler le callback pour terminer l'interaction
        onComplete();
    });

    /**
     * Met à jour l'aperçu du post
     */
    function updatePostPreview() {
        // Appliquer le style du template
        postContent.style.background = currentTemplate.background;

        // Appliquer le filtre
        postContent.style.filter = currentFilter.value;

        // Mettre à jour le contenu si les champs personnalisés sont vides
        if (!customTitle.value) {
            postTitle.textContent = currentTemplate.title;
        }

        if (!customDescription.value) {
            postDescription.textContent = currentTemplate.description;
        }

        if (!customCta.value) {
            postCta.textContent = currentTemplate.cta;
        }
    }

    // Initialiser l'aperçu du post
    updatePostPreview();
}