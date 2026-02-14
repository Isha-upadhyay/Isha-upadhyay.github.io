/* ===============================================
   Portfolio JavaScript - Isha Upadhyay
   =============================================== */

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Navbar Active State =====
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTop() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', toggleScrollTop);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Simple AOS-like Animation on Scroll =====
const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.classList.add('aos-animate');
        }
    });
};

// Add CSS for AOS animations
const style = document.createElement('style');
style.textContent = `
    [data-aos] {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    [data-aos].aos-animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    [data-aos="fade-up"] {
        transform: translateY(30px);
    }
    
    [data-aos="fade-right"] {
        transform: translateX(-30px);
    }
    
    [data-aos="zoom-in"] {
        transform: scale(0.9);
    }
    
    [data-aos="flip-left"] {
        transform: perspective(1000px) rotateY(-15deg);
    }
    
    [data-aos].aos-animate {
        transform: translateY(0) translateX(0) scale(1) rotateY(0);
    }
`;
document.head.appendChild(style);

// Initialize AOS
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ===== Performance: Debounce Scroll Events =====
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimized scroll handlers
window.addEventListener('scroll', debounce(() => {
    updateActiveLink();
    toggleScrollTop();
    animateOnScroll();
}, 10));

// ===== Add loading animation to images =====
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.animation = 'fadeIn 0.5s ease';
    });
});

// ===== Project Card Hover Effects =====
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// ===== Service Card Icon Rotation on Hover =====
const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach(card => {
    const icons = card.querySelectorAll('.service-icons img');
    
    card.addEventListener('mouseenter', function() {
        icons.forEach((icon, index) => {
            setTimeout(() => {
                icon.style.transform = 'rotateY(360deg)';
            }, index * 100);
        });
    });
    
    card.addEventListener('mouseleave', function() {
        icons.forEach(icon => {
            icon.style.transform = 'rotateY(0deg)';
        });
    });
});

// ===== Skill Item Hover Animation =====
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'rotateY(360deg) scale(1.1)';
        }
    });
    
    item.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'rotateY(0deg) scale(1)';
        }
    });
});

// ===== Typing Effect for Hero Title (Optional) =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ===== Counter Animation for Stats =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
    }, 16);
}

// Initialize counter animations when stats come into view
const statValues = document.querySelectorAll('.stat-value');
let statsAnimated = false;

function initStatsAnimation() {
    const statsSection = document.querySelector('.github-stats');
    if (!statsSection || statsAnimated) return;
    
    const rect = statsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
        statsAnimated = true;
        statValues.forEach(stat => {
            const text = stat.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (!isNaN(number)) {
                animateCounter(stat, number);
            }
        });
    }
}

window.addEventListener('scroll', debounce(initStatsAnimation, 100));

// ===== Parallax Effect for Background Orbs =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.05 * (index + 1);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===== Add fade-in animation on page load =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    animateOnScroll();
});

// ===== Preloader (Optional) =====
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// ===== GitHub Chart Theme Update =====
function updateGithubChart() {
    const chart = document.getElementById('github-chart');
    if (chart) {
        // Default green color for the chart
        const color = '00d4a1';
        chart.src = `https://ghchart.rshah.org/${color}/Isha-upadhyay`;
    }
}

// Initialize on load
updateGithubChart();

// ===== Console Easter Egg =====
console.log('%c👋 Hi there!', 'font-size: 24px; font-weight: bold; color: #00d4a1;');
console.log('%c🚀 Thanks for checking out my portfolio!', 'font-size: 14px; color: #8b949e;');
console.log('%c💼 Looking for opportunities? Let\'s connect!', 'font-size: 14px; color: #00d4a1;');
console.log('%c📧 ishaupadhyay354287@gmail.com', 'font-size: 12px; color: #ffffff;');

// ===== Page Visibility Change Handler =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = '👋 Come back! - Isha Upadhyay';
    } else {
        document.title = 'Isha Upadhyay - Software Engineer';
    }
});

// ===== Social Link Tracking (Optional Analytics) =====
const socialLinks = document.querySelectorAll('.social-link, .contact-card');

socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const platform = this.getAttribute('href');
        console.log(`Clicked: ${platform}`);
        // You can add Google Analytics or other tracking here
    });
});

// ===== Mobile Menu (if needed later) =====
const createMobileMenu = () => {
    const mobileMenuHTML = `
        <div class="mobile-menu-btn" id="mobileMenuBtn">
            <i class="fas fa-bars"></i>
        </div>
        <div class="mobile-menu" id="mobileMenu">
            <div class="mobile-menu-close">
                <i class="fas fa-times"></i>
            </div>
            <ul>
                <li><a href="#home">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#github">GitHub</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    `;
    
    // Add mobile menu styles
    const mobileStyles = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1001;
                background: var(--bg-card);
                border: 1px solid var(--border-color);
                border-radius: 8px;
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--text-primary);
                cursor: pointer;
            }
            
            .mobile-menu {
                position: fixed;
                top: 0;
                right: -100%;
                width: 80%;
                max-width: 300px;
                height: 100vh;
                background: var(--bg-secondary);
                border-left: 1px solid var(--border-color);
                z-index: 1000;
                transition: right 0.3s ease;
                padding: 80px 30px;
            }
            
            .mobile-menu.active {
                right: 0;
            }
            
            .mobile-menu-close {
                position: absolute;
                top: 20px;
                right: 20px;
                font-size: 24px;
                color: var(--text-primary);
                cursor: pointer;
            }
            
            .mobile-menu ul {
                list-style: none;
            }
            
            .mobile-menu li {
                margin-bottom: 20px;
            }
            
            .mobile-menu a {
                color: var(--text-primary);
                text-decoration: none;
                font-size: 18px;
                font-weight: 500;
            }
        }
    `;
    
    // Only add mobile menu on small screens
    if (window.innerWidth <= 768) {
        const menuStyle = document.createElement('style');
        menuStyle.textContent = mobileStyles;
        document.head.appendChild(menuStyle);
        
        // Note: Mobile menu HTML would need to be added manually or with template
    }
};

// Initialize mobile menu if needed
if (window.innerWidth <= 768) {
    createMobileMenu();
}

// ===== Smooth Reveal on Scroll for All Sections =====
const revealSections = () => {
    const reveals = document.querySelectorAll('section');
    
    reveals.forEach(section => {
        const windowHeight = window.innerHeight;
        const elementTop = section.getBoundingClientRect().top;
        const elementVisible = 100;
        
        if (elementTop < windowHeight - elementVisible) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', debounce(revealSections, 50));

// Initialize
revealSections();

// ===== Print Friendly =====
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ===== Accessibility: Keyboard Navigation =====
document.addEventListener('keydown', (e) => {
    // Esc key closes mobile menu
    if (e.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    }
    
    // Ctrl/Cmd + Home scrolls to top
    if ((e.ctrlKey || e.metaKey) && e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

// ===== Performance: Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('✅ Portfolio initialized successfully!');