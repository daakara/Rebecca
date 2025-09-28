document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.masonry-item a');
    if (galleryItems.length === 0) return;

    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.classList.add('lightbox');
    document.body.appendChild(lightbox);

    const images = Array.from(galleryItems).map(item => item.href);
    let currentIndex = 0;

    const showImage = (index) => {
        currentIndex = index;
        const imgUrl = images[currentIndex];
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${imgUrl}" alt="">
                <button class="lightbox-btn lightbox-close">&times;</button>
                <button class="lightbox-btn lightbox-prev">&lt;</button>
                <button class="lightbox-btn lightbox-next">&gt;</button>
            </div>
        `;
        lightbox.classList.add('active');
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            showImage(index);
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('active');
            // Clear content after transition
            setTimeout(() => {
                lightbox.innerHTML = '';
            }, 300);
        } else if (e.target.classList.contains('lightbox-next')) {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        } else if (e.target.classList.contains('lightbox-prev')) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'ArrowRight') {
            document.querySelector('.lightbox-next').click();
        } else if (e.key === 'ArrowLeft') {
            document.querySelector('.lightbox-prev').click();
        } else if (e.key === 'Escape') {
            document.querySelector('.lightbox-close').click();
        }
    });
});