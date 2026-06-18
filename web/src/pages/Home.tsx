import { Link } from 'react-router-dom';
import { useState } from 'react';

const specterLogo = '/specter-logo.jpg';
import ScoreDemo from '../components/ScoreDemo';
import Footer from '../components/Footer';

const FEATURES = [
  {
    icon: '◈',
    title: '7-Dimensional Scoring',
    desc: 'TX volume, counterparty diversity, account age, repayment history, exploit exposure, prompt integrity, and peer endorsement — all in one composite score.',
  },
  {
    icon: '⬡',
    title: 'ERC-8004 Identity',
    desc: 'On-chain identity passports anchored to Base mainnet. Verify an agent\'s credentials without trusting any centralized authority.',
  },
  {
    icon: '▸',
    title: 'Trust Gate',
    desc: 'Block HIGH_RISK agents before they execute transfers, delegation, or any sensitive operation. One SDK call, one boolean.',
  },
  {
    icon: '◎',
    title: 'Permissionless',
    desc: 'No API key needed for up to 1,000 queries/month. Query freely, pay per call above that via x402 on Bankr.',
  },
  {
    icon: '⊕',
    title: 'Aeon Native',
    desc: 'Drop-in middleware for Aeon agents. Gate every autonomous action through a reputation check in under 100ms.',
  },
  {
    icon: '◉',
    title: 'Bankr Skills',
    desc: 'One-curl install into any Bankr-compatible agent. SPECTER skill definitions available in the skills registry.',
  },
] as const;

const INTEGRATIONS = [
  {
    name: 'Aeon',
    badge: 'MIDDLEWARE',
    repo: 'specter-aeon',
    desc: 'Trust-gate every agent action. Block LOW_SCORE agents before they act. Session reporting included.',
  },
  {
    name: 'Bankr Skills',
    badge: 'SKILL',
    repo: 'skills',
    desc: 'One-line install. Teaches any Bankr agent to score, verify, and gate — no code required.',
  },
  {
    name: 'TypeScript SDK',
    badge: 'SDK',
    repo: 'specter-sdk',
    desc: 'SpecterClient + SpecterMockClient. Full TypeScript types. Built-in mock for testing without network.',
  },
  {
    name: 'CLI',
    badge: 'TOOL',
    repo: 'specter-cli',
    desc: 'Score agents from your terminal. ANSI color, --json flag, live watch mode. curl-install in one line.',
  },
] as const;

const CODE_TABS = [
  {
    label: 'SDK',
    code: `<span class="c-kw">import</span> { <span class="c-fn">SpecterClient</span> } <span class="c-kw">from</span> <span class="c-str">'@askspecter/sdk'</span>;

<span class="c-kw">const</span> client = <span class="c-kw">new</span> <span class="c-fn">SpecterClient</span>();

<span class="c-cmt">// Score an agent</span>
<span class="c-kw">const</span> result = <span class="c-kw">await</span> client.<span class="c-fn">score</span>(<span class="c-str">'0xd8dA...'</span>);
console.<span class="c-fn">log</span>(result.score);    <span class="c-cmt">// 82</span>
console.<span class="c-fn">log</span>(result.verdict);  <span class="c-cmt">// 'TRUSTED_AGENT'</span>

<span class="c-cmt">// Gate before action</span>
<span class="c-kw">const</span> gate = <span class="c-kw">await</span> client.<span class="c-fn">trustGate</span>(<span class="c-str">'0xd8dA...'</span>, {
  minScore: <span class="c-num">75</span>,
  dimensions: { <span class="c-type">PROMPT_INTEGRITY</span>: <span class="c-num">70</span> },
});

<span class="c-kw">if</span> (!gate.allowed) <span class="c-kw">throw new</span> <span class="c-fn">Error</span>(gate.failReasons[<span class="c-num">0</span>]);`,
  },
  {
    label: 'CLI',
    code: `<span class="c-cmt"># Install</span>
curl -fsSL https://raw.githubusercontent.com/askspecter/specter-cli/main/install.sh | bash

<span class="c-cmt"># Score an agent</span>
specter score 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045

<span class="c-cmt"># JSON output</span>
specter score 0xd8dA... --json

<span class="c-cmt"># Verify ERC-8004 identity</span>
specter verify 0xd8dA...

<span class="c-cmt"># Live watch</span>
specter watch 0xd8dA... --interval 3000`,
  },
  {
    label: 'Aeon',
    code: `<span class="c-kw">import</span> { <span class="c-fn">SpecterMiddleware</span> } <span class="c-kw">from</span> <span class="c-str">'@askspecter/aeon'</span>;

<span class="c-kw">const</span> gate = <span class="c-kw">new</span> <span class="c-fn">SpecterMiddleware</span>({
  minScore: <span class="c-num">75</span>,
  requireVerified: <span class="c-kw">false</span>,
  dimensions: { <span class="c-type">EXPLOIT_EXPOSURE</span>: <span class="c-num">65</span> },
});

<span class="c-cmt">// Before every agent action:</span>
<span class="c-kw">const</span> check = <span class="c-kw">await</span> gate.<span class="c-fn">check</span>({
  agentAddress: agentAddr,
  action: <span class="c-str">'transfer 0.5 ETH'</span>,
});

<span class="c-kw">if</span> (!check.allowed) {
  <span class="c-kw">throw new</span> <span class="c-fn">Error</span>(<span class="c-str">\`Blocked: \${check.reason}\`</span>);
}`,
  },
  {
    label: 'Skill',
    code: `<span class="c-cmt"># Install SPECTER skill in one line</span>
curl -fsSL https://raw.githubusercontent.com/askspecter/skills/main/install.sh | bash

<span class="c-cmt"># Or install a single skill</span>
curl -fsSL https://raw.githubusercontent.com/askspecter/skills/main/skill.md \\
  > ~/.bankr/skills/specter.md

<span class="c-cmt"># Agent now knows to:</span>
<span class="c-cmt"># · Score agents before transacting</span>
<span class="c-cmt"># · Verify ERC-8004 identity</span>
<span class="c-cmt"># · Gate HIGH_RISK agents automatically</span>`,
  },
] as const;

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <img src={specterLogo} alt="SPECTER" className="hero-logo" />
        <p className="hero-tag">Agent Reputation Protocol · Base Mainnet · ERC-8004</p>
        <h1 className="hero-title">Know Every Agent<br />Before It Acts</h1>
        <p className="hero-sub">
          7-dimensional behavioral reputation scoring for autonomous AI agents.
          Permissionless. On-chain. Built for the agent economy.
        </p>
        <div className="hero-actions">
          <Link to="/docs" className="btn-primary">Read the Docs</Link>
          <a
            href="https://github.com/askspecter/specter"
            target="_blank"
            rel="noreferrer"
            className="btn-ghost"
          >
            View on GitHub
          </a>
        </div>
        <div className="hero-chain">
          <span className="hero-chain-dot" />
          Live on Base Mainnet · Block #21,847,392 · 1,000 free queries/month
        </div>
      </section>

      {/* STATS */}
      <div style={{ padding: '0 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="stats-row">
            {[
              ['7', 'Dimensions'],
              ['< 100ms', 'Query time'],
              ['1K', 'Free/month'],
              ['ERC-8004', 'Standard'],
              ['MIT', 'License'],
            ].map(([num, label]) => (
              <div className="stat-cell" key={label}>
                <span className="stat-num">{num}</span>
                <span className="stat-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section">
        <p className="section-label">Protocol</p>
        <h2 className="section-title">Everything you need to trust an agent</h2>
        <p className="section-sub">
          SPECTER aggregates on-chain signals from Base, Ethereum, Arbitrum, and Optimism
          into a single composable trust score.
        </p>
        <div className="features-grid">
          {FEATURES.map(f => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon" style={{ color: 'var(--red)' }}>{f.icon}</div>
              <div className="feature-title">{f.title}</div>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE DEMO */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">Live Demo</p>
        <h2 className="section-title">Score any agent address</h2>
        <p className="section-sub">
          Deterministic scores derived from on-chain behavioral signals.
          Try the sample addresses or paste your own.
        </p>
        <ScoreDemo />
      </section>

      {/* CODE */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">Quick Start</p>
        <h2 className="section-title">Integrate in minutes</h2>
        <p className="section-sub">
          SDK, CLI, Aeon middleware, or Bankr skill — choose your integration point.
        </p>
        <div className="code-tabs">
          <div className="code-tab-bar">
            {CODE_TABS.map((t, i) => (
              <button
                key={t.label}
                className={`code-tab${activeTab === i ? ' active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div
            className="code-content"
            dangerouslySetInnerHTML={{ __html: CODE_TABS[activeTab].code }}
          />
        </div>
      </section>

      {/* INTEGRATIONS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <p className="section-label">Ecosystem</p>
        <h2 className="section-title">Built for the agent stack</h2>
        <p className="section-sub">
          SPECTER plugs into every layer — from agent frameworks to CLI tools to Bankr skills.
        </p>
        <div className="integrations-grid">
          {INTEGRATIONS.map(i => (
            <a
              key={i.name}
              href={`https://github.com/askspecter/${i.repo}`}
              target="_blank"
              rel="noreferrer"
              className="integration-card"
            >
              <div className="integration-name">
                {i.name}
                <span className="integration-badge">{i.badge}</span>
              </div>
              <p className="integration-desc">{i.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
