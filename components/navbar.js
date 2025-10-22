class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: rgba(255, 255, 255, 0.95);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 100;
          transition: all 0.3s ease;
        }
        .logo {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold; 
          font-size: 1.5rem;
          transition: all 0.3s ease;
        }
        .logo:hover {
          transform: scale(1.05);
        }
        ul { 
          display: flex; 
          gap: 2rem; 
          list-style: none; 
          margin: 0; 
          padding: 0; 
        }
        a { 
          color: #4b5563;
          text-decoration: none; 
          font-weight: 500;
          position: relative;
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }
        a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #10b981);
          transition: width 0.3s ease;
        }
        a:hover::after {
          width: 100%;
        }
        a:hover {
          color: #3b82f6;
        }
        .menu-button {
          display: none;
          background: none;
          border: none;
          color: #4b5563;
          font-size: 1.5rem;
          cursor: pointer;
        }
        @media (max-width: 768px) {
          ul {
            display: none;
          }
          .menu-button {
            display: block;
          }
          .mobile-menu {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: white;
            padding: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    
    // Add mobile menu functionality
    const menuButton = this.shadowRoot.querySelector('.menu-button');
    const navList = this.shadowRoot.querySelector('ul');
    
    menuButton.addEventListener('click', () => {
      navList.classList.toggle('mobile-menu');
    });
  }
}

customElements.define('custom-navbar', CustomNavbar);
