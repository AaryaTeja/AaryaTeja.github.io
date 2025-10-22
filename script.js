// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 300);
            });
        }
    });
}, observerOptions);

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    observer.observe(skillsSection);
}

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('bg-white', 'shadow-md');
    } else {
        nav.classList.remove('bg-white', 'shadow-md');
    }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.md\\:hidden');
    const navLinks = document.querySelector('.hidden.md\\:flex');
    
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            navLinks.classList.toggle('flex-col');
            navLinks.classList.toggle('absolute');
            navLinks.classList.toggle('top-16');
            navLinks.classList.toggle('left-0');
            navLinks.classList.toggle('w-full');
            navLinks.classList.toggle('bg-white');
            navLinks.classList.toggle('p-4');
            navLinks.classList.toggle('shadow-md');
        });
    }
});

// Two-way Scroll Animation Observer
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');
            
            // If it's a stagger container, animate children
            if (entry.target.classList.contains('scroll-stagger')) {
                const children = entry.target.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        } else {
            // Only hide if we've scrolled past the element (not just above it)
            const rect = entry.target.getBoundingClientRect();
            if (rect.top > window.innerHeight) {
                entry.target.classList.remove('visible');
                entry.target.classList.add('hidden');
                
                // Reset stagger children
                if (entry.target.classList.contains('scroll-stagger')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '0';
                            child.style.transform = 'translateY(30px)';
                        }, index * 100);
                    });
                }
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Smart Scroll Observer - Only animates when element leaves viewport completely
const smartScrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const element = entry.target;
        
        if (entry.isIntersecting) {
            // Element is entering viewport
            element.classList.add('visible');
            element.classList.remove('hidden');
            
            // Handle stagger animations
            if (element.classList.contains('scroll-stagger')) {
                const children = element.children;
                Array.from(children).forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
        } else {
            // Element is leaving viewport - check direction
            const rect = element.getBoundingClientRect();
            const isScrollingDown = window.scrollY > (element._lastScrollY || 0);
            element._lastScrollY = window.scrollY;
            
            // Only hide if element is above viewport (scrolling down) or below viewport (scrolling up)
            if ((isScrollingDown && rect.bottom < 0) || (!isScrollingDown && rect.top > window.innerHeight)) {
                element.classList.remove('visible');
                element.classList.add('hidden');
                
                // Reset stagger children with reverse timing
                if (element.classList.contains('scroll-stagger')) {
                    const children = element.children;
                    const childCount = children.length;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.style.opacity = '0';
                            child.style.transform = 'translateY(30px)';
                        }, (childCount - index - 1) * 100);
                    });
                }
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all elements with scroll animation classes
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.scroll-fade-in, .scroll-fade-left, .scroll-fade-right, .scroll-scale-in, .scroll-stagger'
    );
    
    animatedElements.forEach(element => {
        smartScrollObserver.observe(element);
    });
});

// Track scroll direction
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    document.body.setAttribute('data-scroll-direction', currentScrollY > lastScrollY ? 'down' : 'up');
    lastScrollY = currentScrollY;
});

// EmailJS functionality
(function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("YOUR_PUBLIC_KEY"); // You'll get this from EmailJS
    
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            formStatus.textContent = '';
            
            // Send email using EmailJS
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(function() {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'mt-4 text-center text-green-600 font-medium';
                    contactForm.reset();
                }, function(error) {
                    formStatus.textContent = 'Failed to send message. Please try again.';
                    formStatus.className = 'mt-4 text-center text-red-600 font-medium';
                    console.error('EmailJS error:', error);
                })
                .finally(function() {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
        });
    }
})();

// Formspree Form Handling
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        formStatus.textContent = '';
        
        // Get form data
        const formData = new FormData(form);
        
        // Send form data to Formspree
        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formStatus.className = 'text-center mt-4 text-green-600 font-medium';
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        })
        .catch(error => {
            formStatus.textContent = 'Oops! There was a problem sending your message. Please email me directly at Aaryateja.addala@gmail.com';
            formStatus.className = 'text-center mt-4 text-red-600 font-medium';
            console.error('Form submission error:', error);
        })
        .finally(() => {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
    });
}
