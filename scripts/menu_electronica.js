document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navItems = document.querySelectorAll('.nav-link, .contact-btn'); // Selecciona todos los enlaces del menú

    // Función para cerrar el menú
    function closeMenu() {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        if (menuOverlay) menuOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Abrir/cerrar menú con el botón hamburguesa
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        if (menuOverlay) menuOverlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Cerrar menú al hacer clic en el overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', closeMenu);
    }

    // Cerrar menú al hacer clic en cualquier enlace del menú
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    });

    // Cerrar menú al hacer clic fuera del menú (opcional)
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
});