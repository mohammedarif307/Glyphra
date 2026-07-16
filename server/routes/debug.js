import express from 'express';
import { emitTo } from '../services/progressBus.js';

const router = express.Router();

// GET /api/debug/simulate/:id
router.get('/simulate/:id', async (req, res) => {
  const id = req.params.id;
  const steps = ['Upload received', 'Parsing PDF', 'OCR complete', 'Structure identified', 'Sending to Grok AI', 'Grok response received', 'Building LaTeX output'];
  (async () => {
    for (let i = 0; i < steps.length; i++) {
      await emitTo(id, 'progress', { text: steps[i] + (i === steps.length - 1 ? ' ✓' : '') });
      await new Promise(r => setTimeout(r, 500 + Math.random() * 800));
    }
    await emitTo(id, 'analysis', { analysis: { pageCount: 12, sections: 5, equationsInline: 4, equationsDisplay: 8, figures: 3, tables: 2, references: 18, bibStyle: 'IEEE', flagged: 0, confidence: 92, avgTime: 34 } });
    await emitTo(id, 'done', {});
  })();
  res.json({ ok: true, session: id });
});

export default router;
