import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Building2, MapPin } from "lucide-react";
import { LiquidVisualFrame, PageBreadcrumbs, SiteShell } from "@/components/SiteLayout";
import { buildPageHead } from "@/lib/seo";
import {
  GIFT_CITY_ADVANTAGES,
  GIFT_CITY_VISUAL,
  GUJARAT_SCENES,
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
            <p className="eyebrow">Jurisdiction &amp; Connectivity</p>
            <h1>
              GIFT City IFSC &amp; <span className="muted-heading">Gujarat Corridor</span>
            </h1>
            <p className="lead-description">
              Positioned inside Gujarat International Finance Tec-City (GIFT City) — India&apos;s International Financial Services Centre structured for international aviation leasing and financial administration.
            </p>
          </div>
          <div className="subpage-hero-visual">
            <LiquidVisualFrame
              liquidId="gift-hero"
              asset={GIFT_CITY_VISUAL}
              caption="GIFT City IFSC, Gandhinagar, Gujarat · Illustrative skyline visual"
              eager
            />
          </div>
        </div>
      </section>

      <section ref={deckSectionRef} id="gujarat-corridor" className="city-section page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">GIFT City &amp; Gujarat Ecosystem</p>
          <span className="section-number">01</span>
        </div>
        <div className="city-overview-grid">
          <div className="city-copy-panel reveal" data-liquid-text>
            <div key={activeScene.code} className="city-copy-stage">
              <h2>
                {activeScene.headingTop}<br />
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
                    const offset = (index - cityIndex + GUJARAT_SCENES.length) % GUJARAT_SCENES.length;
                    return (
                      <button
                        key={scene.code}
                        type="button"
                        className="city-deck-card"
                        data-pos={offset}
                        onClick={() =>
                          setCityIndex(offset === 0 ? (cityIndex + 1) % GUJARAT_SCENES.length : index)
                        }
                        aria-label={
                          offset === 0
                            ? `${scene.label} — show next view`
                            : `Show ${scene.label}`
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

      <section id="ifsc-context" className="subpage-band page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">IFSC Framework Advantages</p>
          <span className="section-number">02</span>
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
        </div>
      </section>
    </SiteShell>
  );
}

