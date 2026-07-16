// AnalysisModal.jsx — Live AI analysis processing modal

import { useEffect, useState, useRef } from 'react';
import './AnalysisModal.css';

export default function AnalysisModal({ isOpen, filename, analysisData, onClose, onComplete }) {

  const [lines,    setLines]    = useState([]);
  const [progress, setProgress] = useState(0);
  const [status,   setStatus]   = useState('Running AI structural analysis...');
  const timers = useRef([]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setLines([]); setProgress(0); setStatus('Running AI structural analysis...');

    const steps = buildSteps(analysisData);

    steps.forEach((step, i) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, step]);
        setProgress(Math.round(((i + 1) / steps.length) * 100));
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
        if (i === steps.length - 1) {
          setTimeout(() => {
            setStatus('Ready — opening workspace...');
            setTimeout(() => onComplete?.(), 900);
          }, 500);
        }
      }, step.delay);
      timers.current.push(t);
    });

    return () => { timers.current.forEach(clearTimeout); timers.current = []; };
  }, [isOpen]);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="overlay" role="dialog" aria-modal="true" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">

        <div className="modal-hd">
          <span className="modal-title">Analysing your paper</span>
          <button className="modal-x" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <div className="modal-bd" ref={bodyRef}>

          <p className="modal-doc">{filename?.replace('.pdf','') || 'Your document'}</p>
          <p className="modal-status">{status}</p>

          <div className="alog" aria-live="polite">
            {lines.map((l, i) => (
              <div className="alog-row" key={i}>
                <span className="alog-k">{l.key}</span>
                <span className="alog-dots" />
                <span className={`alog-v alog-v--${l.status || 'default'}`}>{l.value}</span>
              </div>
            ))}
          </div>

          <div className="modal-prog">
            <div className="prog-labels">
              <span>Converting</span>
              <span>{progress}%</span>
            </div>
            <div className="prog-track">
              <div className="prog-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

function buildSteps(data) {
  if (!data) return [
    { key:'reading structure',    value:'✓ done',     status:'done', delay:350  },
    { key:'detecting sections',   value:'...',        status:'spin', delay:700  },
    { key:'equations',            value:'...',        status:'spin', delay:1050 },
    { key:'figures',              value:'...',        status:'spin', delay:1400 },
    { key:'tables',               value:'...',        status:'spin', delay:1750 },
    { key:'bibliography',         value:'...',        status:'spin', delay:2100 },
    { key:'building LaTeX',       value:'⟳ working',  status:'spin', delay:2500 },
  ];

  return [
    { key:'reading structure',    value:'✓ done',                                    status:'done', delay:300  },
    { key:'pages',                value:String(data.pageCount ?? '—'),               status:'',     delay:600  },
    { key:'sections',             value:String(data.sections ?? '—'),                status:'',     delay:900  },
    { key:'equations (inline)',   value:String(data.equationsInline ?? 0),           status:'',     delay:1200 },
    { key:'equations (display)',  value:String(data.equationsDisplay ?? 0),          status:'',     delay:1500 },
    { key:'figures',              value:`${data.figures ?? 0}${data.figures > 0 ? '  ·  vision active' : ''}`, status: data.figures > 0 ? 'spin' : '', delay:1850 },
    { key:'tables',               value:String(data.tables ?? 0),                   status:'',     delay:2150 },
    { key:'bibliography',         value:`${data.bibStyle ?? 'detected'}  ·  ${data.references ?? 0} refs`, status:'', delay:2450 },
    { key:'flagged',              value: data.flagged > 0 ? `${data.flagged}  ·  review recommended` : 'none', status: data.flagged > 0 ? 'warn' : 'done', delay:2750 },
    { key:'LaTeX output',         value:'✓ complete',                                status:'done', delay:3200 },
  ];
}
