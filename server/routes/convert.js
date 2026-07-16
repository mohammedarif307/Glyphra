// ─────────────────────────────────────────────
// routes/convert.js
// POST /api/convert — Receives PDF, returns LaTeX
// ─────────────────────────────────────────────

import { Router }  from 'express';
import upload      from '../middleware/upload.js';
import { convert } from '../controllers/convertController.js';

const router = Router();

// Single PDF upload → conversion
router.post('/', upload.single('pdf'), convert);

export default router;
