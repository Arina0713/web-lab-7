const slider = document.getElementById('slider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentPageEl = document.getElementById('currentPage');
const totalPagesEl = document.getElementById('totalPages');
let currentIndex = 0; // Текущий индекс картинки
const images = document.querySelectorAll('.slider img');
const totalImages = images.length;
// Определяем, сколько картинок видно на экране
function getVisibleImages() {
    return window.innerWidth < 768 ? 1 : 3;
}
function updateSlider() {
    const visibleImages = getVisibleImages();
    const totalPages = Math.ceil(totalImages / visibleImages);
    // Ограничиваем индекс, чтобы не уйти в пустоту
    if (currentIndex > totalImages - visibleImages) {
        currentIndex = totalImages - visibleImages;
    }
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    const offset = currentIndex * (100 / visibleImages);
    const itemWidth = images[0].clientWidth;
    slider.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
    const page = Math.floor(currentIndex / visibleImages) + 1;
    currentPageEl.innerText = page;
    totalPagesEl.innerText = totalPages;
}
nextBtn.addEventListener('click', () => {
    const visibleImages = getVisibleImages();
    if (currentIndex < totalImages - visibleImages) {
        currentIndex++;
    } else {
        currentIndex = 0; // Зацикливание (опционально)
        }
        updateSlider();
    });
prevBtn.addEventListener('click', () => {
    const visibleImages = getVisibleImages();
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalImages - visibleImages; // Зацикливание
        }
        updateSlider();
});
window.addEventListener('resize', updateSlider);
window.onload = updateSlider;