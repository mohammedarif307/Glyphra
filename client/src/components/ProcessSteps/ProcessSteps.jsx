// ProcessSteps.jsx
import './ProcessSteps.css';

const STEPS = [
  { n:'01', phase:'Upload',  title:'Drop your PDF',           desc:'Any research paper. Text PDF, scanned, multi-page, or handwritten notes. Glyphra handles them all via OCR.' },
  { n:'02', phase:'Analyse', title:'AI reads every element',  desc:'Grok AI identifies sections, equations, figures, tables, footnotes, and bibliography — in seconds.' },
  { n:'03', phase:'Convert', title:'LaTeX is built',          desc:'Select your document class — IEEEtran, ACM, Nature, article. Clean, compilable output generated.' },
  { n:'04', phase:'Export',  title:'Download or go live',     desc:'Get your .tex file, full asset zip, or send straight to Overleaf with one click.' },
];

export default function ProcessSteps() {
  return (
    <section className="process section-wrap" id="how-it-works">

      <div className="section-header reveal">
        <div>
          <span className="section-tag">How it works</span>
          <h2 className="section-title">Four steps.<br /><em>Sixty seconds.</em></h2>
        </div>
      </div>

      <div className="process-grid">
        {STEPS.map((s, i) => (
          <div className={`process-step reveal d${i+1}`} key={s.n}>
            <p className="step-n">{s.n} — {s.phase}</p>
            <h3 className="step-title">{s.title}</h3>
            <p className="step-desc">{s.desc}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
