import React, { useState, useEffect } from "react"
import { Link } from "react-router";

const Header: React.FC = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => setIsAtTop(window.scrollY === 0);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentPath = window.location.pathname;
  const currentHash = window.location.hash;

  return (
    <div data-testid="header" className={`header${isAtTop ? ' transparent' : ''}`}>
      <div className="logo">
        <img src="/assets/logo256.png" alt="Logo" />
      </div>
      <nav>
        <a href="/" className={currentPath === '/' && !currentHash ? 'active' : ''}>Home</a>
        <a href="/#about" className={currentPath === '/' && currentHash === '#about' ? 'active' : ''}>About</a>
        <Link to="/#projects" className={currentPath === '/' && currentHash === '#projects' || currentPath.startsWith('/projects') ? 'active' : ''}>Projects</Link>
        <Link to="/contact" className={currentPath === '/contact' ? 'active' : ''}>Contact</Link>
      </nav>
    </div>
  );
};

export default Header
