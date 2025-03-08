/**
 * Classe EmojiManager
 * Gère l'état des emojis (trouvés ou non) et la progression du joueur
 */
class EmojiManager {
    /**
     * Constructeur
     * @param {Object} emojiData - Données des emojis (ID, emoji, titre, description)
     */
    constructor(emojiData) {
        this.emojiData = emojiData;
        this.foundEmojis = {};
        this.cardGenerated = false;

        // Initialiser tous les emojis comme non trouvés
        Object.keys(this.emojiData).forEach(emojiId => {
            this.foundEmojis[emojiId] = false;
        });

        // Essayer de récupérer des données de progression sauvegardées
        this.loadProgress();
    }

    /**
     * Marquer un emoji comme trouvé
     * @param {string} emojiId - ID de l'emoji
     * @returns {boolean} - true si c'est la première fois que l'emoji est trouvé
     */
    markAsFound(emojiId) {
        // Vérifier si l'emoji existe
        if (!this.emojiData[emojiId]) {
            console.error(`Emoji non reconnu: ${emojiId}`);
            return false;
        }

        // Vérifier si l'emoji a déjà été trouvé
        if (this.foundEmojis[emojiId]) {
            return false; // Déjà trouvé
        }

        // Marquer comme trouvé
        this.foundEmojis[emojiId] = true;

        // Sauvegarder la progression
        this.saveProgress();

        // Déclencher un événement pour informer l'application
        const event = new CustomEvent('emojiFound', {
            detail: { emojiId }
        });
        document.dispatchEvent(event);

        return true; // Première découverte
    }

    /**
     * Vérifier si un emoji a été trouvé
     * @param {string} emojiId - ID de l'emoji
     * @returns {boolean} - true si l'emoji a été trouvé
     */
    isFound(emojiId) {
        return this.foundEmojis[emojiId] === true;
    }

    /**
     * Obtenir le nombre d'emojis trouvés
     * @returns {number} - Nombre d'emojis trouvés
     */
    getFoundCount() {
        return Object.values(this.foundEmojis).filter(found => found).length;
    }

    /**
     * Obtenir la liste des IDs des emojis trouvés
     * @returns {string[]} - Liste des IDs des emojis trouvés
     */
    getFoundEmojiIds() {
        return Object.keys(this.foundEmojis).filter(emojiId => this.foundEmojis[emojiId]);
    }

    /**
     * Obtenir les données d'un emoji
     * @param {string} emojiId - ID de l'emoji
     * @returns {Object|null} - Données de l'emoji ou null si non trouvé
     */
    getEmojiData(emojiId) {
        return this.emojiData[emojiId] || null;
    }

    /**
     * Vérifier si la carte a déjà été générée
     * @returns {boolean} - true si la carte a été générée
     */
    isCardGenerated() {
        return this.cardGenerated;
    }

    /**
     * Définir l'état de génération de la carte
     * @param {boolean} generated - État de génération
     */
    setCardGenerated(generated) {
        this.cardGenerated = generated;
        this.saveProgress();
    }

    /**
     * Sauvegarder la progression dans le localStorage
     */
    saveProgress() {
        try {
            const progressData = {
                foundEmojis: this.foundEmojis,
                cardGenerated: this.cardGenerated,
                timestamp: Date.now()
            };

            localStorage.setItem('emojiHuntProgress', JSON.stringify(progressData));
        } catch (error) {
            console.error('Erreur lors de la sauvegarde de la progression:', error);
        }
    }

    /**
     * Charger la progression depuis le localStorage
     */
    loadProgress() {
        try {
            const savedData = localStorage.getItem('emojiHuntProgress');

            if (savedData) {
                const progressData = JSON.parse(savedData);

                // Vérifier si les données ne sont pas trop anciennes (24h max)
                const now = Date.now();
                const oneDayMs = 24 * 60 * 60 * 1000;

                if (now - progressData.timestamp < oneDayMs) {
                    this.foundEmojis = progressData.foundEmojis;
                    this.cardGenerated = progressData.cardGenerated || false;
                } else {
                    // Données trop anciennes, les supprimer
                    localStorage.removeItem('emojiHuntProgress');
                }
            }
        } catch (error) {
            console.error('Erreur lors du chargement de la progression:', error);
            // En cas d'erreur, supprimer les données potentiellement corrompues
            localStorage.removeItem('emojiHuntProgress');
        }
    }

    /**
     * Réinitialiser la progression
     */
    resetProgress() {
        // Réinitialiser l'état des emojis
        Object.keys(this.emojiData).forEach(emojiId => {
            this.foundEmojis[emojiId] = false;
        });

        this.cardGenerated = false;

        // Supprimer les données sauvegardées
        localStorage.removeItem('emojiHuntProgress');

        // Déclencher un événement pour informer l'application
        const event = new CustomEvent('progressReset');
        document.dispatchEvent(event);
    }
}