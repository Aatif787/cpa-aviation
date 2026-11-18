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
- React 19
- Tailwind CSS
- GSAP & Lenis

## Deployment

### Hostinger VPS (Recommended)

1. Clone the repository on your Hostinger VPS:
   ```sh
   git clone <repo-url>
   cd cpa-aviation
   ```
2. Install dependencies & build:
   ```sh
   npm install
   npm run build
   ```
3. Start with PM2:
   ```sh
   npm install -g pm2
   pm2 start ecosystem.config.cjs
   pm2 save
   pm2 startup
   ```
4. Point Nginx reverse proxy to `http://127.0.0.1:3000` with:
   ```nginx
   location / {
       proxy_pass http://127.0.0.1:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_set_header X-Forwarded-Proto $scheme;
       proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       proxy_cache_bypass $http_upgrade;
   }
   ```

### Hostinger hPanel (Node.js Application)

1. Upload project files or connect your Git repository.
2. In **hPanel > Advanced > Node.js**:
   - **Node.js version**: 20.x or 22.x
   - **Application root**: `public_html` (or your app directory)
   - **Application startup file**: `.output/server/index.mjs`
3. Click **npm install**, then run `npm run build` in the terminal / hPanel console.
4. Click **Start** / **Restart Application**.

### Vercel Deployment

Vercel builds automatically via `vercel.json` and the built-in Nitro Vercel preset (`NITRO_PRESET=vercel npm run build`).

### Optional Environment Variables

- `PORT` — Server port (default: `3000`)
- `SITE_URL` — Canonical domain (e.g. `https://cpaaviation.in`)
- `GOOGLE_SITE_VERIFICATION` — Google Search Console token
