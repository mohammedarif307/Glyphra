// ─────────────────────────────────────────────
// services/pdfParser.js
// Extracts text, structure metadata from PDF
// using the pdf-parse library
// ─────────────────────────────────────────────

import fs      from 'fs/promises';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

export async function parsePDF(filePath) {
  const buffer = await fs.readFile(filePath);
  const data   = await pdfParse(buffer);

  const rawText = data.text || '';

  return {
    rawText,
    pageCount:        data.numpages,
    sections:         detectSections(rawText),
    equationsInline:  countInlineEquations(rawText),
    equationsDisplay: countDisplayEquations(rawText),
    figures:          countFigures(rawText),
    tables:           countTables(rawText),
    references:       countReferences(rawText),
    bibStyle:         detectBibStyle(rawText),
    flagged:          detectFlaggedRegions(rawText),
    metadata:         data.metadata ?? {},
    title:            extractTitle(data),
  };
}

/* ── Detection helpers ──────────────────────── */

function detectSections(text) {
  // Match common section heading patterns
  const matches = text.match(/^(Abstract|Introduction|Related Work|Methodology|Method|Results|Discussion|Conclusion|References|Appendix)/gim);
  return [...new Set(matches || [])].map((s) => s.trim());
}

function countInlineEquations(text) {
  // Heuristic: detect $...$ style patterns
  const matches = text.match(/\$[^$\n]{1,80}\$/g);
  return matches?.length ?? 0;
}

function countDisplayEquations(text) {
  // Heuristic: detect standalone equation lines
  const matches = text.match(/^\s*[A-Za-z]?\s*[=<>≈≤≥]{1}\s*.*[+\-*/∑∫√]/gm);
  return matches?.length ?? 0;
}

function countFigures(text) {
  const matches = text.match(/fig(ure)?\.?\s*\d+/gi);
  return matches?.length ?? 0;
}

function countTables(text) {
  const matches = text.match(/table\s*\d+/gi);
  return matches?.length ?? 0;
}

function countReferences(text) {
  // Count numbered reference entries [1], [2], ...
  const matches = text.match(/^\[\d+\]/gm);
  return matches?.length ?? 0;
}

function detectBibStyle(text) {
  if (/\[\d+\]/.test(text))      return 'IEEE';
  if (/\[[\w]+\d{4}\]/.test(text)) return 'ACM';
  if (/et al\./.test(text))      return 'APA/MLA';
  return 'Standard';
}

function detectFlaggedRegions(text) {
  // Flag if text has low-confidence signals (very short lines, many symbols)
  const suspiciousLines = (text.match(/^.{1,10}$/gm) || []).length;
  return suspiciousLines > 20 ? Math.floor(suspiciousLines / 20) : 0;
}

function extractTitle(data) {
  // Try PDF metadata first, then first non-empty line of text
  return data.metadata?.['dc:title']
    || data.text?.split('\n').find((l) => l.trim().length > 10)?.trim()
    || 'Untitled Document';
}
