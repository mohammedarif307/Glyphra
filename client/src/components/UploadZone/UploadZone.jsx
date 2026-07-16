// UploadZone.jsx

import { useState, useRef } from 'react';
import './UploadZone.css';

export default function UploadZone({ onFileSelect }) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file?.type === 'application/pdf') onFileSelect(file);
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) onFileSelect(file);
    e.target.value = '';
  };

  return (
    <div className="upload-wrap">
      <div
        className={`upload-zone ${dragOver ? 'upload-zone--over' : ''}`}
        role="button"
        tabIndex={0}
        aria-label="Click or drag a PDF to upload"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {/* Icon */}
        <svg className="upload-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="0.75" opacity="0.3"/>
          <path d="M24 32V20m-5 5 5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M17 36h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 27c0-4 2.5-7.5 6-9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.5"/>
          <path d="M36 27c0-4-2.5-7.5-6-9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" opacity="0.5"/>
        </svg>

        <p className="upload-text">
          {dragOver ? 'Release to upload' : 'Drag and drop your PDF here'}
        </p>
        <p className="upload-sub">or click to select a file</p>

      </div>

      <input
        ref={inputRef}
        id="fileInput"
        type="file"
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={handleChange}
        aria-hidden="true"
      />
    </div>
  );
}
