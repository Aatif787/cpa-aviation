import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BlueprintSvg, PageBreadcrumbs, SiteShell } from "@/components/SiteLayout";
import { LEGAL_NAME, buildPageHead } from "@/lib/seo";
import { LEADERSHIP_PROFILES, type LeadershipProfile } from "@/lib/site-content";

export const Route = createFileRoute("/leadership")({
  head: () => buildPageHead("/leadership"),
  component: LeadershipPage,
});

function PortraitFrame({
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
    <div className={`leadership-portrait-frame leadership-portrait--${size}`} aria-hidden="true">
      {!hasError ? (
        <picture>
          <source srcSet={imageWebp} type="image/webp" />
          <img
            src={imageSrc}
            alt={name}
            className="leadership-portrait-img"
            loading="lazy"
            decoding="async"
            onError={() => setHasError(true)}
          />
        </picture>
      ) : (
        <span className="leadership-portrait-monogram">{monogram}</span>
      )}
    </div>
  );
}

function LeadershipPage() {
  const chairman = LEADERSHIP_PROFILES[0] as LeadershipProfile;
  const team: readonly LeadershipProfile[] = LEADERSHIP_PROFILES.slice(1);

  return (
    <SiteShell routeKey="/leadership">
      {/* Editorial Subpage Header */}
      <section className="subpage-hero page-width">
        <PageBreadcrumbs currentLabel="Leadership" />
        <div className="subpage-hero-grid">
          <div className="subpage-hero-copy">
            <p className="eyebrow">Corporate Governance · GIFT City IFSC</p>
            <h1>
              Executive Leadership &amp; <span className="muted-heading">Governance</span>
            </h1>
            <p className="lead-description">
              Anchored in GIFT City IFSC, {LEGAL_NAME} is guided by aviation infrastructure pioneers
              and specialized operational leaders driving disciplined aircraft leasing, regulatory
              compliance, and cross-border fleet execution.
            </p>
          </div>
        </div>
      </section>

      {/* Main Leadership Section (Signature Deep Luxury Band) */}
      <section id="leadership-roster" className="leasing-section leadership-roster-section">
        <BlueprintSvg />
        <div className="page-width">
          <div className="section-topline reveal">
            <p className="eyebrow">Board of Directors &amp; Executive Leadership</p>
          </div>

          {/* Featured Chairman Executive Pavilion */}
          <article className="featured-chairman-pavilion reveal" aria-labelledby="chairman-heading">
            <div className="chairman-pavilion-grid">
              <div className="chairman-portrait-side">
                <div className="chairman-portrait-medallion">
                  <PortraitFrame
                    name={chairman.name}
                    imageSrc={chairman.imageSrc}
                    imageWebp={chairman.imageWebp}
                    monogram={chairman.monogram}
                    size="lg"
                  />
                </div>
                <div className="chairman-tenure-tag">
                  <span className="tenure-dot" aria-hidden="true" />
                  <span>30+ Years Leadership</span>
                </div>
              </div>

              <div className="chairman-dossier-side">
                <div className="chairman-kicker-row">
                  <span className="chairman-kicker">CHAIRMAN &amp; MANAGING DIRECTOR</span>
                  <span className="chairman-location-badge">GIFT City IFSC · Gujarat</span>
                </div>
                <h2 id="chairman-heading" className="chairman-name">
                  {chairman.name}
                </h2>
                <div className="chairman-gold-rule" aria-hidden="true" />
                <p className="chairman-bio-text">{chairman.description}</p>

                <div className="chairman-scope-grid">
                  <div className="chairman-scope-item">
                    <span className="scope-item-label">EXECUTIVE MANDATE</span>
                    <span className="scope-item-val">
                      Aviation Infrastructure, Compliance &amp; Fleet Expansion
                    </span>
                  </div>
                  <div className="chairman-scope-item">
                    <span className="scope-item-label">GOVERNANCE ENTITY</span>
                    <span className="scope-item-val">{LEGAL_NAME}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Executive Directorate Sub-Header */}
          <div className="directorate-section-topline reveal">
            <div className="scope-header">
              <p className="eyebrow">Executive Management &amp; Operations</p>
              <h2>
                Executive Directorate &amp;
                <br />
                <span className="muted-heading">Operational Heads</span>
              </h2>
              <p className="scope-intro">
                Senior leadership team overseeing commercial development, operational execution,
                international corporate affairs, statutory governance, and airport turnaround
                workflows.
              </p>
            </div>
          </div>

          {/* 6-Director Directorate Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
          <div className="directorate-cards-grid">
            {team.map((member) => (
              <article key={member.id} className="director-dossier-card reveal">
                <div className="director-card-header">
                  <div className="director-portrait-col">
                    <PortraitFrame
                      name={member.name}
                      imageSrc={member.imageSrc}
                      imageWebp={member.imageWebp}
                      monogram={member.monogram}
                      size="md"
                    />
                  </div>
                  <div className="director-meta-col">
                    <h3 className="director-name">{member.name}</h3>
                    <p className="director-designation">{member.designation}</p>
                  </div>
                </div>
                <div className="director-card-divider" aria-hidden="true" />
                <div className="director-card-body">
                  <p className="director-bio">{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
