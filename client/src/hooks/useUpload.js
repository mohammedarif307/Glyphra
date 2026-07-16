// ─────────────────────────────────────────────
// useUpload.js
// Manages PDF upload, API call to backend,
// and returns state for AnalysisModal
// ─────────────────────────────────────────────

import { useState, useCallback, useRef, useEffect } from 'react';
import { useLiveLog } from '../context/LiveLogContext';
import { uploadPDF } from '../utils/api';

export default function useUpload() {

  const [file,         setFile]         = useState(null);
  const [isAnalysing,  setIsAnalysing]  = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [error,        setError]        = useState(null);
  const [result,       setResult]       = useState(null);
  const { liveLog, setLiveLog } = useLiveLog();
  const esRef = useRef(null);

  /* ── Called when user selects / drops a file ── */
  const handleFileSelect = useCallback(async (selectedFile) => {
    if (!selectedFile) return;

    setFile(selectedFile);
    setError(null);
    setAnalysisData(null);
    setResult(null);
    setIsAnalysing(true);

    // create session id and open SSE before upload
    const sessionId = String(Date.now());
    setLiveLog([]);
    try {
      const es = new EventSource(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/stream/${sessionId}`);
      es.onmessage = (ev) => {
        try {
          const payload = JSON.parse(ev.data);
          if (payload.type === 'progress') {
            setLiveLog((l) => [...l, payload.text]);
          } else if (payload.type === 'analysis') {
            setAnalysisData(payload.analysis);
          } else if (payload.type === 'done') {
            // no-op
          }
        } catch (e) {}
      };
      es.onerror = () => { /* ignore */ };
      esRef.current = es;

      const data = await uploadPDF(selectedFile, sessionId);
      setAnalysisData(data.analysis);
      setResult(data.latex);
    } catch (err) {
      setError(err.message || 'Conversion failed. Please try again.');
    } finally {
      // close SSE
      try { esRef.current?.close(); } catch (e) {}
    }
  }, []);

  /* ── Called when modal is closed ───────────── */
  const resetUpload = useCallback(() => {
    setFile(null);
    setIsAnalysing(false);
    setAnalysisData(null);
    setError(null);
    setResult(null);
  }, []);

  /* ── Called when analysis animation completes ── */
  const handleAnalysisComplete = useCallback(() => {
    setIsAnalysing(false);
    // Navigate to workspace with result
    if (result) {
      sessionStorage.setItem('glyphra_result', JSON.stringify({ latex: result, filename: file?.name }));
      window.location.href = '/workspace';
    }
  }, [result, file]);

  return {
    file,
    isAnalysing,
    analysisData,
    error,
    result,
    handleFileSelect,
    resetUpload,
    handleAnalysisComplete,
  };
}
