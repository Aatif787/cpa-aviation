import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Building2, MapPin, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidVisualFrame, PageBreadcrumbs, SiteShell } from "@/components/SiteLayout";
import { buildPageHead } from "@/lib/seo";
import {
  GIFT_CITY_ADVANTAGES,
  GIFT_CITY_VISUAL,
  GUJARAT_SCENES,
  LOA_REGULATORY_DOSSIER,
  REGISTERED_OFFICE_ADDRESS,
} from "@/lib/site-content";

export const Route = createFileRoute("/gift-city")({
  head: () => buildPageHead("/gift-city"),
  component: GiftCityPage,
});

function GiftCityPage() {
  const [cityIndex, setCityIndex] = useState(0);
  const [cityPaused, setCityPaused] = useState(false);
  const [cityInView, setCityInView] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const deckSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(media.matches);
    syncMotion();
    media.addEventListener("change", syncMotion);

    const el = deckSectionRef.current;
    let obs: IntersectionObserver | undefined;
    if (el && typeof IntersectionObserver !== "undefined") {
      obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => setCityInView(entry.isIntersecting));
        },
        { rootMargin: "150px 0px" },
      );
      obs.observe(el);
    }

    return () => {
      media.removeEventListener("change", syncMotion);
      obs?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (reducedMotion || cityPaused || !cityInView) return;
    const timer = window.setInterval(() => {
      setCityIndex((current) => (current + 1) % GUJARAT_SCENES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reducedMotion, cityPaused, cityInView]);

  const activeScene = GUJARAT_SCENES[cityIndex] ?? GUJARAT_SCENES[0];

  return (
    <SiteShell routeKey="/gift-city">
      <section className="subpage-hero page-width">
        <PageBreadcrumbs currentLabel="GIFT City" />
        <div className="subpage-hero-grid">
          <div className="subpage-hero-copy">
            <p className="eyebrow">GIFT SEZ · International Financial Services Centre</p>
            <h1>
              GIFT City IFSC &amp; <span className="muted-heading">Regulatory Seat</span>
            </h1>
            <p className="lead-description">
              Located in Gujarat International Finance Tec-City (GIFT SEZ), Gandhinagar —
              India&apos;s IFSC jurisdiction providing the statutory base and Letter of Approval
              framework for aircraft operating leasing.
            </p>
          </div>
          <div className="subpage-hero-visual">
            <LiquidVisualFrame liquidId="gift-hero" asset={GIFT_CITY_VISUAL} eager />
          </div>
        </div>
      </section>

      <section ref={deckSectionRef} id="gujarat-corridor" className="city-section page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">GIFT City &amp; Gujarat Ecosystem</p>
        </div>
        <div className="city-overview-grid">
          <div className="city-copy-panel reveal" data-liquid-text>
            <div key={activeScene.code} className="city-copy-stage">
              <h2>
                {activeScene.headingTop}
                <br />
                <span className="muted-heading">{activeScene.headingAccent}</span>
              </h2>
              <div className="editorial-copy">
                {activeScene.paragraphs.map((text) => (
                  <p key={text} className="section-description">
                    {text}
                  </p>
                ))}
              </div>
              <div className="location-tag">
                <Building2 size={15} /> {activeScene.location}
              </div>
            </div>
          </div>
          <figure
            className="m-0 city-visual-stack"
            data-liquid="city"
            onMouseEnter={() => setCityPaused(true)}
            onMouseLeave={() => setCityPaused(false)}
          >
            <span className="liquid-frame">
              <span className="city-deck liquid-media">
                <span className="city-deck-track">
                  {GUJARAT_SCENES.map((scene, index) => {
                    const offset =
                      (index - cityIndex + GUJARAT_SCENES.length) % GUJARAT_SCENES.length;
                    return (
                      <button
                        key={scene.code}
                        type="button"
                        className="city-deck-card"
                        data-pos={offset}
                        onClick={() =>
                          setCityIndex(
                            offset === 0 ? (cityIndex + 1) % GUJARAT_SCENES.length : index,
                          )
                        }
                        aria-label={
                          offset === 0 ? `${scene.label} — show next view` : `Show ${scene.label}`
                        }
                      >
                        <span className="city-deck-photo">
                          <picture>
                            <source
                              srcSet={scene.avifSrcSet}
                              sizes="(max-width: 700px) 90vw, 48vw"
                              type="image/avif"
                            />
                            <source
                              srcSet={scene.webpSrcSet}
                              sizes="(max-width: 700px) 90vw, 48vw"
                              type="image/webp"
                            />
                            <img
                              src={scene.image}
                              alt={scene.alt}
                              width={scene.width}
                              height={scene.height}
                              loading="lazy"
                              fetchPriority={offset === 0 ? "auto" : "low"}
                              decoding="async"
                            />
                          </picture>
                        </span>
                      </button>
                    );
                  })}
                </span>
              </span>
              <span className="liquid-ribbon" aria-hidden="true" />
              <span className="liquid-sweep" aria-hidden="true" />
            </span>
          </figure>
        </div>
      </section>

      <section id="loa-details" className="subpage-band page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Letter of Approval &amp; Regulatory Context</p>
        </div>
        <div className="scope-header reveal">
          <h2>
            GIFT SEZ Approval &amp;
            <br />
            <span className="muted-heading">Regulatory Scope</span>
          </h2>
          <p className="scope-intro">
            Registered inside GIFT Special Economic Zone, Gandhinagar under India&apos;s
            International Financial Services Centre regime. The particulars below reflect verified
            official corporate and SEZ Letter of Approval records.
          </p>
        </div>

        <div className="loa-dossier-grid reveal" aria-label="GIFT SEZ Letter of Approval Summary">
          {LOA_REGULATORY_DOSSIER.map((item) => (
            <article key={item.label} className="loa-dossier-card">
              <span className="dossier-label">{item.label}</span>
              <strong className="dossier-value">{item.value}</strong>
              <p className="dossier-detail">{item.detail}</p>
            </article>
          ))}
        </div>

        <div
          className="compliance-callout reveal"
          role="note"
          aria-label="Letter of Approval Regulatory Conditions"
        >
          <p className="compliance-callout-title">
            <ShieldCheck size={14} aria-hidden="true" />
            Regulatory Condition Governing Approval
          </p>
          <p>
            The GIFT SEZ Letter of Approval authorises CPA Aviation Leasing Capital IFSC Private
            Limited for operating lease for aircraft strictly subject to the terms, ongoing
            compliance obligations, and regulatory conditions stated in the Letter of Approval.
            Broader business objects listed in the company&apos;s electronic Memorandum of
            Association remain subject to requisite statutory or IFSCA permissions before
            undertaking any regulated activity outside that approval.
          </p>
        </div>
      </section>

      <section id="ifsc-context" className="subpage-band page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">IFSC Framework &amp; Registered Office</p>
        </div>
        <div className="subpage-cards-grid subpage-cards-grid--two reveal">
          {GIFT_CITY_ADVANTAGES.map((item) => (
            <article key={item.code} className="subpage-card">
              <span className="scope-code">{item.code}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))}
        </div>

        <div className="subpage-cta-band reveal">
          <div>
            <p className="eyebrow">
              <MapPin size={12} className="inline mr-1" aria-hidden="true" />
              Registered Office in GIFT SEZ
            </p>
            <h2>THE PLATFORM BK11 GIFTSEZ</h2>
            <p>{REGISTERED_OFFICE_ADDRESS}</p>
          </div>
          <div className="subpage-inline-links">
            <Button asChild variant="navigation">
              <Link to="/about">
                About Us <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="navigation">
              <Link to="/aircraft-leasing">
                Aircraft Leasing <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="navigation">
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
