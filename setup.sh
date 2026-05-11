#!/usr/bin/env bash
# Mac/Linux setup. Run: bash setup.sh
# Copies the live HTML demo into public/index.html.

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC="$SCRIPT_DIR/../Southampton_Cruise_Wayfinding_v1.html"
DST_DIR="$SCRIPT_DIR/public"
DST="$DST_DIR/index.html"

if [ ! -f "$SRC" ]; then
  echo
  echo "  ERROR: Cannot find the source HTML."
  echo "  Expected at: $SRC"
  echo
  exit 1
fi

mkdir -p "$DST_DIR"
cp "$SRC" "$DST"
SIZE=$(wc -c < "$DST" | tr -d ' ')
echo
echo "  OK: Copied to public/index.html ($((SIZE / 1024)) KB)"
echo
echo "  Next steps:"
echo "    git init"
echo "    git add ."
echo "    git commit -m \"Initial commit\""
echo "    git push to GitHub, then connect on https://railway.app"
echo
