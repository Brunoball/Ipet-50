document.addEventListener('DOMContentLoaded', function() {
    // Configuración común para todos los sliders
    const SLIDE_INTERVAL = 5000; // 5 segundos entre transiciones automáticas
    const TRANSITION_SPEED = 600; // 0.6 segundos de duración de transición
    const CLICK_DELAY = 800; // 0.8 segundos de espera entre clicks manuales
    
    function initSlider(sliderContainer) {
        const slider = sliderContainer.querySelector('.slider');
        const slides = sliderContainer.querySelector('.slides');
        const slideItems = sliderContainer.querySelectorAll('.slide');
        const prevBtn = sliderContainer.querySelector('.prev');
        const nextBtn = sliderContainer.querySelector('.next');
        const dots = sliderContainer.querySelectorAll('.dot');
        
        let currentIndex = 0;
        const totalSlides = slideItems.length;
        let slideWidth = slider.offsetWidth;
        let slideInterval;
        let isTransitioning = false;
        let lastClickTime = 0;
        
        // Establecer el ancho de los slides
        function setSlideWidth() {
            slideWidth = slider.offsetWidth;
            slideItems.forEach(slide => {
                slide.style.width = `${slideWidth}px`;
            });
            updateSlider();
        }
        
        // Actualizar la posición del slider
        function updateSlider() {
            slides.style.transition = `transform ${TRANSITION_SPEED}ms ease-in-out`;
            slides.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
            
            // Actualizar dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Controlar el estado de transición
            isTransitioning = true;
            setTimeout(() => {
                isTransitioning = false;
            }, TRANSITION_SPEED);
        }
        
        // Verificar si se puede realizar una acción
        function canInteract() {
            const now = Date.now();
            return !isTransitioning && (now - lastClickTime > CLICK_DELAY);
        }
        
        // Ir a un slide específico
        function goToSlide(index) {
            if (!canInteract()) return;
            
            lastClickTime = Date.now();
            currentIndex = index;
            updateSlider();
            resetAutoSlide();
        }
        
        // Navegación
        function prevSlide() {
            if (!canInteract()) return;
            
            lastClickTime = Date.now();
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
            resetAutoSlide();
        }
        
        function nextSlide() {
            if (!canInteract()) return;
            
            lastClickTime = Date.now();
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
            resetAutoSlide();
        }
        
        // Auto-avance (no necesita el delay)
        function autoNextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }
        
        function startAutoSlide() {
            clearInterval(slideInterval);
            slideInterval = setInterval(autoNextSlide, SLIDE_INTERVAL);
        }
        
        function resetAutoSlide() {
            clearInterval(slideInterval);
            startAutoSlide();
        }
        
        // Event listeners con protección contra clicks rápidos
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                if (canInteract() && index !== currentIndex) {
                    goToSlide(index);
                }
            });
        });
        
        // Pausar al interactuar
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // Touch events para móviles con delay
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('touchend', (e) => {
            const now = Date.now();
            if (now - lastClickTime > CLICK_DELAY) {
                lastClickTime = now;
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }
            startAutoSlide();
        });
        
        function handleSwipe() {
            if (isTransitioning) return;
            
            const difference = touchStartX - touchEndX;
            if (difference > 50) { // Deslizamiento a la izquierda
                nextSlide();
            } else if (difference < -50) { // Deslizamiento a la derecha
                prevSlide();
            }
        }
        
        // Inicialización
        setSlideWidth();
        startAutoSlide();
        window.addEventListener('resize', setSlideWidth);
    }
    
    // Inicializar todos los sliders
    const sliderContainers = document.querySelectorAll('.slider-container');
    sliderContainers.forEach(initSlider);
});






































document.addEventListener("DOMContentLoaded", function () {
    const readMoreBtn = document.querySelector(".read-more-btn");
    const extraContent = document.querySelector(".extra-content");
    const btnText = document.querySelector(".btn-text");

    readMoreBtn.addEventListener("click", function () {
        const isExpanded = extraContent.classList.contains("expanded");

        if (isExpanded) {
            // Cierre: establecer altura actual, luego a 0 para que sea suave
            extraContent.style.maxHeight = extraContent.scrollHeight + "px"; 
            requestAnimationFrame(() => {
                extraContent.style.maxHeight = "0px";
                extraContent.style.opacity = "0";
                extraContent.style.margin = "0";
            });
        } else {
            // Apertura: establecer altura exacta
            extraContent.style.maxHeight = extraContent.scrollHeight + "px";
            extraContent.style.opacity = "1";
            extraContent.style.margin = "1rem 0";
        }

        extraContent.classList.toggle("expanded");
        readMoreBtn.classList.toggle("expanded");
        btnText.textContent = isExpanded ? "Leer más" : "Leer menos";
    });
});
