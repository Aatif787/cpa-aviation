import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, Compass, Scale, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageBreadcrumbs, SiteShell } from "@/components/SiteLayout";
import { buildPageHead } from "@/lib/seo";
import { LEADERSHIP_PROFILES, type LeadershipProfile } from "@/lib/site-content";

export const Route = createFileRoute("/leadership")({
  head: () => buildPageHead("/leadership"),
  component: LeadershipPage,
});

function ClassicalPortraitMedallion({
  name,
  imageSrc,
  imageWebp,
  monogram,
  size = "md",
}: {
  name: string;
  imageSrc: string;
  imageWebp: string;
  monogram: string;
  size?: "lg" | "md";
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`classical-medallion classical-medallion--${size}`} aria-hidden="true">
      <div className="classical-medallion-ring" />
      {!hasError ? (
        <picture>
          <source srcSet={imageWebp} type="image/webp" />
          <img
            src={imageSrc}
            alt={name}
            className="classical-medallion-img"
            loading="lazy"
            decoding="async"
            onError={() => setHasError(true)}
          />
        </picture>
      ) : (
        <div className="classical-medallion-fallback">{monogram}</div>
      )}
    </div>
  );
}

function LeadershipPage() {
  const chairman = LEADERSHIP_PROFILES[0] as LeadershipProfile;
  const team: readonly LeadershipProfile[] = LEADERSHIP_PROFILES.slice(1);

  return (
    <SiteShell routeKey="/leadership">
      {/* Classical Subpage Hero */}
      <section className="subpage-hero page-width classical-hero">
        <PageBreadcrumbs currentLabel="Leadership" />
        <div className="subpage-hero-grid">
          <div className="subpage-hero-copy">
            <div className="classical-eyebrow-badge">
              <span className="classical-badge-line" />
              <span className="classical-badge-text">Executive Directorate &amp; Governance</span>
              <span className="classical-badge-line" />
            </div>
            <h1>
              Distinguished Leadership &amp;
              <br />
              <span className="muted-heading">Institutional Governance</span>
            </h1>
            <p className="lead-description">
              Anchored within GIFT City Special Economic Zone, CPA Aviation Leasing Capital is
              guided by seasoned aviation infrastructure pioneers, specialized corporate legal
              counsel, and operational leaders driving disciplined aircraft leasing, regulatory
              compliance, and cross-border fleet execution.
            </p>
          </div>
        </div>
      </section>

      {/* Main Classical Leadership Section */}
      <section
        id="leadership-gallery"
        className="subpage-band page-width classical-leadership-section"
      >
        {/* Section Topline */}
        <div className="classical-section-divider reveal">
          <span className="divider-ornament">✦</span>
          <span className="divider-title">EXECUTIVE STEWARDSHIP</span>
          <span className="divider-ornament">✦</span>
        </div>

        {/* Chairman & Managing Director: Stately Classical Centerpiece Suite */}
        <article className="classical-chairman-suite reveal">
          <div className="chairman-suite-backdrop" aria-hidden="true">
            <svg
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="chairman-compass-svg"
            >
              <circle
                cx="300"
                cy="300"
                r="280"
                stroke="var(--accent)"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
              <circle
                cx="300"
                cy="300"
                r="200"
                stroke="var(--accent)"
                strokeOpacity="0.12"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              <circle
                cx="300"
                cy="300"
                r="120"
                stroke="var(--accent)"
                strokeOpacity="0.16"
                strokeWidth="1"
              />
              <line
                x1="300"
                y1="20"
                x2="300"
                y2="580"
                stroke="var(--accent)"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
              <line
                x1="20"
                y1="300"
                x2="580"
                y2="300"
                stroke="var(--accent)"
                strokeOpacity="0.06"
                strokeWidth="1"
              />
            </svg>
          </div>

          <div className="chairman-suite-inner">
            <div className="chairman-portrait-col">
              <ClassicalPortraitMedallion
                name={chairman.name}
                imageSrc={chairman.imageSrc}
                imageWebp={chairman.imageWebp}
                monogram={chairman.monogram}
                size="lg"
              />
              <div className="chairman-seal">
                <Shield size={13} className="chairman-seal-icon" aria-hidden="true" />
                <span>Founding Leadership</span>
              </div>
            </div>

            <div className="chairman-info-col">
              <div className="chairman-header-group">
                <div className="classical-mini-label">
                  <span className="gold-bullet">◆</span>
                  <span>APEX GOVERNANCE</span>
                </div>
                <h2 className="chairman-name">{chairman.name}</h2>
                <div className="chairman-designation-strip">
                  <span className="designation-accent-line" />
                  <p className="chairman-designation">{chairman.designation}</p>
                  <span className="designation-accent-line" />
                </div>
              </div>

              <p className="chairman-description">{chairman.description}</p>

              {/* Classical Governance Pillars */}
              <div className="chairman-pillars-grid">
                <div className="chairman-pillar-item">
                  <Compass size={15} className="pillar-icon" aria-hidden="true" />
                  <div>
                    <h4 className="pillar-title">30+ Years Experience</h4>
                    <p className="pillar-text">Aviation infrastructure leadership</p>
                  </div>
                </div>
                <div className="chairman-pillar-item">
                  <Scale size={15} className="pillar-icon" aria-hidden="true" />
                  <div>
                    <h4 className="pillar-title">Regulatory Compliance</h4>
                    <p className="pillar-text">IFSC &amp; statutory adherence</p>
                  </div>
                </div>
                <div className="chairman-pillar-item">
                  <Award size={15} className="pillar-icon" aria-hidden="true" />
                  <div>
                    <h4 className="pillar-title">Strategic Growth</h4>
                    <p className="pillar-text">Disciplined leasing execution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Section Divider: Executive Directorate & Council */}
        <div className="classical-section-divider classical-section-divider--secondary reveal">
          <span className="divider-ornament">✦</span>
          <span className="divider-title">EXECUTIVE DIRECTORATE &amp; OPERATING COUNCIL</span>
          <span className="divider-ornament">✦</span>
        </div>

        {/* Team Profiles: Classical Salon Medallion Gallery */}
        <div className="classical-salon-grid">
          {team.map((member: LeadershipProfile, index: number) => (
            <article
              key={member.id}
              className="classical-salon-card reveal"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="salon-card-topline" aria-hidden="true" />

              <div className="salon-card-body">
                <div className="salon-card-header">
                  <ClassicalPortraitMedallion
                    name={member.name}
                    imageSrc={member.imageSrc}
                    imageWebp={member.imageWebp}
                    monogram={member.monogram}
                    size="md"
                  />
                  <div className="salon-name-wrap">
                    <h3 className="salon-member-name">{member.name}</h3>
                    <div className="salon-designation-badge">
                      <span className="badge-gem">◆</span>
                      <p className="salon-member-designation">{member.designation}</p>
                    </div>
                  </div>
                </div>

                <div className="salon-card-divider" aria-hidden="true" />

                <p className="salon-member-description">{member.description}</p>
              </div>

              <div className="salon-card-foot" aria-hidden="true">
                <span className="foot-rule" />
                <span className="foot-tag">CPA AVIATION</span>
                <span className="foot-rule" />
              </div>
            </article>
          ))}
        </div>

        {/* Classical Institutional Charter Band */}
        <div className="classical-charter-banner reveal">
          <div className="charter-banner-inner">
            <div className="charter-badge">
              <Sparkles size={16} aria-hidden="true" />
              <span>IFSC GOVERNANCE CHARTER</span>
            </div>
            <h3 className="charter-headline">
              Steered by Regulatory Integrity &amp; Fiduciary Responsibility
            </h3>
            <p className="charter-text">
              Every operating lease, fleet transaction, and asset acquisition structured by CPA
              Aviation Leasing Capital IFSC Private Limited operates strictly within statutory
              authorizations issued under the IFSC Special Economic Zone framework.
            </p>
            <div className="charter-actions">
              <Button asChild variant="aviation">
                <Link to="/contact">
                  Enquire with Executive Office <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="cinematic">
                <Link to="/about">Review Corporate Identity &amp; CIN</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
