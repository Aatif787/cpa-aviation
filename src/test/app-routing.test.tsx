import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { PUBLIC_ROUTES } from "@/lib/seo";
import {
  ABOUT_IDENTITY_DOSSIER,
  APPROACH_GOVERNANCE_COLUMNS,
  APPROACH_PROCESS_STEPS,
  ASSET_LIFECYCLE_OBJECTIVES,
  HOME_PAGE_PREVIEWS,
  LEASING_PROCESS_STAGES,
  LOA_REGULATORY_DOSSIER,
  MOA_OBJECTIVE_CLAUSES,
  OPERATING_LEASE_MECHANICS,
  OWNERSHIP_STRUCTURES,
} from "@/lib/site-content";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches every dedicated corporate route instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const expectedRouteIds = new Set<string>();
    for (const path of PUBLIC_ROUTES) {
      const matches = router.matchRoutes(path);
      const leafId = matches.at(-1)?.routeId;
      expect(leafId).toBeDefined();
      expect(leafId).not.toBe(rootRouteId);
      if (leafId) expectedRouteIds.add(leafId);
    }

    // All 7 routes map to distinct dedicated route modules.
    expect(expectedRouteIds.size).toBe(PUBLIC_ROUTES.length);
  });

  it("assigns distinct page components, unique head metadata, and compliant page content", async () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const components = new Set<unknown>();
    const titles = new Set<string>();
    const descriptions = new Set<string>();

    for (const path of PUBLIC_ROUTES) {
      const leafId = router.matchRoutes(path).at(-1)?.routeId;
      const route = leafId ? router.routesById[leafId] : undefined;
      expect(route).toBeDefined();

      const component = route?.options.component;
      expect(component).toBeDefined();
      components.add(component);

      const headFn = route?.options.head;
      expect(headFn).toBeTypeOf("function");
      const headResult = await headFn?.({} as never);
      const titleTag = headResult?.meta?.find(
        (m): m is { title: string } => typeof m === "object" && m !== null && "title" in m,
      );
      const descTag = headResult?.meta?.find(
        (m): m is { name: string; content: string } =>
          typeof m === "object" && m !== null && "name" in m && m.name === "description",
      );

      expect(titleTag?.title).toBeTruthy();
      expect(descTag?.content).toBeTruthy();
      if (titleTag?.title) titles.add(titleTag.title);
      if (descTag?.content) descriptions.add(descTag.content);
    }

    expect(components.size).toBe(PUBLIC_ROUTES.length);
    expect(titles.size).toBe(PUBLIC_ROUTES.length);
    expect(descriptions.size).toBe(PUBLIC_ROUTES.length);

    expect(HOME_PAGE_PREVIEWS.map((p) => p.to)).toEqual([
      "/about",
      "/aircraft-leasing",
      "/aviation-assets",
      "/our-approach",
      "/gift-city",
      "/contact",
    ]);

    expect(ABOUT_IDENTITY_DOSSIER.length).toBeGreaterThan(0);
    expect(MOA_OBJECTIVE_CLAUSES.length).toBeGreaterThan(0);
    expect(OPERATING_LEASE_MECHANICS.length).toBeGreaterThan(0);
    expect(LEASING_PROCESS_STAGES.length).toBeGreaterThan(0);
    expect(ASSET_LIFECYCLE_OBJECTIVES.length).toBeGreaterThan(0);
    expect(OWNERSHIP_STRUCTURES.length).toBeGreaterThan(0);
    expect(APPROACH_PROCESS_STEPS.length).toBeGreaterThan(0);
    expect(APPROACH_GOVERNANCE_COLUMNS.length).toBeGreaterThan(0);
    expect(LOA_REGULATORY_DOSSIER.length).toBeGreaterThan(0);

    expect(
      LOA_REGULATORY_DOSSIER.some(
        (item) =>
          item.label === "Permitted Activity under LoA" &&
          item.value === "Operating Lease for Aircraft",
      ),
    ).toBe(true);
    expect(
      LOA_REGULATORY_DOSSIER.some(
        (item) =>
          item.label === "Mandatory Regulatory Condition" &&
          item.value === "Subject to Stated Conditions",
      ),
    ).toBe(true);
    expect(MOA_OBJECTIVE_CLAUSES[0]?.status).toBe("Permitted Under LoA");
    expect(MOA_OBJECTIVE_CLAUSES.slice(1).every((c) => c.status.includes("e-MOA"))).toBe(true);
  });
});
