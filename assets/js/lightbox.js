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
        const imageUrl = images[currentIndex];

        // Clear previous content
        lightbox.innerHTML = '';

        // Create elements programmatically to prevent XSS
        const content = document.createElement('div');
        content.className = 'lightbox-content';

        const img = document.createElement('img');
        img.src = imageUrl;
        // The alt text can be improved if the anchor has a title or data-alt attribute
        img.alt = 'Lightbox image'; 

        const closeBtn = document.createElement('button');
        closeBtn.className = 'lightbox-btn lightbox-close';
        closeBtn.innerHTML = '&times;';

        const prevBtn = document.createElement('button');
        prevBtn.className = 'lightbox-btn lightbox-prev';
        prevBtn.innerHTML = '&lt;';

        const nextBtn = document.createElement('button');
        nextBtn.className = 'lightbox-btn lightbox-next';
        nextBtn.innerHTML = '&gt;';

        content.appendChild(img);
        content.appendChild(closeBtn);
        content.appendChild(prevBtn);
        content.appendChild(nextBtn);
        lightbox.appendChild(content);

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