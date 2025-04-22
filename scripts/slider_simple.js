let slideIndex = 1;
let slideInterval;

function showSlides(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.punto');
  
    slideIndex = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;
  
    // Calculate the total width of all slides
    const totalWidth = slides[0].offsetWidth * slides.length;
  
    // Calculate the offset based on the current slide index and total width
    const offset = -(slideIndex - 1) * (100 / slides.length);
  
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
  
    dots.forEach(dot => dot.classList.remove("active"));
    dots[slideIndex - 1].classList.add("active");
}


function nextSlide() {
    showSlides(slideIndex + 1);
}

function prevSlide() {
    showSlides(slideIndex - 1);
}

function startSlideInterval() {
    slideInterval = setInterval(nextSlide, 7000);
}

function stopSlideInterval() {
    clearInterval(slideInterval);
}

function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(n);
    startSlideInterval();
}

showSlides(slideIndex);
startSlideInterval();








let slideIndex4 = 1;
let slideInterval4;


function showSlides4(n) {
    const slides = document.querySelectorAll('.slide4');
    const dots = document.querySelectorAll('.punto4');
  
    slideIndex4 = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;
  
    // Calculate the total width of all slides
    const totalWidth = slides[0].offsetWidth * slides.length;
  
    // Calculate the offset based on the current slide index and total width
    const offset = -(slideIndex4 - 1) * (100 / slides.length);
  
    document.querySelector('.slides4').style.transform = `translateX(${offset}%)`;
  
    dots.forEach(dot => dot.classList.remove("active4"));
    dots[slideIndex4 - 1].classList.add("active4");
}


function nextSlide4() {
    showSlides4(slideIndex4 + 1);
}

function prevSlide4() {
    showSlides4(slideIndex4 - 1);
}

function startSlideInterval4() {
    slideInterval4 = setInterval(nextSlide4, 7000);
}

function stopSlideInterval4() {
    clearInterval(slideInterval4);
}

function currentSlide4(n) {
    clearInterval(slideInterval4);
    showSlides4(n);
    startSlideInterval4();
}

showSlides4(slideIndex4);
startSlideInterval4();



























let slideIndex3 = 1;
let slideInterval3;

function showSlides3(n) {
    const slides = document.querySelectorAll('.slide3');
    const dots = document.querySelectorAll('.punto3');

    slideIndex3 = (n > slides.length) ? 1 : (n < 1) ? slides.length : n;

    slides.forEach(slide => slide.style.transition = "transform 0.5s ease-in-out");

    const offset = -(slideIndex3 - 1) * 25; // Calcula el desplazamiento

    document.querySelector('.slides3').style.transform = `translateX(${offset}%)`; // Aplica el desplazamiento

    dots.forEach(dot => dot.classList.remove("active3"));
    dots[slideIndex3 - 1].classList.add("active3");
}



function nextSlide3() {
    showSlides3(slideIndex3 + 1);
}

function prevSlide3() {
    showSlides3(slideIndex3 - 1);
}

function startSlideInterval3() {
    slideInterval3 = setInterval(nextSlide3, 7000);
}

function stopSlideInterval3() {
    clearInterval(slideInterval3);
}

function currentSlide3(n) {
    clearInterval(slideInterval3);
    showSlides3(n);
    startSlideInterval3();
}

showSlides3(slideIndex3);
startSlideInterval3();


