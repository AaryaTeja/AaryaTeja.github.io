class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: #1f2937;
          color: white;
          padding: 3rem 2rem;
          text-align: center;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .footer-logo {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .footer-text {
          color: #d1d5db;
          margin-bottom: 2rem;
          max-width: 500px;
        }
        .social-links {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        .social-link {
          color: #d1d5db;
          transition: all 0.3s ease;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
        }
        .social-link:hover {
          color: white;
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.2);
        }
        .copyright {
          font-size: 0.9rem;
          color: #9ca3af;
          border-top: 1px solid #374151;
          padding-top: 1.5rem;
          width: 100%;
        }
        .texas-flag {
          display: inline-block;
          width: 20px;
          height: 15px;
          background: linear-gradient(to right, #bf0a30 0%, #bf0a30 50%, #002868 50%, #002868 100%);
          margin: 0 5px;
          border-radius: 2px;
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="footer-logo">Aaryateja</div>
          <p class="footer-text">9th Grade Student & Tech Enthusiast from Houston, Texas</p>
          
          <div class="social-links">
            <a href="mailto:Aaryateja.addala@gmail.com" class="social-link">
              <i class="fas fa-envelope"></i>
            </a>
            <a href="https://github.com/AaryaTeja" target="_blank" class="social-link">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://www.instagram.com/aaryaa_a11/" target="_blank" class="social-link">
              <i class="fab fa-instagram"></i>
            </a>
          </div>
          
          <p class="copyright">
            &copy; ${new Date().getFullYear()} Aaryateja Addala. All rights reserved. 
            <span class="texas-flag"></span> Made in Houston, Texas
          </p>
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);
