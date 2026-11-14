import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { PUBLIC_ROUTES } from "@/lib/seo";
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
});
