class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        footer {
          background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
          color: white;
          padding: 3rem 2rem 2rem;
          text-align: center;
          border-top: 1px solid rgba(220, 38, 38, 0.2);
          position: relative;
          overflow: hidden;
        }
        footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #dc2626, transparent);
        }
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        .footer-logo {
          font-size: 2.2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ffffff 0%, #dc2626 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-family: 'Poppins', sans-serif;
          text-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
        }
        .footer-tagline {
          color: #d4d4d4;
          margin-bottom: 2rem;
          max-width: 500px;
          font-size: 1.1rem;
          font-family: 'Poppins', sans-serif;
        }
        .footer-info {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          margin-bottom: 2.5rem;
          width: 100%;
          max-width: 800px;
        }
        .info-item {
          text-align: center;
          padding: 1rem;
        }
        .info-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(220, 38, 38, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          border: 2px solid rgba(220, 38, 38, 0.3);
          transition: all 0.3s ease;
        }
        .info-icon:hover {
          background: rgba(220, 38, 38, 0.2);
          border-color: #dc2626;
          transform: scale(1.1);
        }
        .info-icon i {
          color: #dc2626;
          font-size: 1.2rem;
        }
        .info-text h3 {
          color: #ffffff;
          margin-bottom: 0.5rem;
          font-family: 'Poppins', sans-serif;
          font-size: 1.1rem;
        }
        .info-text p {
          color: #a3a3a3;
          font-family: 'Poppins', sans-serif;
        }
        .social-links {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        .social-link {
          color: #d4d4d4;
          transition: all 0.3s ease;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(220, 38, 38, 0.1);
          border: 2px solid rgba(220, 38, 38, 0.2);
          text-decoration: none;
          position: relative;
          overflow: hidden;
        }
        .social-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.4), transparent);
          transition: left 0.5s ease;
        }
        .social-link:hover::before {
          left: 100%;
        }
        .social-link:hover {
          color: #ffffff;
          transform: translateY(-5px);
          background: rgba(220, 38, 38, 0.2);
          border-color: #dc2626;
          box-shadow: 0 5px 15px rgba(220, 38, 38, 0.3);
        }
        .social-link i {
          font-size: 1.3rem;
          position: relative;
          z-index: 2;
        }
        .copyright {
          font-size: 0.9rem;
          color: #737373;
          border-top: 1px solid rgba(220, 38, 38, 0.1);
          padding-top: 1.5rem;
          width: 100%;
          font-family: 'Poppins', sans-serif;
        }
        .texas-flag {
          display: inline-flex;
          align-items: center;
          margin: 0 8px;
          color: #dc2626;
        }
        .quick-links {
          display: flex;
          gap: 2rem;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }
        .quick-link {
          color: #a3a3a3;
          text-decoration: none;
          transition: color 0.3s ease;
          font-family: 'Poppins', sans-serif;
          position: relative;
        }
        .quick-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #dc2626;
          transition: width 0.3s ease;
        }
        .quick-link:hover {
          color: #dc2626;
        }
        .quick-link:hover::after {
          width: 100%;
        }
        @media (max-width: 768px) {
          .footer-info {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          .quick-links {
            gap: 1rem;
          }
          .social-links {
            gap: 1rem;
          }
        }
      </style>
      <footer>
        <div class="footer-content">
          <div class="footer-logo">Aaryateja</div>
          <p class="footer-tagline">9th Grade Student & Tech Enthusiast from Houston, Texas</p>
          
          <div class="footer-info">
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <div class="info-text">
                <h3>Education</h3>
                <p>9th Grade High School</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="info-text">
                <h3>Location</h3>
                <p>Houston, Texas</p>
              </div>
            </div>
            <div class="info-item">
              <div class="info-icon">
                <i class="fas fa-laptop-code"></i>
              </div>
              <div class="info-text">
                <h3>Focus</h3>
                <p>Coding & Robotics</p>
              </div>
            </div>
          </div>

          <div class="quick-links">
            <a href="#home" class="quick-link">Home</a>
            <a href="#about" class="quick-link">About</a>
            <a href="#projects" class="quick-link">Projects</a>
            <a href="#contact" class="quick-link">Contact</a>
          </div>
          
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
            <a href="#" class="social-link">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
          
          <p class="copyright">
            &copy; ${new Date().getFullYear()} Aaryateja Addala. All rights reserved. 
            <span class="texas-flag">
              <i class="fas fa-map-pin"></i> Made in Houston, Texas
            </span>
          </p>
        </div>
      </footer>
    `;
  }
}

customElements.define('custom-footer', CustomFooter);
