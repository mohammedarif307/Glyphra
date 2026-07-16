import './InfoPage.css';

export default function Docs() {
  return (
    <div className="info-page">
      <div className="info-back">
        <a href="/" className="info-back-btn">Back to Home</a>
      </div>
      <h1>Documentation</h1>
      <h2>Getting Started</h2>
      <ol>
        <li>Click <b>Upload</b> and select your PDF.</li>
        <li>Glyphra will convert your document to clean LaTeX in seconds.</li>
        <li>Download your <b>.tex</b> file or open it in Overleaf.</li>
      </ol>
      <h2>What Glyphra Converts</h2>
      <ul>
        <li>Equations (including complex math)</li>
        <li>Figures and tables</li>
        <li>Citations and references</li>
        <li>Section headings and structure</li>
      </ul>
      <h2>Tips for Best Results</h2>
      <ul>
        <li>Use high-quality, text-based PDFs for best accuracy.</li>
        <li>For scanned documents, try to use OCR before uploading.</li>
        <li>Review the output and make any final tweaks in your LaTeX editor.</li>
      </ul>
      <h2>Need Help?</h2>
      <ul>
        <li>If you have questions, run into trouble, or want to suggest a feature, check our FAQ or reach out to our support team.</li>
        <li>We’re here to help you succeed and always happy to hear your feedback.</li>
      </ul>
    </div>
  );
}
