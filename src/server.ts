import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import {
  HERO_POSTER_PATH,
  buildRobotsTxt,
  buildSitemapXml,
  buildStructuredData,
  isLocalHost,
  resolveRequestOrigin,
} from "./lib/seo";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

function readEnvValue(env: unknown, key: string): string | undefined {
  if (env && typeof env === "object" && key in env) {
    const val = (env as Record<string, unknown>)[key];
    if (typeof val === "string" && val.trim().length > 0) return val.trim();
  }
  const procVal = typeof process !== "undefined" ? process.env[key] : undefined;
  return procVal?.trim() || undefined;
}

function maybeRedirectSeoPaths(request: Request): Response | null {
  const url = new URL(request.url);
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim().toLowerCase();

  if (!isLocalHost(url.hostname) && (url.protocol === "http:" || forwardedProto === "http")) {
    const httpsUrl = new URL(url.toString());
    httpsUrl.protocol = "https:";
    return Response.redirect(httpsUrl.toString(), 301);
  }

  const lowerPath = url.pathname.toLowerCase();
  if (lowerPath === "/index.html" || lowerPath === "/index" || lowerPath === "/home") {
    const target = new URL("/", url.origin);
    target.search = url.search;
    return Response.redirect(target.toString(), 301);
  }

  if (
    url.pathname.length > 1 &&
    url.pathname.endsWith("/") &&
    !url.pathname.startsWith("/_serverFn")
  ) {
    const target = new URL(url.pathname.slice(0, -1) + url.search, url.origin);
    return Response.redirect(target.toString(), 301);
  }

  return null;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

async function enhanceHtmlSeoResponse(
  response: Response,
  request: Request,
  origin: string,
  verificationToken?: string,
): Promise<Response> {
  const headers = new Headers(response.headers);
  headers.set("x-content-type-options", "nosniff");
  headers.set("referrer-policy", "strict-origin-when-cross-origin");

  const contentType = headers.get("content-type") ?? "";
  const contentEncoding = headers.get("content-encoding");
  const isHtml = contentType.includes("text/html") && !contentEncoding;
  if (!isHtml) {
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  if (response.status === 404) {
    headers.set("x-robots-tag", "noindex, nofollow");
    const html = await response.text();
    const cleaned = html
      .replace(/<link[^>]+rel=["']canonical["'][^>]*>/gi, "")
      .replace(
        /<\/head>/i,
        `<meta name="robots" content="noindex, nofollow" />\n</head>`,
      );
    return new Response(cleaned, { status: 404, statusText: response.statusText, headers });
  }

  const pathname = new URL(request.url).pathname;
  if (response.status === 200 && pathname === "/") {
    headers.set("x-robots-tag", "index, follow, max-image-preview:large");
    let html = await response.text();
    const headAdditions: string[] = [];

    if (!/rel=["']canonical["']/i.test(html)) {
      headAdditions.push(`<link rel="canonical" href="${origin}/" />`);
    }
    if (!/property=["']og:url["']/i.test(html)) {
      headAdditions.push(`<meta property="og:url" content="${origin}/" />`);
    }
    if (!/property=["']og:image["']/i.test(html)) {
      headAdditions.push(`<meta property="og:image" content="${origin}${HERO_POSTER_PATH}" />`);
    }
    if (!/name=["']twitter:image["']/i.test(html)) {
      headAdditions.push(`<meta name="twitter:image" content="${origin}${HERO_POSTER_PATH}" />`);
    }
    if (verificationToken && !/name=["']google-site-verification["']/i.test(html)) {
      headAdditions.push(
        `<meta name="google-site-verification" content="${verificationToken.replace(/"/g, "&quot;")}" />`,
      );
    }

    if (headAdditions.length > 0) {
      html = html.replace(/<\/head>/i, `${headAdditions.join("\n")}\n</head>`);
    }

    const hydratedJsonLd = JSON.stringify(buildStructuredData(origin)).replaceAll("<", "\\u003c");
    html = html.replace(
      /<script id="cpa-structured-data" type="application\/ld\+json">[\s\S]*?<\/script>/i,
      `<script id="cpa-structured-data" type="application/ld+json">${hydratedJsonLd}</script>`,
    );

    return new Response(html, { status: response.status, statusText: response.statusText, headers });
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

// Hosting compresses every response at the edge. Never compress a body (gzip, brotli,
// CompressionStream) or set content-encoding here or in a server route: the body gets encoded
// twice and renders garbled.
export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const redirect = maybeRedirectSeoPaths(request);
      if (redirect) return redirect;

      const url = new URL(request.url);
      const origin = resolveRequestOrigin(
        request.url,
        readEnvValue(env, "SITE_URL") ?? readEnvValue(env, "VITE_SITE_URL"),
        request.headers.get("x-forwarded-proto"),
      );

      if (url.pathname === "/robots.txt") {
        return new Response(buildRobotsTxt(origin), {
          status: 200,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      }

      if (url.pathname === "/sitemap.xml") {
        return new Response(buildSitemapXml(origin), {
          status: 200,
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      }

      const handler = await getServerEntry();
      const rawResponse = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(rawResponse);
      const verificationToken =
        readEnvValue(env, "GOOGLE_SITE_VERIFICATION") ??
        readEnvValue(env, "VITE_GOOGLE_SITE_VERIFICATION");
      return await enhanceHtmlSeoResponse(normalized, request, origin, verificationToken);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "x-robots-tag": "noindex, nofollow",
        },
      });
    }
  },
};
