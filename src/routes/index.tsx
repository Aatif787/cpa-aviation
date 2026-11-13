import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Building2, Globe2, Layers3, MapPin, Menu, Plane, X } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ServiceAdvisor } from "@/components/ServiceAdvisor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import aircraftImage from "@/assets/aircraft-flight.jpg";
import cityImage from "@/assets/gift-city.jpg";
import flightFilm from "@/assets/white-aircraft-flight.mp4.asset.json";
import flightStill from "@/assets/white-aircraft-still.jpg.asset.json";
import { useAviationMotion } from "@/hooks/use-aviation-motion";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "CPA Aviation Leasing Capital | Aircraft Leasing" },
    { name: "description", content: "CPA Aviation Leasing Capital IFSC Private Limited is based in GIFT City, Gujarat, India, with a focus on aircraft operating leases." },
    { property: "og:title", content: "CPA Aviation Leasing Capital | Aircraft Leasing" },
    { property: "og:description", content: "Aircraft operating lease opportunities from CPA Aviation Leasing Capital, based in GIFT City, India." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const navigation = [{ label: "Our Approach", id: "approach" }, { label: "Our Focus", id: "focus" }, { label: "GIFT City", id: "gift-city" }];

function Wordmark() {
  return <a href="#top" className="wordmark" aria-label="CPA Aviation home">
    <svg className="logo-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M5 37 24 5 43 37H5Z" stroke="currentColor" strokeWidth="1.3"/><path d="m13 30 11-18 11 18H13Zm11-18v24M5 37l19-7 19 7" stroke="currentColor" strokeWidth="1"/><path d="M15 41h18" stroke="currentColor" strokeWidth="1.3"/></svg>
    <span><span className="brand-name">CPA AVIATION</span><span className="brand-subtitle">Leasing Capital IFSC</span></span>
  </a>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [activeSection, setActiveSection] = useState("");
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  useAviationMotion(rootRef);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => { setReducedMotion(media.matches); setPlaying(!media.matches); };
    updateMotion();
    media.addEventListener("change", updateMotion);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal:not([data-liquid-text])").forEach(element => observer.observe(element));
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-25% 0px -45% 0px" });
    document.querySelectorAll("main section[id]").forEach(element => sectionObserver.observe(element));
    return () => { observer.disconnect(); sectionObserver.disconnect(); media.removeEventListener("change", updateMotion); };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (playing && !reducedMotion) video.play().catch(() => setPlaying(false));
    else video.pause();
  }, [playing, reducedMotion]);

  const navLinks = navigation.map(item => <Button key={item.id} asChild variant="navigation" className={activeSection === item.id ? "active" : ""}><a href={`#${item.id}`} onClick={() => setMenuOpen(false)}>{item.label}</a></Button>);

  return <div id="top" ref={rootRef}>
    <header className="site-header"><div className="page-width header-inner"><Wordmark />
      <nav aria-label="Main navigation" className="desktop-nav">{navLinks}<Button asChild variant="cinematic"><a href="#contact">Get in Touch <ArrowUpRight /></a></Button></nav>
      <Button variant="navigation" size="icon" className="mobile-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </div>{menuOpen && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{navLinks}<Button asChild variant="aviation"><a href="#contact" onClick={() => setMenuOpen(false)}>Get in Touch <ArrowUpRight /></a></Button></nav>}</header>

    <main>
      <section className="hero" aria-label="CPA Aviation">
        <div className="hero-film-reveal">
        <img src={flightStill.url} alt="Pure white aircraft flying through bright clouds" className="hero-poster" width={1920} height={1080} fetchPriority="high" />
        {!reducedMotion && <video ref={videoRef} className="hero-media" autoPlay loop muted playsInline preload="auto" poster={flightStill.url} aria-hidden="true"><source src={flightFilm.url} type="video/mp4" /></video>}
        </div>
        <div className="page-width hero-inner"><div className="hero-copy">
          <h1>CPA Aviation<br /><span>Leasing Capital</span></h1>
          <p className="hero-description">A focus on aircraft leasing from GIFT City, India.</p>
          <div className="hero-actions"><Button asChild variant="aviation"><a href="#approach">Our Approach <ArrowUpRight /></a></Button><Button asChild variant="cinematic"><a href="#contact">Contact Us <ArrowUpRight /></a></Button></div>
        </div></div>
        <div className="page-width hero-bottom"><Button asChild variant="navigation"><a href="#approach" className="scroll-link"><span className="scroll-line" />Scroll to discover <ArrowDown size={12} /></a></Button><span className="location-tag"><MapPin size={12} /> GIFT City, India</span></div>
      </section>

      <section id="approach" className="overview page-width">
        <div className="section-topline reveal"><p className="eyebrow">Our Approach</p><span className="section-number">01</span></div>
        <div className="overview-grid"><div className="reveal" data-liquid-text><h2>Aircraft leasing.<br /><span className="muted-heading">Our core focus.</span></h2><p className="section-description">Our focus is on aircraft operating lease opportunities through an IFSC company based in GIFT City.</p><Button asChild variant="navigation"><a href="#focus">Our Focus <ArrowUpRight /></a></Button></div><figure className="m-0" data-liquid="overview"><span className="liquid-frame"><img className="overview-image liquid-media" src={aircraftImage} alt="Business aircraft in flight above a cloudscape" width={1920} height={1088} loading="lazy" /><span className="liquid-ribbon" aria-hidden="true" /><span className="liquid-sweep" aria-hidden="true" /></span><figcaption className="image-caption reveal"><span>Illustrative aircraft visual</span><ArrowUpRight size={13} /></figcaption></figure></div>
      </section>

      <section id="focus" className="focus-section page-width">
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
        <div className="section-topline reveal"><p className="eyebrow">Our Focus</p><span className="section-number">02</span></div><div className="focus-heading reveal"><h2>Leasing and aviation assets</h2></div>
        <div className="focus-list">
          <article className="focus-item reveal"><Plane className="focus-icon" /><h3>Aircraft Leasing</h3><p>Operating lease opportunities for aircraft.</p></article>
          <article className="focus-item reveal"><Globe2 className="focus-icon" /><h3>Aviation Assets</h3><p>Potential aircraft ownership and asset management activities, subject to applicable requirements.</p></article>
          <article className="focus-item reveal"><Layers3 className="focus-icon" /><h3>Investment Structures</h3><p>Potential ownership and fractional participation structures, subject to applicable regulatory requirements.</p></article>
        </div>
      </section>

      <section id="gift-city" className="city-section"><span className="liquid-fill" data-liquid="city"><img src={cityImage} alt="Architectural visual of the GIFT City financial district" className="city-image liquid-media" width={1536} height={1024} loading="lazy" /><span className="liquid-ribbon" aria-hidden="true" /><span className="liquid-sweep" aria-hidden="true" /></span><div className="page-width reveal" data-liquid-text><p className="eyebrow">Our Location</p><h2>Based in<br />GIFT City.</h2><p className="section-description">CPA Aviation Leasing Capital IFSC Private Limited is based in GIFT City, Gandhinagar, Gujarat.</p><div className="location-tag"><Building2 size={15} /> Gandhinagar, Gujarat, India</div></div><span className="city-note">Architectural visualisation</span></section>

      <section id="advisor" className="advisor-section page-width">
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
        <div className="section-topline reveal"><p className="eyebrow">Service Finder</p><span className="section-number">04</span></div><div className="focus-heading reveal"><h2>Tell us what you need.<br /><span className="muted-heading">We will point you to the right area.</span></h2></div><ServiceAdvisor /></section>

      <section id="contact" className="contact-section"><span className="liquid-fill" data-liquid="contact"><img className="contact-background liquid-media" src={aircraftImage} width={1920} height={1088} alt="" loading="lazy" /><span className="liquid-ribbon" aria-hidden="true" /><span className="liquid-sweep" aria-hidden="true" /></span><div className="reveal" data-liquid-text><p className="eyebrow">Contact Us</p><h2>Discuss your<br /><span className="muted-heading">leasing requirements.</span></h2><ContactForm /><a className="contact-email" href="mailto:info@cpaaviations.com">info@cpaaviations.com</a></div></section>
    </main>

    <footer><div className="page-width"><div className="footer-top"><div><Wordmark /><p className="legal-name">CPA AVIATION LEASING CAPITAL IFSC PRIVATE LIMITED</p><p className="footer-location">GIFT City, Gandhinagar, Gujarat, India.</p></div><nav className="footer-links" aria-label="Footer navigation">{navLinks}<Button asChild variant="navigation"><a href="#contact">Contact <ArrowUpRight /></a></Button></nav></div><div className="footer-bottom"><span>© {new Date().getUTCFullYear()} CPA AVIATION LEASING CAPITAL IFSC PRIVATE LIMITED.</span><div className="footer-policies"><Button variant="navigation" onClick={() => setLegal("privacy")}>Privacy Policy</Button><Button variant="navigation" onClick={() => setLegal("terms")}>Terms &amp; Conditions</Button></div></div></div></footer>
    <Dialog open={legal !== null} onOpenChange={open => { if (!open) setLegal(null); }}><DialogContent><DialogTitle>{legal === "privacy" ? "Privacy Policy" : "Terms & Conditions"}</DialogTitle><DialogDescription className="leading-7">Our {legal === "privacy" ? "privacy policy is" : "website terms are"} not yet available on this website. For {legal === "privacy" ? "privacy enquiries" : "legal enquiries"}, please email <a className="text-primary" href="mailto:info@cpaaviations.com">info@cpaaviations.com</a>.</DialogDescription></DialogContent></Dialog>
    <svg className="liquid-defs" aria-hidden="true" focusable="false"><defs><filter id="liquid-refract" x="-15%" y="-60%" width="130%" height="220%"><feTurbulence type="fractalNoise" baseFrequency="0.011 0.055" numOctaves="2" seed="11" result="ripple" /><feDisplacementMap in="SourceGraphic" in2="ripple" scale="7" xChannelSelector="R" yChannelSelector="G" /></filter></defs></svg>
  </div>;
}