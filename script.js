/**
 * BNEVO - Landing Page Script
 * Version: 2026.06 (Sécurisée & Optimisée)
 */

// Global slide index pour le slider de la section solution
let slideIndex = 1;

// Fonctions globales (appelées directement depuis le HTML via onclick)
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("slider-btn");

    if (slides.length === 0) return; // Sécurité si le slider n'est pas rendu

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active-slide");
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "flex";
        setTimeout(() => {
            if (slides[slideIndex - 1]) slides[slideIndex - 1].classList.add("active-slide");
        }, 10);
    }

    if (dots[slideIndex - 1]) {
        dots[slideIndex - 1].className += " active";
    }
}

/**
 * POINT D'ENTRÉE UNIQUE - Initialisation une fois le DOM chargé
 */
document.addEventListener('DOMContentLoaded', () => {

    // 1. Slider Solution (Côté Organisateur / Côté Bénévole)
    showSlides(slideIndex);

    // 2. Carrousel des Témoignages
    initTestimonialsCarousel();

    // 3. Galerie d'images
    initGallery();

    // 4. Texte Dynamique (Effet de rotation)
    initDynamicText();

    // 5. Accordéon FAQ
    initFAQ();

    // 6. Lecteur Vidéo Personnalisé
    initVideoPlayer();

    // 7. Toggle des Tarifs (Mensuel / Annuel)
    initPricingToggle();

    // 8. Effet Scroll Tunnel (Animation iPhone)
    initScrollTunnel();

    // 9. Intersection Observer (Animation des cartes avantages)
    initAdvantageCardsAnimation();

    // 10. Table de fonctionnalités rétractable
    initCollapsibleTable();
});

/**
 * MODULES D'INITIALISATION SÉCURISÉS
 */

function initTestimonialsCarousel() {
    const track = document.getElementById('track');
    const prevButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    const carouselNav = document.getElementById('carouselNav');

    if (!track || !prevButton || !nextButton) return;

    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    const slideWidth = slides[0].getBoundingClientRect().width;
    let currentIndex = 0;

    // Sécurité : on ne génère les points que si le conteneur nav existe dans le HTML
    if (carouselNav) {
        carouselNav.innerHTML = ''; // Nettoyage préalable
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => moveToSlide(index));
            carouselNav.appendChild(dot);
        });
    }

    function moveToSlide(index) {
        currentIndex = index;
        track.style.transform = `translateX(-${slideWidth * currentIndex}px)`;
        updateDots();
    }

    function updateDots() {
        if (!carouselNav) return;
        const dots = Array.from(carouselNav.children);
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            moveToSlide(currentIndex - 1);
        } else {
            moveToSlide(slides.length - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        const maxIndex = slides.length - 3; // Gestion de la réactivité 3 slides visibles
        const width = window.innerWidth;
        const visibleSlides = width <= 600 ? 1 : (width <= 900 ? 2 : 3);

        if (currentIndex < slides.length - visibleSlides) {
            moveToSlide(currentIndex + 1);
        } else {
            moveToSlide(0);
        }
    });

    window.addEventListener('resize', () => {
        const newSlideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${newSlideWidth * currentIndex}px)`;
    });
}

function initGallery() {
    const galTrack = document.getElementById('galleryTrack');
    const galNextBtn = document.getElementById('galNextBtn');
    const galPrevBtn = document.getElementById('galPrevBtn');
    const galCounter = document.getElementById('galleryCounter');

    if (!galTrack || !galNextBtn || !galPrevBtn) return;

    const galSlides = Array.from(galTrack.children);
    let galleryIndex = 0;

    function updateGallery() {
        galTrack.style.transform = 'translateX(-' + (galleryIndex * 100) + '%)';

        // Sécurité sur le compteur optionnel
        if (galCounter) {
            galCounter.innerText = `${galleryIndex + 1} / ${galSlides.length}`;
        }

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

    updateGallery();
}

function initDynamicText() {
    const dynamicElement = document.getElementById('dynamic-text');
    if (!dynamicElement) return;

    const phrases = [
        "d'organiser",
        "de gagner en efficacité",
        "de gérer les événements",
        "de fédérer vos équipes"
    ];
    let phraseIndex = 0;

    setInterval(() => {
        dynamicElement.classList.add('hide-text');
        setTimeout(() => {
            phraseIndex = (phraseIndex + 1) % phrases.length;
            dynamicElement.textContent = phrases[phraseIndex];
            dynamicElement.classList.remove('hide-text');
        }, 500);
    }, 2500);
}

function initFAQ() {
    const questions = document.querySelectorAll('.faq-question');
    questions.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) item.classList.remove('active');
            });
            faqItem.classList.toggle('active');
        });
    });
}

function initVideoPlayer() {
    const video = document.getElementById('mainVideo');
    const videoPlayer = document.getElementById('videoPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const muteBtn = document.getElementById('muteBtn');
    const volumeSlider = document.getElementById('volumeSlider');
    const fullScreenBtn = document.getElementById('fullScreenBtn');
    const videoOverlay = document.getElementById('videoOverlay');
    const currentTimeEl = document.getElementById('currentTime');
    const durationEl = document.getElementById('duration');
    const progressBar = document.getElementById('progressBar');
    const progressArea = document.getElementById('progressArea');
    const restartBtn = document.getElementById('restartBtn');

    if (!video) return;

    function togglePlay() {
        if (video.paused) {
            video.play().catch(err => console.log("Autoplay bloqué ou erreur de lecture vidéo:", err));
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="ph-pause-fill"></i>';
            if (videoOverlay) {
                videoOverlay.style.opacity = '0';
                setTimeout(() => { if (!video.paused) videoOverlay.style.visibility = 'hidden'; }, 300);
            }
        } else {
            video.pause();
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="ph-play-fill"></i>';
            if (videoOverlay) {
                videoOverlay.style.visibility = 'visible';
                videoOverlay.style.opacity = '1';
            }
        }
    }

    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
    if (videoOverlay) videoOverlay.addEventListener('click', togglePlay);
    video.addEventListener('click', togglePlay);

    if (volumeSlider) {
        volumeSlider.addEventListener('input', (e) => {
            video.volume = e.target.value;
            video.muted = (e.target.value == 0);
            updateVolumeIcon();
        });
    }

    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            video.muted = !video.muted;
            updateVolumeIcon();
        });
    }

    function updateVolumeIcon() {
        if (!muteBtn) return;
        if (video.muted || video.volume === 0) {
            muteBtn.innerHTML = '<i class="ph-speaker-slash-fill"></i>';
        } else {
            muteBtn.innerHTML = '<i class="ph-speaker-high-fill"></i>';
        }
    }

    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        if (progressBar) progressBar.style.width = `${progress}%`;
        if (currentTimeEl) currentTimeEl.textContent = formatTime(video.currentTime);
    });

    if (progressArea) {
        progressArea.addEventListener('click', (e) => {
            const areaWidth = progressArea.clientWidth;
            video.currentTime = (e.offsetX / areaWidth) * video.duration;
        });
    }

    if (fullScreenBtn && videoPlayer) {
        const controls = videoPlayer.querySelector('.video-controls');

        fullScreenBtn.addEventListener('click', () => {
            if (!document.fullscreenElement && !document.webkitFullscreenElement) {
                if (videoPlayer.requestFullscreen) {
                    videoPlayer.requestFullscreen();
                } else if (videoPlayer.webkitRequestFullscreen) {
                    videoPlayer.webkitRequestFullscreen();
                }
                if (controls) controls.style.zIndex = "2147483647";
                if (videoOverlay) videoOverlay.style.pointerEvents = "none";
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                }
                if (videoOverlay) videoOverlay.style.pointerEvents = "auto";
            }
        });

        // Gestion de la visibilité des contrôles en plein écran
        let hideControlsTimeout;
        function handleControlsVisibility() {
            if (!controls) return;
            if (document.fullscreenElement || document.webkitFullscreenElement) {
                controls.classList.remove('controls-hidden');
                document.body.style.cursor = 'default';
                clearTimeout(hideControlsTimeout);
                hideControlsTimeout = setTimeout(() => {
                    if (!video.paused) {
                        controls.classList.add('controls-hidden');
                        document.body.style.cursor = 'none';
                    }
                }, 2000);
            }
        }

        videoPlayer.addEventListener('mousemove', handleControlsVisibility);
        videoPlayer.addEventListener('mousedown', handleControlsVisibility);
    }

    document.addEventListener('fullscreenchange', () => {
        if (!document.fullscreenElement && videoPlayer) {
            const controls = videoPlayer.querySelector('.video-controls');
            if (controls) controls.classList.remove('controls-hidden');
            document.body.style.cursor = 'default';
        }
    });

    video.addEventListener('loadedmetadata', () => {
        if (durationEl) durationEl.textContent = formatTime(video.duration);
    });

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            video.currentTime = 0;
            if (video.paused) togglePlay();
            restartBtn.style.transform = 'rotate(-360deg)';
            setTimeout(() => restartBtn.style.transform = 'rotate(0deg)', 400);
        });
    }

    function formatTime(time) {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
}

function initPricingToggle() {
    const pricingCheckbox = document.getElementById('pricing-checkbox');
    const premiumPrice = document.getElementById('premium-price');

    if (!pricingCheckbox || !premiumPrice) return;

    pricingCheckbox.addEventListener('change', function () {
        premiumPrice.textContent = this.checked ? "199.90€" : "19.90€";

        premiumPrice.style.transform = "scale(1.1)";
        setTimeout(() => premiumPrice.style.transform = "scale(1)", 200);
    });
}

function initScrollTunnel() {
    const tunnel = document.querySelector('.scroll-tunnel');
    const heroText = document.getElementById('hero-text');

    if (!tunnel || !heroText) return;

    const imgs = [
        document.getElementById('img-1'),
        document.getElementById('img-2'),
        document.getElementById('img-3'),
        document.getElementById('img-4')
    ];

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const tunnelTop = tunnel.offsetTop;
        const tunnelHeight = tunnel.offsetHeight - window.innerHeight;

        if (tunnelHeight <= 0) return;

        let scrollPercent = (scrollTop - tunnelTop) / tunnelHeight;
        scrollPercent = Math.max(0, Math.min(1, scrollPercent));

        if (scrollPercent >= 0) {
            heroText.style.opacity = 1 - (scrollPercent * 3);

            manageImage(scrollPercent, 0.00, 0.30, imgs[0]);
            manageImage(scrollPercent, 0.35, 0.55, imgs[1]);
            manageImage(scrollPercent, 0.60, 0.80, imgs[2]);
            manageImage(scrollPercent, 0.85, 1.0, imgs[3]);
        }
    });

    function manageImage(percent, start, end, element) {
        if (!element) return; // SÉCURITÉ MAJEURE : ne crashe pas si le DOM est absent/en commentaire
        if (percent >= start && percent <= end) {
            element.classList.add('active');
        } else {
            element.classList.remove('active');
        }
    }
}

function initAdvantageCardsAnimation() {
    const cards = document.querySelectorAll('.advantage-card');
    if (cards.length === 0) return;

    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}

function initCollapsibleTable() {
    const rows = document.querySelectorAll('.collapsible-row');
    rows.forEach(row => {
        row.addEventListener('click', () => {
            rows.forEach(otherRow => {
                if (otherRow !== row) otherRow.classList.remove('is-open');
            });
            row.classList.toggle('is-open');
        });
    });
}
