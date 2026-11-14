import { Link, createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Building2,
  FileText,
  Globe2,
  Layers3,
  Lock,
  MapPin,
  Plane,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  BlueprintSvg,
  CharterSkyBackdrop,
  FlightPathSvg,
  ResponsivePicture,
  SiteShell,
} from "@/components/SiteLayout";
import { CORPORATE_EMAIL, LEGAL_NAME, buildPageHead } from "@/lib/seo";
import {
  AIRCRAFT_ASSETS_VISUAL,
  CORPORATE_DOCUMENTS,
  GUJARAT_SCENES,
  LEASING_AIRCRAFT_VISUAL,
  REGISTERED_OFFICE_ADDRESS,
  flightFilm,
  flightStill,
} from "@/lib/site-content";

const LazyContactForm = lazy(() =>
  import("@/components/ContactForm").then((m) => ({ default: m.ContactForm })),
);

export const Route = createFileRoute("/")({
  head: () => {
    const baseHead = buildPageHead("/");
    return {
      ...baseHead,
      links: [
        ...baseHead.links,
        {
          rel: "preload",
          as: "image",
          imageSrcSet:
            "/media/white-aircraft-still-768w.avif 768w, /media/white-aircraft-still-1280w.avif 1280w, /media/white-aircraft-still.avif 1920w",
          imageSizes: "100vw",
          type: "image/avif",
          fetchPriority: "high",
        },
      ],
    };
  },
  component: Index,
});

function Index() {
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [desktopVideo, setDesktopVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [cityIndex, setCityIndex] = useState(0);
  const [cityPaused, setCityPaused] = useState(false);
  const [cityInView, setCityInView] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [contactFormReady, setContactFormReady] = useState(false);
  const [docRequest, setDocRequest] = useState<{ value: string; seq: number } | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (t: string, cb: () => void) => void;
        removeEventListener?: (t: string, cb: () => void) => void;
      };
    };
    const isConstrainedNetwork = () =>
      Boolean(nav.connection?.saveData) ||
      nav.connection?.effectiveType === "slow-2g" ||
      nav.connection?.effectiveType === "2g";

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const updateMotion = () => {
      const reduced = media.matches;
      const allowVideo = !reduced && desktopQuery.matches && !isConstrainedNetwork();
      setReducedMotion(reduced);
      setDesktopVideo(allowVideo);
      setPlaying(allowVideo);
    };
    updateMotion();
    media.addEventListener("change", updateMotion);
    desktopQuery.addEventListener("change", updateMotion);
    nav.connection?.addEventListener?.("change", updateMotion);

    let heroObserver: IntersectionObserver | undefined;
    if (heroRef.current && typeof IntersectionObserver !== "undefined") {
      heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => setHeroInView(entry.isIntersecting));
      });
      heroObserver.observe(heroRef.current);
    }

    const cityEl = document.getElementById("gift-city");
    let cityObserver: IntersectionObserver | undefined;
    if (cityEl && typeof IntersectionObserver !== "undefined") {
      cityObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => setCityInView(entry.isIntersecting));
        },
        { rootMargin: "120px 0px" },
      );
      cityObserver.observe(cityEl);
    }

    const contactEl = document.getElementById("contact");
    let contactObserver: IntersectionObserver | undefined;
    let contactFormObserver: IntersectionObserver | undefined;
    if (contactEl && typeof IntersectionObserver !== "undefined") {
      contactObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setContactInView(entry.isIntersecting);
            if (entry.isIntersecting) setContactVisible(true);
          });
        },
        { threshold: 0.05 },
      );
      contactObserver.observe(contactEl);

      contactFormObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setContactFormReady(true);
              contactFormObserver?.disconnect();
            }
          });
        },
        { rootMargin: "550px 0px" },
      );
      contactFormObserver.observe(contactEl);
    }

    if (window.location.hash === "#contact") {
      setContactVisible(true);
      setContactFormReady(true);
    }

    return () => {
      heroObserver?.disconnect();
      cityObserver?.disconnect();
      contactObserver?.disconnect();
      contactFormObserver?.disconnect();
      media.removeEventListener("change", updateMotion);
      desktopQuery.removeEventListener("change", updateMotion);
      nav.connection?.removeEventListener?.("change", updateMotion);
    };
  }, []);

  useEffect(() => {
    if (!desktopVideo || reducedMotion) {
      setVideoReady(false);
      return;
    }
    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    let cancelled = false;
    let idleId: number | undefined;
    let timerId: number | undefined;
    const activate = () => {
      if (!cancelled) setVideoReady(true);
    };
    const schedule = () => {
      if (cancelled) return;
      idleId = win.requestIdleCallback
        ? win.requestIdleCallback(activate, { timeout: 1400 })
        : undefined;
      timerId = window.setTimeout(activate, 1100);
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      cancelled = true;
      window.removeEventListener("load", schedule);
      if (idleId !== undefined && win.cancelIdleCallback) win.cancelIdleCallback(idleId);
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [desktopVideo, reducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing && !reducedMotion && desktopVideo && heroInView) {
      video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [playing, reducedMotion, desktopVideo, heroInView, videoReady]);

  useEffect(() => {
    if (reducedMotion || cityPaused || !cityInView) return;
    const timer = window.setInterval(() => {
      setCityIndex((current) => (current + 1) % GUJARAT_SCENES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reducedMotion, cityPaused, cityInView]);

  const activeScene = GUJARAT_SCENES[cityIndex] ?? GUJARAT_SCENES[0];
  const requestDocumentAccess = (docTitle: string) => {
    setDocRequest((prev) => ({
      value: `Document Access Request: ${docTitle}`,
      seq: (prev?.seq ?? 0) + 1,
    }));
    setContactVisible(true);
    setContactFormReady(true);
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <SiteShell routeKey="/" overHeroHeader>
      <section ref={heroRef} className="hero" aria-label={LEGAL_NAME}>
        <div className="hero-film-reveal">
          <picture>
            <source
              srcSet="/media/white-aircraft-still-768w.avif 768w, /media/white-aircraft-still-1280w.avif 1280w, /media/white-aircraft-still.avif 1920w"
              sizes="100vw"
              type="image/avif"
            />
            <source
              srcSet="/media/white-aircraft-still-768w.webp 768w, /media/white-aircraft-still-1280w.webp 1280w, /media/white-aircraft-still.webp 1920w"
              sizes="100vw"
              type="image/webp"
            />
            <img
              src={flightStill.url}
              alt="Commercial aircraft in flight above sunlit clouds for CPA Aviation Leasing Capital in GIFT City"
              className="hero-poster"
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="sync"
            />
          </picture>
          {!reducedMotion && desktopVideo && videoReady && (
            <video
              ref={videoRef}
              className="hero-media"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
            >
              <source src={flightFilm.url} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="hero-atmosphere" aria-hidden="true">
          <div className="hero-copy-veil" />
          <div className="atmo-depth-wrap atmo-depth-wrap--far" data-atmo-depth="far">
            <div className="cloud-track cloud-track--far" />
          </div>
          <div className="hero-sunbeams" data-atmo-light>
            <div className="sunbeam sunbeam--primary" />
            <div className="sunbeam sunbeam--secondary" />
          </div>
          <div className="hero-cloud-shadow" />
          <div className="atmo-depth-wrap atmo-depth-wrap--near" data-atmo-depth="near">
            <div className="cloud-track cloud-track--near" />
          </div>
          <div className="hero-metallic-glint" />
          <div className="hero-horizon-haze" />
          <div className="hero-motes">
            <span className="mote mote--1" />
            <span className="mote mote--2" />
            <span className="mote mote--3" />
            <span className="mote mote--4" />
            <span className="mote mote--5" />
            <span className="mote mote--6" />
            <span className="mote mote--7" />
          </div>
        </div>
        <div className="page-width hero-inner">
          <div className="hero-copy">
            <h1>
              CPA Aviation<br />
              <span>Leasing Capital</span>
            </h1>
            <p className="hero-description">
              {LEGAL_NAME} focuses on aircraft operating lease activities and aviation asset structures from GIFT City, Gujarat.
            </p>
          </div>
        </div>
        <div className="page-width hero-bottom">
          <Button asChild variant="navigation">
            <a href="#about" className="scroll-link">
              <span className="scroll-line" />
              Scroll to discover <ArrowDown size={12} />
            </a>
          </Button>
          <span className="location-tag">
            <MapPin size={12} /> GIFT City IFSC, India
          </span>
        </div>
      </section>

      <section id="about" className="overview page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">About the Company</p>
          <span className="section-number">01</span>
        </div>
        <div className="overview-grid">
          <div className="reveal" data-liquid-text>
            <h2>
              A Focused Approach<br />
              <span className="muted-heading">to Aircraft Leasing</span>
            </h2>
            <div className="editorial-copy">
              <p className="section-description">
                {LEGAL_NAME} is an aircraft leasing company based in GIFT City, Gujarat, India, structured for aircraft leasing and aviation asset management opportunities through the IFSC framework.
              </p>
              <p className="section-description">
                Review our statutory corporate particulars, incorporation record, and regulatory distinction between permitted operating activity and stated corporate objectives.
              </p>
            </div>
            <Button asChild variant="navigation">
              <Link to="/about">
                Learn About Us <ArrowUpRight />
              </Link>
            </Button>
          </div>
          <figure className="m-0" data-liquid="overview">
            <span className="liquid-frame">
              <ResponsivePicture asset={AIRCRAFT_ASSETS_VISUAL} className="overview-image liquid-media" />
              <span className="frame-atmosphere" aria-hidden="true">
                <span className="atmo-depth-wrap frame-cloud-wrap--far" data-atmo-depth="frame-far">
                  <span className="cloud-track cloud-track--frame-far" />
                </span>
                <span className="atmo-depth-wrap frame-cloud-wrap--near" data-atmo-depth="frame-near">
                  <span className="cloud-track cloud-track--frame-near" />
                </span>
                <span className="frame-sunbeam" />
                <span className="frame-metallic-sheen" />
                <span className="frame-haze" />
              </span>
              <span className="liquid-ribbon" aria-hidden="true" />
              <span className="liquid-sweep" aria-hidden="true" />
            </span>
          </figure>
        </div>
      </section>

      <section id="leasing" className="leasing-section">
        <BlueprintSvg />
        <div className="page-width">
          <div className="section-topline reveal">
            <p className="eyebrow">Aircraft Leasing</p>
            <span className="section-number">02</span>
          </div>
          <div className="leasing-grid">
            <figure className="leasing-figure m-0" data-liquid="leasing">
              <span className="liquid-frame leasing-frame">
                <ResponsivePicture asset={LEASING_AIRCRAFT_VISUAL} className="leasing-image liquid-media" />
                <span className="frame-atmosphere" aria-hidden="true">
                  <span className="frame-sunbeam" />
                  <span className="frame-metallic-sheen" />
                </span>
                <span className="liquid-ribbon" aria-hidden="true" />
                <span className="liquid-sweep" aria-hidden="true" />
              </span>
            </figure>
            <div className="reveal" data-liquid-text>
              <h2>
                Aircraft Operating<br />
                <span className="muted-heading">Lease</span>
              </h2>
              <div className="editorial-copy">
                <p className="section-description">
                  Aircraft operating leases provide an alternative to outright aircraft ownership, allowing aircraft to be deployed under agreed commercial lease arrangements.
                </p>
                <p className="section-description">
                  {LEGAL_NAME} holds a Letter of Approval identifying operating lease for aircraft as an authorised operation, subject to applicable regulatory conditions.
                </p>
              </div>
              <div className="leasing-meta">
                <span>Authorised Scope</span>
                <strong>Operating lease for aircraft under Letter of Approval conditions</strong>
                <Button asChild variant="navigation">
                  <Link to="/aircraft-leasing">
                    Explore Aircraft Leasing <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="business-scope" className="focus-section page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Our Business Scope</p>
          <span className="section-number">03</span>
        </div>
        <div className="scope-header reveal">
          <h2>
            Memorandum of Association<br />
            <span className="muted-heading">Aviation Assets &amp; Scope</span>
          </h2>
          <div>
            <p className="scope-intro">
              Summary of objectives stated in the company&apos;s Memorandum of Association. Activities beyond authorised aircraft operating lease remain subject to applicable regulatory approvals.
            </p>
            <div className="mt-4">
              <Button asChild variant="navigation">
                <Link to="/aviation-assets">
                  Explore Aviation Assets <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="scope-editorial">
          <article className="scope-band reveal">
            <div className="scope-index">
              <span className="scope-code">03.1</span>
              <Plane className="focus-icon" />
            </div>
            <div className="scope-title">
              <h3>Aircraft Leasing &amp; Asset Management</h3>
              <span className="scope-status scope-status--authorised">Operating lease authorised under LoA</span>
            </div>
            <p className="scope-body">
              Aircraft, helicopters, engines and related aviation assets form part of the company&apos;s stated business objectives, including acquisition, leasing and asset management.
            </p>
          </article>
          <article className="scope-band reveal">
            <div className="scope-index">
              <span className="scope-code">03.2</span>
              <Globe2 className="focus-icon" />
            </div>
            <div className="scope-title">
              <h3>Aviation Asset Financing</h3>
              <span className="scope-status">Stated MoA object · Subject to approvals</span>
            </div>
            <p className="scope-body">
              The company&apos;s stated objects include aviation asset financing and related ownership and financing structures.
            </p>
          </article>
          <article className="scope-band reveal">
            <div className="scope-index">
              <span className="scope-code">03.3</span>
              <Layers3 className="focus-icon" />
            </div>
            <div className="scope-title">
              <h3>Ownership &amp; Participation Structures</h3>
              <span className="scope-status">Stated MoA object · Subject to requirements</span>
            </div>
            <p className="scope-body">
              The company&apos;s stated objectives include SPVs, co-ownership and fractional participation models, subject to applicable regulatory requirements.
            </p>
          </article>
        </div>
      </section>

      <section id="approach" className="approach-section page-width">
        <FlightPathSvg />
        <div className="section-topline reveal">
          <p className="eyebrow">Our Approach</p>
          <span className="section-number">04</span>
        </div>
        <div className="approach-grid">
          <div className="reveal">
            <h2>
              Clarity in<br />
              <span className="muted-heading">Every Structure</span>
            </h2>
          </div>
          <div className="editorial-copy reveal">
            <p className="section-description">
              Aircraft leasing involves more than the aircraft itself. Ownership structures, contractual arrangements, lifecycle asset management and regulatory requirements all play a vital role.
            </p>
            <div className="subpage-inline-links">
              <Button asChild variant="navigation">
                <Link to="/our-approach">
                  Explore Our Approach <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="gift-city" className="city-section page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">GIFT City &amp; Gujarat</p>
          <span className="section-number">05</span>
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
              <div className="flex flex-wrap items-center gap-4">
                <div className="location-tag">
                  <Building2 size={15} /> {activeScene.location}
                </div>
                <Button asChild variant="navigation">
                  <Link to="/gift-city">
                    Explore GIFT City IFSC <ArrowUpRight />
                  </Link>
                </Button>
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

      <section id="contact" className={contactVisible ? "contact-section is-contact-visible" : "contact-section"}>
        <CharterSkyBackdrop activeInView={contactInView} reducedMotion={reducedMotion} />
        <div className="contact-content page-width">
          <p className="eyebrow">
            <span className="contact-pulse-dot" aria-hidden="true" />
            Contact
          </p>
          <h2 className="contact-reveal-up">
            Discuss an Aviation<br />
            <span className="muted-heading">Leasing Enquiry</span>
          </h2>
          <p className="contact-intro contact-reveal-right">
            For business enquiries, aircraft operating lease discussions, or verified corporate document requests, please contact {LEGAL_NAME}.
          </p>
          {contactFormReady ? (
            <Suspense fallback={<div className="contact-form contact-form-skeleton" aria-hidden="true" />}>
              <LazyContactForm prefilledSubject={docRequest} />
            </Suspense>
          ) : (
            <div className="contact-form contact-form-skeleton" aria-hidden="true" />
          )}
          <div className="contact-direct">
            <a className="contact-email" href={`mailto:${CORPORATE_EMAIL}`}>
              {CORPORATE_EMAIL}
            </a>
            <span aria-hidden="true">·</span>
            <a className="contact-email whitespace-nowrap" href="tel:+918527712949">
              +91 85277 12949
            </a>
            <span aria-hidden="true">·</span>
            <Link className="contact-email" to="/contact">
              Dedicated Contact Page
            </Link>
          </div>
        </div>
      </section>

      <section id="corporate-info" className="corporate-section page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Corporate &amp; Regulatory Information</p>
          <span className="section-number">06</span>
        </div>
        <div className="corporate-layout">
          <div className="corporate-heading reveal">
            <h2>
              Registered Particulars<br />
              <span className="muted-heading">&amp; Governance</span>
            </h2>
            <p className="corporate-note">
              Statutory incorporation particulars of {LEGAL_NAME}, alongside a clear distinction between its Letter of Approval activity and Memorandum of Association business objectives.
            </p>
            <div className="mt-4">
              <Button asChild variant="navigation">
                <Link to="/about">
                  Full Corporate Profile <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
          <div className="corporate-stack">
            <dl className="corporate-list reveal">
              <div className="corporate-row">
                <dt>Legal Company Name</dt>
                <dd>{LEGAL_NAME}</dd>
              </div>
              <div className="corporate-row">
                <dt>Corporate Identification Number</dt>
                <dd>U66190GJ2026PTC180823</dd>
              </div>
              <div className="corporate-row">
                <dt>Incorporation Details</dt>
                <dd>Incorporated 16 July 2026 · Private Limited Company (IFSC, Gujarat)</dd>
              </div>
              <div className="corporate-row">
                <dt>Registered Office</dt>
                <dd>{REGISTERED_OFFICE_ADDRESS}</dd>
              </div>
              <div className="corporate-row">
                <dt>Official Email</dt>
                <dd>
                  <a href={`mailto:${CORPORATE_EMAIL}`}>{CORPORATE_EMAIL}</a>
                </dd>
              </div>
              <div className="corporate-row">
                <dt>Telephone</dt>
                <dd>
                  <a href="tel:+918527712949">+91 85277 12949</a>
                </dd>
              </div>
            </dl>

            <div className="regulatory-panel reveal" aria-labelledby="regulatory-scope-heading">
              <div className="regulatory-panel-header">
                <p id="regulatory-scope-heading" className="eyebrow">
                  Regulatory Scope Distinction
                </p>
              </div>
              <div className="regulatory-grid">
                <article className="regulatory-card">
                  <span className="regulatory-kicker regulatory-kicker--loa">
                    Letter of Approval (LoA)
                  </span>
                  <h3>Permitted Operating Activity</h3>
                  <p>
                    Operating lease for aircraft, conducted subject to the terms and applicable regulatory conditions set out in the company&apos;s Letter of Approval.
                  </p>
                </article>
                <article className="regulatory-card">
                  <span className="regulatory-kicker">Memorandum of Association (MoA)</span>
                  <h3>Stated Corporate Objectives</h3>
                  <p>
                    Broader stated objects cover aircraft, helicopter and engine leasing, aviation asset management, aviation asset financing, and SPV or co-ownership participation structures. Objectives outside the aircraft operating lease remain subject to requisite regulatory approvals prior to commencement.
                  </p>
                </article>
              </div>
            </div>

            <div className="documents-panel reveal" aria-labelledby="corporate-docs-heading">
              <div className="documents-header">
                <p id="corporate-docs-heading" className="eyebrow">
                  Official Corporate Documents
                </p>
                <span className="documents-privacy-note">
                  <Lock size={12} aria-hidden="true" /> Controlled counterparty access
                </span>
              </div>
              <ul className="documents-list">
                {CORPORATE_DOCUMENTS.map((doc) => (
                  <li key={doc.code} className="document-row">
                    <div className="document-meta">
                      <span className="document-code">{doc.code}</span>
                      <div>
                        <h3 className="document-title">
                          <FileText size={14} aria-hidden="true" />
                          <span>{doc.title}</span>
                        </h3>
                        <p className="document-ref">{doc.reference}</p>
                        <p className="document-summary">{doc.summary}</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="navigation"
                      className="document-request-btn"
                      onClick={() => requestDocumentAccess(doc.title)}
                    >
                      Request Access <ArrowUpRight />
                    </Button>
                  </li>
                ))}
              </ul>
              <p className="documents-footnote">
                Statutory corporate documents are provided upon verified institutional request; confidential subscriber particulars and personal identification numbers are excluded.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
