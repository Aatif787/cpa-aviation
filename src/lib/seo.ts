export const LEGAL_NAME = "CPA Aviation Leasing Capital IFSC Private Limited";
export const BRAND_NAME = "CPA Aviation Leasing Capital";
export const COMPANY_CIN = "U66190GJ2026PTC180823";
export const INCORPORATION_DATE = "2026-07-16";
export const CORPORATE_EMAIL = "cpaaviationleasing@gmail.com";
export const CORPORATE_PHONE = "+91-85277-12949";

export const SEO_TITLE = "CPA Aviation Leasing Capital | Aircraft Leasing in GIFT City";
export const SEO_DESCRIPTION =
  "CPA Aviation Leasing Capital IFSC Private Limited is based in GIFT City, Gujarat, with a business focus on aircraft leasing and aviation asset opportunities.";

export const HERO_POSTER_PATH = "/media/white-aircraft-still.jpg";
export const LOGO_PUBLIC_PATH = "/favicon.png";
export const SITEMAP_LASTMOD = "2026-11-14";

export function isLocalHost(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

export function normalizeOrigin(raw?: string | null): string | undefined {
  const trimmed = raw?.trim();
  if (!trimmed) return undefined;
  try {
    const parsed = new URL(trimmed);
    if (!isLocalHost(parsed.hostname) && parsed.protocol === "http:") {
      parsed.protocol = "https:";
    }
    return parsed.origin;
  } catch {
    return undefined;
  }
}

export function resolveRequestOrigin(
  requestUrl: string,
  configuredSiteUrl?: string | null,
  forwardedProto?: string | null,
): string {
  const configured = normalizeOrigin(configuredSiteUrl);
  if (configured) return configured;

  const parsed = new URL(requestUrl);
  const proto = forwardedProto?.split(",")[0]?.trim().toLowerCase();
  if (!isLocalHost(parsed.hostname) && (parsed.protocol === "http:" || proto === "http")) {
    parsed.protocol = "https:";
  }
  return parsed.origin;
}

export function buildRobotsTxt(origin: string): string {
  return [
    "User-agent: Googlebot",
    "Allow: /",
    "Disallow: /_serverFn/",
    "",
    "User-agent: Bingbot",
    "Allow: /",
    "Disallow: /_serverFn/",
    "",
    "User-agent: Twitterbot",
    "Allow: /",
    "",
    "User-agent: facebookexternalhit",
    "Allow: /",
    "",
    "User-agent: *",
    "Allow: /",
    "Disallow: /_serverFn/",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n");
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function buildSitemapXml(origin: string): string {
  const homeUrl = escapeXml(`${origin}/`);
  const posterUrl = escapeXml(`${origin}${HERO_POSTER_PATH}`);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    "  <url>",
    `    <loc>${homeUrl}</loc>`,
    `    <lastmod>${SITEMAP_LASTMOD}</lastmod>`,
    "    <changefreq>monthly</changefreq>",
    "    <priority>1.0</priority>",
    "    <image:image>",
    `      <image:loc>${posterUrl}</image:loc>`,
    `      <image:title>${escapeXml(`${LEGAL_NAME} — Aircraft Operating Lease in GIFT City`)}</image:title>`,
    "    </image:image>",
    "  </url>",
    "</urlset>",
    "",
  ].join("\n");
}

export function buildStructuredData(origin?: string) {
  const base = normalizeOrigin(origin);
  const orgId = base ? `${base}/#organization` : "#organization";
  const websiteId = base ? `${base}/#website` : "#website";
  const webpageId = base ? `${base}/#webpage` : "#webpage";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: LEGAL_NAME,
        legalName: LEGAL_NAME,
        alternateName: BRAND_NAME,
        ...(base ? { url: `${base}/`, logo: `${base}${LOGO_PUBLIC_PATH}` } : {}),
        foundingDate: INCORPORATION_DATE,
        identifier: {
          "@type": "PropertyValue",
          propertyID: "CIN",
          value: COMPANY_CIN,
        },
        email: CORPORATE_EMAIL,
        telephone: CORPORATE_PHONE,
        address: {
          "@type": "PostalAddress",
          streetAddress: "U.71 S 1-4 GRD FLR 11T2, THE PLATFORM BK11 GIFTSEZ, Gift City",
          addressLocality: "Gandhi Nagar",
          addressRegion: "Gujarat",
          postalCode: "382050",
          addressCountry: "IN",
        },
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "corporate enquiries",
          email: CORPORATE_EMAIL,
          telephone: CORPORATE_PHONE,
          areaServed: "IN",
          availableLanguage: ["English"],
        },
        knowsAbout: [
          "Aircraft Operating Lease",
          "Aircraft Leasing in GIFT City",
          "Aircraft Leasing IFSC",
          "Aviation Asset Management",
          "Aviation Finance India",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: BRAND_NAME,
        ...(base ? { url: `${base}/` } : {}),
        publisher: { "@id": orgId },
        inLanguage: "en-IN",
      },
      {
        "@type": "WebPage",
        "@id": webpageId,
        name: SEO_TITLE,
        description: SEO_DESCRIPTION,
        ...(base ? { url: `${base}/`, primaryImageOfPage: `${base}${HERO_POSTER_PATH}` } : {}),
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
        inLanguage: "en-IN",
      },
    ],
  };
}
