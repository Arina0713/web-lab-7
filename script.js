const track = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
function getVisibleSlides() {
    return window.innerWidth <= 768 ? 1 : 3;
}
function updateSlider() {
    const visibleSlides = getVisibleSlides();
    const totalSlides = slides.length;
    const maxIndex = totalSlides - visibleSlides;
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    const percentage = currentIndex * (100 / visibleSlides);
    track.style.transform = `translateX(-${percentage}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
    });
}
nextBtn.addEventListener('click', () => {
    const visibleSlides = getVisibleSlides();
    const maxIndex = slides.length - visibleSlides;
    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateSlider();
});
prevBtn.addEventListener('click', () => {
    const visibleSlides = getVisibleSlides();
    const maxIndex = slides.length - visibleSlides;
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = maxIndex;
    }
    updateSlider();
});
window.addEventListener('resize', updateSlider);
updateSlider();
