// Mostrar/Ocultar botón al hacer scroll
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 100) { // Aparece después de 150px (en lugar de 300px)
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Hacer scroll suave al hacer clic
document.getElementById('backToTop').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll suave
});


window.addEventListener('scroll', function() {
    console.log("Scrolling...");
    var botonIrArriba = document.getElementById('top');
    var umbral = window.innerHeight / 10; // Umbral de desplazamiento para mostrar el botón

    if (window.scrollY > umbral) {
        botonIrArriba.style.display = 'block';
    } else {
        botonIrArriba.style.display = 'none';
    }
});










//seccion de funcionamiento tarjetas especialidades
document.addEventListener('DOMContentLoaded', function () {
    const mediaQuery = window.matchMedia("(max-width: 980px)");
    let cards; // Referencia a las tarjetas
    let isMobileMode = false; // Indica si estamos en modo móvil

    function manejarClick(card) {
        return function () {
            // Desvoltea otras tarjetas si están volteadas
            cards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('is-flipped')) {
                    otherCard.classList.remove('is-flipped');
                    otherCard.querySelector('.front').style.transform = 'rotateY(0deg)';
                    otherCard.querySelector('.back').style.transform = 'rotateY(180deg)';
                }
            });

            // Toggle de la clase is-flipped en la tarjeta actual
            card.classList.toggle('is-flipped');

            // Aplicar transformaciones basadas en el estado volteado
            const frontFace = card.querySelector('.front');
            const backFace = card.querySelector('.back');
            const isFlipped = card.classList.contains('is-flipped');

            if (isFlipped) {
                frontFace.style.transform = 'rotateY(180deg)';
                backFace.style.transform = 'rotateY(360deg)';
            } else {
                frontFace.style.transform = 'rotateY(0deg)';
                backFace.style.transform = 'rotateY(180deg)';
            }
        };
    }

    function habilitarModoMovil() {
        if (!isMobileMode) {
            isMobileMode = true;
            cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                // Agregar eventos de clic a cada tarjeta
                card.addEventListener('click', manejarClick(card));
            });

            console.log("Modo móvil activado.");
        }
    }

    function deshabilitarModoMovil() {
        if (isMobileMode) {
            isMobileMode = false;

            cards.forEach(card => {
                // Eliminar todos los eventos de clic de las tarjetas
                const newCard = card.cloneNode(true);
                card.parentNode.replaceChild(newCard, card);
            });

            console.log("Modo móvil desactivado.");
        }
    }

    function manejarCambio(evento) {
        if (evento.matches) {
            habilitarModoMovil();
        } else {
            deshabilitarModoMovil();
        }
    }

    // Ejecutar al cargar la página
    manejarCambio(mediaQuery);

    // Escuchar cambios en el tamaño de la pantalla
    mediaQuery.addEventListener('change', manejarCambio);
});








