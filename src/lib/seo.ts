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

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/aircraft-leasing",
  "/aviation-assets",
  "/our-approach",
  "/gift-city",
  "/contact",
] as const;

export type PublicRoutePath = (typeof PUBLIC_ROUTES)[number];

export interface PageSeoConfig {
  path: PublicRoutePath;
  title: string;
  description: string;
  ogImage: string;
  ogImageAlt: string;
  breadcrumbLabel: string;
  priority: string;
}

export const PAGE_SEO: Record<PublicRoutePath, PageSeoConfig> = {
  "/": {
    path: "/",
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    ogImage: HERO_POSTER_PATH,
    ogImageAlt:
      "Aircraft in flight above sunlit clouds for CPA Aviation Leasing Capital IFSC Private Limited",
    breadcrumbLabel: "Home",
    priority: "1.0",
  },
  "/about": {
    path: "/about",
    title: "About Us | CPA Aviation Leasing Capital IFSC Private Limited",
    description:
      "Corporate background, legal identity, CIN U66190GJ2026PTC180823, GIFT SEZ registered office, and regulatory scope of CPA Aviation Leasing Capital IFSC Private Limited.",
    ogImage: HERO_POSTER_PATH,
    ogImageAlt:
      "Corporate overview of CPA Aviation Leasing Capital IFSC Private Limited in GIFT City, Gujarat",
    breadcrumbLabel: "About Us",
    priority: "0.85",
  },
  "/aircraft-leasing": {
    path: "/aircraft-leasing",
    title: "Aircraft Operating Lease | CPA Aviation Leasing Capital GIFT City",
    description:
      "Explore aircraft operating leases, their commercial role in aviation finance, and the GIFT SEZ Letter of Approval permitted activity of CPA Aviation Leasing Capital IFSC Private Limited.",
    ogImage: HERO_POSTER_PATH,
    ogImageAlt:
      "Aircraft operating lease structuring at CPA Aviation Leasing Capital IFSC Private Limited",
    breadcrumbLabel: "Aircraft Leasing",
    priority: "0.85",
  },
  "/aviation-assets": {
    path: "/aviation-assets",
    title: "Aviation Assets & Portfolio Scope | CPA Aviation Leasing Capital",
    description:
      "Overview of stated Memorandum of Association objectives across commercial aircraft, helicopters, engines, and aviation support equipment at CPA Aviation Leasing Capital IFSC Private Limited.",
    ogImage: HERO_POSTER_PATH,
    ogImageAlt:
      "Aviation asset classes and portfolio scope of CPA Aviation Leasing Capital IFSC Private Limited",
    breadcrumbLabel: "Aviation Assets",
    priority: "0.85",
  },
  "/our-approach": {
    path: "/our-approach",
    title: "Our Approach to Aviation Asset Management | CPA Aviation Leasing Capital",
    description:
      "Structured approach to aircraft ownership structures, aviation asset management, counterparty clarity, and IFSC governance at CPA Aviation Leasing Capital in GIFT City.",
    ogImage: HERO_POSTER_PATH,
    ogImageAlt:
      "Structured aviation ownership and asset management approach at CPA Aviation Leasing Capital",
    breadcrumbLabel: "Our Approach",
    priority: "0.85",
  },
  "/gift-city": {
    path: "/gift-city",
    title: "GIFT City IFSC Aviation Hub | CPA Aviation Leasing Capital Gujarat",
    description:
      "Based in GIFT City SEZ, Gandhinagar, Gujarat — India's International Financial Services Centre framework supporting aircraft leasing and aviation finance.",
    ogImage: HERO_POSTER_PATH,
    ogImageAlt:
      "GIFT City IFSC and Gujarat aviation finance corridor for CPA Aviation Leasing Capital",
    breadcrumbLabel: "GIFT City",
    priority: "0.85",
  },
  "/contact": {
    path: "/contact",
    title: "Contact Us | CPA Aviation Leasing Capital IFSC Private Limited",
    description:
      "Contact CPA Aviation Leasing Capital IFSC Private Limited at our registered office in GIFT SEZ, Gandhinagar, Gujarat for aircraft operating lease and corporate enquiries.",
    ogImage: HERO_POSTER_PATH,
    ogImageAlt:
      "Contact CPA Aviation Leasing Capital IFSC Private Limited in GIFT City, Gujarat",
    breadcrumbLabel: "Contact Us",
    priority: "0.85",
  },
};

export function isPublicRoutePath(path: string): path is PublicRoutePath {
  return (PUBLIC_ROUTES as readonly string[]).includes(path);
}

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
  const posterUrl = escapeXml(`${origin}${HERO_POSTER_PATH}`);
  const urls = PUBLIC_ROUTES.map((routePath) => {
    const seo = PAGE_SEO[routePath];
    const fullUrl = escapeXml(`${origin}${routePath === "/" ? "/" : routePath}`);
    return [
      "  <url>",
      `    <loc>${fullUrl}</loc>`,
      `    <lastmod>${SITEMAP_LASTMOD}</lastmod>`,
      "    <changefreq>monthly</changefreq>",
      `    <priority>${seo.priority}</priority>`,
      ...(routePath === "/"
        ? [
            "    <image:image>",
            `      <image:loc>${posterUrl}</image:loc>`,
            `      <image:title>${escapeXml(`${LEGAL_NAME} — Aircraft Operating Lease in GIFT City`)}</image:title>`,
            "    </image:image>",
          ]
        : []),
      "  </url>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
}

export function buildStructuredData(origin?: string, path: string = "/") {
  const base = normalizeOrigin(origin);
  const routeKey: PublicRoutePath = isPublicRoutePath(path) ? path : "/";
  const seo = PAGE_SEO[routeKey];
  const orgId = base ? `${base}/#organization` : "#organization";
  const websiteId = base ? `${base}/#website` : "#website";
  const pageUrl = base ? `${base}${routeKey === "/" ? "/" : routeKey}` : undefined;
  const webpageId = pageUrl ? `${pageUrl}#webpage` : "#webpage";

  const graph: Array<Record<string, unknown>> = [
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
      name: seo.title,
      description: seo.description,
      ...(pageUrl && base ? { url: pageUrl, primaryImageOfPage: `${base}${seo.ogImage}` } : {}),
      isPartOf: { "@id": websiteId },
      about: { "@id": orgId },
      inLanguage: "en-IN",
    },
  ];

  if (routeKey !== "/" && base && pageUrl) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${base}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: seo.breadcrumbLabel,
          item: pageUrl,
        },
      ],
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function buildPageHead(path: PublicRoutePath, rawOrigin?: string, ogImageOverride?: string) {
  const seo = PAGE_SEO[path];
  const siteOrigin = normalizeOrigin(
    rawOrigin ?? (import.meta.env["VITE_SITE_URL"] as string | undefined),
  );
  const canonicalUrl = siteOrigin ? `${siteOrigin}${path === "/" ? "/" : path}` : undefined;
  const imagePath = ogImageOverride ?? seo.ogImage;
  const resolvedImage =
    imagePath.startsWith("http://") || imagePath.startsWith("https://")
      ? imagePath
      : siteOrigin
        ? `${siteOrigin}${imagePath}`
        : imagePath;

  return {
    meta: [
      { title: seo.title },
      { name: "description", content: seo.description },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:title", content: seo.title },
      { property: "og:description", content: seo.description },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:site_name", content: LEGAL_NAME },
      { property: "og:image", content: resolvedImage },
      { property: "og:image:alt", content: seo.ogImageAlt },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: seo.title },
      { name: "twitter:description", content: seo.description },
      { name: "twitter:image", content: resolvedImage },
      ...(canonicalUrl ? [{ property: "og:url", content: canonicalUrl }] : []),
    ],
    links: [...(canonicalUrl ? [{ rel: "canonical", href: canonicalUrl }] : [])],
    scripts: [
      {
        id: "cpa-structured-data",
        type: "application/ld+json",
        children: JSON.stringify(buildStructuredData(siteOrigin, path)),
      },
    ],
  };
}
