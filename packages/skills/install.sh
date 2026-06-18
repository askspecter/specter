#!/usr/bin/env bash
# Install SPECTER skills into your agent's skill directory
set -euo pipefail

SKILLS_DIR="${BANKR_SKILLS_DIR:-${HOME}/.bankr/skills}"
REPO_RAW="https://raw.githubusercontent.com/askspecter/skills/main"

echo ""
echo "  Installing SPECTER skills → $SKILLS_DIR"
echo ""

mkdir -p "$SKILLS_DIR"

SKILLS=(
  "skill.md"
  "skills/specter-score.md"
  "skills/specter-verify.md"
  "skills/specter-trust-gate.md"
)

for skill in "${SKILLS[@]}"; do
  dest="$SKILLS_DIR/$(basename "$skill")"
  if command -v curl &>/dev/null; then
    curl -fsSL "$REPO_RAW/$skill" -o "$dest"
  elif command -v wget &>/dev/null; then
    wget -qO "$dest" "$REPO_RAW/$skill"
  else
    echo "  ✗ curl or wget required"
    exit 1
  fi
  echo "  ✓ $(basename "$skill")"
done

echo ""
echo "  Skills installed to $SKILLS_DIR"
echo "  Restart your agent to load the new skills."
echo ""
