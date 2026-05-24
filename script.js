// ============ THEME TOGGLE ============
const themeToggle = document.getElementById('themeToggle');
let currentTheme = 'dark';
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    if (currentTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// ============ HAMBURGER MENU ============
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ============ CURSOR GLOW ============
const cursorGlow = document.getElementById('cursorGlow');
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
});

// ============ PARTICLE CANVAS ============
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() {
    const hero = document.querySelector('.hero-section');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
}
class Particle {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        const dx = this.x - mouseX;
        const dy = this.y - (mouseY - canvas.getBoundingClientRect().top);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
            this.x += dx / dist * 1.5;
            this.y += dy / dist * 1.5;
        }
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${this.opacity})`;
        ctx.fill();
    }
}
function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor(canvas.width * canvas.height / 12000));
    for (let i = 0; i < count; i++) particles.push(new Particle());
}
function drawLines() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawLines();
    requestAnimationFrame(animateParticles);
}
window.addEventListener('load', () => { resizeCanvas(); initParticles(); animateParticles(); });
window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

// ============ SCROLL HANDLER ============
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
let ticking = false;
function onScroll() {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 80);
    backToTop.classList.toggle('visible', y > 400);
    let current = '';
    sections.forEach(s => { if (y >= s.offsetTop - 200) current = s.id; });
    navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
    });
}
window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; }
});

// ============ SCROLL REVEAL ============
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('active'), i * 100);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============ COUNTERS ============
let counterDone = false;
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !counterDone) {
            counterDone = true;
            document.querySelectorAll('.stat-number').forEach(el => {
                const target = +el.dataset.target;
                const inc = target / 60;
                let val = 0;
                const update = () => {
                    val += inc;
                    if (val < target) { el.textContent = Math.ceil(val) + '+'; requestAnimationFrame(update); }
                    else el.textContent = target + '+';
                };
                update();
            });
        }
    });
}, { threshold: 0.3 });
const aboutSection = document.getElementById('about');
if (aboutSection) counterObserver.observe(aboutSection);

// ============ TIMELINE ANIMATION ============
const timelineLine = document.getElementById('timelineLine');
if (timelineLine) {
    const tlObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animate'); tlObs.unobserve(e.target); } });
    }, { threshold: 0.2 });
    tlObs.observe(timelineLine);
}

// ============ 3D TILT ============
document.querySelectorAll('[data-tilt]').forEach(el => {
    const max = +(el.dataset.tiltMax || 10);
    el.addEventListener('mousemove', e => {
        const rect = el.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        el.style.transform = `perspective(800px) rotateY(${x * max}deg) rotateX(${-y * max}deg) scale3d(1.02,1.02,1.02)`;
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)';
        el.style.transition = 'transform 0.5s ease';
        setTimeout(() => el.style.transition = '', 500);
    });
});

// ============ CONTACT FORM ============
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = contactForm.querySelector('.submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');

// API endpoint - automatically detects local vs production
const API_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api/send-email'
    : 'https://akhilesh-portfolio-backend.onrender.com/api/send-email';

contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        formMessage.textContent = 'Please fill in all fields.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        formMessage.textContent = 'Please enter a valid email.';
        formMessage.className = 'form-message error';
        formMessage.style.display = 'block';
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, subject, message }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
            formMessage.textContent = '✅ Message sent successfully! I\'ll get back to you soon.';
            formMessage.className = 'form-message success';
            contactForm.reset();
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 6000);
        } else {
            formMessage.textContent = `❌ Error: ${data.error || 'Failed to send message'}`;
            formMessage.className = 'form-message error';
        }
    } catch (error) {
        console.error('Form submission error:', error);
        formMessage.textContent = '❌ Network error. Please try again later.';
        formMessage.className = 'form-message error';
    } finally {
        // Hide loading state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        formMessage.style.display = 'block';
    }
});

// ============ BACK TO TOP & SMOOTH SCROLL ============
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
        e.preventDefault();
        const t = document.querySelector(this.getAttribute('href'));
        if (t) window.scrollTo({ top: t.offsetTop - 70, behavior: 'smooth' });
    });
});

// ============ DYNAMIC YEAR ============
const yr = document.getElementById('currentYear');
if (yr) yr.textContent = new Date().getFullYear();