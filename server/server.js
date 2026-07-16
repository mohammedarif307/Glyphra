// ─────────────────────────────────────────────
// server.js — Express app entry point
// ─────────────────────────────────────────────

import express  from 'express';
import cors     from 'cors';
import 'dotenv/config';

import convertRouter from './routes/convert.js';
import healthRouter  from './routes/health.js';
import streamRouter  from './routes/stream.js';
import debugRouter   from './routes/debug.js';
import errorHandler  from './middleware/errorHandler.js';

const app  = express();
const PORT = process.env.PORT || 5000;

/* ── Middleware ─────────────────────────────── */
// Allow actual request origin (helps local dev with localhost vs 127.0.0.1)
app.use(cors({ origin: (origin, callback) => callback(null, true) }));
app.use(express.json());

/* ── Routes ─────────────────────────────────── */
app.use('/api/convert', convertRouter);
app.use('/api/health',  healthRouter);
app.use('/api/stream',  streamRouter);
app.use('/api/debug',   debugRouter);

/* ── Global error handler ───────────────────── */
app.use(errorHandler);

/* ── Start ──────────────────────────────────── */
app.listen(PORT, () => {
  console.log(`Glyphra server running on http://localhost:${PORT}`);
});
