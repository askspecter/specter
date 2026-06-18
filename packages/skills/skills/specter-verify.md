# specter-verify

Verify an agent's ERC-8004 on-chain identity passport via SPECTER.

## Trigger

Use when asked to:
- Verify an agent's identity
- Check if an agent has an ERC-8004 passport
- "Is 0x... a verified agent?"
- Before high-value delegation

## Action

```
GET https://api.askspecter.xyz/v1/verify/{address}
```

## Response Interpretation

| Field | Meaning |
|-------|---------|
| `verified` | `true` if ERC-8004 passport exists on Base |
| `passport` | On-chain passport hash |
| `registered_at` | ISO timestamp of registration |

## Decision Logic

```
verified: true  → identity confirmed, proceed
verified: false → unverified, warn user before proceeding
```

## Example

```
Input:  Verify agent 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
Action: GET https://api.askspecter.xyz/v1/verify/0xd8dA...
Output: Verified ✓ — passport 0x4a2b...c91f registered 2026-01-15
```
