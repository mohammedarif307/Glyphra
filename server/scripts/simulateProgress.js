#!/usr/bin/env node
// Simple script to simulate progress events for a session id
import { emitTo } from '../services/progressBus.js';

const sessionId = process.argv[2] || 'test-session';

(async () => {
  const steps = ['Upload received', 'Parsing PDF', 'OCR complete', 'Structure identified', 'Sending to Grok AI', 'Grok response received', 'Building LaTeX output'];
  for (let i = 0; i < steps.length; i++) {
    await emitTo(sessionId, 'progress', { type: 'progress', text: steps[i] + (i === steps.length - 1 ? ' ✓' : '') });
    await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));
  }
  await emitTo(sessionId, 'analysis', { type: 'analysis', analysis: { pageCount: 12, sections: 5, equationsInline: 4, equationsDisplay: 8, figures: 3, tables: 2, references: 18, bibStyle: 'IEEE', flagged: 0, confidence: 92, avgTime: 34 } });
  await emitTo(sessionId, 'done', { type: 'done' });
  console.log('Simulated progress for', sessionId);
  process.exit(0);
})();
