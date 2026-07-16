// Footer.jsx
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-logo">
        <span>G</span>lyphra<span className="footer-dot">.</span>
      </p>
      <ul className="footer-links">
        {['About','Docs','Pricing','Privacy','Contact'].map((l) => (
          <li key={l}><a href={`/${l.toLowerCase()}`}>{l}</a></li>
        ))}
      </ul>
      <p className="footer-copy">© 2026 Glyphra</p>
    </footer>
  );
}
