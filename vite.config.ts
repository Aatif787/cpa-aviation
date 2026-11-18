import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      router: {
        entry: "frontend/router",
        routesDirectory: "frontend/routes",
        generatedRouteTree: "frontend/routeTree.gen.ts",
      },
      start: { entry: "backend/start" },
      server: { entry: "backend/server" },
    }),
    command === "build" &&
      nitro({
        // Default: standalone Node server (.output/server/index.mjs) for VPS hosting.
        // On Vercel (VERCEL=1 is set during builds), emit the Vercel Build Output API
        // (.vercel/output) so Vercel serves the SSR function and static assets.
        preset: process.env["NITRO_PRESET"] || (process.env["VERCEL"] ? "vercel" : "node-server"),
      }),
    viteReact(),
  ].filter(Boolean),
  optimizeDeps: {
    include: ["gsap", "gsap/ScrollTrigger", "lenis", "lucide-react"],
  },
  server: {
    watch: {
      ignored: ["**/.output/**", "**/.nitro/**", "**/.tanstack/**", "**/dist/**", "**/dist-ssr/**"],
    },
  },
}));
