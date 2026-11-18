const track = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dots = document.querySelectorAll('.dot');
const slides = document.querySelectorAll('.slide');
let currentIndex = 0;
// Функция для определения количества видимых слайдов
function getVisibleSlides() {
// Если ширина экрана меньше или равна 768px, возвращаем 1, иначе 3
return window.innerWidth <= 768 ? 1 : 3;
}
function updateSlider() {
const visibleSlides = getVisibleSlides();
const totalSlides = slides.length;
// Максимальный индекс не может превышать (всего - видимых)
const maxIndex = totalSlides - visibleSlides;
if (currentIndex > maxIndex) {
currentIndex = maxIndex;
}
if (currentIndex < 0) {
currentIndex = 0;
}
// Вычисляем процент сдвига
// Один слайд занимает (100 / visibleSlides)%
const percentage = currentIndex * (100 / visibleSlides);
track.style.transform = `translateX(-${percentage}%)`;
// Обновляем точки (пейджер)
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
currentIndex = 0; // Возврат в начало (зацикливание)
}
updateSlider();
});
prevBtn.addEventListener('click', () => {
const visibleSlides = getVisibleSlides();
const maxIndex = slides.length - visibleSlides;
if (currentIndex > 0) {
currentIndex--;
} else {
currentIndex = maxIndex; // Переход в конец (зацикливание)
}
updateSlider();
});
// Следим за изменением размера окна (ПК <-> Смартфон)
window.addEventListener('resize', updateSlider);
// Запуск при загрузке
updateSlider();