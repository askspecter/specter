<h1 align="center">SPECTER — Know Your Agent</h1>

<p align="center">
  <a href="https://askspecter.lol">askspecter.lol</a> &nbsp;|&nbsp;
  <a href="https://api.askspecter.xyz">API</a> &nbsp;|&nbsp;
  <a href="https://x.com/AskSpecter">Twitter</a> &nbsp;|&nbsp;
  <a href="https://github.com/askspecter">GitHub</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/DOCS-askspecter.lol-red?style=flat-square&labelColor=111111&color=cc0000" alt="Docs" />
  <img src="https://img.shields.io/badge/API-api.askspecter.xyz-red?style=flat-square&labelColor=111111&color=880000" alt="API" />
  <img src="https://img.shields.io/badge/LICENSE-MIT-green?style=flat-square&labelColor=111111&color=22863a" alt="MIT License" />
  <img src="https://img.shields.io/badge/BUILT%20ON-Base%20Mainnet-0052ff?style=flat-square&labelColor=111111" alt="Built on Base" />
  <img src="https://img.shields.io/badge/LANG-TypeScript-3178c6?style=flat-square&labelColor=111111" alt="TypeScript" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/ERC-8004-ff4500?style=flat-square&labelColor=111111" alt="ERC-8004" />
  <img src="https://img.shields.io/badge/DIMENSIONS-7-cc0000?style=flat-square&labelColor=111111" alt="7 Dimensions" />
  <img src="https://img.shields.io/badge/FREE-1K%20queries%2Fmo-555555?style=flat-square&labelColor=111111" alt="1K free queries" />
  <img src="https://img.shields.io/badge/QUERY TIME-<100ms-222222?style=flat-square&labelColor=111111" alt="<100ms" />
</p>

---

**Behavioral reputation scoring for autonomous AI agents on Base mainnet.** SPECTER computes a 7-dimensional trust score for any Ethereum/Base address — anchored to an ERC-8004 identity passport — so autonomous agents can verify each other before executing transfers, delegation, or any sensitive operation.

---

## Packages

| Package | Version | Description |
|---------|---------|-------------|
| [`@askspecter/sdk`](packages/specter-sdk) | ![npm](https://img.shields.io/npm/v/@askspecter/sdk?style=flat-square&labelColor=111111&color=cc0000) | TypeScript SDK — score, verify, trust-gate |
| [`@askspecter/aeon`](packages/specter-aeon) | ![npm](https://img.shields.io/npm/v/@askspecter/aeon?style=flat-square&labelColor=111111&color=cc0000) | Aeon middleware — drop-in trust gating |
| [`skills`](packages/skills) | — | Bankr skill registry — one-curl install |

---

## Quick Start

### TypeScript SDK

```bash
npm install @askspecter/sdk
```

```typescript
import { SpecterClient } from '@askspecter/sdk';

const client = new SpecterClient();

// Score any agent address
const result = await client.score('0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045');
console.log(result.score);    // 82
console.log(result.verdict);  // 'TRUSTED_AGENT'

// Gate before action — one call, one boolean
const gate = await client.trustGate('0xd8dA...', {
  minScore: 75,
  dimensions: { PROMPT_INTEGRITY: 70 },
});

if (!gate.allowed) throw new Error(gate.failReasons[0]);
```

### Aeon Middleware

```bash
npm install @askspecter/aeon
```

```typescript
import { SpecterMiddleware } from '@askspecter/aeon';

const gate = new SpecterMiddleware({
  minScore: 75,
  requireVerified: false,
  dimensions: { EXPLOIT_EXPOSURE: 65 },
});

// Before every agent action:
const check = await gate.check({
  agentAddress: agentAddr,
  action: 'transfer 0.5 ETH',
});

if (!check.allowed) {
  throw new Error(`Blocked: ${check.reason}`);
}
```

### Bankr Skills

```bash
# Install all SPECTER skills
curl -fsSL https://raw.githubusercontent.com/askspecter/specter/main/packages/skills/install.sh | bash

# Or install a single skill
curl -fsSL https://raw.githubusercontent.com/askspecter/specter/main/packages/skills/skill.md \
  > ~/.bankr/skills/specter.md
```

---

## Score Bands

| Score | Verdict | Recommended Action |
|-------|---------|-------------------|
| 85–100 | `TRUSTED_AGENT` | Safe to transact |
| 65–84 | `REVIEW_ADVISED` | Ask user to confirm |
| 0–64 | `HIGH_RISK` | Block operation |

---

## 7 Dimensions

| # | Dimension | Signal |
|---|-----------|--------|
| 1 | **TX Volume** | On-chain transaction count across L1/L2 |
| 2 | **Counterparty Diversity** | Unique addresses interacted with |
| 3 | **Account Age** | First on-chain activity timestamp |
| 4 | **Repayment History** | DeFi loan repayment rate |
| 5 | **Exploit Exposure** | Proximity to flagged exploit contracts |
| 6 | **Prompt Integrity** | Agent instruction consistency score |
| 7 | **Peer Endorsement** | ERC-8004 attestation count |

---

## API

No API key required for up to 1,000 queries/month.

```
GET https://api.askspecter.xyz/v1/score/{address}
GET https://api.askspecter.xyz/v1/verify/{address}
```

```bash
curl https://api.askspecter.xyz/v1/score/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
```

```json
{
  "address": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
  "score": 82,
  "verdict": "TRUSTED_AGENT",
  "dimensions": {
    "TX_VOLUME": 91,
    "COUNTERPARTY_DIVERSITY": 88,
    "ACCOUNT_AGE": 95,
    "REPAYMENT_HISTORY": 79,
    "EXPLOIT_EXPOSURE": 84,
    "PROMPT_INTEGRITY": 71,
    "PEER_ENDORSEMENT": 66
  },
  "chain": "base",
  "blockNumber": 21847392,
  "timestamp": 1750000000
}
```

---

## Testing

All packages ship with full test suites using [vitest](https://vitest.dev). Tests run entirely offline via `SpecterMockClient` — no network required.

```bash
# Run all tests
npm test

# Individual packages
npm run test:sdk
npm run test:aeon
```

---

## Monorepo Structure

```
specter/
├── packages/
│   ├── specter-sdk/    # @askspecter/sdk — TypeScript SDK
│   ├── specter-aeon/   # @askspecter/aeon — Aeon middleware
│   └── skills/         # Bankr skill definitions
├── assets/             # Logo images
└── package.json        # npm workspaces root
```

---

## Links

- Website: [askspecter.lol](https://askspecter.lol)
- Twitter: [@AskSpecter](https://x.com/AskSpecter)
- GitHub: [github.com/askspecter](https://github.com/askspecter)
- API: [api.askspecter.xyz](https://api.askspecter.xyz)

---

<p align="center">MIT © SPECTER Protocol · Built on Base</p>
