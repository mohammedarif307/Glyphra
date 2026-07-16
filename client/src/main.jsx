// ─────────────────────────────────────────────
// main.jsx — React entry point
// ─────────────────────────────────────────────

import { StrictMode } from 'react';
import { createRoot }  from 'react-dom/client';

import './styles/globals.css';
import './styles/animations.css';

import App from './App';
import { LiveLogProvider } from './context/LiveLogContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LiveLogProvider>
      <App />
    </LiveLogProvider>
  </StrictMode>
);
