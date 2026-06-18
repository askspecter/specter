import { Link } from 'react-router-dom';

const specterLogo = '/specter-logo.jpg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <img src={specterLogo} alt="SPECTER" />
        <span className="footer-copy">© 2026 SPECTER Protocol · MIT License</span>
      </div>
      <div className="footer-links">
        <Link to="/docs">Docs</Link>
        <a href="https://github.com/askspecter" target="_blank" rel="noreferrer">GitHub</a>
        <a href="https://x.com/AskSpecter" target="_blank" rel="noreferrer">Twitter</a>
        <a href="https://api.askspecter.xyz/v1/score/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045" target="_blank" rel="noreferrer">API</a>
      </div>
    </footer>
  );
}
