const track = document.getElementById('sliderTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
let currentIndex = 0; // Текущая страница (индекс)
// Определяем, сколько фото видно на экране (3 для ПК, 1 для моб)
const getVisibleSlides = () => {
        return window.innerWidth <= 768 ? 1 : 3;
};
const totalSlides = document.querySelectorAll('.slide').length;
function updateSlider() {
    const visibleSlides = getVisibleSlides();
    // Вычисляем смещение
    const offset = currentIndex * (100 / visibleSlides);
    track.style.transform = `translateX(-${offset}%)`;
    // Обновляем пейджер
    // Всего страниц = общее кол-во фото - (видимых - 1)
    const totalPages = totalSlides - visibleSlides + 1;
    // Ограничиваем индекс, чтобы не уходить в пустоту
    const currentPage = Math.min(currentIndex + 1, totalPages);
    pageInfo.textContent = `Страница ${currentPage} из ${totalPages}`;
}
nextBtn.addEventListener('click', () => {
    const visibleSlides = getVisibleSlides();
    const maxIndex = totalSlides - visibleSlides;
    if (currentIndex < maxIndex) {
        currentIndex++;
    } else {
        currentIndex = 0; // Зацикливание (опционально)
    }
    updateSlider();
});
prevBtn.addEventListener('click', () => {
    const visibleSlides = getVisibleSlides();
    const maxIndex = totalSlides - visibleSlides;
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = maxIndex; // Зацикливание (опционально)
    }
    updateSlider();
});
// Обновляем при изменении размера окна (для перехода ПК <-> Смартфон)
window.addEventListener('resize', () => {
    currentIndex = 0; // Сбрасываем на первую страницу для корректного расчета
    updateSlider();
});
// Инициализация при загрузке
updateSlider();