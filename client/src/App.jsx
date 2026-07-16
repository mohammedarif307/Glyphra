// ─────────────────────────────────────────────
// App.jsx — Root component with simple routing
// ─────────────────────────────────────────────


import Landing   from './pages/Landing';
import Workspace from './pages/Workspace';
import About     from './pages/About';
import Docs      from './pages/Docs';
import Privacy   from './pages/Privacy';

export default function App() {
  const path = window.location.pathname;

  if (path === '/workspace') return <Workspace />;
  if (path === '/about')     return <About />;
  if (path === '/docs')      return <Docs />;
  if (path === '/privacy')   return <Privacy />;
  return <Landing />;
}
