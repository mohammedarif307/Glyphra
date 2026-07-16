// UsersSection.jsx
import './UsersSection.css';

const USERS = [
  { role:'PhD Students',   quote:'"Stop reformatting. Start submitting."',              detail:'One upload replaces 8-12 hours of manual LaTeX work. Before your deadline.' },
  { role:'Researchers',    quote:'"IEEE, ACM, Nature — pick your template and go."',   detail:'Equations, bibliography, and formatting auto-adapted to your target journal.' },
  { role:'Professionals',  quote:'"Technical reports, typeset properly."',              detail:'Engineers and scientists turning reports into precise LaTeX publications.' },
];

export default function UsersSection() {
  return (
    <section className="users section-wrap" id="for-who">

      <div className="section-header reveal">
        <div>
          <span className="section-tag">Who uses Glyphra</span>
          <h2 className="section-title">Built for people<br /><em>who write to publish.</em></h2>
        </div>
        <p className="section-note">Not a toy. A precision instrument for people with deadlines.</p>
      </div>

      <div className="users-grid">
        {USERS.map((u, i) => (
          <div className={`user-card reveal d${i+1}`} key={u.role}>
            <p className="user-role">{u.role}</p>
            <p className="user-quote">{u.quote}</p>
            <p className="user-detail">{u.detail}</p>
          </div>
        ))}
      </div>

    </section>
  );
}
