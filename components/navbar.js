class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: rgba(10, 10, 10, 0.95);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 20px rgba(220, 38, 38, 0.2);
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(220, 38, 38, 0.1);
        }
        .logo {
          background: linear-gradient(135deg, #ffffff 0%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold; 
          font-size: 1.8rem;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          text-decoration: none;
        }
        .logo:hover {
          transform: scale(1.05);
          text-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
        }
        ul { 
          display: flex; 
          gap: 2rem; 
          list-style: none; 
          margin: 0; 
          padding: 0; 
        }
        a { 
          color: #e5e5e5;
          text-decoration: none; 
          font-weight: 500;
          position: relative;
          padding: 0.5rem 0;
          transition: all 0.3s ease;
          font-family: 'Poppins', sans-serif;
          cursor: pointer;
        }
        a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #dc2626, #ef4444);
          transition: width 0.3s ease;
        }
        a:hover::after {
          width: 100%;
        }
        a:hover {
          color: #dc2626;
          text-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
        }
        .menu-button {
          display: none;
          background: none;
          border: none;
          color: #e5e5e5;
          font-size: 1.5rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .menu-button:hover {
          color: #dc2626;
        }
        .mobile-menu {
          display: none;
          flex-direction: column;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background: rgba(10, 10, 10, 0.98);
          backdrop-filter: blur(20px);
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(220, 38, 38, 0.3);
          border-top: 1px solid rgba(220, 38, 38, 0.2);
        }
        .mobile-menu.active {
          display: flex;
        }
        .mobile-menu li {
          margin: 0.5rem 0;
        }
        .mobile-menu a {
          display: block;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        .mobile-menu a:hover {
          background: rgba(220, 38, 38, 0.1);
          transform: translateX(5px);
        }
        @media (max-width: 768px) {
          nav {
            padding: 1rem;
          }
          ul {
            display: none;
          }
          .menu-button {
            display: block;
          }
        }
      </style>
      <nav>
        <a href="#home" class="logo">Aaryateja</a>
  <ul>
  <li><a href="#home" class="nav-link">Home</a></li>
  <li><a href="#about" class="nav-link">About</a></li>
  <li><a href="#skills" class="nav-link">Skills</a></li>
  <li><a href="#projects" class="nav-link">Projects</a></li>
  <li><a href="#interests" class="nav-link">Interests</a></li>
  <li><a href="#contact" class="nav-link">Contact</a></li>
</ul>
        <button class="menu-button">
          <i class="fas fa-bars"></i>
        </button>
      </nav>
    `;
    
    // Add smooth scrolling functionality
    this.setupSmoothScrolling();
    
    // Add mobile menu functionality
    const menuButton = this.shadowRoot.querySelector('.menu-button');
    const navList = this.shadowRoot.querySelector('ul');
    
    menuButton.addEventListener('click', () => {
      navList.classList.toggle('active');
      
      // Change icon based on menu state
      const icon = menuButton.querySelector('i');
      if (navList.classList.contains('active')) {
        icon.className = 'fas fa-times';
      } else {
        icon.className = 'fas fa-bars';
      }
    });

    // Close mobile menu when clicking on links
    const navLinks = this.shadowRoot.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navList.classList.contains('active')) {
          navList.classList.remove('active');
          const icon = menuButton.querySelector('i');
          icon.className = 'fas fa-bars';
        }
      });
    });
  }

  setupSmoothScrolling() {
    const navLinks = this.shadowRoot.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        if (targetId === '#') return;
        
        // Find the target element in the main document
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          // Calculate position with offset for fixed navbar
          const navbarHeight = this.shadowRoot.querySelector('nav').offsetHeight;
          const targetPosition = targetElement.offsetTop - navbarHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);
