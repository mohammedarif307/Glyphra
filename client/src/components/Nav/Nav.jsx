// Nav.jsx — Editorial navigation bar

import { useState, useEffect } from 'react';
import './Nav.css';

export default function Nav({ onUploadClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`nav a-nav ${scrolled ? 'nav--up' : ''}`}>


      <a href="/" className="nav-logo">
        <span className="nav-logo-t">G</span>lyphra
        <span className="nav-logo-dot">.</span>
      </a>


      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="#how-it-works">Process</a></li>
        <li><a href="#demo">Demo</a></li>
        <li><a href="#for-who">For who</a></li>
      </ul>

      <button className="nav-cta" onClick={onUploadClick}>
        Try free
      </button>

    </nav>
  );
}
