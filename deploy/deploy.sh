#!/usr/bin/env bash
# Build and (re)start cpaleasing.com on the VPS.
# Run:  bash /app/cpa-aviation/deploy/deploy.sh
# Does NOT touch Nginx or SSL — those are managed by hand.
set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BRANCH="${BRANCH:-main}"
PORT=3003
SITE_URL="https://www.cpaleasing.com"

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

echo "==> Building (vite build + prerender)"
# SITE_URL / VITE_SITE_URL set the canonical, Open Graph and robots/sitemap URLs.
SITE_URL="$SITE_URL" VITE_SITE_URL="$SITE_URL" NITRO_PRESET=node-server npm run build

echo "==> Starting / reloading with PM2"
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save

echo "==> Health check on 127.0.0.1:$PORT"
for i in $(seq 1 15); do
  if curl -fs -o /dev/null -H "X-Forwarded-Proto: https" "http://127.0.0.1:$PORT/"; then
    echo "    OK — site is responding"
    exit 0
  fi
  sleep 1
done
echo "    FAILED — check: pm2 logs cpa-aviation --lines 100" >&2
exit 1
