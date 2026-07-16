import './InfoPage.css';

export default function About() {
  return (
    <div className="info-page">
      <div className="info-back">
        <a href="/" className="info-back-btn">Back to Home</a>
      </div>
      <h1>About Glyphra</h1>
      <p>
        Glyphra was born from a simple idea: making research papers more accessible and easier to work with—but in a better, more user-friendly format. We know the struggle of converting dense PDFs into clean, editable LaTeX, so we built a tool that does it for you, instantly. Our mission is to save you time, reduce frustration, and help you focus on what matters most: your research and ideas.
      </p>
      <p>
        We’re passionate about making technology that feels like a helpful friend. Glyphra is always evolving, and your feedback shapes our journey. Thank you for trusting us to be a small part of your research story.
      </p>
      <h2>Our Values</h2>
      <ul>
        <li><b>Simplicity:</b> We believe tools should be easy to use, with no steep learning curve.</li>
        <li><b>Privacy:</b> Your documents are yours alone. We never store or share your files.</li>
        <li><b>Community:</b> We listen to your feedback and build features you actually want.</li>
      </ul>
      <h2>Meet the Team</h2>
      <ul>
        <li>Glyphra is built by a small, dedicated team of engineers and academics who care deeply about making research easier for everyone.</li>
        <li>We’re always happy to hear from you and value your input as we grow.</li>
      </ul>
    </div>
  );
}
