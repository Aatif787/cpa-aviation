# CPA Aviation Leasing Capital

Corporate website for **CPA Aviation Leasing Capital IFSC Private Limited**, based in GIFT City, Gandhinagar, Gujarat, India.

## Development

Requires Node.js (or Bun). Install dependencies and start the development server:

```sh
npm install
npm run dev
```

Available scripts:

- `npm run dev` — Start the Vite development server
- `npm run build` — Build for production
- `npm run preview` — Preview the production build
- `npm start` — Run the built Node server (`.output/server/index.mjs`, port from `PORT`, default 3000)
- `npm run lint` — Run ESLint
- `npm run test` — Run Vitest test suite

## Tech Stack

- TanStack Start & TanStack Router
- TypeScript
- React
- Tailwind CSS
- GSAP & Lenis

## Deployment (VPS + nginx)

`npm run build` writes `.output/`: static files in `.output/public/` and the Node server in `.output/server/index.mjs`. Copy `.output/` to the server, run `PORT=3000 node .output/server/index.mjs` (under pm2 or systemd), and reverse-proxy nginx to it with `proxy_set_header X-Forwarded-Proto $scheme;`.

Optional environment variables: `SITE_URL` (canonical origin) and `GOOGLE_SITE_VERIFICATION`.
