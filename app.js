// Main JavaScript file for website functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function(e) {
            e.preventDefault();
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navMenu && navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Get target section and scroll to it
            const targetId = this.getAttribute('href');
            scrollToSection(targetId);
        });
    });

    // Smooth scrolling function
    function scrollToSection(targetId) {
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = targetSection.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Navbar background on scroll
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // CTA button click handler
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection('#contact');
        });
    }

    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        // Clear any placeholder content
        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const messageField = document.getElementById('message');
        
        if (nameField) nameField.value = '';
        if (emailField) emailField.value = '';
        if (messageField) messageField.value = '';
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get error message elements
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const messageError = document.getElementById('message-error');
            
            // Reset previous validation states
            clearValidation([nameField, emailField, messageField]);
            clearErrors([nameError, emailError, messageError]);
            
            let isValid = true;
            
            // Validate name
            if (!nameField.value.trim()) {
                showError(nameField, nameError, 'Name is required');
                isValid = false;
            } else if (nameField.value.trim().length < 2) {
                showError(nameField, nameError, 'Name must be at least 2 characters');
                isValid = false;
            } else {
                showValid(nameField);
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailField.value.trim()) {
                showError(emailField, emailError, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(emailField.value.trim())) {
                showError(emailField, emailError, 'Please enter a valid email address');
                isValid = false;
            } else {
                showValid(emailField);
            }
            
            // Validate message
            if (!messageField.value.trim()) {
                showError(messageField, messageError, 'Message is required');
                isValid = false;
            } else if (messageField.value.trim().length < 10) {
                showError(messageField, messageError, 'Message must be at least 10 characters');
                isValid = false;
            } else {
                showValid(messageField);
            }
            
            // If form is valid, show success message
            if (isValid) {
                showSuccessMessage();
                contactForm.reset();
                clearValidation([nameField, emailField, messageField]);
            }
        });
        
        // Real-time validation
        const formFields = contactForm.querySelectorAll('.form-control');
        formFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
            
            field.addEventListener('input', function() {
                if (this.classList.contains('invalid')) {
                    validateField(this);
                }
            });
        });
    }
    
    // Add scroll animations for cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all cards for animation
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add hover effects to portfolio cards
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add click animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('btn--primary')) {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'all 0.3s ease';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
        
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.height, rect.width);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            // Add ripple animation
            if (!document.getElementById('ripple-animation')) {
                const style = document.createElement('style');
                style.id = 'ripple-animation';
                style.textContent = `
                    @keyframes ripple {
                        to {
                            transform: scale(2);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    });
});

// Helper functions for form validation
function showError(field, errorElement, message) {
    field.classList.add('invalid');
    field.classList.remove('valid');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = 'var(--color-error)';
    }
}

function showValid(field) {
    field.classList.add('valid');
    field.classList.remove('invalid');
}

function clearValidation(fields) {
    fields.forEach(field => {
        if (field) {
            field.classList.remove('valid', 'invalid');
        }
    });
}

function clearErrors(errorElements) {
    errorElements.forEach(element => {
        if (element) {
            element.textContent = '';
        }
    });
}

function validateField(field) {
    if (!field) return;
    
    const fieldId = field.id;
    const errorElement = document.getElementById(fieldId + '-error');
    
    switch (fieldId) {
        case 'name':
            if (!field.value.trim()) {
                showError(field, errorElement, 'Name is required');
            } else if (field.value.trim().length < 2) {
                showError(field, errorElement, 'Name must be at least 2 characters');
            } else {
                showValid(field);
                if (errorElement) errorElement.textContent = '';
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!field.value.trim()) {
                showError(field, errorElement, 'Email is required');
            } else if (!emailRegex.test(field.value.trim())) {
                showError(field, errorElement, 'Please enter a valid email address');
            } else {
                showValid(field);
                if (errorElement) errorElement.textContent = '';
            }
            break;
            
        case 'message':
            if (!field.value.trim()) {
                showError(field, errorElement, 'Message is required');
            } else if (field.value.trim().length < 10) {
                showError(field, errorElement, 'Message must be at least 10 characters');
            } else {
                showValid(field);
                if (errorElement) errorElement.textContent = '';
            }
            break;
    }
}

function showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--color-success);
            color: white;
            padding: 16px 24px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1001;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        ">
            ✓ Message sent successfully! We'll get back to you soon.
        </div>
    `;
    
    // Add animation keyframes
    if (!document.getElementById('success-animation')) {
        const style = document.createElement('style');
        style.id = 'success-animation';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(successMessage);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.parentNode.removeChild(successMessage);
        }
    }, 5000);
}