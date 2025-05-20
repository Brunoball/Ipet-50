document.addEventListener('DOMContentLoaded', function() {
    // Configuración común para todos los sliders
    const SLIDE_INTERVAL = 5000; // 5 segundos entre transiciones automáticas
    const TRANSITION_SPEED = 600; // 0.6 segundos de duración de transición
    const CLICK_DELAY = 300; // Reducido a 0.3 segundos para mejor respuesta en móvil
    
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
            if (index === currentIndex || !canInteract()) return;
            
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
        
        // Auto-avance
        function autoNextSlide() {
            if (isTransitioning) return;
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
        
        // Event listeners mejorados para móvil
        function handleInteraction(callback) {
            return function(e) {
                // Prevenir el comportamiento por defecto para eventos táctiles
                if (e.type === 'touchstart') {
                    e.preventDefault();
                }
                
                // Detener la propagación para evitar conflictos con el slider
                e.stopPropagation();
                
                callback();
            };
        }
        
        // Agregar eventos tanto para click como para touch
        ['click', 'touchstart'].forEach(event => {
            prevBtn.addEventListener(event, handleInteraction(prevSlide));
            nextBtn.addEventListener(event, handleInteraction(nextSlide));
            
            dots.forEach((dot, index) => {
                dot.addEventListener(event, handleInteraction(() => goToSlide(index)));
            });
        });
        
        // Pausar al interactuar
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', startAutoSlide);
        
        // Touch events para móviles mejorados
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(slideInterval);
        }, { passive: true });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startAutoSlide();
        }, { passive: true });
        
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
        
        // Optimización del resize para móvil
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setSlideWidth();
            }, 100);
        });
    }
    
    // Inicializar todos los sliders
    const sliderContainers = document.querySelectorAll('.slider-container');
    sliderContainers.forEach(initSlider);
});



























document.addEventListener("DOMContentLoaded", function () {
    // Función para manejar el botón "Leer más/menos"
    function setupReadMoreButtons() {
        document.querySelectorAll('.read-more-btn').forEach(button => {
            button.addEventListener('click', function () {
                const contentToggle = this.closest('.content-toggle');
                if (!contentToggle) return;

                const extraContent = contentToggle.querySelector('.extra-content');
                if (!extraContent) return;

                const isExpanded = extraContent.classList.contains('expanded');
                
                // Obtener la altura exacta del contenido
                const contentHeight = extraContent.scrollHeight;
                
                if (isExpanded) {
                    // Animación de cierre
                    extraContent.style.maxHeight = contentHeight + 'px';
                    // Forzar repintado
                    void extraContent.offsetHeight;
                    extraContent.style.maxHeight = '0';
                    extraContent.style.opacity = '0';
                    extraContent.style.padding = '0';
                    extraContent.style.margin = '0';
                } else {
                    // Animación de apertura
                    extraContent.style.maxHeight = '0';
                    // Forzar repintado
                    void extraContent.offsetHeight;
                    extraContent.style.maxHeight = contentHeight + 'px';
                    extraContent.style.opacity = '1';
                    extraContent.style.padding = '1rem 0.5rem';
                    extraContent.style.margin = '1.5rem 0';
                }

                extraContent.classList.toggle('expanded');
                this.classList.toggle('expanded');

                // Actualizar el texto del botón
                const btnText = this.querySelector('.btn-text');
                if (btnText) {
                    btnText.textContent = isExpanded ? 'Leer más' : 'Leer menos';
                }
                
                // Asegurarse de que el contenido se expanda completamente después de la animación
                if (!isExpanded) {
                    setTimeout(() => {
                        extraContent.style.maxHeight = 'none';
                    }, 500);
                }
            });
        });
    }

    // Función para inicializar los sliders
    function setupSliders() {
        document.querySelectorAll('.slider').forEach(slider => {
            const slides = slider.querySelector('.slides');
            const slideItems = slider.querySelectorAll('.slide');
            const prevBtn = slider.querySelector('.prev');
            const nextBtn = slider.querySelector('.next');
            const dots = slider.querySelectorAll('.dot');
            
            let currentIndex = 0;
            const totalSlides = slideItems.length;
            
            function updateSlider() {
                slides.style.transform = `translateX(-${currentIndex * 100}%)`;
                
                // Actualizar dots
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentIndex);
                });
            }
            
            // Event listeners para botones
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                    updateSlider();
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentIndex = (currentIndex + 1) % totalSlides;
                    updateSlider();
                });
            }
            
            // Event listeners para dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateSlider();
                });
            });
            
            // Inicializar
            updateSlider();
        });
    }

    // Inicializar todas las funciones
    setupReadMoreButtons();
    setupSliders();
});