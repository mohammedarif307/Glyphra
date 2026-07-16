// ─────────────────────────────────────────────
// middleware/upload.js
// Multer config for PDF file uploads
// ─────────────────────────────────────────────

import multer from 'multer';
import path   from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: path.join(__dirname, '../uploads'),

  filename: (_req, file, cb) => {
    // Sanitize filename, prepend timestamp to avoid collisions
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safe}`);
  },
});

const fileFilter = (_req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are accepted.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024,  // 50 MB max
  },
});

export default upload;
