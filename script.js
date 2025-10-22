document.addEventListener('DOMContentLoaded', () => {
    // Shared functionality for bubble effects
    const elements = document.querySelectorAll('.bubble-hover');
    
    elements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const bubble = document.createElement('div');
            bubble.className = 'bubble-effect';
            bubble.style.left = `${x}px`;
            bubble.style.top = `${y}px`;
            
            const size = Math.random() * 50 + 20;
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            
            element.appendChild(bubble);
            
            setTimeout(() => {
                bubble.remove();
            }, 1000);
        });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
