document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.getElementById('gallerySlides');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    let intervalId;
    let isAnimating = false; // Bandera para controlar animaciones

    // Función mejorada sin efecto blanco
    function showSlide(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Movimiento directo sin efectos intermedios
        slidesContainer.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        
        currentIndex = index;
        
        // Actualizar dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
        
        // Resetear después de la transición
        setTimeout(() => {
            slidesContainer.style.transition = 'none';
            isAnimating = false;
        }, 500);
    }

    // Navegación
    nextBtn.addEventListener('click', () => {
        if (!isAnimating) {
            showSlide(currentIndex + 1);
            resetInterval();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (!isAnimating) {
            showSlide(currentIndex - 1);
            resetInterval();
        }
    });

    // Navegación por dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (!isAnimating && i !== currentIndex) {
                showSlide(i);
                resetInterval();
            }
        });
    });

    // Touch events para móviles
    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        if (isAnimating) return;
        
        const diff = touchStartX - touchEndX;
        if (diff > 50) showSlide(currentIndex + 1); // Swipe izquierda
        if (diff < -50) showSlide(currentIndex - 1); // Swipe derecha
        if (Math.abs(diff) > 50) resetInterval();
    }

    // Autoplay con pausa al interactuar
    function startInterval() {
        intervalId = setInterval(() => {
            if (!isAnimating) {
                showSlide(currentIndex + 1);
            }
        }, 5000);
    }

    function resetInterval() {
        clearInterval(intervalId);
        startInterval();
    }

    // Inicialización
    showSlide(0);
    startInterval();

    // Pausar al interactuar
    const slider = document.querySelector('.gallery-slider');
    slider.addEventListener('mouseenter', () => clearInterval(intervalId));
    slider.addEventListener('mouseleave', startInterval);
    slider.addEventListener('touchstart', () => clearInterval(intervalId));
    slider.addEventListener('touchend', () => setTimeout(startInterval, 3000));
});