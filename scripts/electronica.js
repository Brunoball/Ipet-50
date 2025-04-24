document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los sliders
    initAllSliders();
    
    // Evita que los enlaces # afecten el historial
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            history.replaceState(null, null, ' ');
        });
    });
});

function initAllSliders() {
    // Inicializar el slider de perfil
    initSlider({
        sliderSelector: '.perfil-gallery-slider',
        slideSelector: '.gallery-slide',
        prevBtnSelector: '.gallery-prev',
        nextBtnSelector: '.gallery-next',
        dotsContainerSelector: '.gallery-dots'
    });
    
    // Inicializar el slider de evento
    initSlider({
        sliderSelector: '.evento-slider',
        slideSelector: '.evento-slide',
        prevBtnSelector: '.evento-prev',
        nextBtnSelector: '.evento-next',
        dotsContainerSelector: '.evento-dots'
    });
}

function initSlider(config) {
    const slider = document.querySelector(config.sliderSelector);
    if (!slider) return;
    
    const slides = document.querySelectorAll(`${config.sliderSelector} ${config.slideSelector}`);
    const prevBtn = document.querySelector(config.prevBtnSelector);
    const nextBtn = document.querySelector(config.nextBtnSelector);
    const dotsContainer = document.querySelector(config.dotsContainerSelector);
    let currentSlide = 0;
    let slideInterval;
    
    // Create dots
    if (dotsContainer) {
        dotsContainer.innerHTML = '';
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
    }
    
    const dots = dotsContainer ? document.querySelectorAll(`${config.dotsContainerSelector} span`) : [];
    
    // Initialize slider
    function setupSlider() {
        slides.forEach((slide, index) => {
            slide.style.opacity = index === 0 ? '1' : '0';
            slide.style.zIndex = index === 0 ? '1' : '0';
        });
        
        updateDots();
    }
    
    // Go to specific slide
    function goToSlide(index) {
        slides[currentSlide].style.opacity = '0';
        slides[currentSlide].style.zIndex = '0';
        
        currentSlide = (index + slides.length) % slides.length;
        
        slides[currentSlide].style.opacity = '1';
        slides[currentSlide].style.zIndex = '1';
        updateDots();
    }
    
    // Update dots
    function updateDots() {
        if (dots.length > 0) {
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    }
    
    // Initialize
    setupSlider();
    
    // Auto-rotate slides (opcional)
    function startAutoRotation() {
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    }
    
    startAutoRotation();
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', startAutoRotation);
}

























// Control del botón Leer más/menos
document.addEventListener('DOMContentLoaded', function() {
    const leerMasBtn = document.querySelector('.leer-mas-btn');
    const leerMasParagraphs = document.querySelectorAll('.LeerMas');
    
    if (leerMasBtn && leerMasParagraphs.length > 0) {
        leerMasBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Alternar estado ARIA para accesibilidad
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Alternar texto del botón
            this.textContent = isExpanded ? 'Leer más' : 'Leer menos';
            
            // Alternar clases con transición
            leerMasParagraphs.forEach(p => {
                if (isExpanded) {
                    p.classList.remove('active');
                } else {
                    p.classList.add('active');
                }
            });
            
            // Desplazamiento suave al contenido
            if (!isExpanded) {
                setTimeout(() => {
                    this.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 300);
            }
        });
    }
});