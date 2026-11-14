import { Link, createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BlueprintSvg,
  FlightPathSvg,
  LiquidVisualFrame,
  PageBreadcrumbs,
  SiteShell,
} from "@/components/SiteLayout";
import { buildPageHead } from "@/lib/seo";
import { APPROACH_PILLARS, GIFT_CITY_AERIAL_VISUAL } from "@/lib/site-content";

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
                Aircraft leasing involves more than the airframe itself. Ownership discipline, contractual architecture, lifecycle oversight, and IFSC regulatory compliance form the pillars of our approach.
              </p>
              <div className="subpage-hero-actions">
                <Button asChild variant="aviation">
                  <Link to="/aircraft-leasing">
                    View Operating Lease <ArrowUpRight />
                  </Link>
                </Button>
                <Button asChild variant="cinematic">
                  <Link to="/contact">
                    Start a Conversation <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="subpage-hero-visual">
              <LiquidVisualFrame
                liquidId="approach-hero"
                asset={GIFT_CITY_AERIAL_VISUAL}
                frameClassName="liquid-frame leasing-frame"
                mediaClassName="leasing-image liquid-media"
                caption="GIFT City IFSC operational base · Illustrative aerial perspective"
                eager
              />
            </div>
          </div>
        </div>
      </section>

      <section id="approach-pillars" className="approach-section page-width">
        <FlightPathSvg />
        <div className="section-topline reveal">
          <p className="eyebrow">Structuring Methodology</p>
          <span className="section-number">01</span>
        </div>
        <div className="approach-grid">
          <div className="reveal">
            <h2>
              Disciplined Ownership<br />
              <span className="muted-heading">&amp; Participation Models</span>
            </h2>
          </div>
          <div className="editorial-copy reveal">
            <p className="section-description">
              Our stated corporate objectives contemplate Special Purpose Vehicles (SPVs), co-ownership frameworks, and structured aviation asset arrangements tailored to cross-border leasing rules in GIFT SEZ.
            </p>
            <p className="section-description">
              Every prospective engagement is evaluated with clear separation between authorised aircraft operating lease operations and broader corporate objects requiring specific regulatory consents.
            </p>
          </div>
        </div>

        <div className="subpage-cards-grid subpage-cards-grid--two reveal">
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
          <span className="section-number">02</span>
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
        <div className="subpage-cta-band reveal">
          <div>
            <h2>Explore Our GIFT City IFSC Jurisdiction</h2>
            <p>
              See how our registered seat in GIFT SEZ supports statutory clarity and international leasing administration.
            </p>
          </div>
          <div className="subpage-hero-actions">
            <Button asChild variant="aviation">
              <Link to="/gift-city">
                Explore GIFT City <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="cinematic">
              <Link to="/contact">
                Contact Our Team <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

