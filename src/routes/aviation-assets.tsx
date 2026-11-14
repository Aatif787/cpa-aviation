import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidVisualFrame, PageBreadcrumbs, SiteShell } from "@/components/SiteLayout";
import { LEGAL_NAME, buildPageHead } from "@/lib/seo";
import {
  AIRCRAFT_ASSETS_VISUAL,
  AVIATION_ASSET_CATEGORIES,
  LEASING_AIRCRAFT_VISUAL,
} from "@/lib/site-content";

export const Route = createFileRoute("/aviation-assets")({
  head: () => buildPageHead("/aviation-assets"),
  component: AviationAssetsPage,
});

function AviationAssetsPage() {
  return (
    <SiteShell routeKey="/aviation-assets">
      <section className="subpage-hero page-width">
        <PageBreadcrumbs currentLabel="Aviation Assets" />
        <div className="subpage-hero-grid">
          <div className="subpage-hero-copy">
            <p className="eyebrow">Stated MoA Asset Scope</p>
            <h1>
              Aviation Assets &amp; <span className="muted-heading">Portfolio Scope</span>
            </h1>
            <p className="lead-description">
              Overview of the aircraft, helicopters, propulsion engines, and allied aviation equipment classes referenced in the corporate objects of {LEGAL_NAME}.
            </p>
            <div className="subpage-hero-actions">
              <Button asChild variant="aviation">
                <Link to="/aircraft-leasing">
                  Authorised Operating Lease <ArrowUpRight />
                </Link>
              </Button>
              <Button asChild variant="cinematic">
                <Link to="/contact">
                  Enquire About Assets <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
          <div className="subpage-hero-visual">
            <LiquidVisualFrame
              liquidId="assets-hero"
              asset={AIRCRAFT_ASSETS_VISUAL}
              caption="Aviation asset categories · Illustrative executive aircraft visual"
              eager
            />
          </div>
        </div>
      </section>

      <section id="asset-categories" className="focus-section page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Stated Asset Classes</p>
          <span className="section-number">01</span>
        </div>
        <div className="scope-header reveal">
          <h2>
            Memorandum of Association<br />
            <span className="muted-heading">Asset Classes</span>
          </h2>
          <p className="scope-intro">
            The classifications below summarize aviation asset categories described in the company&apos;s Memorandum of Association. Activities beyond aircraft operating lease remain subject to applicable regulatory approvals.
          </p>
        </div>

        <div className="subpage-cards-grid subpage-cards-grid--two reveal">
          {AVIATION_ASSET_CATEGORIES.map((assetClass) => (
            <article key={assetClass.code} className="subpage-card">
              <div className="subpage-card-head">
                <span className="scope-code">{assetClass.code}</span>
                <Plane className="focus-icon" size={18} aria-hidden="true" />
              </div>
              <span className="scope-status">{assetClass.classification}</span>
              <h3>{assetClass.title}</h3>
              <p>{assetClass.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="asset-governance" className="leasing-section">
        <div className="page-width">
          <div className="section-topline reveal">
            <p className="eyebrow">Asset Stewardship &amp; Regulatory Boundary</p>
            <span className="section-number">02</span>
          </div>
          <div className="leasing-grid">
            <LiquidVisualFrame
              liquidId="leasing"
              asset={LEASING_AIRCRAFT_VISUAL}
              frameClassName="liquid-frame leasing-frame"
              mediaClassName="leasing-image liquid-media"
              caption="Technical oversight & leasing governance · Illustrative visual"
            />
            <div className="reveal" data-liquid-text>
              <h2>
                Asset Lifecycle &amp;<br />
                <span className="muted-heading">Regulatory Precision</span>
              </h2>
              <div className="editorial-copy">
                <p className="section-description">
                  While our Memorandum of Association enables corporate participation across fixed-wing aircraft, helicopters, engines, and related aviation assets, every operational deployment follows strict regulatory sequencing.
                </p>
                <p className="section-description">
                  Under our current GIFT SEZ Letter of Approval, our permitted activity is operating lease for aircraft; any expansion into additional asset categories or financial products would occur solely upon obtaining requisite regulatory consents.
                </p>
              </div>
              <div className="subpage-inline-links">
                <Button asChild variant="aviation">
                  <Link to="/our-approach">
                    Explore Our Approach <ArrowUpRight />
                  </Link>
                </Button>
                <Button asChild variant="cinematic">
                  <Link to="/contact">
                    Contact Us <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

