import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageBreadcrumbs, SiteShell } from "@/components/SiteLayout";
import { buildPageHead } from "@/lib/seo";
import { LEADERSHIP_PROFILES, type LeadershipProfile } from "@/lib/site-content";

export const Route = createFileRoute("/leadership")({
  head: () => buildPageHead("/leadership"),
  component: LeadershipPage,
});

function PortraitAvatar({
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
    <div className={`leadership-avatar-frame leadership-avatar--${size}`} aria-hidden="true">
      {!hasError ? (
        <picture>
          <source srcSet={imageWebp} type="image/webp" />
          <img
            src={imageSrc}
            alt={name}
            className="leadership-avatar-img"
            loading="lazy"
            decoding="async"
            onError={() => setHasError(true)}
          />
        </picture>
      ) : (
        <div className="leadership-avatar-fallback">{monogram}</div>
      )}
    </div>
  );
}

function LeadershipPage() {
  const featured = LEADERSHIP_PROFILES[0] as LeadershipProfile;
  const team = LEADERSHIP_PROFILES.filter((p) => !p.isFeatured);

  return (
    <SiteShell routeKey="/leadership">
      <section className="subpage-hero page-width">
        <PageBreadcrumbs currentLabel="Leadership" />
        <div className="subpage-hero-grid">
          <div className="subpage-hero-copy">
            <p className="eyebrow">Executive Leadership · Governance &amp; Stewardship</p>
            <h1>
              Strategic Leadership &amp; <span className="muted-heading">Governance</span>
            </h1>
            <p className="lead-description">
              Anchored in GIFT City IFSC, CPA Aviation Leasing Capital is guided by aviation
              infrastructure pioneers and specialized operational leaders driving disciplined
              aircraft leasing, regulatory compliance, and cross-border capital execution.
            </p>
          </div>
        </div>
      </section>

      <section id="leadership-roster" className="subpage-band page-width leadership-section">
        <div className="leadership-layout">
          {/* Featured Profile: Chairman & Managing Director (Midnight Navy) */}
          <article className="leadership-featured-card reveal">
            <div className="featured-card-decor" aria-hidden="true">
              <svg viewBox="0 0 320 320" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="280"
                  cy="280"
                  r="140"
                  stroke="var(--accent)"
                  strokeOpacity="0.16"
                  strokeWidth="1"
                  strokeDasharray="3 6"
                />
                <circle
                  cx="280"
                  cy="280"
                  r="220"
                  stroke="var(--accent)"
                  strokeOpacity="0.12"
                  strokeWidth="1"
                />
                <circle
                  cx="280"
                  cy="280"
                  r="300"
                  stroke="var(--accent)"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <div className="featured-card-content">
              <PortraitAvatar
                name={featured.name}
                imageSrc={featured.imageSrc}
                imageWebp={featured.imageWebp}
                monogram={featured.monogram}
                size="lg"
              />

              <div className="featured-card-text">
                <h2 className="featured-name">{featured.name}</h2>
                <p className="featured-designation">{featured.designation}</p>
                <p className="featured-description">{featured.description}</p>
              </div>
            </div>
          </article>

          {/* Remaining 6 Profiles: Refined Two-Column Layout (Warm Cream) */}
          <div className="leadership-grid">
            {team.map((member: LeadershipProfile) => (
              <article key={member.id} className="leadership-card reveal">
                <PortraitAvatar
                  name={member.name}
                  imageSrc={member.imageSrc}
                  imageWebp={member.imageWebp}
                  monogram={member.monogram}
                  size="md"
                />

                <div className="leadership-card-text">
                  <h3 className="leadership-card-name">{member.name}</h3>
                  <p className="leadership-card-designation">{member.designation}</p>
                  <p className="leadership-card-description">{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
