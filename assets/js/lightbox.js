document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.masonry-item a');
    if (galleryItems.length === 0) return;
    
    const images = Array.from(galleryItems).map(item => ({
        src: item.href,
        alt: item.querySelector('img')?.alt || 'Gallery image'
    }));
    let currentIndex = 0;
    let triggerElement = null;

    // --- Create Lightbox Structure Once ---
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-labelledby', 'lightbox-heading');
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <h2 id="lightbox-heading" class="visually-hidden">Image Gallery</h2>
            <img src="" alt="" class="lightbox-image">
            <button class="lightbox-btn lightbox-close" aria-label="Close dialog">&times;</button>
            <button class="lightbox-btn lightbox-prev" aria-label="Previous image">&lt;</button>
            <button class="lightbox-btn lightbox-next" aria-label="Next image">&gt;</button>
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const prevButton = lightbox.querySelector('.lightbox-prev');
    const nextButton = lightbox.querySelector('.lightbox-next');
    const closeButton = lightbox.querySelector('.lightbox-close');
    
    // Focusable elements for the focus trap
    const focusableElements = [prevButton, nextButton, closeButton];

    const preloadImage = (index) => {
        if (index >= 0 && index < images.length) {
            const img = new Image();
            img.src = images[index].src;
        }
    };

    const showImage = (index) => {
        currentIndex = index;
        const image = images[currentIndex];
        
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        // Preload next and previous images
        preloadImage(currentIndex + 1);
        preloadImage(currentIndex - 1);
    };

    const openLightbox = (index) => {
        triggerElement = document.activeElement; // Save the element that opened the lightbox
        showImage(index);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        closeButton.focus(); // Set initial focus on the close button
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        if (triggerElement) {
            triggerElement.focus(); // Return focus to the element that opened the lightbox
        }
    };

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            openLightbox(index);
        });
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === closeButton) {
            closeLightbox();
        } else if (e.target === nextButton) {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        } else if (e.target === prevButton) {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }
    });

    // --- Keyboard Navigation & Accessibility ---
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'ArrowRight':
                nextButton.click();
                break;
            case 'ArrowLeft':
                prevButton.click();
                break;
            case 'Escape':
                closeLightbox();
                break;
            case 'Tab':
                // Focus trap logic
                const firstFocusable = focusableElements[0];
                const lastFocusable = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstFocusable) {
                        lastFocusable.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastFocusable) {
                        firstFocusable.focus();
                        e.preventDefault();
                    }
                }
                break;
        }
    });
});