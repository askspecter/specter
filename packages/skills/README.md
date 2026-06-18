# askspecter/skills

SPECTER Bankr Skill registry — drop-in skill definitions for autonomous agents.

These skills let any Bankr-compatible agent instantly use the SPECTER reputation protocol to score agents, verify identities, and gate sensitive operations on trust scores.

---

## Quick Install

```bash
curl -fsSL https://raw.githubusercontent.com/askspecter/skills/main/install.sh | bash
```

Or manually copy a skill file into your agent's skills directory.

---

## Skills

| File | Purpose |
|------|---------|
| [`skill.md`](skill.md) | Full SPECTER skill — score, verify, usage patterns |
| [`skills/specter-score.md`](skills/specter-score.md) | Score an agent address |
| [`skills/specter-verify.md`](skills/specter-verify.md) | Verify ERC-8004 identity |
| [`skills/specter-trust-gate.md`](skills/specter-trust-gate.md) | Combined trust gate before sensitive ops |

---

## Usage with Bankr

```bash
# Install all skills
curl -fsSL https://raw.githubusercontent.com/askspecter/skills/main/install.sh | bash

# Or install a single skill
curl -fsSL https://raw.githubusercontent.com/askspecter/skills/main/skill.md \
  > ~/.bankr/skills/specter.md
```

---

## API Endpoints

```
GET https://api.askspecter.xyz/v1/score/{address}
GET https://api.askspecter.xyz/v1/verify/{address}
```

No API key required for up to 1,000 queries/month.

---

## Score Bands

| Score | Verdict | Action |
|-------|---------|--------|
| 85–100 | `TRUSTED_AGENT` | Safe to transact |
| 65–84 | `REVIEW_ADVISED` | Ask user to confirm |
| 0–64 | `HIGH_RISK` | Block operation |

---

## Links

- Website: https://askspecter.lol
- Docs: https://askspecter.lol/docs
- Twitter: https://x.com/AskSpecter
- SDK: https://github.com/askspecter/specter-sdk
- CLI: https://github.com/askspecter/specter-cli
