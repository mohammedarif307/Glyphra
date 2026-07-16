// ─────────────────────────────────────────────
// middleware/errorHandler.js
// Global Express error handler
// ─────────────────────────────────────────────

export default function errorHandler(err, _req, res, _next) {

  console.error('[Glyphra Error]', err.message);

  // Multer-specific errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({
      message: 'File too large. Maximum size is 50 MB.',
    });
  }

  if (err.message === 'Only PDF files are accepted.') {
    return res.status(415).json({
      message: 'Only PDF files are accepted.',
    });
  }

  // Grok API errors
  if (err.message?.startsWith('Grok API error')) {
    return res.status(502).json({
      message: 'AI conversion service is temporarily unavailable. Please try again.',
    });
  }

  // Generic fallback
  res.status(500).json({
    message: err.message || 'Something went wrong. Please try again.',
  });
}
