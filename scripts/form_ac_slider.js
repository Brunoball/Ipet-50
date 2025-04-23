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
