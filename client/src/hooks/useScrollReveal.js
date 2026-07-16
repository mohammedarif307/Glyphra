// ─────────────────────────────────────────────
// useScrollReveal.js
// Attaches IntersectionObserver to all .reveal
// elements and adds .in-view when they enter viewport
// ─────────────────────────────────────────────

import { useEffect } from 'react';

export default function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    // Observe all .reveal elements present in the DOM
    const targets = document.querySelectorAll('.reveal');
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}
