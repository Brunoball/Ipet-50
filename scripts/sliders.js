
let slideIndex2 = 0;
let slideInterval2;
const slides2 = document.querySelectorAll('.slide2');
const totalSlides2 = slides2.length - 1;

function showSlides2(index) {
    // Asegura que el índice esté dentro del rango
    slideIndex2 = (index < 0) ? totalSlides2 - 1 : (index >= totalSlides2) ? 0 : index;

    const offset = -(slideIndex2 * (80 / totalSlides2)); // Ajusta el desplazamiento en porcentaje

    const slider = document.querySelector('.slides2');
    slider.style.transition = "transform 0.6s ease";
    slider.style.transform = `translateX(${offset}%)`;

    const dots = document.querySelectorAll('.punto2');
    dots.forEach(dot => dot.classList.remove('active2'));
    dots[slideIndex2].classList.add('active2');
}

function nextSlide2() {
    showSlides2(slideIndex2 + 1);
}

function prevSlide2() {
    showSlides2(slideIndex2 - 1);
}

function startSlideInterval2() {
    slideInterval2 = setInterval(nextSlide2, 7000);
}

function stopSlideInterval2() {
    clearInterval(slideInterval2);
}

function currentSlide2(n) {
    clearInterval(slideInterval2);
    showSlides2(n - 1);
    startSlideInterval2();
}

// Inicializa slider2
showSlides2(slideIndex2);
startSlideInterval2();

// Event listeners para botones de navegación
document.querySelector('.prev2').addEventListener('click', () => {
    stopSlideInterval2();
    prevSlide2();
    startSlideInterval2();
});

document.querySelector('.next2').addEventListener('click', () => {
    stopSlideInterval2();
    nextSlide2();
    startSlideInterval2();
});

// Event listeners para los puntos de navegación
document.querySelectorAll('.punto2').forEach((dot, index) => {
    dot.addEventListener('click', () => {
        stopSlideInterval2();
        currentSlide2(index + 1);
        startSlideInterval2();
    });
});


















    

