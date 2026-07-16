// ─────────────────────────────────────────────
// routes/health.js
// GET /api/health — Simple liveness check
// ─────────────────────────────────────────────

import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  res.json({
    status:    'ok',
    service:   'Glyphra API',
    timestamp: new Date().toISOString(),
  });
});

export default router;
