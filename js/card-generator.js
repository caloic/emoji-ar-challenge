/**
 * Classe CardGenerator
 * Génère la carte d'identité digitale personnalisée
 */
class CardGenerator {
    /**
     * Constructeur
     * @param {EmojiManager} emojiManager - Instance du gestionnaire d'emojis
     * @param {Object} appConfig - Configuration de l'application
     */
    constructor(emojiManager, appConfig) {
        this.emojiManager = emojiManager;
        this.appConfig = appConfig;
        this.cardHTML = '';

        // Styles et thèmes pour les cartes
        this.cardThemes = [
            {
                name: 'tech',
                bgGradient: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
                fontColor: 'white',
                accentColor: '#ffcc00'
            },
            {
                name: 'creative',
                bgGradient: 'linear-gradient(135deg, #ff8c42 0%, #ff3c6f 100%)',
                fontColor: 'white',
                accentColor: '#00eaff'
            },
            {
                name: 'business',
                bgGradient: 'linear-gradient(135deg, #29323c 0%, #485563 100%)',
                fontColor: 'white',
                accentColor: '#38ef7d'
            },
            {
                name: 'design',
                bgGradient: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
                fontColor: 'white',
                accentColor: '#ffdd40'
            }
        ];
    }

    /**
     * Générer la carte d'identité
     * @returns {string} - HTML de la carte générée
     */
    generateCard() {
        // Obtenir les emojis trouvés
        const foundEmojiIds = this.emojiManager.getFoundEmojiIds();

        // Déterminer le thème de la carte en fonction des emojis trouvés
        const theme = this.determineCardTheme(foundEmojiIds);

        // Génération de la date actuelle
        const today = new Date();
        const formattedDate = today.toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        // Générer un numéro de série aléatoire
        const serialNumber = this.generateSerialNumber();

        // Construire l'affichage des emojis trouvés
        let emojisHTML = '';
        foundEmojiIds.forEach(emojiId => {
            const emojiData = this.emojiManager.getEmojiData(emojiId);
            if (emojiData) {
                emojisHTML += `
                    <div class="card-emoji-item">
                        <span class="card-emoji-icon">${emojiData.emoji}</span>
                        <span class="card-emoji-name">${emojiData.title}</span>
                    </div>
                `;
            }
        });

        // Construire le HTML de la carte
        this.cardHTML = `
            <div class="digital-id-card" style="background: ${theme.bgGradient}; color: ${theme.fontColor};">
                <div class="card-header">
                    <img src="assets/images/icons/ynov-logo-white.svg" alt="Ynov Campus" class="card-logo" style="height: 30px; width: auto; max-width: 100px; object-fit: contain;">
                    <div class="card-title">Carte d'Identité Digitale</div>
                </div>
                
                <div class="card-user-info">
                    <div class="card-avatar" style="border-color: ${theme.accentColor};">
                        <img src="assets/images/icons/user-avatar.png" alt="Avatar" class="avatar-img">
                    </div>
                    <div class="card-user-details">
                        <div class="card-user-name">Visiteur Ynov Campus</div>
                        <div class="card-date">Délivrée le ${formattedDate}</div>
                        <div class="card-serial">N° ${serialNumber}</div>
                    </div>
                </div>
                
                <div class="card-emojis-section">
                    <div class="card-section-title" style="color: ${theme.accentColor};">Compétences Découvertes</div>
                    <div class="card-emojis-grid">
                        ${emojisHTML}
                    </div>
                </div>
                
                <div class="card-footer">
                    <div class="card-footer-text">Campus Montpellier</div>
                    <div class="card-badge" style="border-color: ${theme.accentColor};">
                        ${foundEmojiIds.length}/9
                    </div>
                </div>
            </div>
        `;

        return this.cardHTML;
    }

    /**
     * Déterminer le thème de la carte en fonction des emojis trouvés
     * @param {string[]} foundEmojiIds - Liste des IDs des emojis trouvés
     * @returns {Object} - Thème déterminé
     */
    determineCardTheme(foundEmojiIds) {
        // Compteurs pour chaque catégorie
        let techCount = 0;
        let creativeCount = 0;
        let businessCount = 0;

        // Compter les emojis par catégorie
        foundEmojiIds.forEach(emojiId => {
            if (['informatique', 'cybersecurite', 'ai'].includes(emojiId)) {
                techCount++;
            } else if (['gaming', 'audiovisuel', 'design'].includes(emojiId)) {
                creativeCount++;
            } else if (['marketing', 'business'].includes(emojiId)) {
                businessCount++;
            }
            // L'architecture peut aller dans design ou être sa propre catégorie
        });

        // Déterminer la catégorie dominante
        if (techCount >= creativeCount && techCount >= businessCount) {
            return this.cardThemes[0]; // tech
        } else if (creativeCount >= techCount && creativeCount >= businessCount) {
            return this.cardThemes[1]; // creative
        } else if (businessCount >= techCount && businessCount >= creativeCount) {
            return this.cardThemes[2]; // business
        } else {
            // Si tout est égal ou autre cas, utiliser le thème design par défaut
            return this.cardThemes[3]; // design
        }
    }

    /**
     * Générer un numéro de série aléatoire
     * @returns {string} - Numéro de série
     */
    generateSerialNumber() {
        const randomPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        return `YNV-${randomPart}`;
    }

    /**
     * Obtenir le HTML de la carte générée
     * @returns {string} - HTML de la carte
     */
    getCardHTML() {
        return this.cardHTML;
    }
}