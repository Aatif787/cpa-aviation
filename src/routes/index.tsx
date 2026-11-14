import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Building2, FileText, Globe2, Layers3, Lock, MapPin, Menu, Plane, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import aircraftImageAvif from "@/assets/aircraft-leasing-business-jet.avif";
import aircraftImage1024Avif from "@/assets/aircraft-leasing-business-jet-1024w.avif";
import aircraftImage640Avif from "@/assets/aircraft-leasing-business-jet-640w.avif";
import aircraftImageWebp from "@/assets/aircraft-leasing-business-jet.webp";
import aircraftImage1024Webp from "@/assets/aircraft-leasing-business-jet-1024w.webp";
import aircraftImage640Webp from "@/assets/aircraft-leasing-business-jet-640w.webp";
import leasingAircraftImageAvif from "@/assets/commercial-aircraft-operating-lease.avif";
import leasingAircraftImage1024Avif from "@/assets/commercial-aircraft-operating-lease-1024w.avif";
import leasingAircraftImage640Avif from "@/assets/commercial-aircraft-operating-lease-640w.avif";
import leasingAircraftImageWebp from "@/assets/commercial-aircraft-operating-lease.webp";
import leasingAircraftImage1024Webp from "@/assets/commercial-aircraft-operating-lease-1024w.webp";
import leasingAircraftImage640Webp from "@/assets/commercial-aircraft-operating-lease-640w.webp";
import cityImageAvif from "@/assets/gift-city-ifsc-gujarat.avif";
import cityImage1024Avif from "@/assets/gift-city-ifsc-gujarat-1024w.avif";
import cityImage640Avif from "@/assets/gift-city-ifsc-gujarat-640w.avif";
import cityImageWebp from "@/assets/gift-city-ifsc-gujarat.webp";
import cityImage1024Webp from "@/assets/gift-city-ifsc-gujarat-1024w.webp";
import cityImage640Webp from "@/assets/gift-city-ifsc-gujarat-640w.webp";
import giftCityAerialAvif from "@/assets/gift-city-ifsc-aerial-skyline.avif";
import giftCityAerial1024Avif from "@/assets/gift-city-ifsc-aerial-skyline-1024w.avif";
import giftCityAerial640Avif from "@/assets/gift-city-ifsc-aerial-skyline-640w.avif";
import giftCityAerialWebp from "@/assets/gift-city-ifsc-aerial-skyline.webp";
import giftCityAerial1024Webp from "@/assets/gift-city-ifsc-aerial-skyline-1024w.webp";
import giftCityAerial640Webp from "@/assets/gift-city-ifsc-aerial-skyline-640w.webp";
import ahmedabadImageAvif from "@/assets/ahmedabad-commercial-aviation-hub.avif";
import ahmedabadImage1024Avif from "@/assets/ahmedabad-commercial-aviation-hub-1024w.avif";
import ahmedabadImage640Avif from "@/assets/ahmedabad-commercial-aviation-hub-640w.avif";
import ahmedabadImageWebp from "@/assets/ahmedabad-commercial-aviation-hub.webp";
import ahmedabadImage1024Webp from "@/assets/ahmedabad-commercial-aviation-hub-1024w.webp";
import ahmedabadImage640Webp from "@/assets/ahmedabad-commercial-aviation-hub-640w.webp";
import suratImageAvif from "@/assets/surat-gujarat-economic-corridor.avif";
import suratImage1024Avif from "@/assets/surat-gujarat-economic-corridor-1024w.avif";
import suratImage640Avif from "@/assets/surat-gujarat-economic-corridor-640w.avif";
import suratImageWebp from "@/assets/surat-gujarat-economic-corridor.webp";
import suratImage1024Webp from "@/assets/surat-gujarat-economic-corridor-1024w.webp";
import suratImage640Webp from "@/assets/surat-gujarat-economic-corridor-640w.webp";
import contactClouds1Avif from "@/assets/aviation-high-altitude-clouds-1.avif";
import contactClouds1_640Avif from "@/assets/aviation-high-altitude-clouds-1-640w.avif";
import contactClouds1Webp from "@/assets/aviation-high-altitude-clouds-1.webp";
import contactClouds1_640Webp from "@/assets/aviation-high-altitude-clouds-1-640w.webp";
import contactClouds2Avif from "@/assets/aviation-high-altitude-clouds-2.avif";
import contactClouds2_640Avif from "@/assets/aviation-high-altitude-clouds-2-640w.avif";
import contactClouds2Webp from "@/assets/aviation-high-altitude-clouds-2.webp";
import contactClouds2_640Webp from "@/assets/aviation-high-altitude-clouds-2-640w.webp";
import contactClouds3Avif from "@/assets/aviation-high-altitude-clouds-3.avif";
import contactClouds3_640Avif from "@/assets/aviation-high-altitude-clouds-3-640w.avif";
import contactClouds3Webp from "@/assets/aviation-high-altitude-clouds-3.webp";
import contactClouds3_640Webp from "@/assets/aviation-high-altitude-clouds-3-640w.webp";
import cpaLogoAvif from "@/assets/cpa-aviation-leasing-capital-logo.avif";
import cpaLogo160Avif from "@/assets/cpa-aviation-leasing-capital-logo-160w.avif";
import cpaLogoWebp from "@/assets/cpa-aviation-leasing-capital-logo.webp";
import cpaLogo160Webp from "@/assets/cpa-aviation-leasing-capital-logo-160w.webp";
import cpaLogoPng from "@/assets/cpa-aviation-leasing-capital-logo.png";
import flightFilm from "@/assets/white-aircraft-flight.mp4.asset.json";
import flightStill from "@/assets/white-aircraft-still.jpg.asset.json";
import { useAviationMotion } from "@/hooks/use-aviation-motion";
import {
  HERO_POSTER_PATH,
  LEGAL_NAME,
  SEO_DESCRIPTION,
  SEO_TITLE,
  buildStructuredData,
  normalizeOrigin,
} from "@/lib/seo";

const LazyContactForm = lazy(() => import("@/components/ContactForm").then(m => ({ default: m.ContactForm })));
const LazyLegalDialog = lazy(() => import("@/components/LegalDialog").then(m => ({ default: m.LegalDialog })));

export const Route = createFileRoute("/")({
  head: () => {
    const siteOrigin = normalizeOrigin(import.meta.env["VITE_SITE_URL"] as string | undefined);
    const ogImage = siteOrigin ? `${siteOrigin}${HERO_POSTER_PATH}` : HERO_POSTER_PATH;
    return {
      meta: [
        { title: SEO_TITLE },
        { name: "description", content: SEO_DESCRIPTION },
        { property: "og:title", content: SEO_TITLE },
        { property: "og:description", content: SEO_DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_IN" },
        { property: "og:site_name", content: LEGAL_NAME },
        { property: "og:image", content: ogImage },
        { property: "og:image:alt", content: "Aircraft in flight above sunlit clouds for CPA Aviation Leasing Capital IFSC Private Limited" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SEO_TITLE },
        { name: "twitter:description", content: SEO_DESCRIPTION },
        { name: "twitter:image", content: ogImage },
        ...(siteOrigin ? [{ property: "og:url", content: `${siteOrigin}/` }] : []),
      ],
      links: [
        ...(siteOrigin ? [{ rel: "canonical", href: `${siteOrigin}/` }] : []),
      ],
    };
  },
  component: Index,
});

const navigation = [
  { label: "About", id: "about" },
  { label: "Operating Lease", id: "leasing" },
  { label: "Business Scope", id: "business-scope" },
  { label: "GIFT City", id: "gift-city" },
  { label: "Corporate Info", id: "corporate-info" },
];

const CORPORATE_DOCUMENTS = [
  {
    code: "01",
    title: "Certificate of Incorporation",
    reference: "CIN U66190GJ2026PTC180823 · 16 July 2026",
    summary: "Statutory incorporation record confirming registration as a private limited company in Gujarat, India.",
  },
  {
    code: "02",
    title: "Memorandum of Association (MoA)",
    reference: "Stated Corporate Objectives",
    summary: "Sets out the company's aviation leasing, financing, and asset ownership objects, with confidential subscriber particulars redacted.",
  },
  {
    code: "03",
    title: "Letter of Approval (LoA)",
    reference: "Permitted IFSC Operation",
    summary: "Identifies operating lease for aircraft as the authorised operation, subject to applicable regulatory conditions.",
  },
] as const;

const GUJARAT_SCENES = [
  {
    code: "01",
    label: "GIFT City",
    headingTop: "Based in",
    headingAccent: "GIFT City",
    paragraphs: [
      "Located in Gujarat International Finance Tec-City, CPA Aviation Leasing Capital operates from India's dedicated IFSC jurisdiction for cross-border aircraft leasing and aviation finance.",
      "Its presence in GIFT City forms an important part of the company's corporate identity and business structure.",
    ],
    location: "GIFT City, Gandhinagar, Gujarat",
    caption: "GIFT City, Gandhinagar · Architectural visualisation",
    avifSrcSet: `${cityImage640Avif} 640w, ${cityImage1024Avif} 1024w, ${cityImageAvif} 1536w`,
    webpSrcSet: `${cityImage640Webp} 640w, ${cityImage1024Webp} 1024w, ${cityImageWebp} 1536w`,
    image: cityImageWebp,
    alt: "International financial towers at GIFT City IFSC, Gandhinagar, Gujarat",
    width: 1536,
    height: 1024,
  },
  {
    code: "02",
    label: "IFSC District",
    headingTop: "Operating from",
    headingAccent: "IFSC District",
    paragraphs: [
      "Within Gandhinagar's International Financial Services Centre, dedicated commercial and regulatory frameworks support international aircraft leasing structures.",
      "Operating from this IFSC jurisdiction places the company inside India's designated hub for cross-border aviation finance.",
    ],
    location: "GIFT City IFSC Zone · Gandhinagar",
    caption: "GIFT City IFSC Zone, Gandhinagar · Illustrative aerial visual",
    avifSrcSet: `${giftCityAerial640Avif} 640w, ${giftCityAerial1024Avif} 1024w, ${giftCityAerialAvif} 1376w`,
    webpSrcSet: `${giftCityAerial640Webp} 640w, ${giftCityAerial1024Webp} 1024w, ${giftCityAerialWebp} 1376w`,
    image: giftCityAerialWebp,
    alt: "Aerial skyline of the GIFT City IFSC aviation leasing district in Gandhinagar, Gujarat",
    width: 1376,
    height: 768,
  },
  {
    code: "03",
    label: "Ahmedabad",
    headingTop: "Connected to",
    headingAccent: "Ahmedabad",
    paragraphs: [
      "Positioned close to Ahmedabad, GIFT City links India's dedicated IFSC jurisdiction with one of Gujarat's primary commercial and aviation centres.",
      "This proximity supports connectivity with banking, legal, and institutional stakeholders while the company's operations remain anchored in GIFT City.",
    ],
    location: "Ahmedabad · Gujarat Commercial Hub",
    caption: "Ahmedabad, Gujarat · Illustrative Sabarmati skyline visual",
    avifSrcSet: `${ahmedabadImage640Avif} 640w, ${ahmedabadImage1024Avif} 1024w, ${ahmedabadImageAvif} 1376w`,
    webpSrcSet: `${ahmedabadImage640Webp} 640w, ${ahmedabadImage1024Webp} 1024w, ${ahmedabadImageWebp} 1376w`,
    image: ahmedabadImageWebp,
    alt: "Sabarmati Riverfront commercial skyline of Ahmedabad near GIFT City, Gujarat",
    width: 1376,
    height: 768,
  },
  {
    code: "04",
    label: "Surat",
    headingTop: "Anchored in",
    headingAccent: "Gujarat",
    paragraphs: [
      "Across Gujarat's major enterprise centres from Gandhinagar and Ahmedabad to Surat, commercial infrastructure underpins long-term financial activity.",
      "Operating within this corridor aligns the company with a state structured for international trade, aviation services, and enterprise growth.",
    ],
    location: "Surat · Gujarat Economic Corridor",
    caption: "Surat, Gujarat · Illustrative commercial skyline visual",
    avifSrcSet: `${suratImage640Avif} 640w, ${suratImage1024Avif} 1024w, ${suratImageAvif} 1376w`,
    webpSrcSet: `${suratImage640Webp} 640w, ${suratImage1024Webp} 1024w, ${suratImageWebp} 1376w`,
    image: suratImageWebp,
    alt: "Modern commercial skyline along the Surat business corridor in Gujarat, India",
    width: 1376,
    height: 768,
  },
] as const;

const CHARTER_SKIES = [
  {
    id: "sky-1",
    avifSrcSet: `${contactClouds1_640Avif} 640w, ${contactClouds1Avif} 1376w`,
    webpSrcSet: `${contactClouds1_640Webp} 640w, ${contactClouds1Webp} 1376w`,
    src: contactClouds1Webp,
  },
  {
    id: "sky-2",
    avifSrcSet: `${contactClouds2_640Avif} 640w, ${contactClouds2Avif} 1376w`,
    webpSrcSet: `${contactClouds2_640Webp} 640w, ${contactClouds2Webp} 1376w`,
    src: contactClouds2Webp,
  },
  {
    id: "sky-3",
    avifSrcSet: `${contactClouds3_640Avif} 640w, ${contactClouds3Avif} 1376w`,
    webpSrcSet: `${contactClouds3_640Webp} 640w, ${contactClouds3Webp} 1376w`,
    src: contactClouds3Webp,
  },
] as const;

function Wordmark() {
  return <a href="#top" className="wordmark" aria-label="CPA Aviation Leasing Capital IFSC Private Limited home">
    <picture>
      <source srcSet={`${cpaLogo160Avif} 160w, ${cpaLogoAvif} 268w`} sizes="96px" type="image/avif" />
      <source srcSet={`${cpaLogo160Webp} 160w, ${cpaLogoWebp} 268w`} sizes="96px" type="image/webp" />
      <img className="wordmark-logo" src={cpaLogoPng} alt="CPA Aviation Leasing Capital IFSC Private Limited logo" width={268} height={159} decoding="async" />
    </picture>
  </a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [desktopVideo, setDesktopVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [heroInView, setHeroInView] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);
  const [cityIndex, setCityIndex] = useState(0);
  const [cityPaused, setCityPaused] = useState(false);
  const [cityInView, setCityInView] = useState(false);
  const [skyIndex, setSkyIndex] = useState(0);
  const [contactVisible, setContactVisible] = useState(false);
  const [contactInView, setContactInView] = useState(false);
  const [contactFormReady, setContactFormReady] = useState(false);
  const [docRequest, setDocRequest] = useState<{ value: string; seq: number } | null>(null);
  const [schemaOrigin, setSchemaOrigin] = useState<string | undefined>(() =>
    normalizeOrigin(import.meta.env["VITE_SITE_URL"] as string | undefined),
  );
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useAviationMotion(rootRef);

  useEffect(() => {
    const configured = normalizeOrigin(import.meta.env["VITE_SITE_URL"] as string | undefined);
    setSchemaOrigin(configured ?? window.location.origin);

    const nav = navigator as Navigator & {
      connection?: {
        saveData?: boolean;
        effectiveType?: string;
        addEventListener?: (t: string, cb: () => void) => void;
        removeEventListener?: (t: string, cb: () => void) => void;
      };
    };
    const isConstrainedNetwork = () =>
      Boolean(nav.connection?.saveData)
      || nav.connection?.effectiveType === "slow-2g"
      || nav.connection?.effectiveType === "2g";

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

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(element => observer.observe(element));
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-25% 0px -45% 0px" });
    document.querySelectorAll("main section[id]").forEach(element => sectionObserver.observe(element));

    let heroObserver: IntersectionObserver | undefined;
    if (heroRef.current) {
      heroObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => setHeroInView(entry.isIntersecting));
      });
      heroObserver.observe(heroRef.current);
    }

    const cityEl = document.getElementById("gift-city");
    let cityObserver: IntersectionObserver | undefined;
    if (cityEl) {
      cityObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => setCityInView(entry.isIntersecting));
      });
      cityObserver.observe(cityEl);
    }

    const contactEl = document.getElementById("contact");
    let contactObserver: IntersectionObserver | undefined;
    let contactFormObserver: IntersectionObserver | undefined;
    if (contactEl) {
      contactObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          setContactInView(entry.isIntersecting);
          if (entry.isIntersecting) setContactVisible(true);
        });
      }, { threshold: 0.05 });
      contactObserver.observe(contactEl);

      contactFormObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setContactFormReady(true);
            contactFormObserver?.disconnect();
          }
        });
      }, { rootMargin: "550px 0px" });
      contactFormObserver.observe(contactEl);
    }
    if (window.location.hash === "#contact") {
      setContactVisible(true);
      setContactFormReady(true);
    }
    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
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
    const activate = () => { if (!cancelled) setVideoReady(true); };
    const schedule = () => {
      if (cancelled) return;
      idleId = win.requestIdleCallback ? win.requestIdleCallback(activate, { timeout: 1400 }) : undefined;
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
    if (playing && !reducedMotion && desktopVideo && heroInView) video.play().catch(() => setPlaying(false));
    else video.pause();
  }, [playing, reducedMotion, desktopVideo, heroInView, videoReady]);

  useEffect(() => {
    if (reducedMotion || cityPaused || !cityInView) return;
    const timer = window.setInterval(() => {
      setCityIndex(current => (current + 1) % GUJARAT_SCENES.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reducedMotion, cityPaused, cityInView]);

  useEffect(() => {
    if (reducedMotion || !contactInView) return;
    const timer = window.setInterval(() => {
      setSkyIndex(current => (current + 1) % CHARTER_SKIES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [reducedMotion, contactInView]);

  const activeScene = GUJARAT_SCENES[cityIndex] ?? GUJARAT_SCENES[0];
  const requestDocumentAccess = (docTitle: string) => {
    setDocRequest(prev => ({ value: `Document Access Request: ${docTitle}`, seq: (prev?.seq ?? 0) + 1 }));
    setContactVisible(true);
    setContactFormReady(true);
    document.getElementById("contact")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  };
  const navLinks = navigation.map(item => <Button key={item.id} asChild variant="navigation" className={activeSection === item.id ? "active" : ""}><a href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</a></Button>);
  const structuredDataJson = JSON.stringify(buildStructuredData(schemaOrigin)).replaceAll("<", "\\u003c");

  return <div id="top" ref={rootRef}>
    <script id="cpa-structured-data" type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: structuredDataJson }} />
    <div className="page-atmosphere" aria-hidden="true">
      <div className="atmo-sunwash" data-atmo-sunwash />
      <div className="atmo-cool-haze" data-atmo-haze />
    </div>
    <header className="site-header"><div className="page-width header-inner"><Wordmark />
      <nav aria-label="Main navigation" className="desktop-nav">{navLinks}<Button asChild variant="cinematic"><a href="#contact" onClick={() => setContactFormReady(true)}>Enquire <ArrowUpRight /></a></Button></nav>
      <Button variant="navigation" size="icon" className="mobile-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </div>{menuOpen && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{navLinks}<Button asChild variant="aviation"><a href="#contact" onClick={() => { setMenuOpen(false); setContactFormReady(true); }}>Enquire <ArrowUpRight /></a></Button></nav>}</header>

    <main>
      <section ref={heroRef} className="hero" aria-label="CPA Aviation Leasing Capital IFSC Private Limited">
        <div className="hero-film-reveal">
          <picture>
            <source srcSet="/media/white-aircraft-still-768w.avif 768w, /media/white-aircraft-still-1280w.avif 1280w, /media/white-aircraft-still.avif 1920w" sizes="100vw" type="image/avif" />
            <source srcSet="/media/white-aircraft-still-768w.webp 768w, /media/white-aircraft-still-1280w.webp 1280w, /media/white-aircraft-still.webp 1920w" sizes="100vw" type="image/webp" />
            <img src={flightStill.url} alt="Commercial aircraft in flight above sunlit clouds for CPA Aviation Leasing Capital in GIFT City" className="hero-poster" width={1920} height={1080} fetchPriority="high" decoding="sync" />
          </picture>
          {!reducedMotion && desktopVideo && videoReady && <video ref={videoRef} className="hero-media" autoPlay loop muted playsInline preload="metadata" aria-hidden="true"><source src={flightFilm.url} type="video/mp4" /></video>}
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
        <div className="page-width hero-inner"><div className="hero-copy">
          <h1>CPA Aviation<br /><span>Leasing Capital</span></h1>
          <p className="hero-description">CPA Aviation Leasing Capital IFSC Private Limited focuses on aircraft operating lease activities and aviation asset structures from GIFT City, Gujarat.</p>
          <div className="hero-actions"><Button asChild variant="aviation"><a href="#about">About the Company <ArrowUpRight /></a></Button><Button asChild variant="cinematic"><a href="#contact" onClick={() => setContactFormReady(true)}>Contact Us <ArrowUpRight /></a></Button></div>
        </div></div>
        <div className="page-width hero-bottom"><Button asChild variant="navigation"><a href="#about" className="scroll-link"><span className="scroll-line" />Scroll to discover <ArrowDown size={12} /></a></Button><span className="location-tag"><MapPin size={12} /> GIFT City IFSC, India</span></div>
      </section>

      <section id="about" className="overview page-width">
        <div className="section-topline reveal"><p className="eyebrow">About the Company</p><span className="section-number">01</span></div>
        <div className="overview-grid">
          <div className="reveal" data-liquid-text>
            <h2>A Focused Approach<br /><span className="muted-heading">to Aircraft Leasing</span></h2>
            <div className="editorial-copy">
              <p className="section-description">CPA Aviation Leasing Capital IFSC Private Limited is an aircraft leasing company based in GIFT City, Gujarat, India. The company is structured for aircraft leasing and aviation asset management opportunities through an International Financial Services Centre (IFSC) framework.</p>
              <p className="section-description">Its Memorandum of Association business objectives cover aircraft asset leasing, aviation finance structures in India, asset ownership and management, along with related leasing and investment structures.</p>
            </div>
            <Button asChild variant="navigation"><a href="#leasing">Aircraft Operating Lease <ArrowUpRight /></a></Button>
          </div>
          <figure className="m-0" data-liquid="overview"><span className="liquid-frame"><picture><source srcSet={`${aircraftImage640Avif} 640w, ${aircraftImage1024Avif} 1024w, ${aircraftImageAvif} 1920w`} sizes="(max-width: 700px) 92vw, 46vw" type="image/avif" /><source srcSet={`${aircraftImage640Webp} 640w, ${aircraftImage1024Webp} 1024w, ${aircraftImageWebp} 1920w`} sizes="(max-width: 700px) 92vw, 46vw" type="image/webp" /><img className="overview-image liquid-media" src={aircraftImageWebp} alt="Executive aircraft cruising above clouds representing aircraft leasing operations in India" width={1920} height={1088} loading="lazy" decoding="async" /></picture><span className="frame-atmosphere" aria-hidden="true"><span className="atmo-depth-wrap frame-cloud-wrap--far" data-atmo-depth="frame-far"><span className="cloud-track cloud-track--frame-far" /></span><span className="atmo-depth-wrap frame-cloud-wrap--near" data-atmo-depth="frame-near"><span className="cloud-track cloud-track--frame-near" /></span><span className="frame-sunbeam" /><span className="frame-metallic-sheen" /><span className="frame-haze" /></span><span className="liquid-ribbon" aria-hidden="true" /><span className="liquid-sweep" aria-hidden="true" /></span><figcaption className="image-caption reveal"><span>Illustrative aircraft visual</span></figcaption></figure>
        </div>
      </section>

      <section id="leasing" className="leasing-section">
        <svg className="blueprint" viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="bp-sheen-grad" gradientUnits="userSpaceOnUse" x1="-460" y1="0" x2="-140" y2="0">
              <stop offset="0" className="bp-sheen-edge" />
              <stop offset=".5" className="bp-sheen-core" />
              <stop offset="1" className="bp-sheen-edge" />
            </linearGradient>
          </defs>
          <path className="bp-line" d="M1100 310 C1052 282 986 272 892 272 L340 272 C252 272 178 284 132 296 L132 324 C178 336 252 348 340 348 L892 348 C986 348 1052 338 1100 310 Z" />
          <path className="bp-line" d="M648 272 L420 96 L378 102 L498 272 Z" />
          <path className="bp-line" d="M648 348 L420 524 L378 518 L498 348 Z" />
          <path className="bp-line" d="M246 288 L152 198 L122 204 L192 288 Z" />
          <path className="bp-line" d="M246 336 L152 426 L122 420 L192 336 Z" />
          <path className="bp-line" d="M286 312 L150 306 L150 318 Z" />
          <ellipse className="bp-line" cx="258" cy="268" rx="46" ry="13" />
          <ellipse className="bp-line" cx="258" cy="352" rx="46" ry="13" />
          <path className="bp-axis" d="M96 310 L1140 310" />
          <path className="bp-axis" d="M399 96 L399 524" />
          <path className="bp-mark" d="M385 96 L413 96" />
          <path className="bp-mark" d="M385 524 L413 524" />
          <circle className="bp-mark" cx="1100" cy="310" r="8" />
          <path className="bp-mark" d="M132 310 L104 310" />
          <path className="bp-mark" d="M132 296 L132 276" />
          <path className="bp-mark" d="M132 324 L132 344" />
          <g className="bp-sheen">
            <path d="M1100 310 C1052 282 986 272 892 272 L340 272 C252 272 178 284 132 296 L132 324 C178 336 252 348 340 348 L892 348 C986 348 1052 338 1100 310 Z" />
            <path d="M648 272 L420 96 L378 102 L498 272 Z" />
            <path d="M648 348 L420 524 L378 518 L498 348 Z" />
          </g>
        </svg>
        <div className="page-width">
          <div className="section-topline reveal"><p className="eyebrow">Aircraft Leasing</p><span className="section-number">02</span></div>
          <div className="leasing-grid">
            <figure className="leasing-figure m-0" data-liquid="leasing">
              <span className="liquid-frame leasing-frame">
                <picture>
                  <source srcSet={`${leasingAircraftImage640Avif} 640w, ${leasingAircraftImage1024Avif} 1024w, ${leasingAircraftImageAvif} 1376w`} sizes="(max-width: 700px) 92vw, 46vw" type="image/avif" />
                  <source srcSet={`${leasingAircraftImage640Webp} 640w, ${leasingAircraftImage1024Webp} 1024w, ${leasingAircraftImageWebp} 1376w`} sizes="(max-width: 700px) 92vw, 46vw" type="image/webp" />
                  <img className="leasing-image liquid-media" src={leasingAircraftImageWebp} alt="Commercial jet aircraft ascending for aircraft operating lease services in GIFT City IFSC" width={1376} height={768} loading="lazy" decoding="async" />
                </picture>
                <span className="frame-atmosphere" aria-hidden="true"><span className="frame-sunbeam" /><span className="frame-metallic-sheen" /></span>
                <span className="liquid-ribbon" aria-hidden="true" />
                <span className="liquid-sweep" aria-hidden="true" />
              </span>
              <figcaption className="image-caption reveal"><span>Operating lease study · Illustrative aircraft visual</span></figcaption>
            </figure>
            <div className="reveal" data-liquid-text>
              <h2>Aircraft Operating<br /><span className="muted-heading">Lease</span></h2>
              <div className="editorial-copy">
                <p className="section-description">Aircraft operating leases provide an alternative to outright aircraft ownership. They form an important part of commercial aviation finance, allowing aircraft to be made available under agreed lease arrangements.</p>
                <p className="section-description">CPA Aviation Leasing Capital IFSC Private Limited has received a Letter of Approval identifying operating lease for aircraft as an authorised operation, subject to applicable regulatory conditions.</p>
              </div>
              <div className="leasing-meta">
                <span>Authorised Scope</span>
                <strong>Operating lease for aircraft under Letter of Approval conditions</strong>
                <Button asChild variant="navigation"><a href="#business-scope">Explore MoA Business Objectives <ArrowUpRight /></a></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="business-scope" className="focus-section page-width">
        <div className="section-topline reveal"><p className="eyebrow">Our Business Scope</p><span className="section-number">03</span></div>
        <div className="scope-header reveal">
          <h2>Memorandum of Association<br /><span className="muted-heading">Business Objectives</span></h2>
          <p className="scope-intro">The areas below reflect objectives stated in the company&apos;s Memorandum of Association. Activities beyond the authorised aircraft operating lease remain subject to applicable regulatory approvals.</p>
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
            <p className="scope-body">Aircraft, helicopters, engines and related aviation assets form part of the company&apos;s stated business objectives, including acquisition, leasing and asset management.</p>
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
            <p className="scope-body">The company&apos;s stated objects include aviation asset financing and related ownership and financing structures.</p>
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
            <p className="scope-body">The company&apos;s stated objectives include SPVs, co-ownership and fractional participation models, subject to applicable regulatory requirements.</p>
          </article>
        </div>
      </section>

      <section id="approach" className="approach-section page-width">
        <svg className="flight-path" viewBox="0 0 1200 460" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="fp-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1200" y2="0">
              <stop offset="0" className="fp-edge" />
              <stop offset=".3" className="fp-core" />
              <stop offset="1" className="fp-core" />
            </linearGradient>
            <radialGradient id="fp-halo-grad">
              <stop offset="0" className="fp-halo-core" />
              <stop offset="1" className="fp-halo-edge" />
            </radialGradient>
          </defs>
          <path className="fp-track" d="M-40 372 C160 364 250 190 470 198 C690 206 700 356 900 330 C1040 312 1120 150 1240 92" />
          <path className="fp-draw" d="M-40 372 C160 364 250 190 470 198 C690 206 700 356 900 330 C1040 312 1120 150 1240 92" />
          <g className="fp-marker" transform="translate(470 198)">
            <circle className="fp-halo" r="22" />
            <circle className="fp-glow" r="3.5" />
          </g>
          <g className="fp-plane" transform="translate(470 198) rotate(-3)">
            <path d="M16 0 C11 -2.4 5 -3 -2 -3 L-9 -10 L-12.5 -10 L-8.5 -3 L-16 -3 L-16 3 L-8.5 3 L-12.5 10 L-9 10 L-2 3 C5 3 11 2.4 16 0 Z" />
          </g>
        </svg>
        <div className="section-topline reveal"><p className="eyebrow">Our Approach</p><span className="section-number">04</span></div>
        <div className="approach-grid">
          <div className="reveal">
            <h2>Clarity in<br /><span className="muted-heading">Every Structure</span></h2>
          </div>
          <div className="editorial-copy reveal">
            <p className="section-description">Aircraft leasing involves more than the aircraft itself. Ownership, contractual arrangements, asset management and regulatory requirements all play an important role.</p>
            <p className="section-description">Our business objectives reflect a structured approach to aviation assets, with attention to the financial and operational considerations associated with leasing.</p>
          </div>
        </div>
      </section>

      <section id="gift-city" className="city-section page-width">
        <div className="section-topline reveal"><p className="eyebrow">GIFT City &amp; Gujarat</p><span className="section-number">05</span></div>
        <div className="city-overview-grid">
          <div className="city-copy-panel reveal" data-liquid-text>
            <div key={activeScene.code} className="city-copy-stage">
              <h2>{activeScene.headingTop}<br /><span className="muted-heading">{activeScene.headingAccent}</span></h2>
              <div className="editorial-copy">
                {activeScene.paragraphs.map(text => <p key={text} className="section-description">{text}</p>)}
              </div>
              <div className="location-tag"><Building2 size={15} /> {activeScene.location}</div>
            </div>
          </div>
          <figure className="m-0 city-visual-stack" data-liquid="city" onMouseEnter={() => setCityPaused(true)} onMouseLeave={() => setCityPaused(false)}>
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
                        onClick={() => setCityIndex(offset === 0 ? (cityIndex + 1) % GUJARAT_SCENES.length : index)}
                        aria-label={offset === 0 ? `${scene.label} — show next view` : `Show ${scene.label}`}
                      >
                        <span className="city-deck-photo">
                          <picture>
                            <source srcSet={scene.avifSrcSet} sizes="(max-width: 700px) 90vw, 48vw" type="image/avif" />
                            <source srcSet={scene.webpSrcSet} sizes="(max-width: 700px) 90vw, 48vw" type="image/webp" />
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
            <figcaption key={activeScene.code} className="image-caption city-caption-fade"><span>{activeScene.code} / 0{GUJARAT_SCENES.length} · {activeScene.caption}</span></figcaption>
          </figure>
        </div>
      </section>

      <section id="contact" className={contactVisible ? "contact-section is-contact-visible" : "contact-section"}>
        <div className="contact-sky" aria-hidden="true">
          {CHARTER_SKIES.map((sky, index) => (
            <picture key={sky.id}>
              <source srcSet={sky.avifSrcSet} sizes="100vw" type="image/avif" />
              <source srcSet={sky.webpSrcSet} sizes="100vw" type="image/webp" />
              <img
                src={sky.src}
                alt=""
                width={1376}
                height={768}
                decoding="async"
                loading="lazy"
                className={index === skyIndex ? "contact-sky-slide is-active" : "contact-sky-slide"}
              />
            </picture>
          ))}
          <svg className="contact-charter" viewBox="0 0 1600 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id="cc-route-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1600" y2="0">
                <stop offset="0" stopColor="currentColor" stopOpacity="0" />
                <stop offset=".16" stopColor="currentColor" stopOpacity=".28" />
                <stop offset=".84" stopColor="currentColor" stopOpacity=".28" />
                <stop offset="1" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="cc-trail-grad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="1600" y2="0">
                <stop offset="0" stopColor="#a3752c" stopOpacity="0" />
                <stop offset=".35" stopColor="#a3752c" stopOpacity=".52" />
                <stop offset=".85" stopColor="#1e1b18" stopOpacity=".25" />
                <stop offset="1" stopColor="#1e1b18" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="cc-arc" d="M-60 320 C320 245 620 198 960 208 C1260 217 1460 178 1660 124" />
            <path className="cc-route" d="M-80 212 C280 160 560 92 880 116 C1180 138 1410 88 1680 46" />
            <path className="cc-trail" d="M-80 212 C280 160 560 92 880 116 C1180 138 1410 88 1680 46" />
            <g className="cc-waypoint" transform="translate(462 117)">
              <circle r="10" className="cc-waypoint-ring" />
              <circle r="2.5" className="cc-waypoint-dot" />
            </g>
            <g className="cc-waypoint" transform="translate(1152 114)">
              <circle r="10" className="cc-waypoint-ring" />
              <circle r="2.5" className="cc-waypoint-dot" />
            </g>
            <g className="cc-plane" transform="translate(880 116) rotate(-1)">
              <g transform="scale(1.38)">
                <path className="cc-plane-contrail" d="M-132 -1.6 L-20 -0.6 L-20 0.6 L-132 1.6 Z" />
                <path className="cc-plane-wings" d="M4 0 L-9 -22 L-13.5 -21.2 L-5 0 L-13.5 21.2 L-9 22 Z" />
                <path className="cc-plane-tail" d="M-15 0 L-21.5 -8 L-24 -7.5 L-19.5 0 L-24 7.5 L-21.5 8 Z" />
                <path className="cc-plane-body" d="M23 0 C17.5 -2.4 10 -2.7 -18 -1.8 L-23.5 0 L-18 1.8 C10 2.7 17.5 2.4 23 0 Z" />
                <path className="cc-plane-cockpit" d="M16.5 -0.9 C19.5 -0.6 20.8 0 19.5 0.6 C18.2 0.9 16.5 0.9 16.5 -0.9 Z" />
                <ellipse className="cc-plane-engine" cx="-9.5" cy="-3.8" rx="3.4" ry="1.25" />
                <ellipse className="cc-plane-engine" cx="-9.5" cy="3.8" rx="3.4" ry="1.25" />
              </g>
            </g>
          </svg>
        </div>
        <div className="contact-content page-width">
          <p className="eyebrow"><span className="contact-pulse-dot" aria-hidden="true" />Contact</p>
          <h2 className="contact-reveal-up">Discuss an Aviation<br /><span className="muted-heading">Leasing Enquiry</span></h2>
          <p className="contact-intro contact-reveal-right">For business enquiries, aircraft operating lease discussions, or verified corporate document requests, please contact CPA Aviation Leasing Capital IFSC Private Limited.</p>
          {contactFormReady ? (
            <Suspense fallback={<div className="contact-form contact-form-skeleton" aria-hidden="true" />}>
              <LazyContactForm prefilledSubject={docRequest} />
            </Suspense>
          ) : (
            <div className="contact-form contact-form-skeleton" aria-hidden="true" />
          )}
          <div className="contact-direct">
            <a className="contact-email" href="mailto:cpaaviationleasing@gmail.com">cpaaviationleasing@gmail.com</a>
            <span aria-hidden="true">·</span>
            <a className="contact-email" href="tel:+918527712949">+91 85277 12949</a>
            <span aria-hidden="true">·</span>
            <span className="contact-office-tag">GIFT City SEZ, Gandhinagar</span>
          </div>
        </div>
      </section>

      <section id="corporate-info" className="corporate-section page-width">
        <div className="section-topline reveal"><p className="eyebrow">Corporate &amp; Regulatory Information</p><span className="section-number">06</span></div>
        <div className="corporate-layout">
          <div className="corporate-heading reveal">
            <h2>Registered Particulars<br /><span className="muted-heading">&amp; Governance</span></h2>
            <p className="corporate-note">Statutory incorporation particulars of CPA Aviation Leasing Capital IFSC Private Limited, alongside a clear distinction between its Letter of Approval activity and Memorandum of Association business objectives.</p>
          </div>
          <div className="corporate-stack">
            <dl className="corporate-list reveal">
              <div className="corporate-row"><dt>Legal Company Name</dt><dd>CPA Aviation Leasing Capital IFSC Private Limited</dd></div>
              <div className="corporate-row"><dt>Corporate Identification Number</dt><dd>U66190GJ2026PTC180823</dd></div>
              <div className="corporate-row"><dt>Incorporation Details</dt><dd>Incorporated 16 July 2026 · Private Limited Company (IFSC, Gujarat)</dd></div>
              <div className="corporate-row"><dt>Registered Office</dt><dd>U.71 S 1-4 GRD FLR 11T2, THE PLATFORM BK11 GIFTSEZ, Gift City, Gandhi Nagar, Gujarat, India, 382050</dd></div>
              <div className="corporate-row"><dt>Official Email</dt><dd><a href="mailto:cpaaviationleasing@gmail.com">cpaaviationleasing@gmail.com</a></dd></div>
              <div className="corporate-row"><dt>Telephone</dt><dd><a href="tel:+918527712949">+91 85277 12949</a></dd></div>
            </dl>

            <div className="regulatory-panel reveal" aria-labelledby="regulatory-scope-heading">
              <div className="regulatory-panel-header">
                <p id="regulatory-scope-heading" className="eyebrow">Regulatory Scope Distinction</p>
              </div>
              <div className="regulatory-grid">
                <article className="regulatory-card">
                  <span className="regulatory-kicker regulatory-kicker--loa">Letter of Approval (LoA)</span>
                  <h3>Permitted Operating Activity</h3>
                  <p>Operating lease for aircraft, conducted subject to the terms and applicable regulatory conditions set out in the company&apos;s Letter of Approval.</p>
                </article>
                <article className="regulatory-card">
                  <span className="regulatory-kicker">Memorandum of Association (MoA)</span>
                  <h3>Stated Corporate Objectives</h3>
                  <p>Broader stated objects cover aircraft, helicopter and engine leasing, aviation asset management, aviation asset financing, and SPV or co-ownership participation structures. Objectives outside the aircraft operating lease remain subject to requisite regulatory approvals prior to commencement.</p>
                </article>
              </div>
            </div>

            <div className="documents-panel reveal" aria-labelledby="corporate-docs-heading">
              <div className="documents-header">
                <p id="corporate-docs-heading" className="eyebrow">Official Corporate Documents</p>
                <span className="documents-privacy-note"><Lock size={12} aria-hidden="true" /> Controlled counterparty access</span>
              </div>
              <ul className="documents-list">
                {CORPORATE_DOCUMENTS.map(doc => (
                  <li key={doc.code} className="document-row">
                    <div className="document-meta">
                      <span className="document-code">{doc.code}</span>
                      <div>
                        <h3 className="document-title"><FileText size={14} aria-hidden="true" /><span>{doc.title}</span></h3>
                        <p className="document-ref">{doc.reference}</p>
                        <p className="document-summary">{doc.summary}</p>
                      </div>
                    </div>
                    <Button type="button" variant="navigation" className="document-request-btn" onClick={() => requestDocumentAccess(doc.title)}>
                      Request Access <ArrowUpRight />
                    </Button>
                  </li>
                ))}
              </ul>
              <p className="documents-footnote">Statutory corporate documents are provided upon verified institutional request; confidential subscriber particulars and personal identification numbers are excluded.</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div className="page-width">
        <div className="footer-grid">
          <div className="footer-brand">
            <Wordmark />
            <p className="legal-name">CPA Aviation Leasing Capital IFSC Private Limited</p>
            <p className="footer-cin">CIN: U66190GJ2026PTC180823 · Incorporated 16 July 2026</p>
          </div>
          <div className="footer-address-block">
            <p className="footer-heading">Registered Office</p>
            <p className="footer-location">U.71 S 1-4 GRD FLR 11T2, THE PLATFORM BK11 GIFTSEZ, Gift City, Gandhi Nagar, Gujarat, India, 382050</p>
            <p className="footer-contact">
              <a href="mailto:cpaaviationleasing@gmail.com">cpaaviationleasing@gmail.com</a>
              <span aria-hidden="true"> · </span>
              <a className="footer-phone whitespace-nowrap" href="tel:+918527712949">+91 85277 12949</a>
            </p>
          </div>
          <div className="footer-nav-block">
            <p className="footer-heading">Navigation</p>
            <nav className="footer-links" aria-label="Footer navigation">
              {navLinks}
              <Button asChild variant="navigation"><a href="#contact">Contact <ArrowUpRight /></a></Button>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getUTCFullYear()} CPA Aviation Leasing Capital IFSC Private Limited. All rights reserved.</span>
          <div className="footer-policies">
            <Button variant="navigation" onClick={() => setLegal("privacy")}>Privacy Policy</Button>
            <Button variant="navigation" onClick={() => setLegal("terms")}>Terms &amp; Conditions</Button>
          </div>
        </div>
      </div>
    </footer>
    {legal !== null && (
      <Suspense fallback={null}>
        <LazyLegalDialog legal={legal} onClose={() => setLegal(null)} />
      </Suspense>
    )}
  </div>;
}