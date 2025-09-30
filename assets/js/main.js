document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    const backToTopButton = document.querySelector('.back-to-top');
    const portfolioLink = document.querySelector('.nav-item--has-dropdown'); // Target the portfolio link container

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            if (navMenu) {
                const isActive = navMenu.classList.toggle('active');
                navToggle.setAttribute('aria-expanded', isActive);
            }
            // The active class on the toggle itself is for styling the hamburger icon (e.g., into an 'X')
            navToggle.classList.toggle('active');
        });
    }

    // Portfolio Dropdown for Desktop
    if (portfolioLink) {
        portfolioLink.addEventListener('mouseenter', () => {
            if (window.innerWidth > 1024) { // Only on desktop
                portfolioLink.classList.add('dropdown-active');
            }
        });
        portfolioLink.addEventListener('mouseleave', () => {
            portfolioLink.classList.remove('dropdown-active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
            if (navToggle && navToggle.classList.contains('active')) {
                navToggle.classList.remove('active');

            }
        });
    });

    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    document.addEventListener('click', function(event) {
        if (navMenu && navMenu.classList.contains('active')) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });

    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            if (navbar) {
                navbar.classList.add('scrolled');
            }
        } else {
            if (navbar) navbar.classList.remove('scrolled');
        }
    });

    // Back to Top Button Logic
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) { // Show button after scrolling 300px
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
