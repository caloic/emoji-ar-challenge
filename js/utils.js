/**
 * Fonctions utilitaires pour l'application Chasse aux Emoji Secrets
 */

/**
 * Génère un nombre aléatoire entre min et max (inclus)
 * @param {number} min - Valeur minimale
 * @param {number} max - Valeur maximale
 * @returns {number} - Nombre aléatoire généré
 */
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Mélange les éléments d'un tableau
 * @param {Array} array - Tableau à mélanger
 * @returns {Array} - Tableau mélangé
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

/**
 * Vérifie si l'appareil est un mobile
 * @returns {boolean} - true si l'appareil est un mobile
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Vérifie si l'API WebRTC est disponible
 * @returns {boolean} - true si WebRTC est disponible
 */
function isWebRTCSupported() {
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
}

/**
 * Formate un nombre avec séparateurs de milliers
 * @param {number} number - Nombre à formater
 * @returns {string} - Nombre formaté
 */
function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Génère un identifiant unique
 * @returns {string} - Identifiant unique
 */
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Définit un cookie
 * @param {string} name - Nom du cookie
 * @param {string} value - Valeur du cookie
 * @param {number} days - Durée de vie en jours
 */
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

/**
 * Récupère la valeur d'un cookie
 * @param {string} name - Nom du cookie
 * @returns {string} - Valeur du cookie ou chaîne vide si non trouvé
 */
function getCookie(name) {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return '';
}

/**
 * Vérifie la compatibilité AR.js
 * @returns {Object} - Informations de compatibilité
 */
function checkARCompatibility() {
    const result = {
        compatible: false,
        webgl: false,
        webrtc: false,
        accelerometer: false,
        gyroscope: false,
        issues: []
    };

    // Vérifier WebGL
    try {
        const canvas = document.createElement('canvas');
        result.webgl = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
        if (!result.webgl) {
            result.issues.push('WebGL n\'est pas supporté');
        }
    } catch (e) {
        result.webgl = false;
        result.issues.push('Erreur lors de la vérification de WebGL');
    }

    // Vérifier WebRTC
    result.webrtc = isWebRTCSupported();
    if (!result.webrtc) {
        result.issues.push('L\'accès à la caméra n\'est pas supporté');
    }

    // Vérifier les capteurs de mouvement
    result.accelerometer = 'DeviceMotionEvent' in window;
    result.gyroscope = 'DeviceOrientationEvent' in window;

    if (!result.accelerometer || !result.gyroscope) {
        result.issues.push('Les capteurs de mouvement peuvent ne pas être disponibles');
    }

    // Déterminer la compatibilité globale
    result.compatible = result.webgl && result.webrtc;

    return result;
}

/**
 * Crée un QR code à partir d'une URL
 * @param {string} url - URL à encoder
 * @param {number} size - Taille du QR code en pixels
 * @returns {string} - URL data du QR code
 */
function generateQRCode(url, size = 200) {
    // Utilise la bibliothèque qrcode-generator si disponible
    if (window.qrcode) {
        const qr = qrcode(0, 'M');
        qr.addData(url);
        qr.make();
        return qr.createDataURL(4);
    }

    // Sinon retourne un placeholder
    return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(url)}`;
}

/**
 * Précharge les images pour améliorer les performances
 * @param {Array} imageUrls - Tableau d'URLs d'images à précharger
 * @param {Function} onProgress - Callback de progression
 * @param {Function} onComplete - Callback de fin
 */
function preloadImages(imageUrls, onProgress, onComplete) {
    let loaded = 0;
    const total = imageUrls.length;
    const images = [];

    function checkProgress() {
        loaded++;
        if (onProgress) {
            onProgress(loaded, total);
        }

        if (loaded === total && onComplete) {
            onComplete(images);
        }
    }

    for (let i = 0; i < total; i++) {
        images[i] = new Image();
        images[i].onload = images[i].onerror = checkProgress;
        images[i].src = imageUrls[i];
    }
}

/**
 * Détecte les fonctionnalités du navigateur
 * @returns {Object} - Fonctionnalités détectées
 */
function detectBrowserFeatures() {
    return {
        pwa: window.matchMedia('(display-mode: standalone)').matches,
        touchscreen: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        orientation: typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1,
        webp: checkWebpSupport(),
        webgl: checkWebGLSupport(),
        webrtc: isWebRTCSupported(),
        geolocation: 'geolocation' in navigator,
        notifications: 'Notification' in window,
        bluetooth: 'bluetooth' in navigator,
        battery: 'getBattery' in navigator,
        serviceWorker: 'serviceWorker' in navigator,
        webShare: 'share' in navigator
    };
}

/**
 * Vérifie le support de WebP
 * @returns {boolean} - true si WebP est supporté
 */
function checkWebpSupport() {
    const canvas = document.createElement('canvas');
    if (canvas.getContext && canvas.getContext('2d')) {
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }
    return false;
}

/**
 * Vérifie le support de WebGL
 * @returns {boolean} - true si WebGL est supporté
 */
function checkWebGLSupport() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return gl instanceof WebGLRenderingContext;
}

/**
 * Enregistre une erreur d'application
 * @param {Error} error - Erreur à enregistrer
 * @param {string} context - Contexte de l'erreur
 */
function logError(error, context = 'application') {
    console.error(`[${context}] ${error.message}`, error);

    // Envoi vers un service d'analyse d'erreurs (fictif)
    if (window.errorTracker) {
        window.errorTracker.captureException(error, {
            tags: {
                context: context
            }
        });
    }
}

/**
 * Vérifie si la fonctionnalité gyroscope est disponible
 * @returns {Promise<boolean>} - Promise résolue avec true si le gyroscope est disponible
 */
function checkGyroscope() {
    return new Promise((resolve) => {
        if (!window.DeviceOrientationEvent) {
            resolve(false);
            return;
        }

        // Pour iOS 13+
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            resolve(true); // L'appareil a un gyroscope, mais l'autorisation sera demandée plus tard
            return;
        }

        // Pour les autres appareils
        window.addEventListener('deviceorientation', function orientationHandler(event) {
            window.removeEventListener('deviceorientation', orientationHandler);
            resolve(event && (event.alpha !== null || event.beta !== null || event.gamma !== null));
        }, { once: true });

        // Timeout au cas où l'événement ne se déclencherait pas
        setTimeout(() => {
            resolve(false);
        }, 1000);
    });
}

/**
 * Demande les permissions nécessaires pour l'AR
 * @returns {Promise<boolean>} - Promise résolue avec true si les permissions sont accordées
 */
async function requestARPermissions() {
    try {
        // Demander l'accès à la caméra
        await navigator.mediaDevices.getUserMedia({ video: true });

        // Demander l'accès au gyroscope (pour iOS 13+)
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
            const permission = await DeviceOrientationEvent.requestPermission();
            return permission === 'granted';
        }

        return true;
    } catch (error) {
        logError(error, 'permissions');
        return false;
    }
}

/**
 * Vérifie si le navigateur est supporté pour l'application
 * @returns {boolean} - true si le navigateur est supporté
 */
function isBrowserSupported() {
    const browser = getBrowser();
    const features = detectBrowserFeatures();

    // Liste des navigateurs non supportés
    const unsupportedBrowsers = ['IE', 'Opera Mini'];

    // Vérifier si le navigateur est dans la liste des non supportés
    if (unsupportedBrowsers.includes(browser)) {
        return false;
    }

    // Vérifier les fonctionnalités minimales requises
    return features.webgl && features.webrtc;
}

/**
 * Détecte le navigateur utilisé
 * @returns {string} - Nom du navigateur
 */
function getBrowser() {
    const userAgent = navigator.userAgent;

    if (userAgent.indexOf('Firefox') > -1) {
        return 'Firefox';
    } else if (userAgent.indexOf('SamsungBrowser') > -1) {
        return 'Samsung Internet';
    } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
        return 'Opera';
    } else if (userAgent.indexOf('Trident') > -1) {
        return 'IE';
    } else if (userAgent.indexOf('Edge') > -1) {
        return 'Edge';
    } else if (userAgent.indexOf('Chrome') > -1) {
        return 'Chrome';
    } else if (userAgent.indexOf('Safari') > -1) {
        return 'Safari';
    } else {
        return 'Unknown';
    }
}

/**
 * Obtient les données de localisation
 * @returns {Promise<Object>} - Promise résolue avec les coordonnées GPS
 */
function getLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('La géolocalisation n\'est pas supportée par ce navigateur.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                });
            },
            (error) => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    });
}

/**
 * Vibre l'appareil si supporté
 * @param {number|Array} pattern - Durée en ms ou tableau de durées
 * @returns {boolean} - true si la vibration a été déclenchée
 */
function vibrate(pattern) {
    if ('vibrate' in navigator) {
        navigator.vibrate(pattern);
        return true;
    }
    return false;
}

/**
 * Joue un son
 * @param {string} soundUrl - URL du fichier audio
 * @param {number} volume - Volume (0-1)
 * @returns {HTMLAudioElement} - Élément audio
 */
function playSound(soundUrl, volume = 1.0) {
    const audio = new Audio(soundUrl);
    audio.volume = volume;
    audio.play().catch(e => logError(e, 'audio'));
    return audio;
}

/**
 * Crée un élément DOM
 * @param {string} tag - Type d'élément
 * @param {Object} attributes - Attributs de l'élément
 * @param {string|Node|Array} content - Contenu de l'élément
 * @returns {HTMLElement} - Élément créé
 */
function createElement(tag, attributes = {}, content = null) {
    const element = document.createElement(tag);

    // Ajouter les attributs
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'style' && typeof value === 'object') {
            Object.entries(value).forEach(([styleKey, styleValue]) => {
                element.style[styleKey] = styleValue;
            });
        } else if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else {
            element.setAttribute(key, value);
        }
    });

    // Ajouter le contenu
    if (content) {
        if (Array.isArray(content)) {
            content.forEach(item => {
                if (typeof item === 'string') {
                    element.appendChild(document.createTextNode(item));
                } else if (item instanceof Node) {
                    element.appendChild(item);
                }
            });
        } else if (typeof content === 'string') {
            element.textContent = content;
        } else if (content instanceof Node) {
            element.appendChild(content);
        }
    }

    return element;
}

/**
 * Lance une fonction quand le DOM est chargé
 * @param {Function} callback - Fonction à exécuter
 */
function onDOMReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}