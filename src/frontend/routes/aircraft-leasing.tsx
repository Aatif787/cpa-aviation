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
  LEASING_PROCESS_STAGES,
  OPERATING_LEASE_MECHANICS,
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
              <p className="eyebrow">Permitted Activity · GIFT SEZ Letter of Approval</p>
              <h1>
                Aircraft Operating <span className="muted-heading">Lease</span>
              </h1>
              <p className="lead-description">
                Under its GIFT SEZ Letter of Approval, {LEGAL_NAME} is authorised to undertake aircraft operating leases — enabling commercial operators to deploy aircraft capacity under fixed-term lease covenants without holding legal title on balance sheet.
              </p>
            </div>
            <div className="subpage-hero-visual">
              <LiquidVisualFrame
                liquidId="leasing-hero"
                asset={LEASING_HERO_VISUAL}
                frameClassName="liquid-frame leasing-frame"
                mediaClassName="leasing-image liquid-media"
                eager
              />
            </div>
          </div>
        </div>
      </section>

      <section id="operating-lease-role" className="overview page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Operating Lease Mechanics &amp; Considerations</p>
        </div>
        <div className="overview-grid">
          <div className="reveal" data-liquid-text>
            <h2>
              Commercial &amp; Technical<br />
              <span className="muted-heading">Lease Architecture</span>
            </h2>
            <div className="editorial-copy">
              <p className="section-description">
                An operating lease retains aircraft ownership with the lessor entity while granting quiet enjoyment and operational possession to the lessee airline for a defined term, subject to return condition covenants and airworthiness oversight.
              </p>
            </div>
            <div className="lease-mechanics-grid">
              {OPERATING_LEASE_MECHANICS.map((item) => (
                <article key={item.code} className="mechanic-card">
                  <span className="scope-code">{item.code}</span>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                </article>
              ))}
            </div>
          </div>
          <LiquidVisualFrame
            liquidId="overview"
            asset={LEASING_FLEET_VISUAL}
          />
        </div>
      </section>

      <section id="leasing-process" className="leasing-section">
        <div className="page-width">
          <div className="section-topline reveal">
            <p className="eyebrow">Structured Operating Lease Framework</p>
          </div>
          <div className="scope-header reveal">
            <h2>
              Five-Stage Transaction<br />
              <span className="muted-heading">Lifecycle Model</span>
            </h2>
            <p className="scope-intro">
              An illustrative summary of standard commercial, technical, and IFSC regulatory stages involved in evaluating and administering an aircraft operating lease.
            </p>
          </div>
          <div className="process-timeline-grid reveal">
            {LEASING_PROCESS_STAGES.map((stage) => (
              <article key={stage.step} className="process-stage-card">
                <span className="process-step-badge">Stage {stage.step}</span>
                <h3>{stage.title}</h3>
                <p>{stage.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approved-activity" className="subpage-band page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">LOA Authority vs. e-MOA Objects</p>
        </div>
        <div className="loa-comparison-grid reveal">
          <article className="regulatory-card">
            <span className="regulatory-kicker regulatory-kicker--loa">Permitted Under Letter of Approval</span>
            <h3>Operating Lease for Aircraft</h3>
            <p>
              The company&apos;s GIFT SEZ Letter of Approval specifically identifies operating lease for aircraft as the authorised unit operation, exercisable subject to all statutory and IFSCA regulatory conditions stated in the approval letter.
            </p>
          </article>
          <article className="regulatory-card">
            <span className="regulatory-kicker">Broader Stated e-MOA Capacity</span>
            <h3>Additional Aviation Objects</h3>
            <p>
              Broader e-MOA objects such as helicopters, engine leasing outside bundled aircraft leases, aviation financing structures, and co-ownership or SPV participation models remain outside immediate LoA scope until separately permitted.
            </p>
          </article>
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

        <div className="subpage-inline-links reveal mt-8">
          <Button asChild variant="navigation">
            <Link to="/aviation-assets">
              Review e-MOA Aviation Asset Scope <ArrowUpRight />
            </Link>
          </Button>
          <Button asChild variant="navigation">
            <Link to="/contact" search={{ subject: "Aircraft Operating Lease Enquiry" }}>
              Discuss an Operating Lease Enquiry <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}

