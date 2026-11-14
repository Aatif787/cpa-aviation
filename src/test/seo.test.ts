import { describe, expect, it } from "vitest";
import {
  COMPANY_CIN,
  CORPORATE_EMAIL,
  LEGAL_NAME,
  SEO_DESCRIPTION,
  SEO_TITLE,
  buildRobotsTxt,
  buildSitemapXml,
  buildStructuredData,
  resolveRequestOrigin,
} from "@/lib/seo";

describe("SEO utilities", () => {
  it("resolves HTTPS origin for production hosts while preserving localhost", () => {
    expect(resolveRequestOrigin("http://example.com/")).toBe("https://example.com");
    expect(resolveRequestOrigin("http://localhost:4173/")).toBe("http://localhost:4173");
    expect(resolveRequestOrigin("http://localhost:4173/", "https://cpaaviation.in/")).toBe("https://cpaaviation.in");
  });

  it("generates valid robots.txt and XML sitemap for configured origin", () => {
    const robots = buildRobotsTxt("https://cpaaviation.in");
    expect(robots).toContain("Allow: /");
    expect(robots).toContain("Disallow: /_serverFn/");
    expect(robots).toContain("Sitemap: https://cpaaviation.in/sitemap.xml");

    const sitemap = buildSitemapXml("https://cpaaviation.in");
    expect(sitemap).toContain("<loc>https://cpaaviation.in/</loc>");
    expect(sitemap).toContain("<priority>1.0</priority>");
    expect(sitemap).toContain("https://cpaaviation.in/media/white-aircraft-still.jpg");
  });

  it("generates Schema.org Organization, WebSite, WebPage, and ContactPoint without invented claims", () => {
    const ld = buildStructuredData("https://cpaaviation.in");
    const graph = ld["@graph"];
    expect(graph).toHaveLength(3);

    const org = graph[0] as Record<string, unknown>;
    expect(org["@type"]).toBe("Organization");
    expect(org["legalName"]).toBe(LEGAL_NAME);
    expect(org["email"]).toBe(CORPORATE_EMAIL);
    expect((org["identifier"] as Record<string, unknown>)["value"]).toBe(COMPANY_CIN);
    expect((org["contactPoint"] as Record<string, unknown>)["@type"]).toBe("ContactPoint");

    const page = graph[2] as Record<string, unknown>;
    expect(page["@type"]).toBe("WebPage");
    expect(page["name"]).toBe(SEO_TITLE);
    expect(page["description"]).toBe(SEO_DESCRIPTION);
  });
});

