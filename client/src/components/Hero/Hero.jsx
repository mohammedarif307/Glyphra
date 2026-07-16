// Hero.jsx — Asymmetric editorial hero with massive type

import UploadZone from '../UploadZone/UploadZone';
import './Hero.css';

export default function Hero({ onFileSelect }) {
  return (
    <section className="hero">

      {/* Left: Giant editorial type */}
      <div className="hero-left">

        <p className="hero-eyebrow a1">
          <span className="hero-eyebrow-line" />
          AI-Powered LaTeX Conversion
        </p>

        <h1 className="hero-headline a2">
          <span className="hero-hl-top">Your</span>
          <span className="hero-hl-mid">Research.</span>
          <span className="hero-hl-bot">
            Perfect <em>LaTeX.</em>
          </span>
        </h1>

        <div className="hero-meta a3">
          <div className="hero-rule" />
          <p className="hero-sub">
            Upload any research paper. Glyphra reads every equation,
            figure, table, and citation — then builds clean,
            compilable LaTeX in under 60 seconds.
          </p>
        </div>

        <div className="hero-actions a4">
          <button
            className="btn-primary hero-cta"
            onClick={() => document.getElementById('fileInput').click()}
          >
            Upload your PDF
            <svg viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <a href="#demo" className="btn-ghost">Watch it convert →</a>
        </div>

        {/* Trust strip */}

        <div className="hero-trust a5">
          <span className="trust-item">
            <span className="trust-dot trust-dot--green" />
            Equation accuracy: coming soon
          </span>
          <span className="trust-sep">·</span>
          <span className="trust-item">Conversion time: under 1 min</span>
          <span className="trust-sep">·</span>
          <span className="trust-item">Early access phase</span>
        </div>

      </div>

      {/* Right: Upload zone with decorative elements */}
      <div className="hero-right a6">

        {/* Decorative corner marks */}
        <span className="hero-corner hero-corner--tl" aria-hidden="true" />
        <span className="hero-corner hero-corner--br" aria-hidden="true" />

        {/* Small floating label */}
        <p className="hero-upload-tag">Convert Your PDF to LaTeX Instantly</p>

        <UploadZone onFileSelect={onFileSelect} />

        {/* Supported formats */}
        <div className="hero-formats">
          <span className="formats-label">Accepted:</span>
          <span className="formats-list">Scanned PDFs, Text PDFs, Multi-page, Up to 50 MB</span>
          <span className="formats-privacy">Your file is processed securely and deleted after conversion.</span>
        </div>

      </div>

    </section>
  );
}
