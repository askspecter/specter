# specter-trust-gate

Combined trust gate — scores an agent AND verifies identity before allowing sensitive operations.

## Trigger

Use before:
- Executing payments or transfers to an agent
- Delegating autonomous tasks
- Forming multi-agent agreements
- Any high-value or irreversible action

## Action (2 calls in parallel)

```
GET https://api.askspecter.xyz/v1/score/{address}
GET https://api.askspecter.xyz/v1/verify/{address}
```

## Gate Logic

```
PASS conditions (all must be true):
  1. score >= 75
  2. verdict != "HIGH_RISK"
  3. verified == true  (for high-value ops)

BLOCK if any condition fails:
  → Explain which check failed
  → Do NOT proceed without explicit user override
```

## Decision Matrix

| Score | Verified | Action |
|-------|----------|--------|
| ≥ 75 | true | ALLOW — proceed |
| ≥ 75 | false | WARN — ask user to confirm |
| 65–74 | any | REVIEW — ask user to confirm |
| < 65 | any | BLOCK — do not proceed |

## Example

```
Input:  Send 0.5 ETH to agent 0xd8dA...
Gate:   Score=82 (TRUSTED_AGENT), Verified=true
Output: Gate PASSED — proceeding with transfer
```

```
Input:  Delegate portfolio rebalancing to agent 0xBad...
Gate:   Score=42 (HIGH_RISK)
Output: Gate BLOCKED — score 42 is HIGH_RISK. Transfer cancelled.
        Reason: Score 42 below minimum 75.
```
