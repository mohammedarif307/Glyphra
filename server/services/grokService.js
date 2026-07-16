// ─────────────────────────────────────────────
// services/grokService.js
// Sends extracted PDF content to Grok API (xAI)
// and returns clean LaTeX output
// ─────────────────────────────────────────────

const GROK_API_URL = 'https://api.x.ai/v1/chat/completions';
const GROK_MODEL   = 'grok-3';  // Use latest available Grok model

/* ── System prompt for LaTeX generation ──────── */
const SYSTEM_PROMPT = `You are Glyphra, an expert LaTeX typesetting engine.

Your job is to convert extracted PDF text into clean, compilable LaTeX code.

Rules you must strictly follow:
1. Output ONLY raw LaTeX code — no explanation, no markdown fences, no preamble text.
2. Always begin with \\documentclass and end with \\end{document}.
3. Detect and include all necessary \\usepackage declarations.
4. Reconstruct all mathematical equations using proper LaTeX math environments.
   - Inline math: \\( ... \\)
   - Display math: \\[ ... \\] or \\begin{equation}...\\end{equation}
5. Reconstruct figures as \\begin{figure}...\\end{figure} with \\caption{}.
6. Reconstruct tables as \\begin{table}...\\begin{tabular}...\\end{tabular}...\\end{table}.
7. Reconstruct bibliography using \\bibitem entries.
8. Preserve section hierarchy: \\section, \\subsection, \\subsubsection.
9. Preserve footnotes as \\footnote{}.
10. If content is ambiguous, make the best reasonable LaTeX interpretation.
11. Add % comments before flagged or uncertain sections.

Output nothing except valid LaTeX code.`;

/* ── Main conversion function ───────────────── */
export async function generateLatex(parsed) {
  const apiKey = process.env.GROK_API_KEY;

  if (!apiKey) {
    throw new Error('GROK_API_KEY is not set in environment variables.');
  }

  const userPrompt = buildPrompt(parsed);

  const response = await fetch(GROK_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model:       GROK_MODEL,
      max_tokens:  8000,
      temperature: 0.1,       // Low temperature = consistent, precise output
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user',   content: userPrompt    },
      ],
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    throw new Error(`Grok API error ${response.status}: ${errBody}`);
  }

  const data    = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('Grok API returned an empty response.');
  }

  // Strip any accidental markdown fences
  return content
    .replace(/^```latex\n?/i, '')
    .replace(/^```\n?/,       '')
    .replace(/\n?```$/,       '')
    .trim();
}

/* ── Build structured prompt from parsed PDF ── */
function buildPrompt(parsed) {
  const sections = parsed.sections?.join(', ') || 'unknown';

  return `Convert the following extracted PDF text into complete, compilable LaTeX code.

Document metadata:
- Pages: ${parsed.pageCount}
- Sections detected: ${sections}
- Inline equations: ${parsed.equationsInline}
- Display equations: ${parsed.equationsDisplay}
- Figures: ${parsed.figures}
- Tables: ${parsed.tables}
- References: ${parsed.references}
- Bibliography style: ${parsed.bibStyle}
- Title: ${parsed.title}

Extracted text:
---
${parsed.rawText.slice(0, 12000)}
---

Generate complete LaTeX code now:`;
}
