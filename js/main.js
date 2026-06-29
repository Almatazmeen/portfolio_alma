// Initialize animations on scroll
const initScrollAnimations = () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.12
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
};

const initNavbar = () => {
    // Skip if hero.js already handles this (homepage)
    if (document.getElementById('particleCanvas')) return;

    const header = document.getElementById('navbar');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.style.background = 'rgba(255, 255, 255, 0.92)';
            header.style.boxShadow = '0 4px 30px rgba(92,113,94,0.12)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(242, 249, 241, 0.6)';
            header.style.boxShadow = 'none';
            header.style.backdropFilter = 'blur(12px)';
        }
    }, { passive: true });
};

const initMobileMenu = () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    navbar.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
            // Prevent toggling if clicking a link inside the nav
            if (e.target.tagName !== 'A') {
                navbar.classList.toggle('menu-open');
            }
        }
    });
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbar();
    initMobileMenu();
});
