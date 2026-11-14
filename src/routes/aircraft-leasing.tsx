import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BlueprintSvg,
  LiquidVisualFrame,
  PageBreadcrumbs,
  SiteShell,
} from "@/components/SiteLayout";
import { LEGAL_NAME, buildPageHead } from "@/lib/seo";
import {
  LEASING_FLEET_VISUAL,
  LEASING_HERO_VISUAL,
  LEASING_LIFECYCLE_PILLARS,
} from "@/lib/site-content";

export const Route = createFileRoute("/aircraft-leasing")({
  head: () => buildPageHead("/aircraft-leasing"),
  component: AircraftLeasingPage,
});

function AircraftLeasingPage() {
  return (
    <SiteShell routeKey="/aircraft-leasing">
      <section className="subpage-hero leasing-section">
        <BlueprintSvg />
        <div className="page-width">
          <PageBreadcrumbs currentLabel="Aircraft Leasing" />
          <div className="subpage-hero-grid">
            <div className="subpage-hero-copy">
              <p className="eyebrow">Permitted IFSC Activity</p>
              <h1>
                Aircraft Operating <span className="muted-heading">Lease</span>
              </h1>
              <p className="lead-description">
                Structured aircraft operating leases enable airline operators and aviation stakeholders to access aircraft capacity through agreed commercial lease arrangements without outright asset acquisition.
              </p>
              <div className="subpage-hero-actions">
                <Button asChild variant="aviation">
                  <Link to="/contact">
                    Discuss a Leasing Enquiry <ArrowUpRight />
                  </Link>
                </Button>
                <Button asChild variant="cinematic">
                  <Link to="/our-approach">
                    Our Approach <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="subpage-hero-visual">
              <LiquidVisualFrame
                liquidId="leasing-hero"
                asset={LEASING_HERO_VISUAL}
                frameClassName="liquid-frame leasing-frame"
                mediaClassName="leasing-image liquid-media"
                caption="Operating lease visual study · Illustrative commercial aircraft"
                eager
              />
            </div>
          </div>
        </div>
      </section>

      <section id="operating-lease-role" className="overview page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Role in Commercial Aviation</p>
          <span className="section-number">01</span>
        </div>
        <div className="overview-grid">
          <div className="reveal" data-liquid-text>
            <h2>
              Fleet Flexibility &amp;<br />
              <span className="muted-heading">Capital Efficiency</span>
            </h2>
            <div className="editorial-copy">
              <p className="section-description">
                An operating lease separates legal ownership of the airframe from operational deployment. By placing aircraft under fixed-term lease covenants, operators conserve capital for core flight operations while retaining fleet adaptability.
              </p>
              <p className="section-description">
                Across international aviation markets and India&apos;s IFSC ecosystem, aircraft operating leases serve as a foundational mechanism connecting lessors, airlines, airworthiness authorities, and financial institutions.
              </p>
            </div>
            <div className="subpage-inline-links">
              <Button asChild variant="navigation">
                <Link to="/aviation-assets">
                  Explore Aviation Assets <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
          <LiquidVisualFrame
            liquidId="overview"
            asset={LEASING_FLEET_VISUAL}
            caption="Illustrative aircraft operating study"
          />
        </div>
      </section>

      <section id="approved-activity" className="subpage-band page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Regulatory Clarification</p>
          <span className="section-number">02</span>
        </div>
        <div className="regulatory-grid reveal">
          <article className="regulatory-card">
            <span className="regulatory-kicker regulatory-kicker--loa">Permitted Unit Activity</span>
            <h3>Authorised Aircraft Operating Lease</h3>
            <p>
              {LEGAL_NAME} holds a Letter of Approval within GIFT SEZ identifying operating lease for aircraft as its authorised operation, subject to all conditions and applicable regulatory rules governing IFSC units.
            </p>
          </article>
          <article className="regulatory-card">
            <span className="regulatory-kicker">Statutory Alignment</span>
            <h3>Scope &amp; Governance Separation</h3>
            <p>
              While the company&apos;s Memorandum of Association encompasses broader aviation financing and ownership objects, external operations are strictly conducted in accordance with specific approvals in force at any given time.
            </p>
          </article>
        </div>
      </section>

      <section id="leasing-framework" className="subpage-band page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Lease Lifecycle Pillars</p>
          <span className="section-number">03</span>
        </div>
        <div className="subpage-cards-grid reveal">
          {LEASING_LIFECYCLE_PILLARS.map((pillar) => (
            <article key={pillar.code} className="subpage-card">
              <span className="scope-code">{pillar.code}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.summary}</p>
            </article>
          ))}
        </div>
        <div className="subpage-cta-band reveal">
          <div>
            <h2>Review Asset Scope or Submit an Enquiry</h2>
            <p>
              Examine the aviation asset categories referenced in our corporate objectives or contact our team in GIFT City.
            </p>
          </div>
          <div className="subpage-hero-actions">
            <Button asChild variant="aviation">
              <Link to="/aviation-assets">
                View Aviation Assets <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="cinematic">
              <Link to="/contact">
                Contact Us <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

