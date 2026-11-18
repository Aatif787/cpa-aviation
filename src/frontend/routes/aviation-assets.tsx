import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Plane, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidVisualFrame, PageBreadcrumbs, SiteShell } from "@/components/SiteLayout";
import { LEGAL_NAME, buildPageHead } from "@/lib/seo";
import {
  ASSET_LIFECYCLE_OBJECTIVES,
  ASSETS_HERO_VISUAL,
  ASSETS_ROTARY_VISUAL,
  AVIATION_ASSET_CATEGORIES,
  OWNERSHIP_STRUCTURES,
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
            <p className="eyebrow">Stated e-MOA Asset Scope</p>
            <h1>
              Aviation Assets &amp; <span className="muted-heading">Portfolio Scope</span>
            </h1>
            <p className="lead-description">
              Overview of commercial aircraft, helicopters, propulsion engines, and allied aviation
              assets stated in the electronic Memorandum of Association (e-MOA) of {LEGAL_NAME},
              alongside how these objectives are distinguished from the company&apos;s present
              Letter of Approval.
            </p>
          </div>
          <div className="subpage-hero-visual">
            <LiquidVisualFrame liquidId="assets-hero" asset={ASSETS_HERO_VISUAL} eager />
          </div>
        </div>
      </section>

      <section id="asset-categories" className="focus-section page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Stated Asset Classes</p>
        </div>
        <div className="scope-header reveal">
          <h2>
            Memorandum of Association
            <br />
            <span className="muted-heading">Asset Classes</span>
          </h2>
          <p className="scope-intro">
            The classifications below summarise aviation asset categories referenced in the
            company&apos;s e-MOA. Only operating lease for aircraft falls within the present GIFT
            SEZ Letter of Approval; broader classes remain constitutional objectives subject to
            requisite approvals.
          </p>
        </div>

        <div className="subpage-cards-grid subpage-cards-grid--two reveal">
          {AVIATION_ASSET_CATEGORIES.map((assetClass) => (
            <article key={assetClass.code} className="subpage-card">
              <div className="subpage-card-head">
                <span className="scope-code">{assetClass.code}</span>
                <Plane className="focus-icon" size={18} aria-hidden="true" />
              </div>
              <span
                className={
                  assetClass.code === "01"
                    ? "scope-status scope-status--authorised"
                    : "scope-status"
                }
              >
                {assetClass.classification}
              </span>
              <h3>{assetClass.title}</h3>
              <p>{assetClass.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="asset-governance" className="leasing-section">
        <div className="page-width">
          <div className="section-topline reveal">
            <p className="eyebrow">Asset Lifecycle &amp; Corporate Objects</p>
          </div>
          <div className="leasing-grid">
            <LiquidVisualFrame
              liquidId="leasing"
              asset={ASSETS_ROTARY_VISUAL}
              frameClassName="liquid-frame leasing-frame"
              mediaClassName="leasing-image liquid-media"
            />
            <div className="reveal" data-liquid-text>
              <h2>
                Acquisition, Management &amp;
                <br />
                <span className="muted-heading">Financing Objectives</span>
              </h2>
              <div className="editorial-copy">
                <p className="section-description">
                  While our e-MOA sets out corporate objects encompassing asset acquisition,
                  technical lifecycle management, and aviation financing, operational deployment is
                  sequenced strictly in accordance with IFSC regulatory clearances.
                </p>
                <p className="section-description">
                  Listed e-MOA objects represent constitutional powers of the company rather than
                  active, separately licensed product offerings or an existing managed fleet.
                </p>
              </div>
            </div>
          </div>

          <div className="lease-mechanics-grid mt-8 reveal">
            {ASSET_LIFECYCLE_OBJECTIVES.map((item) => (
              <article key={item.code} className="mechanic-card">
                <div className="subpage-card-head">
                  <span className="scope-code">{item.code}</span>
                  <span
                    className={
                      item.code === "02" ? "scope-status scope-status--authorised" : "scope-status"
                    }
                  >
                    {item.status}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="participation-structures" className="subpage-band page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Ownership &amp; Participation Frameworks</p>
        </div>
        <div className="scope-header reveal">
          <h2>
            Ownership &amp;
            <br />
            <span className="muted-heading">Participation Structures</span>
          </h2>
          <p className="scope-intro">
            Constitutional provisions permit structuring asset holdings through dedicated vehicles
            and co-ownership models where legally compliant, without offering public investment
            products or implied returns.
          </p>
        </div>

        <div className="structure-cards-grid reveal">
          {OWNERSHIP_STRUCTURES.map((structure) => (
            <article key={structure.code} className="structure-card">
              <div className="subpage-card-head">
                <span className="scope-code">{structure.code}</span>
                <span className="scope-status">{structure.status}</span>
              </div>
              <h3>{structure.title}</h3>
              <p>{structure.summary}</p>
            </article>
          ))}
        </div>

        <div
          className="compliance-callout reveal"
          role="note"
          aria-label="Regulatory boundary disclosure"
        >
          <p className="compliance-callout-title">
            <ShieldAlert size={14} aria-hidden="true" />
            Regulatory Distinction &amp; Disclosure Notice
          </p>
          <p>
            References on this page to helicopters, engines, components, asset financing,
            co-ownership, or fractional participation reflect objects stated in {LEGAL_NAME}&apos;s
            e-MOA. They do not represent separate IFSCA permissions, active managed fleets, or
            solicitations of investment or guaranteed returns.
          </p>
        </div>

        <div className="subpage-inline-links mt-6 reveal">
          <Button asChild variant="navigation">
            <Link to="/our-approach">
              Explore Our Approach <ArrowUpRight />
            </Link>
          </Button>
          <Button asChild variant="navigation">
            <Link to="/contact" search={{ subject: "Aviation Asset & Structure Enquiry" }}>
              Discuss an Enquiry <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}
