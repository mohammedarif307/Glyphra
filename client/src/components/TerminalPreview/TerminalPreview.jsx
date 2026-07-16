// TerminalPreview.jsx
import './TerminalPreview.css';
import { useState } from 'react';
import { useLiveLog } from '../../context/LiveLogContext';

const LOG = [
  { k:'reading structure',     v:'✓ done',                       c:'done' },
  { k:'pages detected',        v:'14',                            c:''     },
  { k:'sections identified',   v:'6',                             c:''     },
  { k:'equations (inline)',    v:'9',                             c:''     },
  { k:'equations (display)',   v:'14',                            c:''     },
  { k:'figures (vision mode)', v:'4  ·  image-based',            c:'spin' },
  { k:'tables',                v:'3',                             c:''     },
  { k:'bibliography',          v:'IEEE  ·  31 references',        c:''     },
  { k:'flagged regions',       v:'2  ·  p.7 table, p.11 figure', c:'warn' },
  { k:'building LaTeX output', v:'✓ complete',                    c:'done' },
];

export default function TerminalPreview({ analysisData = null, isAnalysing = false }) {
  const [asideOpen, setAsideOpen] = useState(true);
  // consume liveLog from context
  let liveLog = [];
  try { const ctx = useLiveLog(); liveLog = ctx.liveLog || []; } catch (e) {
    if (typeof window !== 'undefined' && window.__glyphra_live_log) liveLog = window.__glyphra_live_log;
  }

  const pages = analysisData?.pageCount ?? 14;
  const sections = analysisData?.sections ?? 6;
  const eqInline = analysisData?.equationsInline ?? 9;
  const eqDisplay = analysisData?.equationsDisplay ?? 14;
  const equationsTotal = eqInline + eqDisplay;
  const figures = analysisData?.figures ?? 4;
  const tables = analysisData?.tables ?? 3;
  const references = analysisData?.references ?? 31;
  const flagged = analysisData?.flagged ?? 2;
  return (
    <section className="terminal-section section-wrap">

      <div className="section-header reveal">
        <div>
          <span className="section-tag terminal-tag">Under the hood</span>
          <h2 className="section-title terminal-heading">
            Glyphra reads your paper<br /><em>like a human expert would.</em>
          </h2>
        </div>
        <p className="section-note terminal-note">
          Not a blind text dump. Structured, intelligent analysis — every element understood.
        </p>
      </div>

      <div className="terminal-area">
        <div className="terminal-window reveal d1">
          <div className="terminal-bar" aria-hidden="true">
            <span className="t-dot red" /><span className="t-dot yellow" /><span className="t-dot green" />
            <span className="t-bar-title">glyphra — analysis log</span>
          </div>
          <div className="terminal-body" role="status" aria-live="polite">
            <p className="t-cmd">$ glyphra analyse research-paper.pdf</p>
            <br />
            {liveLog.length > 0 ? (
              liveLog.slice(-10).map((l, i) => (
                <div className="t-row" key={`live-${i}`}>
                  <span className="t-key">{l}</span>
                  <span className="t-fill" aria-hidden="true" />
                  <span className={`t-val t-default`} />
                </div>
              ))
            ) : (
              <div className="t-row">
                <span className="t-key">reading structure</span>
                <span className="t-fill" aria-hidden="true" />
                <span className={`t-val t-done`}>✓ done</span>
              </div>
            )}
            <div className="t-row">
              <span className="t-key">pages detected</span>
              <span className="t-fill" aria-hidden="true" />
              <span className={`t-val t-default`}>{pages}</span>
            </div>
            <div className="t-row">
              <span className="t-key">sections identified</span>
              <span className="t-fill" aria-hidden="true" />
              <span className={`t-val t-default`}>{sections}</span>
            </div>
            <div className="t-row">
              <span className="t-key">equations (inline)</span>
              <span className="t-fill" aria-hidden="true" />
              <span className={`t-val t-default`}>{eqInline}</span>
            </div>
            <div className="t-row">
              <span className="t-key">equations (display)</span>
              <span className="t-fill" aria-hidden="true" />
              <span className={`t-val t-default`}>{eqDisplay}</span>
            </div>
            <div className="t-row">
              <span className="t-key">figures (vision mode)</span>
              <span className="t-fill" aria-hidden="true" />
              <span className={`t-val t-spin`}>{figures}  ·  image-based</span>
            </div>
            <div className="t-row">
              <span className="t-key">tables</span>
              <span className="t-fill" aria-hidden="true" />
              <span className={`t-val t-default`}>{tables}</span>
            </div>
            <div className="t-row">
              <span className="t-key">bibliography</span>
              <span className="t-fill" aria-hidden="true" />
              <span className={`t-val t-default`}>{analysisData?.bibStyle ?? 'IEEE'}  ·  {references} references</span>
            </div>
            <div className="t-row">
              <span className="t-key">flagged regions</span>
              <span className="t-fill" aria-hidden="true" />
              <span className={`t-val t-warn`}>{flagged}  ·  p.7 table, p.11 figure</span>
            </div>
            <div className="t-row">
              <span className="t-key">building LaTeX output</span>
              <span className="t-fill" aria-hidden="true" />
              <span className={`t-val t-done`}>✓ complete</span>
            </div>
            <br />
            <p className="t-out">output → paper.tex · assets.zip &nbsp;<span className="t-cursor" /></p>
          </div>
        </div>

        {/* Toggle for small screens */}
        <button
          className="summary-toggle"
          aria-controls="analysis-summary"
          aria-expanded={asideOpen}
          onClick={() => setAsideOpen(!asideOpen)}
        >
          {asideOpen ? 'Hide summary' : 'Show summary'}
        </button>

        <aside className={`terminal-aside reveal d2 in-view ${asideOpen ? '' : 'collapsed'}`} aria-labelledby="analysis-summary">
          <div className="summary-card">
            <h3 id="analysis-summary">Analysis Summary</h3>
            <ul className="summary-list">
              <li><span className="s-key">Pages</span><span className="s-val">14</span></li>
              <li><span className="s-key">Sections</span><span className="s-val">6</span></li>
              <li><span className="s-key">Equations</span><span className="s-val">23</span></li>
              <li><span className="s-key">Figures</span><span className="s-val">4</span></li>
              <li><span className="s-key">Tables</span><span className="s-val">3</span></li>
            </ul>

            <div className="summary-meta">
              <div className="meta-item">
                <span className="meta-label">Confidence</span>
                <span className="meta-value">{analysisData?.confidence ?? 87}%</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Avg time</span>
                <span className="meta-value">{analysisData?.avgTime ?? 47}s</span>
              </div>
            </div>

            <div className="pipeline">
              <div className="step done">Upload</div>
              <div className="step done">OCR</div>
              <div className="step done">Structure</div>
              <div className="step active">LaTeX</div>
              <div className="step">Export</div>
            </div>
          </div>
        </aside>
      </div>

    </section>
  );
}
