document.addEventListener('DOMContentLoaded', function() {
    // Función para inicializar un slider
    function initSlider(sliderContainer) {
        const slider = sliderContainer.querySelector('.slider');
        const slides = slider.querySelector('.slides');
        const slideItems = slider.querySelectorAll('.slide');
        const prevBtn = slider.querySelector('.prev');
        const nextBtn = slider.querySelector('.next');
        const dots = slider.querySelectorAll('.dot');
        
        let currentIndex = 0;
        const totalSlides = slideItems.length;
        
        // Función para actualizar la posición del slider
        function updateSlider() {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Actualizar dots
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
            
            // Eliminamos la deshabilitación de botones para permitir el ciclo infinito
            // prevBtn.disabled = false;
            // nextBtn.disabled = false;
        }
        
        // Event listeners para botones de navegación
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        });
        
        // Event listeners para dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        // Inicializar el slider
        updateSlider();
        
        // Auto-avance
        let slideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlider();
        }, 5000);
        
        // Pausar auto-avance al interactuar
        slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % totalSlides;
                updateSlider();
            }, 5000);
        });
    }
    
    // Inicializar todos los sliders en la página
    const sliderContainers = document.querySelectorAll('.slider-container');
    sliderContainers.forEach(container => {
        initSlider(container);
    });
});