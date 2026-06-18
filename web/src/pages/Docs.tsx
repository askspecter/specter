import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

type Section = {
  id: string;
  label: string;
  group: string;
};

const SECTIONS: Section[] = [
  { id: 'overview',    label: 'Overview',          group: 'Getting Started' },
  { id: 'quickstart',  label: 'Quick Start',        group: 'Getting Started' },
  { id: 'install',     label: 'Install',            group: 'Getting Started' },
  { id: 'score-bands', label: 'Score Bands',        group: 'Protocol' },
  { id: 'dimensions',  label: '7 Dimensions',       group: 'Protocol' },
  { id: 'erc-8004',    label: 'ERC-8004',           group: 'Protocol' },
  { id: 'sdk',         label: 'SDK Reference',      group: 'Integration' },
  { id: 'cli',         label: 'CLI Reference',      group: 'Integration' },
  { id: 'aeon',        label: 'Aeon Integration',   group: 'Integration' },
  { id: 'skills',      label: 'Bankr Skills',       group: 'Integration' },
  { id: 'api',         label: 'API Reference',      group: 'Integration' },
];

export default function Docs() {
  const [active, setActive] = useState('overview');

  useEffect(() => {
    const el = document.getElementById(active);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [active]);

  const groups = [...new Set(SECTIONS.map(s => s.group))];

  return (
    <div className="page">
      <div className="docs-layout">
        <aside className="docs-sidebar">
          {groups.map(g => (
            <div key={g} className="docs-sidebar-section">
              <div className="docs-sidebar-label">{g}</div>
              {SECTIONS.filter(s => s.group === g).map(s => (
                <button
                  key={s.id}
                  className={`docs-sidebar-link${active === s.id ? ' active' : ''}`}
                  onClick={() => setActive(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          ))}
        </aside>

        <main className="docs-content">
          <h1>SPECTER Protocol</h1>
          <p className="docs-intro">
            Behavioral reputation scoring for autonomous AI agents on Base mainnet.
            Query any Ethereum address for a 7-dimensional trust score, verify ERC-8004 identity passports,
            and gate sensitive operations before they execute.
          </p>

          {/* OVERVIEW */}
          <h2 id="overview">Overview</h2>
          <p>
            SPECTER is a permissionless on-chain reputation layer for AI agents. It aggregates
            transaction history, counterparty behavior, and peer endorsements from Base, Ethereum,
            Arbitrum, and Optimism into a single composite score between 0 and 100.
          </p>
          <p>
            Scores are anchored to ERC-8004 identity passports — verifiable, on-chain credentials
            that prove an agent's behavioral history cannot be faked by spinning up a new address.
          </p>

          <table>
            <thead><tr><th>Feature</th><th>Detail</th></tr></thead>
            <tbody>
              {[
                ['Score range',   '0–100 composite'],
                ['Dimensions',    '7 behavioral signals'],
                ['Update cadence','Every 15 minutes'],
                ['Free tier',     '1,000 queries/month'],
                ['Chain',         'Base mainnet (+ cross-chain aggregation)'],
                ['Standard',      'ERC-8004 identity passport'],
                ['License',       'MIT'],
              ].map(([k, v]) => (
                <tr key={k}><td>{k}</td><td>{v}</td></tr>
              ))}
            </tbody>
          </table>

          {/* QUICK START */}
          <h2 id="quickstart">Quick Start</h2>
          <h3>Fetch skill (Bankr agents)</h3>
          <pre><code>{`curl -fsSL https://raw.githubusercontent.com/askspecter/skills/main/skill.md \\
  > ~/.bankr/skills/specter.md`}</code></pre>

          <h3>Score an agent</h3>
          <pre><code>{`GET https://api.askspecter.xyz/v1/score/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`}</code></pre>

          <h3>Gate on score (TypeScript)</h3>
          <pre><code>{`import { SpecterClient } from '@askspecter/sdk';

const client = new SpecterClient();
const gate = await client.trustGate('0xd8dA...', { minScore: 75 });

if (!gate.allowed) throw new Error(gate.failReasons[0]);`}</code></pre>

          {/* INSTALL */}
          <h2 id="install">Install</h2>
          <h3>SDK (TypeScript)</h3>
          <pre><code>{`npm install github:askspecter/specter-sdk`}</code></pre>

          <h3>CLI</h3>
          <pre><code>{`curl -fsSL https://raw.githubusercontent.com/askspecter/specter-cli/main/install.sh | bash`}</code></pre>

          <h3>Aeon integration</h3>
          <pre><code>{`npm install github:askspecter/specter-aeon`}</code></pre>

          {/* SCORE BANDS */}
          <h2 id="score-bands">Score Bands</h2>
          <table>
            <thead><tr><th>Score</th><th>Verdict</th><th>Recommended action</th></tr></thead>
            <tbody>
              {[
                ['85–100', 'TRUSTED_AGENT',  'Safe to transact'],
                ['65–84',  'REVIEW_ADVISED', 'Ask user to confirm'],
                ['0–64',   'HIGH_RISK',      'Block operation'],
              ].map(([s, v, a]) => (
                <tr key={s}><td>{s}</td><td><code>{v}</code></td><td>{a}</td></tr>
              ))}
            </tbody>
          </table>
          <p>
            The recommended gate threshold is <code>≥ 75</code> for high-value operations.
            Lower thresholds may be appropriate for low-risk read-only actions.
          </p>

          {/* DIMENSIONS */}
          <h2 id="dimensions">7 Scoring Dimensions</h2>
          <table>
            <thead><tr><th>Key</th><th>Name</th><th>Description</th></tr></thead>
            <tbody>
              {[
                ['TX_VOLUME',        'Transaction Volume',    'Volume and consistency of on-chain transactions'],
                ['COUNTERPARTY_DIV', 'Counterparty Diversity','Diversity of counterparties and contract types'],
                ['ACCOUNT_AGE',      'Account Age',           'Time since first on-chain activity'],
                ['REPAYMENT_HIST',   'Repayment History',     'Repayment history on lending protocols'],
                ['EXPLOIT_EXPOSURE', 'Exploit Exposure',      'Interactions with flagged/malicious contracts'],
                ['PROMPT_INTEGRITY', 'Prompt Integrity',      'Prompt injection resistance signals'],
                ['PEER_ENDORSEMENT', 'Peer Endorsement',      'Endorsements from other trusted agents'],
              ].map(([key, name, desc]) => (
                <tr key={key}><td>{key}</td><td>{name}</td><td>{desc}</td></tr>
              ))}
            </tbody>
          </table>

          {/* ERC-8004 */}
          <h2 id="erc-8004">ERC-8004 Identity</h2>
          <p>
            ERC-8004 is an on-chain identity standard for AI agents. A passport is a verifiable
            credential anchored to a specific Ethereum address that attests to an agent's behavioral
            history. Passports cannot be transferred — an agent that wants a clean record must earn it.
          </p>
          <h3>Verify endpoint</h3>
          <pre><code>{`GET https://api.askspecter.xyz/v1/verify/0xd8dA...

{
  "address": "0xd8dA...",
  "verified": true,
  "passport": "0x4a2b...c91f",
  "registered_at": "2026-01-15T08:22:00Z",
  "chain": "base",
  "block": 21847392
}`}</code></pre>

          {/* SDK */}
          <h2 id="sdk">SDK Reference</h2>
          <h3>SpecterClient</h3>
          <p>Calls the live API at <code>https://api.askspecter.xyz/v1</code>.</p>
          <pre><code>{`import { SpecterClient } from '@askspecter/sdk';

const client = new SpecterClient({
  apiKey: process.env.SPECTER_API_KEY, // optional
  chain: 'base',                        // default
  timeout: 10_000,                      // ms
});

// Score
const score = await client.score('0x...');

// Verify
const verify = await client.verify('0x...');

// Trust gate
const gate = await client.trustGate('0x...', {
  minScore: 75,
  requireVerified: false,
  dimensions: { PROMPT_INTEGRITY: 70 },
});`}</code></pre>

          <h3>SpecterMockClient</h3>
          <p>Deterministic mock — no network. Use in tests and CI.</p>
          <pre><code>{`import { SpecterMockClient } from '@askspecter/sdk';

const client = new SpecterMockClient();
const result = await client.score('0x...');
// Same score on every call for the same address`}</code></pre>

          {/* CLI */}
          <h2 id="cli">CLI Reference</h2>
          <table>
            <thead><tr><th>Command</th><th>Description</th></tr></thead>
            <tbody>
              {[
                ['specter score <addr>',           'Full 7-dimension score with bars'],
                ['specter score <addr> --json',    'Machine-readable JSON output'],
                ['specter verify <addr>',          'ERC-8004 passport verification'],
                ['specter watch <addr>',           'Live score polling (every 3s)'],
                ['specter watch <addr> -i 1000',   'Custom poll interval (ms)'],
              ].map(([cmd, desc]) => (
                <tr key={cmd}><td>{cmd}</td><td>{desc}</td></tr>
              ))}
            </tbody>
          </table>

          {/* AEON */}
          <h2 id="aeon">Aeon Integration</h2>
          <pre><code>{`import { SpecterMiddleware, AeonReporter } from '@askspecter/aeon';

const middleware = new SpecterMiddleware({
  minScore: 75,
  requireVerified: false,
  dimensions: {
    EXPLOIT_EXPOSURE: 65,
    PROMPT_INTEGRITY: 70,
  },
});

const reporter = new AeonReporter();

// In your Aeon action handler:
const result = await middleware.check({
  agentAddress: ctx.agentAddress,
  action: 'transfer 0.5 ETH',
});

reporter.record(result);

if (!result.allowed) {
  throw new Error(\`Trust gate: \${result.reason}\`);
}`}</code></pre>

          <h3>GitHub Actions</h3>
          <pre><code>{`- name: SPECTER Trust Check
  env:
    SPECTER_API_KEY: \${{ secrets.SPECTER_API_KEY }}
    AGENT_ADDRESS: \${{ vars.AGENT_ADDRESS }}
  run: |
    node --input-type=module <<'EOF'
    import { SpecterMiddleware } from '@askspecter/aeon';
    const m = new SpecterMiddleware({ minScore: 80 });
    const r = await m.check({ agentAddress: process.env.AGENT_ADDRESS });
    if (!r.allowed) { console.error(r.failReasons); process.exit(1); }
    EOF`}</code></pre>

          {/* SKILLS */}
          <h2 id="skills">Bankr Skills</h2>
          <pre><code>{`# Install all SPECTER skills
curl -fsSL https://raw.githubusercontent.com/askspecter/skills/main/install.sh | bash

# Available skills after install:
# · specter.md          — full protocol skill
# · specter-score.md    — score an agent
# · specter-verify.md   — verify ERC-8004
# · specter-trust-gate.md — combined gate`}</code></pre>

          {/* API */}
          <h2 id="api">API Reference</h2>
          <h3>GET /v1/score/:address</h3>
          <pre><code>{`GET https://api.askspecter.xyz/v1/score/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045

{
  "address": "0xd8dA...",
  "score": 82,
  "verdict": "TRUSTED_AGENT",
  "chain": "base",
  "block": 21847392,
  "passport": "0x4a2b...c91f",
  "dimensions": {
    "TX_VOLUME": 78,
    "COUNTERPARTY_DIV": 91,
    "ACCOUNT_AGE": 65,
    "REPAYMENT_HIST": 88,
    "EXPLOIT_EXPOSURE": 95,
    "PROMPT_INTEGRITY": 72,
    "PEER_ENDORSEMENT": 83
  },
  "cached_at": "2026-06-18T02:15:11Z"
}`}</code></pre>

          <h3>GET /v1/verify/:address</h3>
          <pre><code>{`GET https://api.askspecter.xyz/v1/verify/0xd8dA...

{
  "address": "0xd8dA...",
  "verified": true,
  "passport": "0x4a2b...c91f",
  "registered_at": "2026-01-15T08:22:00Z",
  "chain": "base",
  "block": 21847392
}`}</code></pre>

          <h3>Rate limits</h3>
          <table>
            <thead><tr><th>Tier</th><th>Limit</th><th>Auth</th></tr></thead>
            <tbody>
              {[
                ['Free',    '1,000 req/month', 'None'],
                ['Pay-per-query', 'Unlimited', 'x402 via Bankr'],
                ['API Key', 'Custom',          'X-API-Key header'],
              ].map(([t, l, a]) => (
                <tr key={t}><td>{t}</td><td>{l}</td><td>{a}</td></tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
      <Footer />
    </div>
  );
}
