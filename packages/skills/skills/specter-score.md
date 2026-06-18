# specter-score

Score an Ethereum/Base agent address using the SPECTER reputation protocol.

## Trigger

Use when asked to:
- Score an agent
- Check an agent's reputation or trust
- "What is the SPECTER score of 0x..."
- "Is agent [address] trustworthy?"

## Action

```
GET https://api.askspecter.xyz/v1/score/{address}
```

## Response Interpretation

| Field | Meaning |
|-------|---------|
| `score` | Composite 0–100 trust score |
| `verdict` | `TRUSTED_AGENT` / `REVIEW_ADVISED` / `HIGH_RISK` |
| `dimensions` | 7 behavioral sub-scores |

## Decision Logic

```
score >= 85  → TRUSTED_AGENT    → safe to proceed
score 65–84  → REVIEW_ADVISED   → ask user to confirm
score < 65   → HIGH_RISK        → block and explain
```

## Example

```
Input:  Score agent 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
Action: GET https://api.askspecter.xyz/v1/score/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
Output: Score 82 — TRUSTED_AGENT. Safe to proceed.
```
