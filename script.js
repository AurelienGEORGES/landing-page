function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("slider-btn");
    
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active-slide");
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[n-1].style.display = "flex";
    setTimeout(() => {
        slides[n-1].classList.add("active-slide");
    }, 10);
    
    dots[n-1].className += " active";
}

document.addEventListener('DOMContentLoaded', (event) => {
    showSlides(1);
});

// --- LOGIQUE CARROUSEL TÉMOIGNAGES ---
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const slides = Array.from(track.children);
    const nextButton = document.getElementById('nextBtn');
    const prevButton = document.getElementById('prevBtn');

    // Configuration
    let currentIndex = 0;

    // Fonction pour déterminer combien de slides sont visibles selon la taille de l'écran
    function getVisibleSlides() {
        const width = window.innerWidth;
        if (width <= 600) return 1; // Mobile
        if (width <= 900) return 2; // Tablette
        return 3; // Desktop
    }

    // Fonction de mise à jour de la position
    function updateCarousel() {
        const visibleSlides = getVisibleSlides();
        const slideWidth = slides[0].getBoundingClientRect().width;
        // On récupère le gap (espacement) appliqué en CSS (20px)
        const gap = 20; 
        
        // Calcul du déplacement
        const amountToMove = (slideWidth + gap) * currentIndex;
        track.style.transform = 'translateX(-' + amountToMove + 'px)';

        // Gestion de l'état des boutons (Désactiver si on est au bout)
        prevButton.disabled = currentIndex === 0;
        
        // On désactive le bouton "Suivant" si on a atteint la fin
        // (Nombre total - Nombre visibles)
        nextButton.disabled = currentIndex >= slides.length - visibleSlides;
    }

    // Event Listeners sur les flèches
    nextButton.addEventListener('click', () => {
        const visibleSlides = getVisibleSlides();
        if (currentIndex < slides.length - visibleSlides) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    // Mettre à jour si on redimensionne la fenêtre (responsive)
    window.addEventListener('resize', () => {
        // Reset à 0 pour éviter les bugs d'affichage lors du changement brutal de taille
        currentIndex = 0; 
        updateCarousel();
    });

    // Initialisation
    updateCarousel();
});

// --- LOGIQUE GALERIE SCREENSHOTS (1 par 1) ---
document.addEventListener('DOMContentLoaded', () => {
    // Sélecteurs spécifiques à la galerie
    const galTrack = document.getElementById('galleryTrack');
    const galSlides = Array.from(galTrack.children);
    const galNextBtn = document.getElementById('galNextBtn');
    const galPrevBtn = document.getElementById('galPrevBtn');
    const galCounter = document.getElementById('galleryCounter');

    let galleryIndex = 0;

    function updateGallery() {
        // Déplacement simple : index * 100%
        galTrack.style.transform = 'translateX(-' + (galleryIndex * 100) + '%)';
        
        // Mise à jour du compteur (ex: 1 / 4)
        galCounter.innerText = `${galleryIndex + 1} / ${galSlides.length}`;

        // Gestion état boutons (désactivés aux extrémités)
        galPrevBtn.style.opacity = galleryIndex === 0 ? "0.5" : "1";
        galPrevBtn.style.pointerEvents = galleryIndex === 0 ? "none" : "auto";

        galNextBtn.style.opacity = galleryIndex === galSlides.length - 1 ? "0.5" : "1";
        galNextBtn.style.pointerEvents = galleryIndex === galSlides.length - 1 ? "none" : "auto";
    }

    galNextBtn.addEventListener('click', () => {
        if (galleryIndex < galSlides.length - 1) {
            galleryIndex++;
            updateGallery();
        }
    });

    galPrevBtn.addEventListener('click', () => {
        if (galleryIndex > 0) {
            galleryIndex--;
            updateGallery();
        }
    });

    // Initialisation
    updateGallery();
});

// --- LOGIQUE TEXTE DYNAMIQUE (Hero) ---
document.addEventListener('DOMContentLoaded', () => {
    const dynamicElement = document.getElementById('dynamic-text');
    
    // LISTE DES MOTS À FAIRE DÉFILER (Modifiable ici pour ton équipe marketing)
    const phrases = [
        "d'organiser",
        "de gagner en efficacité",
        "de gérer les événements",
        "de fédérer vos équipes" 
    ];

    let phraseIndex = 0;

    // Fonction pour changer le texte
    function rotateText() {
        // 1. On commence par cacher le texte (ajout de la classe CSS)
        dynamicElement.classList.add('hide-text');

        // 2. On attend la fin de l'animation de disparition (0.5s = 500ms)
        setTimeout(() => {
            // On change l'index pour prendre le mot suivant
            phraseIndex = (phraseIndex + 1) % phrases.length;
            
            // On met à jour le texte dans le HTML
            dynamicElement.textContent = phrases[phraseIndex];
            
            // 3. On réaffiche le texte (retrait de la classe CSS)
            dynamicElement.classList.remove('hide-text');
            
        }, 500); // Doit correspondre à la durée du 'transition' dans le CSS
    }

    // Lancer le changement toutes les 2.5 secondes (2500ms)
    setInterval(rotateText, 2500);
});

document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
        const faqItem = button.parentElement;
        
        // Ferme les autres questions ouvertes (optionnel)
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        // Bascule l'état actif de la question cliquée
        faqItem.classList.toggle('active');
    });
});

// On récupère les éléments
const video = document.getElementById('mainVideo');
const videoPlayer = document.getElementById('videoPlayer'); // Le conteneur parent
const playPauseBtn = document.getElementById('playPauseBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeSlider = document.getElementById('volumeSlider');
const fullScreenBtn = document.getElementById('fullScreenBtn');
const videoOverlay = document.getElementById('videoOverlay');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const progressBar = document.getElementById('progressBar'); // À ajouter dans ton HTML
const progressArea = document.getElementById('progressArea'); // À ajouter dans ton HTML

// 1. Fonction Play / Pause (Optimisée)
function togglePlay() {
    if (video.paused) {
        video.play();
        playPauseBtn.innerHTML = '<i class="ph-pause-fill"></i>';
        videoOverlay.style.opacity = '0';
        setTimeout(() => { if(!video.paused) videoOverlay.style.visibility = 'hidden' }, 300);
    } else {
        video.pause();
        playPauseBtn.innerHTML = '<i class="ph-play-fill"></i>';
        videoOverlay.style.visibility = 'visible';
        videoOverlay.style.opacity = '1';
    }
}

playPauseBtn.addEventListener('click', togglePlay);
videoOverlay.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

// 2. Gestion du Volume et Mute
volumeSlider.addEventListener('input', (e) => {
    video.volume = e.target.value;
    video.muted = (e.target.value == 0);
    updateVolumeIcon();
});

muteBtn.addEventListener('click', () => {
    video.muted = !video.muted;
    updateVolumeIcon();
});

function updateVolumeIcon() {
    if (video.muted || video.volume === 0) {
        muteBtn.innerHTML = '<i class="ph-speaker-slash-fill"></i>';
    } else {
        muteBtn.innerHTML = '<i class="ph-speaker-high-fill"></i>';
    }
}

// 3. Barre de progression interactive (Crucial pour le Web)
video.addEventListener('timeupdate', () => {
    const progress = (video.currentTime / video.duration) * 100;
    if (progressBar) progressBar.style.width = `${progress}%`;
    currentTimeEl.textContent = formatTime(video.currentTime);
});

if (progressArea) {
    progressArea.addEventListener('click', (e) => {
        const areaWidth = progressArea.clientWidth;
        video.currentTime = (e.offsetX / areaWidth) * video.duration;
    });
}

// 4. Plein écran (Méthode robuste pour tous les navigateurs)
fullScreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
        // On demande le plein écran au CONTENEUR pour garder tes contrôles verts
        if (videoPlayer.requestFullscreen) {
            videoPlayer.requestFullscreen();
        } else if (videoPlayer.webkitRequestFullscreen) { /* Safari */
            videoPlayer.webkitRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
});

// 5. Initialisation et Formatage
video.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(video.duration);
});

function formatTime(time) {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// 6. Relancer (Bouton Restart)
const restartBtn = document.getElementById('restartBtn');
if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        video.currentTime = 0;
        if (video.paused) togglePlay();
        
        restartBtn.style.transform = 'rotate(-360deg)';
        setTimeout(() => restartBtn.style.transform = 'rotate(0deg)', 400);
    });
}

const pricingCheckbox = document.getElementById('pricing-checkbox');

// Éléments Premium
const premiumPrice = document.getElementById('premium-price');

pricingCheckbox.addEventListener('change', function() {
    if (this.checked) {
        // --- MODE ANNUEL ---
        premiumPrice.textContent = "199.90€";
    } else {
        // --- MODE MENSUEL ---
        premiumPrice.textContent = "19.90€";
    }

    // Animation de "pop" sur les prix
    [essentielPrice, premiumPrice].forEach(el => {
        el.style.transform = "scale(1.1)";
        setTimeout(() => el.style.transform = "scale(1)", 200);
    });
});

window.addEventListener('scroll', () => {
    const tunnel = document.querySelector('.scroll-tunnel');
    const heroText = document.getElementById('hero-text');
    const imgs = [
        document.getElementById('img-1'),
        document.getElementById('img-2'),
        document.getElementById('img-3'),
        document.getElementById('img-4')
    ];
    
    // Calcul du pourcentage de scroll dans la section
    const scrollTop = window.scrollY;
    const tunnelTop = tunnel.offsetTop;
    const tunnelHeight = tunnel.offsetHeight - window.innerHeight;
    // Calcul du pourcentage (on s'assure qu'il démarre à 0 dès le haut de page)
    let scrollPercent = (scrollTop - tunnelTop) / tunnelHeight;
    scrollPercent = Math.max(0, Math.min(1, scrollPercent)); // Lock entre 0 et 1

    if (scrollPercent >= 0) {
        // Le texte commence à s'effacer tout de suite mais doucement
        heroText.style.opacity = 1 - (scrollPercent * 3); 

        // On déclenche les images plus tôt pour supprimer l'effet de "vide"
        // Etape 1 : apparaît presque tout de suite (à 5%)
        manageImage(scrollPercent, 0.00, 0.30, imgs[0]);
        // Etape 2 : 
        manageImage(scrollPercent, 0.35, 0.55, imgs[1]);
        // Etape 3 :
        manageImage(scrollPercent, 0.60, 0.80, imgs[2]);
        // Etape 4 :
        manageImage(scrollPercent, 0.85, 1.0, imgs[3]);
    }
});

function manageImage(percent, start, end, element) {
    if (percent >= start && percent <= end) {
        element.classList.add('active');
    } else {
        element.classList.remove('active');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.advantage-card');
    
    const observerOptions = {
        threshold: 0.2 // Déclenche quand 20% de la carte est visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const rows = document.querySelectorAll('.collapsible-row');

    rows.forEach(row => {
        row.addEventListener('click', () => {
            // Optionnel : ferme les autres lignes avant d'ouvrir la nouvelle
            rows.forEach(otherRow => {
                if (otherRow !== row) otherRow.classList.remove('is-open');
            });

            // Bascule la ligne actuelle
            row.classList.toggle('is-open');
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('track');
    const slides = Array.from(track.children);
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    const carouselNav = document.getElementById('carouselNav');

    const slideWidth = slides[0].getBoundingClientRect().width; // Largeur d'une slide
    let currentIndex = 0; // Index de la première slide visible

    // Crée les points de navigation
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active'); // Active le premier point
        dot.addEventListener('click', () => moveToSlide(index));
        carouselNav.appendChild(dot);
    });

    const dots = Array.from(carouselNav.children);

    // Fonction pour déplacer le carousel vers une slide spécifique
    function moveToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        updateDots();
    }

    // Met à jour l'état actif des points de navigation
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Bouton Précédent
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveToSlide(currentIndex - 1);
        } else { // Revenir à la fin si on est au début
            moveToSlide(slides.length - 1);
        }
    });

    // Bouton Suivant
    nextButton.addEventListener('click', () => {
        // Assume 3 slides visibles à la fois pour le calcul, tu devras ajuster si tu en affiches plus ou moins
        const maxIndex = slides.length - 3; // Si tu montres 3 slides, le max index est le nombre total - 3
        if (currentIndex < maxIndex) {
            moveToSlide(currentIndex + 1);
        } else { // Revenir au début si on est à la fin
            moveToSlide(0);
        }
    });

    // Optionnel: Ajuster le carousel lors du redimensionnement de la fenêtre
    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        // Recalcule la position pour rester sur la slide actuelle
        track.style.transform = `translateX(-${newSlideWidth * currentIndex}px)`;
    });
});

let hideControlsTimeout;

function handleControlsVisibility() {
    const controls = document.querySelector('.video-controls');
    
    // On n'active le masquage automatique QUE si on est en plein écran
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        
        // On affiche les contrôles dès que la souris bouge
        controls.classList.remove('controls-hidden');
        document.body.style.cursor = 'default';

        // On réinitialise le timer
        clearTimeout(hideControlsTimeout);

        // On cache après 2 secondes d'inactivité
        hideControlsTimeout = setTimeout(() => {
            if (!video.paused) { // On ne cache pas si la vidéo est en pause
                controls.classList.add('controls-hidden');
                document.body.style.cursor = 'none'; // On cache aussi le curseur !
            }
        }, 2000); 
    } else {
        // Hors plein écran, on s'assure que tout est visible
        controls.classList.remove('controls-hidden');
        document.body.style.cursor = 'default';
        clearTimeout(hideControlsTimeout);
    }
}

// Écouteurs d'événements
videoPlayer.addEventListener('mousemove', handleControlsVisibility);
videoPlayer.addEventListener('mousedown', handleControlsVisibility);

// On réinitialise si on quitte le plein écran
document.addEventListener('fullscreenchange', () => {
    if (!document.fullscreenElement) {
        const controls = document.querySelector('.video-controls');
        controls.classList.remove('controls-hidden');
        document.body.style.cursor = 'default';
    }
});

fullScreenBtn.addEventListener('click', () => {
    if (!document.fullscreenElement) {
        videoPlayer.requestFullscreen();
        // Force les contrôles à rester au premier plan absolu
        document.querySelector('.video-controls').style.zIndex = "2147483647";
        // Désactive l'overlay central pour ne pas bloquer les clics en bas
        videoOverlay.style.pointerEvents = "none"; 
    } else {
        document.exitFullscreen();
        videoOverlay.style.pointerEvents = "auto";
    }
});

// form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const data = new FormData(e.target);

//     // On pointe vers ton nouveau fichier PHP
//     const response = await fetch("send_mail.php", {
//         method: "POST",
//         body: data
//     });

//     const result = await response.json();
//     if (result.status === "success") {
//         button.textContent = "Vérifiez votre boîte mail ! ✨";
//     }
// });
