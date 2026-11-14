import { describe, expect, it } from "vitest";
import {
  COMPANY_CIN,
  CORPORATE_EMAIL,
  LEGAL_NAME,
  PAGE_SEO,
  PUBLIC_ROUTES,
  SEO_DESCRIPTION,
  SEO_TITLE,
  buildPageHead,
  buildRobotsTxt,
  buildSitemapXml,
  buildStructuredData,
  resolveRequestOrigin,
} from "@/lib/seo";

describe("SEO utilities", () => {
  it("resolves HTTPS origin for production hosts while preserving localhost", () => {
    expect(resolveRequestOrigin("http://example.com/")).toBe("https://example.com");
    expect(resolveRequestOrigin("http://localhost:4173/")).toBe("http://localhost:4173");
    expect(resolveRequestOrigin("http://localhost:4173/", "https://cpaaviation.in/")).toBe(
      "https://cpaaviation.in",
    );
  });

  it("generates valid robots.txt and XML sitemap for all 7 dedicated routes", () => {
    const robots = buildRobotsTxt("https://cpaaviation.in");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Disallow: /_serverFn/");
    expect(robots).toContain("Sitemap: https://cpaaviation.in/sitemap.xml");

    const sitemap = buildSitemapXml("https://cpaaviation.in");
    expect(sitemap).toContain("<loc>https://cpaaviation.in/</loc>");
    expect(sitemap).toContain("<priority>1.0</priority>");
    expect(sitemap).toContain("https://cpaaviation.in/media/white-aircraft-still.jpg");

    for (const routePath of PUBLIC_ROUTES) {
      const expectedLoc = `https://cpaaviation.in${routePath === "/" ? "/" : routePath}`;
      expect(sitemap).toContain(`<loc>${expectedLoc}</loc>`);
    }
  });

  it("generates unique SEO titles, descriptions, and canonical links for all pages", () => {
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const routePath of PUBLIC_ROUTES) {
      const head = buildPageHead(routePath, "https://cpaaviation.in");
      const titleEntry = head.meta.find((m) => "title" in m) as { title: string } | undefined;
      const descEntry = head.meta.find(
        (m) => "name" in m && m.name === "description",
      ) as { content: string } | undefined;

      expect(titleEntry?.title).toBe(PAGE_SEO[routePath].title);
      expect(descEntry?.content).toBe(PAGE_SEO[routePath].description);
      titles.add(titleEntry?.title ?? "");
      descriptions.add(descEntry?.content ?? "");

      expect(head.links).toEqual([
        {
          rel: "canonical",
          href: `https://cpaaviation.in${routePath === "/" ? "/" : routePath}`,
        },
      ]);
    }

    expect(titles.size).toBe(PUBLIC_ROUTES.length);
    expect(descriptions.size).toBe(PUBLIC_ROUTES.length);
  });

  it("generates Schema.org Organization, WebSite, WebPage, ContactPoint, and BreadcrumbList on subpages", () => {
    const homeLd = buildStructuredData("https://cpaaviation.in");
    const homeGraph = homeLd["@graph"];
    expect(homeGraph).toHaveLength(3);

    const org = homeGraph[0] as Record<string, unknown>;
    expect(org["@type"]).toBe("Organization");
    expect(org["legalName"]).toBe(LEGAL_NAME);
    expect(org["email"]).toBe(CORPORATE_EMAIL);
    expect((org["identifier"] as Record<string, unknown>)["value"]).toBe(COMPANY_CIN);
    expect((org["contactPoint"] as Record<string, unknown>)["@type"]).toBe("ContactPoint");

    const homePage = homeGraph[2] as Record<string, unknown>;
    expect(homePage["@type"]).toBe("WebPage");
    expect(homePage["name"]).toBe(SEO_TITLE);
    expect(homePage["description"]).toBe(SEO_DESCRIPTION);

    const leasingLd = buildStructuredData("https://cpaaviation.in", "/aircraft-leasing");
    const leasingGraph = leasingLd["@graph"];
    expect(leasingGraph).toHaveLength(4);
    const breadcrumb = leasingGraph[3] as Record<string, unknown>;
    expect(breadcrumb["@type"]).toBe("BreadcrumbList");
  });
});
