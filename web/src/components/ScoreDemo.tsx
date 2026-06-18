import { useState, useRef } from 'react';
import {
  scoreAddress,
  ADDRESS_RE,
  DIMS,
  DIM_LABELS,
  VERDICT_COLOR,
  type ScoreResult,
} from '../lib/scoring';

const DEMO_ADDRESSES = [
  '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
  '0xAbCdEf0123456789AbCdEf0123456789AbCdEf01',
  '0x0000000000000000000000000000000000000001',
];

function DimBar({ label, value }: { label: string; value: number }) {
  const pct = ((value - 55) / 40) * 100;
  const color = value >= 80 ? '#22c55e' : value >= 65 ? '#f59e0b' : '#e53333';

  return (
    <div className="dim-row">
      <span className="dim-label">{label}</span>
      <div className="dim-track">
        <div className="dim-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="dim-val">{value}</span>
    </div>
  );
}

export default function ScoreDemo() {
  const [address, setAddress] = useState('');
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleScore(addr = address) {
    const trimmed = addr.trim();
    if (!ADDRESS_RE.test(trimmed)) {
      setError('Enter a valid Ethereum address (0x + 40 hex chars)');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);
    try {
      await new Promise(r => setTimeout(r, 350));
      const data = await scoreAddress(trimmed);
      setResult(data);
    } finally {
      setLoading(false);
    }
  }

  function tryAddress(addr: string) {
    setAddress(addr);
    handleScore(addr);
  }

  const verdictColor = result ? VERDICT_COLOR[result.verdict] : '#e53333';

  return (
    <div className="demo-box">
      <div className="demo-input-row">
        <input
          ref={inputRef}
          className="demo-input"
          placeholder="0x..."
          value={address}
          onChange={e => setAddress(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleScore()}
          spellCheck={false}
        />
        <button className="btn-primary" onClick={() => handleScore()} disabled={loading}>
          {loading ? 'Scoring…' : 'Score'}
        </button>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
        {DEMO_ADDRESSES.map(a => (
          <button
            key={a}
            onClick={() => tryAddress(a)}
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem', padding: '0.25rem 0.6rem',
              background: '#111', border: '1px solid var(--border)', borderRadius: '3px',
              color: 'var(--text-dim)', cursor: 'pointer',
            }}
          >
            {a.slice(0, 10)}…
          </button>
        ))}
      </div>

      {error && <p className="demo-error">{error}</p>}
      {loading && <p className="demo-loading">Connecting to Base mainnet…</p>}

      {result && (
        <div className="demo-result">
          <div className="demo-header">
            <span className="demo-score-num" style={{ color: verdictColor }}>
              {result.score}
            </span>
            <span
              className="demo-verdict"
              style={{ background: `${verdictColor}18`, color: verdictColor }}
            >
              {result.verdict}
            </span>
          </div>

          <div className="demo-bars">
            {DIMS.map(d => (
              <DimBar key={d} label={DIM_LABELS[d]} value={result.dimensions[d]} />
            ))}
          </div>

          <p className="demo-passport">
            Passport: {result.passport} · Block #{result.block.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}
