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
    let isAnimating = false;
    const transitionDuration = 600; // 0.6s en ms (debe coincidir con CSS)

    // Función mejorada con zoom inverso y transiciones consistentes
    function showSlide(index) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        // Manejo del índice circular
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Desactivar zoom en la imagen actual
        slides[currentIndex].classList.remove('active');
        
        // Configurar la transición
        slidesContainer.style.transition = `transform ${transitionDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1)`;
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;
        
        // Actualizar dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Activar zoom en la nueva imagen después de un pequeño retraso
        setTimeout(() => {
            slides[index].classList.add('active');
        }, 50);
        
        // Actualizar índice y resetear después de la transición
        setTimeout(() => {
            currentIndex = index;
            isAnimating = false;
        }, transitionDuration);
    }

    // Navegación
    nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
        resetInterval();
    });

    prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
        resetInterval();
    });

    // Navegación por dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            if (i !== currentIndex) {
                showSlide(i);
                resetInterval();
            }
        });
    });

    // Touch events para móviles
    slidesContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(intervalId);
    }, {passive: true});

    slidesContainer.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        setTimeout(startInterval, 3000);
    }, {passive: true});

    function handleSwipe() {
        if (isAnimating) return;
        
        const diff = touchStartX - touchEndX;
        if (diff > 50) showSlide(currentIndex + 1); // Swipe izquierda
        if (diff < -50) showSlide(currentIndex - 1); // Swipe derecha
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

    // Inicialización - Mostrar primera imagen con zoom normal
    slides[0].classList.add('active');
    startInterval();

    // Pausar al interactuar
    const slider = document.querySelector('.gallery-slider');
    slider.addEventListener('mouseenter', () => clearInterval(intervalId));
    slider.addEventListener('mouseleave', startInterval);
});