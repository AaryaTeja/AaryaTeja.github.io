// script.js - Simplified version without scroll animations

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

// Initialize all elements as visible on page load
document.addEventListener('DOMContentLoaded', () => {
    // Remove all scroll animation classes to show content immediately
    const animatedElements = document.querySelectorAll(
        '.scroll-fade-in, .scroll-fade-left, .scroll-fade-right, .scroll-scale-in, .scroll-stagger'
    );
    
    animatedElements.forEach(element => {
        element.classList.remove('scroll-fade-in', 'scroll-fade-left', 'scroll-fade-right', 'scroll-scale-in', 'scroll-stagger');
        element.style.opacity = '1';
        element.style.transform = 'none';
    });
});
