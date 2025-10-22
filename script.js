// script.js - Main JavaScript functionality for University Clubs Website

document.addEventListener('DOMContentLoaded', function() {
    console.log('University Clubs Website - JavaScript Loaded');

    // ===== INTERACTIVE NAVIGATION MENU =====
    function highlightCurrentPage() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.nav-link');
        
        console.log('Current page:', currentPage);
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if (linkHref === currentPage) {
                link.classList.add('active');
                console.log('Active page:', linkHref);
            }
            
            // Handle index.html as home page
            if ((currentPage === '' || currentPage === 'index.html') && linkHref === 'index.html') {
                link.classList.add('active');
            }
        });
    }

    // ===== MOBILE MENU TOGGLE =====
    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                console.log('Mobile menu toggled');
            });
            
            // Close menu when clicking links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }

    // ===== FORM VALIDATION =====
    function initFormValidation() {
        console.log('Initializing form validation...');

        // Home page inquiry form
        const homeForm = document.getElementById('homeInquiryForm');
        if (homeForm) {
            homeForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Home inquiry form submitted');
                if (validateForm(this)) {
                    showSuccess('Thank you! Your message has been sent successfully. We will get back to you soon.');
                    this.reset();
                }
            });
        }

        // Contact page form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Contact form submitted');
                if (validateForm(this)) {
                    showSuccess('Thank you for your message! We will respond within 24 hours.');
                    this.reset();
                }
            });
        }

        // Event registration form
        const eventForm = document.getElementById('eventRegistrationForm');
        if (eventForm) {
            eventForm.addEventListener('submit', function(e) {
                e.preventDefault();
                console.log('Event registration form submitted');
                if (validateForm(this)) {
                    showSuccess('Successfully registered for the event! Check your email for confirmation.');
                    this.reset();
                }
            });
        }
    }

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        // Clear previous errors
        clearFormErrors(form);
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                showFieldError(input, 'This field is required');
                isValid = false;
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            } else if (input.type === 'tel' && input.value && !isValidPhone(input.value)) {
                showFieldError(input, 'Please enter a valid phone number');
                isValid = false;
            }
        });
        
        return isValid;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    function showFieldError(input, message) {
        input.style.borderColor = 'var(--secondary)';
        
        // Create error message element
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.cssText = 'color: var(--secondary); font-size: 0.875rem; margin-top: 0.25rem; display: block;';
        
        input.parentNode.appendChild(errorElement);
    }

    function clearFormErrors(form) {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => error.remove());
        
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.style.borderColor = '';
        });
    }

    function showSuccess(message) {
        // Create temporary success message
        const successDiv = document.createElement('div');
        successDiv.textContent = message;
        successDiv.style.cssText = `
            background: var(--accent); 
            color: white; 
            padding: 1rem; 
            border-radius: 8px; 
            margin: 1rem 0; 
            text-align: center;
            font-weight: 500;
            box-shadow: var(--shadow);
        `;
        
        const forms = document.querySelectorAll('form');
        if (forms.length > 0) {
            forms[0].parentNode.insertBefore(successDiv, forms[0]);
            
            // Remove after 4 seconds
            setTimeout(() => {
                successDiv.style.opacity = '0';
                successDiv.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    successDiv.remove();
                }, 500);
            }, 4000);
        }
    }

    // ===== DYNAMIC EVENT GALLERY WITH IMAGE SLIDESHOW =====
    function initEventSlideshow() {
        const slideshow = document.querySelector('.event-slideshow');
        if (!slideshow) {
            console.log('No event slideshow found on this page');
            return;
        }
        
        const slides = slideshow.querySelectorAll('.slide');
        const prevBtn = slideshow.querySelector('.slideshow-prev');
        const nextBtn = slideshow.querySelector('.slideshow-next');
        const dots = slideshow.querySelectorAll('.dot');
        
        let currentSlide = 0;
        let slideInterval;
        
        console.log('Event slideshow initialized with', slides.length, 'slides');

        function showSlide(index) {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Show selected slide
            slides[index].classList.add('active');
            dots[index].classList.add('active');
            currentSlide = index;
            
            console.log('Showing slide:', index);
        }
        
        function nextSlide() {
            let nextIndex = currentSlide + 1;
            if (nextIndex >= slides.length) nextIndex = 0;
            showSlide(nextIndex);
        }
        
        function prevSlide() {
            let prevIndex = currentSlide - 1;
            if (prevIndex < 0) prevIndex = slides.length - 1;
            showSlide(prevIndex);
        }
        
        // Event listeners for navigation
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoAdvance();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoAdvance();
            });
        }
        
        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                resetAutoAdvance();
            });
        });
        
        // Auto-advance functionality
        function startAutoAdvance() {
            slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
        }
        
        function resetAutoAdvance() {
            clearInterval(slideInterval);
            startAutoAdvance();
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoAdvance();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoAdvance();
            }
        });
        
        // Start auto-advance
        startAutoAdvance();
        
        // Pause on hover
        slideshow.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slideshow.addEventListener('mouseleave', () => {
            startAutoAdvance();
        });
    }

    // ===== SMOOTH SCROLLING FOR ANCHOR LINKS =====
    function initSmoothScrolling() {
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
    }

    // ===== INITIALIZE ALL FUNCTIONALITY =====
    function initializeAll() {
        highlightCurrentPage();
        initMobileMenu();
        initFormValidation();
        initEventSlideshow();
        initSmoothScrolling();
        
        console.log('All JavaScript functionality loaded successfully');
    }

    // Start everything
    initializeAll();
});

// Global function for any additional functionality needed by React
window.closeModal = function() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.display = 'none';
    }
};