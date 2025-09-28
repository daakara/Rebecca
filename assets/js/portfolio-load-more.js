document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.masonry-grid');
    const loadMoreBtn = document.querySelector('.load-more-btn');

    if (!grid || !loadMoreBtn) {
        return; // Exit if elements are not found
    }

    const items = Array.from(grid.querySelectorAll('.masonry-item'));
    const itemsPerLoad = 9; // Number of items to show per click
    let itemsShown = itemsPerLoad;

    const toggleVisibleItems = () => {
        items.forEach((item, index) => {
            if (index < itemsShown) {
                item.style.display = 'inline-block';
            } else {
                item.style.display = 'none';
            }
        });

        // Hide button if all items are shown
        if (itemsShown >= items.length) {
            loadMoreBtn.style.display = 'none';
        }
    };

    loadMoreBtn.addEventListener('click', () => {
        itemsShown += itemsPerLoad;
        toggleVisibleItems();
    });

    // Initial setup
    toggleVisibleItems();
});