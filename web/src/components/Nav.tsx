import { Link, useLocation } from 'react-router-dom';

const specterLogo = '/specter-logo.jpg';

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <nav className="nav">
      <Link to="/" className="nav-brand">
        <img src={specterLogo} alt="SPECTER" />
      </Link>

      <div className="nav-links">
        <Link to="/docs" className={pathname === '/docs' ? 'active' : ''}>Docs</Link>
        <a href="https://github.com/askspecter/specter-sdk" target="_blank" rel="noreferrer">SDK</a>
        <a href="https://github.com/askspecter/specter-cli" target="_blank" rel="noreferrer">CLI</a>
        <a href="https://github.com/askspecter/specter-aeon" target="_blank" rel="noreferrer">Aeon</a>
        <a href="https://github.com/askspecter/skills" target="_blank" rel="noreferrer">Skills</a>
      </div>

      <a
        href="https://github.com/askspecter/specter"
        target="_blank"
        rel="noreferrer"
        className="nav-cta"
      >
        GitHub ↗
      </a>
    </nav>
  );
}
