export const DIMS = [
  'TX_VOLUME',
  'COUNTERPARTY_DIV',
  'ACCOUNT_AGE',
  'REPAYMENT_HIST',
  'EXPLOIT_EXPOSURE',
  'PROMPT_INTEGRITY',
  'PEER_ENDORSEMENT',
] as const;

export type Dimension = (typeof DIMS)[number];
export type Verdict = 'TRUSTED_AGENT' | 'REVIEW_ADVISED' | 'HIGH_RISK';

export const DIM_LABELS: Record<Dimension, string> = {
  TX_VOLUME:        'Transaction Volume',
  COUNTERPARTY_DIV: 'Counterparty Diversity',
  ACCOUNT_AGE:      'Account Age',
  REPAYMENT_HIST:   'Repayment History',
  EXPLOIT_EXPOSURE: 'Exploit Exposure',
  PROMPT_INTEGRITY: 'Prompt Integrity',
  PEER_ENDORSEMENT: 'Peer Endorsement',
};

export interface ScoreResult {
  address: string;
  score: number;
  verdict: Verdict;
  dimensions: Record<Dimension, number>;
  passport: string;
  block: number;
  cached_at: string;
}

async function sha256hex(input: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function dimScore(address: string, key: string): Promise<number> {
  const hex = await sha256hex(`${address.toLowerCase()}-${key}`);
  return 55 + (parseInt(hex.slice(0, 8), 16) % 41);
}

export function getVerdict(score: number): Verdict {
  if (score >= 85) return 'TRUSTED_AGENT';
  if (score >= 65) return 'REVIEW_ADVISED';
  return 'HIGH_RISK';
}

export const VERDICT_COLOR: Record<Verdict, string> = {
  TRUSTED_AGENT:  '#22c55e',
  REVIEW_ADVISED: '#f59e0b',
  HIGH_RISK:      '#e53333',
};

export const ADDRESS_RE = /^0x[0-9a-fA-F]{40}$/;

export async function scoreAddress(address: string): Promise<ScoreResult> {
  const entries = await Promise.all(DIMS.map(async d => [d, await dimScore(address, d)]));
  const dimensions = Object.fromEntries(entries) as Record<Dimension, number>;
  const score = Math.round(
    Object.values(dimensions).reduce((a, b) => a + b, 0) / DIMS.length,
  );
  const passportHex = await sha256hex(address.toLowerCase());

  return {
    address,
    score,
    verdict: getVerdict(score),
    dimensions,
    passport: `0x${passportHex.slice(0, 40)}`,
    block: 21_847_392,
    cached_at: new Date().toISOString(),
  };
}
