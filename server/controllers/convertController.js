// ─────────────────────────────────────────────
// controllers/convertController.js
// Orchestrates: PDF parse → Grok API → response
// ─────────────────────────────────────────────

import fs            from 'fs/promises';
import { parsePDF }  from '../services/pdfParser.js';
import { generateLatex } from '../services/grokService.js';
import { emitTo, removeBus } from '../services/progressBus.js';

export async function convert(req, res, next) {
  const filePath = req.file?.path;

  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No PDF file uploaded.' });
    }

    const sessionId = req.body?.sessionId || req.headers['x-session-id'];

    // Step 1 — Extract text and structure from PDF
    if (sessionId) emitTo(sessionId, 'progress', { type: 'progress', text: 'Parsing PDF' });
    const parsed = await parsePDF(filePath);

    if (sessionId) emitTo(sessionId, 'progress', { type: 'progress', text: 'Parsing complete' });

    // Step 2 — Send to Grok API for LaTeX generation (measure time)
    const t0 = Date.now();
    if (sessionId) emitTo(sessionId, 'progress', { type: 'progress', text: 'Sending to Grok AI' });
    const latex = await generateLatex(parsed);
    const t1 = Date.now();
    if (sessionId) emitTo(sessionId, 'progress', { type: 'progress', text: 'Grok response received' });
    const avgTime = Math.max(1, Math.round((t1 - t0) / 1000)); // seconds

    // Step 3 — Build analysis metadata for the frontend modal
    const analysis = buildAnalysis(parsed);
    // Add timing and a simple confidence heuristic
    analysis.avgTime = avgTime;
    if (typeof parsed.confidence === 'number') {
      analysis.confidence = parsed.confidence;
    } else {
      // heuristic: fewer flagged regions -> higher confidence
      const flagged = parsed.flagged ?? 0;
      analysis.confidence = Math.max(50, 95 - flagged * 10);
    }

    // Clean up uploaded file
    await fs.unlink(filePath).catch(() => {});

    // Emit analysis and done
    if (sessionId) {
      emitTo(sessionId, 'analysis', { type: 'analysis', analysis });
      emitTo(sessionId, 'done', { type: 'done' });
      // schedule bus removal
      setTimeout(() => removeBus(sessionId), 30000);
    }

    return res.json({ analysis, latex });

  } catch (err) {
    // Clean up on error
    if (filePath) await fs.unlink(filePath).catch(() => {});
    next(err);
  }
}

/* ── Build analysis object from parsed PDF data ── */
function buildAnalysis(parsed) {
  return {
    pageCount:        parsed.pageCount        ?? 0,
    sections:         parsed.sections?.length ?? 0,
    equationsInline:  parsed.equationsInline  ?? 0,
    equationsDisplay: parsed.equationsDisplay ?? 0,
    figures:          parsed.figures          ?? 0,
    tables:           parsed.tables           ?? 0,
    references:       parsed.references       ?? 0,
    bibStyle:         parsed.bibStyle         ?? 'detected',
    flagged:          parsed.flagged          ?? 0,
  };
}
