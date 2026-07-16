import './InfoPage.css';

export default function Privacy() {
  return (
    <div className="info-page">
      <div className="info-back">
        <a href="/" className="info-back-btn">Back to Home</a>
      </div>
      <h1>Privacy Policy</h1>
      <p>
        Your privacy matters to us. Glyphra processes your files securely and never stores your documents longer than needed. We do not share your data with anyone, ever.
      </p>
      <h2>How We Handle Your Data</h2>
      <ul>
        <li>All uploads are deleted after conversion.</li>
        <li>We use strong encryption to keep your information safe.</li>
        <li>No files or personal data are stored on our servers after your session ends.</li>
        <li>We do not use your documents for training, analytics, or any purpose beyond your requested conversion.</li>
      </ul>
      <h2>Your Rights</h2>
      <ul>
        <li>You can request deletion of any temporary data at any time.</li>
        <li>We are transparent about our practices and will notify you of any changes.</li>
      </ul>
      <p>
        If you have any questions about how we handle your data, please contact us. We believe in transparency and respect your trust.
      </p>
    </div>
  );
}
