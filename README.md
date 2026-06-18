# SPECTER — Know Your Agent

> Behavioral reputation scoring for autonomous AI agents on Base mainnet.

[![License: MIT](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)
[![Built on Base](https://img.shields.io/badge/Built%20on-Base-0052ff)](https://base.org)

---

## What is SPECTER?

SPECTER is a permissionless on-chain reputation protocol for AI agents. It computes a 7-dimensional trust score for any Ethereum/Base address — anchored to an ERC-8004 identity passport — so autonomous agents can verify each other before executing transfers, delegation, or any sensitive operation.

---

## Monorepo Structure

```
specter/
├── web/                    # Vite + React + TypeScript website
├── packages/
│   ├── specter-sdk/        # TypeScript SDK (@askspecter/sdk)
│   ├── specter-cli/        # CLI tool (@askspecter/cli)
│   ├── skills/             # Bankr skill registry
│   └── specter-aeon/       # Aeon agent integration (@askspecter/aeon)
└── package.json            # Workspace root
```

---

## Quick Start

```bash
# Clone and install all packages
git clone https://github.com/askspecter/specter
cd specter
npm install

# Run website
npm run dev

# Run all tests
npm test
```

---

## Packages

### `@askspecter/sdk` — TypeScript SDK

```typescript
import { SpecterClient } from '@askspecter/sdk';

const client = new SpecterClient();
const result = await client.score('0xd8dA...');
console.log(result.score);   // 82
console.log(result.verdict); // 'TRUSTED_AGENT'

const gate = await client.trustGate('0xd8dA...', { minScore: 75 });
if (!gate.allowed) throw new Error(gate.failReasons[0]);
```

[→ packages/specter-sdk](packages/specter-sdk)

---

### `@askspecter/cli` — CLI Tool

```bash
# Install
curl -fsSL https://raw.githubusercontent.com/askspecter/specter-cli/main/install.sh | bash

# Score an agent
specter score 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045

# Verify ERC-8004 identity
specter verify 0xd8dA...

# Live watch
specter watch 0xd8dA...
```

[→ packages/specter-cli](packages/specter-cli)

---

### `skills` — Bankr Skill Registry

```bash
curl -fsSL https://raw.githubusercontent.com/askspecter/skills/main/install.sh | bash
```

[→ packages/skills](packages/skills)

---

### `@askspecter/aeon` — Aeon Integration

```typescript
import { SpecterMiddleware } from '@askspecter/aeon';

const middleware = new SpecterMiddleware({ minScore: 75 });
const result = await middleware.check({ agentAddress: '0x...' });

if (!result.allowed) throw new Error(result.reason!);
```

[→ packages/specter-aeon](packages/specter-aeon)

---

## Score Bands

| Score | Verdict | Action |
|-------|---------|--------|
| 85–100 | `TRUSTED_AGENT` | Safe to transact |
| 65–84 | `REVIEW_ADVISED` | Ask user to confirm |
| 0–64 | `HIGH_RISK` | Block operation |

---

## API

```
GET https://api.askspecter.xyz/v1/score/{address}
GET https://api.askspecter.xyz/v1/verify/{address}
```

No API key required for up to 1,000 queries/month.

---

## Links

- Website: https://askspecter.lol
- Twitter: https://x.com/AskSpecter
- GitHub: https://github.com/askspecter

---

## License

MIT © SPECTER Protocol
