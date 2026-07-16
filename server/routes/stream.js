import express from 'express';
import { getBus, removeBus } from '../services/progressBus.js';

const router = express.Router();

// GET /api/stream/:id — Server-Sent Events for progress updates
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const bus = await getBus(id);

  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  const origin = req.headers.origin || process.env.CLIENT_URL || 'http://localhost:3000';
  res.setHeader('Access-Control-Allow-Origin', origin);
  res.flushHeaders?.();

  const send = (payload) => {
    try {
      // debug log for dev
      console.log('[SSE] send ->', id, payload?.type || 'event');
      res.write(`data: ${JSON.stringify(payload)}\n\n`);
    } catch (e) {}
  };

  console.log('[SSE] client connected', id, 'origin=', req.headers.origin);

  // Listen for progress events
  const onProgress = (p) => send(p);
  bus.on('progress', onProgress);
  bus.on('analysis', onProgress);
  bus.on('done', onProgress);

  // Keep connection alive with a comment every 20s
  const keep = setInterval(() => res.write(':keepalive\n\n'), 20000);

  req.on('close', () => {
    clearInterval(keep);
    bus.off('progress', onProgress);
    bus.off('analysis', onProgress);
    bus.off('done', onProgress);
    // don't remove bus immediately; leave to controller cleanup
  });
});

export default router;
