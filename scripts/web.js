let currentSlideIndex = 0;
let slideInterval;
const slides = document.querySelectorAll('.slider li');

function showSlide(index) {
    const slider = document.querySelector('.slider ul');
    const dots = document.querySelectorAll('.punto');

    currentSlideIndex = (index < 0) ? slides.length - 1 : (index >= slides.length) ? 0 : index;

    // Si es la quinta imagen, forzamos el índice al cuarto punto (índice 3)
    if (currentSlideIndex === slides.length - 1) {
        currentSlideIndex = slides.length - 2; // Cambiamos el índice para apuntar al cuarto punto
    }

    const offset = -(currentSlideIndex % slides.length) * 20; // Calcula el desplazamiento

    slider.style.transition = "transform 0.5s ease"; // Agregar transición para la animación suave
    slider.style.transform = `translateX(${offset}%)`; // Aplica el desplazamiento

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlideIndex].classList.add('active');
}




function prevSlide() {
    showSlide(currentSlideIndex - 1);
}

function nextSlide() {
    if (currentSlideIndex === slides.length - 1 || currentSlideIndex === 3) {
        // Si estamos en la quinta imagen o en la cuarta posición, ir directamente a la primera imagen
        showSlide(0);
    } else {
        // En cualquier otro caso, avanzar al siguiente slide normalmente
        showSlide(currentSlideIndex + 1);
    }
}

// Función para cambiar las diapositivas automáticamente
function autoSlide() {
    nextSlide();
}

// Función para reiniciar el intervalo
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 5000); 
}

// Mostrar la primera imagen al cargar la página y empezar el slider automático
showSlide(currentSlideIndex);
resetInterval();

// Agregar evento de clic para los puntos indicadores
const dots = document.querySelectorAll('.punto');
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlideIndex = index;
        showSlide(currentSlideIndex);
        resetInterval(); // Reiniciar el intervalo al hacer clic en los puntos
    });
});





document.addEventListener("DOMContentLoaded", () => {
    const botonMenu = document.querySelector('.boton_menu');
    const menu = document.querySelector('.menu');
    const masBtn = document.getElementById("mas-btn");
    const submenu = document.querySelector(".submenu");
    const enlacesMenu = document.querySelectorAll('.menu a');

    // Alternar visibilidad del menú principal y ocultar el submenú
    botonMenu.addEventListener("click", () => {
        menu.classList.toggle("open");
        submenu.classList.remove("expanded"); // Ocultar el submenú
        botonMenu.classList.toggle("rotated"); // Rotar el botón del menú principal
    });

    // Alternar visibilidad del submenú
    masBtn.addEventListener("click", (e) => {
        e.preventDefault();
        submenu.classList.toggle("expanded");
    });

    // Cerrar menú principal al hacer clic en cualquier enlace excepto "Más"
    enlacesMenu.forEach((enlace) => {
        enlace.addEventListener("click", (e) => {
            if (e.target !== masBtn) {
                menu.classList.remove("open");
                submenu.classList.remove("expanded");
                botonMenu.classList.remove("rotated");
            }
        });
    });
});








