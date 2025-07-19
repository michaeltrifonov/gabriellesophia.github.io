import React, { useState } from 'react';

interface HeaderProps {
  currentPath?: string;
}

const Header: React.FC<HeaderProps> = ({ currentPath = '/' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: `${import.meta.env.BASE_URL}`, label: 'Work', isActive: currentPath === '/' },
    { href: `${import.meta.env.BASE_URL}about`, label: 'About', isActive: currentPath === '/about' },
    { href: `${import.meta.env.BASE_URL}Gabrielle Loeff Resume.pdf`, label: 'Resume', target: '_blank', download: true },
    { href: 'mailto:gabby.loeff@gmail.com', label: 'Get in Touch', className: 'contact-btn' },
  ];

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <a href={`${import.meta.env.BASE_URL}`} className="logo">GSL</a>
          
          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className={`nav-link ${link.isActive ? 'active' : ''} ${link.className || ''}`}
                  target={link.target}
                  download={link.download}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          
          <button
            className="menu-toggle"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="hamburger"></span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
