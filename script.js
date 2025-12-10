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