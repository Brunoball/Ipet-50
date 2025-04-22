document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const moreBtn = document.getElementById('moreBtn');
    const subMenu = document.getElementById('subMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle del menú hamburguesa
    navToggle.addEventListener('click', function() {
        this.classList.toggle('open');
        navMenu.classList.toggle('open');
        
        // Cerrar el submenú si está abierto
        if (subMenu.classList.contains('open')) {
            moreBtn.classList.remove('open');
            subMenu.classList.remove('open');
        }
    });
    
    // Toggle del submenu
    moreBtn.addEventListener('click', function(e) {
        // En móvil, funciona como botón toggle
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            this.classList.toggle('open');
            subMenu.classList.toggle('open');
        }
        // En desktop, no hacemos nada (se maneja con hover)
    });
    
    // Cerrar el menú al hacer clic en cualquier enlace (solo móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navToggle.classList.remove('open');
                navMenu.classList.remove('open');
                moreBtn.classList.remove('open');
                subMenu.classList.remove('open');
            }
        });
    });
    
    // Cerrar el menú al hacer clic fuera (solo móvil)
    document.addEventListener('click', function(e) {
        if (window.innerWidth > 768) return;
        
        const isClickInside = navMenu.contains(e.target) || 
                            navToggle.contains(e.target);
        
        if (!isClickInside && navMenu.classList.contains('open')) {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            moreBtn.classList.remove('open');
            subMenu.classList.remove('open');
        }
    });
    
    // Resetear el menú al cambiar el tamaño de pantalla
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('open');
            navMenu.classList.remove('open');
            moreBtn.classList.remove('open');
            subMenu.classList.remove('open');
        }
    });
});
