class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        footer {
          background: rgba(168, 157, 117, 0.9);
          color: white;
          padding: 2rem;
          text-align: center;
          margin-top: auto;
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .social-links {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        .social-link {
          color: white;
          transition: transform 0.3s ease;
        }
        .social-link:hover {
          transform: translateY(-3px);
        }
        .copyright {
          font-size: 0.9rem;
          opacity: 0.8;
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="social-links">
            <a href="mailto:Aaryateja.addala@gmail.com" class="social-link">
              <i data-feather="mail"></i>
            </a>
            <a href="#" class="social-link">
              <i data-feather="github"></i>
            </a>
            <a href="#" class="social-link">
              <i data-feather="instagram"></i>
            </a>
            <a href="#" class="social-link">
              <i data-feather="linkedin"></i>
            </a>
          </div>
          <p class="copyright">&copy; ${new Date().getFullYear()} Aaryateja Addala. All rights reserved.</p>
        </div>
      </footer>
    `;
  }
}
customElements.define('custom-footer', CustomFooter);
