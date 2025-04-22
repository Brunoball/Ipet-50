document.addEventListener('DOMContentLoaded', function() {
    // Slider functionality
    const slider = document.querySelector('.perfil-gallery-slider');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    const dotsContainer = document.querySelector('.gallery-dots');
    let currentSlide = 0;
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.gallery-dots span');
    
    // Initialize slider
    function initSlider() {
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
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Event listeners
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    // Initialize
    initSlider();
    
    // Auto-rotate slides (opcional)
    let slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => goToSlide(currentSlide + 1), 5000);
    });
});







// Evita que los enlaces # afecten el historial
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        // Limpia el hash de la URL
        history.replaceState(null, null, ' ');
    });
});
