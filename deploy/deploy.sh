#!/usr/bin/env bash
# Build cpaleasing.com as a fully static site on the VPS.
# Run:  bash /app/cpa-aviation/deploy/deploy.sh
# Nginx serves /app/cpa-aviation/site directly — no Node server, no PM2, no reload needed.
# Does NOT touch Nginx or SSL — those are managed by hand.
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="${BRANCH:-main}"
SITE_URL="https://www.cpaleasing.com"
LIVE_DIR="$APP_DIR/site"

cd "$APP_DIR"
echo "==> $APP_DIR  (branch: $BRANCH)"

if ! grep -qs '^VITE_LEADS_SITE_KEY=.\+' .env.production; then
  echo "    WARNING: VITE_LEADS_SITE_KEY is not set in $APP_DIR/.env.production" >&2
  echo "             The contact form will fall back to opening an email draft." >&2
fi

echo "==> Pulling latest code"
git fetch --prune origin
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"
echo "    now at $(git log -1 --format='%h %s')"

echo "==> Installing dependencies"
npm ci --no-audit --no-fund

echo "==> Building (vite build + prerender to static HTML)"
# SITE_URL / VITE_SITE_URL set the canonical, Open Graph, robots and sitemap URLs.
# The prerender step briefly runs an internal server on port 4399 to render each page.
SITE_URL="$SITE_URL" VITE_SITE_URL="$SITE_URL" NITRO_PRESET=node-server npm run build

for f in index.html contact/index.html 404.html sitemap.xml; do
  if [ ! -f ".output/public/$f" ]; then
    echo "    FAILED — .output/public/$f missing; live site left unchanged" >&2
    exit 1
  fi
done

echo "==> Publishing to $LIVE_DIR"
# Copy first, then swap directories, so visitors never see a half-built site.
rm -rf "$LIVE_DIR.new" "$LIVE_DIR.old"
cp -a .output/public "$LIVE_DIR.new"
if [ -d "$LIVE_DIR" ]; then mv "$LIVE_DIR" "$LIVE_DIR.old"; fi
mv "$LIVE_DIR.new" "$LIVE_DIR"
rm -rf "$LIVE_DIR.old"
echo "    OK — static site published ($(find "$LIVE_DIR" -name index.html | wc -l) pages)"
