import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Suspense, lazy } from "react";
import { Button } from "@/components/ui/button";
import {
  BlueprintSvg,
  FlightPathSvg,
  LiquidVisualFrame,
  PageBreadcrumbs,
  SiteShell,
} from "@/components/SiteLayout";
import { buildPageHead } from "@/lib/seo";
import {
  APPROACH_GOVERNANCE_COLUMNS,
  APPROACH_PILLARS,
  APPROACH_PROCESS_STEPS,
  GIFT_CITY_AERIAL_VISUAL,
} from "@/lib/site-content";

const LazyServiceAdvisor = lazy(() =>
  import("@/components/ServiceAdvisor").then((m) => ({ default: m.ServiceAdvisor })),
);

export const Route = createFileRoute("/our-approach")({
  head: () => buildPageHead("/our-approach"),
  component: OurApproachPage,
});

function OurApproachPage() {
  return (
    <SiteShell routeKey="/our-approach">
      <section className="subpage-hero leasing-section">
        <BlueprintSvg />
        <div className="page-width">
          <PageBreadcrumbs currentLabel="Our Approach" />
          <div className="subpage-hero-grid">
            <div className="subpage-hero-copy">
              <p className="eyebrow">Governance &amp; Structuring</p>
              <h1>
                Clarity in <span className="muted-heading">Every Structure</span>
              </h1>
              <p className="lead-description">
                Structured evaluation across statutory alignment, aircraft technical diligence, ring-fenced lease documentation, and direct institutional correspondence from GIFT City SEZ.
              </p>
            </div>
            <div className="subpage-hero-visual">
              <LiquidVisualFrame
                liquidId="approach-hero"
                asset={GIFT_CITY_AERIAL_VISUAL}
                frameClassName="liquid-frame leasing-frame"
                mediaClassName="leasing-image liquid-media"
                eager
              />
            </div>
          </div>
        </div>
      </section>

      <section id="visual-process" className="approach-section page-width">
        <FlightPathSvg />
        <div className="approach-process-wrap">
          <div className="section-topline reveal">
            <p className="eyebrow">Structured Evaluation Process</p>
          </div>
          <div className="scope-header reveal">
            <h2>
              Four-Stage Approach<br />
              <span className="muted-heading">Framework</span>
            </h2>
            <p className="scope-intro">
              An illustrative governance methodology guiding how prospective aircraft operating lease engagements are assessed and documented within IFSC rules. This outline describes our evaluation standard rather than an established track record of past transactions.
            </p>
          </div>

          <div className="approach-process-flow reveal">
            {APPROACH_PROCESS_STEPS.map((stage) => (
              <article key={stage.step} className="approach-step-card">
                <span className="process-step-badge">Stage {stage.step}</span>
                <h3>{stage.title}</h3>
                <p>{stage.summary}</p>
                <ul className="approach-criteria-list">
                  {stage.criteria.map((criterion) => (
                    <li key={criterion}>{criterion}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="approach-pillars" className="subpage-band page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Assets, Leasing &amp; Counterparty Principles</p>
        </div>
        <div className="approach-grid">
          <div className="reveal">
            <h2>
              Disciplined Ownership<br />
              <span className="muted-heading">&amp; Business Conduct</span>
            </h2>
          </div>
          <div className="editorial-copy reveal">
            <p className="section-description">
              Our stated corporate objectives contemplate Special Purpose Vehicles (SPVs), co-ownership frameworks, and structured aviation asset arrangements tailored to cross-border leasing rules in GIFT SEZ.
            </p>
            <p className="section-description">
              Every prospective engagement maintains strict transparency between presently authorised aircraft operating lease operations under our Letter of Approval and broader Memorandum objects.
            </p>
          </div>
        </div>

        <div className="approach-governance-grid reveal">
          {APPROACH_GOVERNANCE_COLUMNS.map((col) => (
            <article key={col.code} className="governance-column-card">
              <span className="scope-code">{col.code}</span>
              <h3>{col.title}</h3>
              <ul className="governance-points-list">
                {col.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="subpage-cards-grid subpage-cards-grid--two mt-6 reveal">
          {APPROACH_PILLARS.map((pillar) => (
            <article key={pillar.code} className="subpage-card">
              <span className="scope-code">{pillar.code}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="focus-advisor" className="advisor-section page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Focus Area Alignment</p>
        </div>
        <div className="scope-header reveal">
          <h2>
            Explore Focus<br />
            <span className="muted-heading">Area Alignment</span>
          </h2>
          <p className="scope-intro">
            Describe your aviation leasing or asset requirement below to map it against our fixed corporate focus areas (informational guidance only; not an offer or financial advice).
          </p>
        </div>
        <div className="reveal">
          <Suspense fallback={<div className="advisor-card" aria-hidden="true" />}>
            <LazyServiceAdvisor />
          </Suspense>
        </div>
        <div className="subpage-inline-links mt-6 reveal">
          <Button asChild variant="navigation">
            <Link to="/gift-city">
              Explore GIFT City IFSC <ArrowUpRight />
            </Link>
          </Button>
          <Button asChild variant="navigation">
            <Link to="/contact">
              Contact Us <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </SiteShell>
  );
}

