import fs from "node:fs";
import path from "node:path";

if (process.env.NITRO_PRESET === "vercel" || process.env.VERCEL) {
  console.log(
    "[prerender] Skipping prerender for Vercel preset (handled by Vercel Build Output API).",
  );
  process.exit(0);
}

const PORT = process.env.PRERENDER_PORT || "4399";
process.env.PORT = PORT;
process.env.SITE_URL = process.env.SITE_URL || "https://cpaleasing.com";

console.log(`[prerender] Starting internal server on port ${PORT}...`);
const serverModule = await import("../.output/server/index.mjs");

const routes = [
  "/",
  "/about",
  "/contact",
  "/leadership",
  "/aircraft-leasing",
  "/aviation-assets",
  "/our-approach",
  "/gift-city",
];

for (const route of routes) {
  const url = `http://localhost:${PORT}${route}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`[prerender] Failed to render ${route}: status ${res.status}`);
    continue;
  }
  const html = await res.text();
  const outDir = route === "/" ? ".output/public" : path.join(".output/public", route.slice(1));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "index.html"), html, "utf8");
  console.log(`[prerender] Generated ${outDir}/index.html (${html.length} bytes)`);
}

console.log("[prerender] Static page generation completed successfully.");

// Close server gracefully if exposed
if (serverModule?.default?.close) {
  await serverModule.default.close();
}

setTimeout(() => {
  process.exit(0);
}, 200);
