import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="copyright">© {currentYear} Gabrielle Sophia. All rights reserved.</p>
          <div className="social-links">
            <a 
              href="https://www.linkedin.com/in/gabby-loeff" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
