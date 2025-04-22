document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        // Alternar clase active en el botón hamburguesa
        this.classList.toggle('active');
        // Alternar clase active en el menú de navegación
        navLinks.classList.toggle('active');
        
        // Desplazamiento suave para los enlaces del menú
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function(e) {
                // Solo si es un enlace interno (que comienza con #)
                if(this.getAttribute('href').startsWith('#')) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    // Cerrar el menú
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    
                    // Desplazamiento suave
                    if(targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80, // Ajuste para el header fijo
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    });
});