// FinalCTA.jsx
import './FinalCTA.css';

export default function FinalCTA({ onUploadClick }) {
  return (
    <section className="final-cta">

      {/* Decorative top line */}
      <div className="cta-top-line" aria-hidden="true">
        <span /><span className="cta-dot" /><span />
      </div>

      <p className="cta-eyebrow reveal">Ready to convert</p>

      <h2 className="cta-headline reveal d1">
        Upload your first paper.<br />
        <em>It's completely free.</em>
      </h2>

      <p className="cta-sub reveal d2">
        No account. No credit card. Start in seconds.
      </p>

      <button className="btn-primary cta-btn reveal d3" onClick={onUploadClick}>
        Upload your PDF
        <svg viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <p className="cta-hint reveal d4">
        Supports IEEE · ACM · Nature · article · beamer
      </p>

    </section>
  );
}
