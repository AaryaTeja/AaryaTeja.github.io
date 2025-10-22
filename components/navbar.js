class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        nav {
          background: rgba(245, 245, 220, 0.9);
          padding: 1rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          position: relative;
          z-index: 100;
        }
        .logo {
          color: #5a5538;
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
          color: #5a5538;
          text-decoration: none; 
          font-weight: 500;
          position: relative;
          padding: 0.5rem 0;
        }
        a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: #5a5538;
          transition: width 0.3s ease;
        }
        a:hover::after {
          width: 100%;
        }
        @media (max-width: 768px) {
          ul {
            display: none;
          }
          .menu-button {
            display: block;
          }
        }
      </style>
      <nav>
        <a href="index.html" class="logo">Aaryateja</a>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="about.html">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    `;
  }
}
customElements.define('custom-navbar', CustomNavbar);
