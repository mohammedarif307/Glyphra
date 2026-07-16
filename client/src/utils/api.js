// ─────────────────────────────────────────────
// utils/api.js
// All HTTP calls to the Glyphra backend
// ─────────────────────────────────────────────

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/* ── Upload PDF for conversion ──────────────── */
export async function uploadPDF(file, sessionId) {
  const formData = new FormData();
  formData.append('pdf', file);
  if (sessionId) formData.append('sessionId', sessionId);

  const response = await fetch(`${BASE_URL}/api/convert`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || `Server error: ${response.status}`);
  }

  return response.json();
  // Returns: { analysis: { pageCount, sections, ... }, latex: '...' }
}

/* ── Health check ───────────────────────────── */
export async function healthCheck() {
  const response = await fetch(`${BASE_URL}/api/health`);
  return response.json();
}
