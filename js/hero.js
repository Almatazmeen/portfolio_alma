/* ============================================================
   hero.js — Premium Hero Interactions
   Handles: particles, ripple, typing, parallax
============================================================ */

// ---- 1. PARTICLES ----
(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let W = window.innerWidth, H = window.innerHeight;
    canvas.width = W; canvas.height = H;

    const COLORS = ['rgba(92,113,94,', 'rgba(182,205,189,', 'rgba(221,238,223,'];
    const NUM = Math.min(60, Math.floor((W * H) / 18000));
    let particles = [];

    function random(min, max) { return Math.random() * (max - min) + min; }

    function createParticle() {
        return {
            x: random(0, W),
            y: random(0, H),
            r: random(1, 3.5),
            dx: random(-0.3, 0.3),
            dy: random(-0.5, -0.1),
            opacity: random(0.15, 0.55),
            color: COLORS[Math.floor(Math.random() * COLORS.length)]
        };
    }

    for (let i = 0; i < NUM; i++) particles.push(createParticle());

    function draw() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color + p.opacity + ')';
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;

            if (p.y < -10) { Object.assign(p, createParticle(), { y: H + 10 }); }
            if (p.x < -10) p.x = W + 10;
            if (p.x > W + 10) p.x = -10;
        });
        requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
        W = window.innerWidth; H = window.innerHeight;
        canvas.width = W; canvas.height = H;
    });
})();

// ---- 2. RIPPLE EFFECT on btn-apple ----
(function initRipple() {
    const btn = document.getElementById('btn-primary');
    if (!btn) return;
    const container = btn.querySelector('.ripple-container');
    if (!container) return;

    btn.addEventListener('pointerdown', function (e) {
        const rect = btn.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px;`;
        container.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
})();

// ---- 3. NAVBAR SCROLL ----
(function initNavbar() {
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
})();

// ---- 4. SCROLL-TRIGGERED FADE-IN ----
(function initFadeIn() {
    const els = document.querySelectorAll('.fade-in');
    if (!els.length) return;

    // Immediately reveal elements already visible in viewport
    els.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            el.classList.add('appear');
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    els.forEach(el => {
        if (!el.classList.contains('appear')) {
            observer.observe(el);
        }
    });
})();
