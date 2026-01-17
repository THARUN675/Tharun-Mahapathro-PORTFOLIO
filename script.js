/**
 * ============================================
 * PORTFOLIO JAVASCRIPT
 * Animations, Interactions & Effects
 * ============================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initCursorGlow();
    initNavigation();
    initScrollAnimations();
    initSmoothScroll();
    initTypingEffect();
    initFormHandler();
    initParallaxEffects();
    initStars();
});

/**
 * ============================================
 * STARS BACKGROUND EFFECT
 * Creates twinkling stars in the hero section
 * ============================================
 */
function initStars() {
    const starsContainer = document.getElementById('stars');
    if (!starsContainer) return;
    
    const numberOfStars = 100;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        
        // Random size
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random color tint
        const colors = ['#64ffda', '#00d4ff', '#7928ca', '#ff0080', '#ffffff'];
        star.style.background = colors[Math.floor(Math.random() * colors.length)];
        star.style.boxShadow = `0 0 ${size * 2}px ${star.style.background}`;
        
        starsContainer.appendChild(star);
    }
}

/**
 * ============================================
 * CURSOR GLOW EFFECT
 * Creates a glowing effect that follows cursor
 * ============================================
 */
function initCursorGlow() {
    const cursorGlow = document.getElementById('cursorGlow');
    
    if (!cursorGlow || window.innerWidth < 768) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    const ease = 0.08;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth animation loop
    function animateCursor() {
        // Lerp (Linear interpolation) for smooth movement
        currentX += (mouseX - currentX) * ease;
        currentY += (mouseY - currentY) * ease;
        
        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Increase glow on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-tag');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorGlow.style.opacity = '0.7';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorGlow.style.opacity = '0.5';
        });
    });
}

/**
 * ============================================
 * NAVIGATION
 * Mobile menu toggle & scroll behavior
 * ============================================
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // Navbar scroll effect
    let lastScroll = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for background
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
    
    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    
    function highlightActiveLink() {
        const scrollPos = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveLink, { passive: true });
    highlightActiveLink();
}

/**
 * ============================================
 * SCROLL ANIMATIONS
 * Intersection Observer for reveal effects
 * ============================================
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    if (!animatedElements.length) return;
    
    // Check if reduced motion is preferred
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
        // Show all elements immediately without animation
        animatedElements.forEach(el => {
            el.classList.add('visible');
        });
        return;
    }
    
    // Observer options
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    // Create observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe each element
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

/**
 * ============================================
 * SMOOTH SCROLL
 * Enhanced smooth scrolling for anchor links
 * ============================================
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href === '#') return;
            
            const targetElement = document.querySelector(href);
            
            if (targetElement) {
                e.preventDefault();
                
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, '', href);
            }
        });
    });
}

/**
 * ============================================
 * TYPING EFFECT
 * Animated typing for hero section
 * ============================================
 */
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    
    if (!heroTitle) return;
    
    // Add typing cursor effect to gradient text
    const gradientText = heroTitle.querySelector('.title-gradient');
    
    if (gradientText) {
        // Create cursor element
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.innerHTML = '|';
        cursor.style.cssText = `
            display: inline-block;
            animation: blink 1s step-end infinite;
            color: var(--color-accent-primary);
            margin-left: 2px;
        `;
        
        // Add blink animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 100% { opacity: 1; }
                50% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Add cursor after delay
        setTimeout(() => {
            gradientText.appendChild(cursor);
            
            // Remove cursor after some time
            setTimeout(() => {
                cursor.style.animation = 'blink 1s step-end 3';
                setTimeout(() => cursor.remove(), 3000);
            }, 3000);
        }, 1500);
    }
}

/**
 * ============================================
 * FORM HANDLER
 * Contact form validation & submission
 * ============================================
 */
function initFormHandler() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    // Form field elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = contactForm.querySelector('.btn-submit');
    
    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Real-time validation
    function validateField(input, validationFn) {
        const isValid = validationFn(input.value);
        
        if (input.value && !isValid) {
            input.style.borderColor = '#ef4444';
        } else if (input.value && isValid) {
            input.style.borderColor = '#22c55e';
        } else {
            input.style.borderColor = '';
        }
        
        return isValid;
    }
    
    // Add input listeners
    if (nameInput) {
        nameInput.addEventListener('blur', () => {
            validateField(nameInput, val => val.trim().length >= 2);
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            validateField(emailInput, val => emailPattern.test(val));
        });
    }
    
    if (messageInput) {
        messageInput.addEventListener('blur', () => {
            validateField(messageInput, val => val.trim().length >= 10);
        });
    }
    
    // Form submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = nameInput && validateField(nameInput, val => val.trim().length >= 2);
        const isEmailValid = emailInput && validateField(emailInput, val => emailPattern.test(val));
        const isMessageValid = messageInput && validateField(messageInput, val => val.trim().length >= 10);
        
        if (!isNameValid || !isEmailValid || !isMessageValid) {
            showNotification('Please fill in all fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `
            <span>Sending...</span>
            <svg class="btn-icon spinning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10" stroke-dasharray="60" stroke-dashoffset="20"/>
            </svg>
        `;
        submitBtn.disabled = true;
        
        // Add spinning animation
        const spinStyle = document.createElement('style');
        spinStyle.textContent = `
            .spinning {
                animation: spin 1s linear infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(spinStyle);
        
        // Simulate form submission (replace with actual API call)
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Success
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
            
            // Reset field styles
            [nameInput, emailInput, messageInput].forEach(input => {
                if (input) input.style.borderColor = '';
            });
            
        } catch (error) {
            showNotification('Something went wrong. Please try again.', 'error');
        } finally {
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

/**
 * ============================================
 * NOTIFICATION SYSTEM
 * Toast notifications for feedback
 * ============================================
 */
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Icon based on type
    const icons = {
        success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
        </svg>`,
        error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="15" y1="9" x2="9" y2="15"/>
            <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>`,
        info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="16" x2="12" y2="12"/>
            <line x1="12" y1="8" x2="12.01" y2="8"/>
        </svg>`
    };
    
    notification.innerHTML = `
        <span class="notification-icon">${icons[type]}</span>
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="Close notification">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    
    // Styles
    const colors = {
        success: { bg: 'rgba(34, 197, 94, 0.1)', border: '#22c55e', text: '#22c55e' },
        error: { bg: 'rgba(239, 68, 68, 0.1)', border: '#ef4444', text: '#ef4444' },
        info: { bg: 'rgba(99, 102, 241, 0.1)', border: '#6366f1', text: '#6366f1' }
    };
    
    const color = colors[type];
    
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        background: ${color.bg};
        border: 1px solid ${color.border};
        border-radius: 12px;
        backdrop-filter: blur(20px);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Add animation styles
    const animStyle = document.createElement('style');
    animStyle.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
        .notification-icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            color: ${color.text};
        }
        .notification-icon svg {
            width: 100%;
            height: 100%;
        }
        .notification-message {
            color: #f8fafc;
            font-size: 14px;
            line-height: 1.5;
        }
        .notification-close {
            width: 20px;
            height: 20px;
            flex-shrink: 0;
            color: #64748b;
            cursor: pointer;
            transition: color 0.2s;
        }
        .notification-close:hover {
            color: #f8fafc;
        }
        .notification-close svg {
            width: 100%;
            height: 100%;
        }
    `;
    document.head.appendChild(animStyle);
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

/**
 * ============================================
 * PARALLAX EFFECTS
 * Subtle parallax on scroll
 * ============================================
 */
function initParallaxEffects() {
    const heroGlows = document.querySelectorAll('.hero-glow');
    
    if (!heroGlows.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                heroGlows.forEach((glow, index) => {
                    const speed = (index + 1) * 0.1;
                    glow.style.transform = `translateY(${scrolled * speed}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    }, { passive: true });
}

/**
 * ============================================
 * SKILLS ANIMATION
 * Animate skill tags on hover
 * ============================================
 */
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            // Random slight rotation for playful effect
            const rotation = (Math.random() - 0.5) * 6;
            tag.style.transform = `scale(1.05) rotate(${rotation}deg)`;
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = '';
        });
    });
});

/**
 * ============================================
 * PROJECT CARD TILT EFFECT
 * 3D tilt on project cards
 * ============================================
 */
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${rotateX}deg)
                rotateY(${rotateY}deg)
                translateY(-10px)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});

/**
 * ============================================
 * COUNTER ANIMATION
 * Animate numbers on scroll into view
 * ============================================
 */
document.addEventListener('DOMContentLoaded', () => {
    const counters = document.querySelectorAll('[data-count]');
    
    if (!counters.length) return;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
});

/**
 * ============================================
 * KEYBOARD NAVIGATION
 * Enhanced accessibility for keyboard users
 * ============================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#about';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: fixed;
        top: -100%;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        background: var(--color-accent-primary);
        color: white;
        border-radius: 8px;
        z-index: 10000;
        transition: top 0.3s;
        text-decoration: none;
        font-weight: 500;
    `;
    
    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '20px';
    });
    
    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-100%';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

/**
 * ============================================
 * LAZY LOADING IMAGES
 * Load images as they come into viewport
 * ============================================
 */
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (!lazyImages.length) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

/**
 * ============================================
 * PERFORMANCE OPTIMIZATION
 * Throttle and debounce utilities
 * ============================================
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Export utilities for use elsewhere if needed
window.portfolioUtils = {
    throttle,
    debounce,
    showNotification
};

console.log('✨ Portfolio loaded successfully!');
