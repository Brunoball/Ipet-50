document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');

    // Función para cerrar el menú (mejorada con la versión más completa)
    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Abrir/cerrar menú con el botón hamburguesa (versión mejorada)
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation(); // Evita que el clic se propague al documento
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (menuOverlay) menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Cerrar menú al hacer clic en el overlay (nueva funcionalidad)
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // Cerrar menú al hacer clic en cualquier parte fuera del menú (nueva funcionalidad)
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // Desplazamiento suave para los enlaces del menú (versión mejorada con retraso)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Solo si es un enlace interno (que comienza con #)
            if(this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                // Cerrar el menú usando la función común
                closeMenu();
                
                // Desplazamiento suave con retraso mejorado
                if(targetElement) {
                    setTimeout(() => {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                            behavior: 'smooth'
                        });
                    }, 300);
                }
            }
        });
    });
});