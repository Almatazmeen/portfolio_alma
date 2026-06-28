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

    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.5rem 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.08)';
        } else {
            navbar.style.padding = '';
            navbar.style.background = 'rgba(242, 249, 241, 0.6)';
            navbar.style.boxShadow = 'none';
        }
    }, { passive: true });
};

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initNavbar();
});
