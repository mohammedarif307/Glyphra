// StatsStrip.jsx
import './StatsStrip.css';


const STATS = [
  { n: 'Early', s: 'access', l: 'Papers processed' },
  { n: 'Coming', s: 'soon', l: 'Equation accuracy' },
  { n: 'Under', s: '1 min', l: 'Conversion time' },
];

export default function StatsStrip() {
  return (
    <section className="stats">
      {STATS.map((st, i) => (
        <div className={`stat reveal d${i+1}`} key={st.l}>
          <p className="stat-n">{st.n}<span>{st.s}</span></p>
          <p className="stat-l">{st.l}</p>
        </div>
      ))}
    </section>
  );
}
