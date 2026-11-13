import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Building2, Globe2, Layers3, MapPin, Menu, Plane, X } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ServiceAdvisor } from "@/components/ServiceAdvisor";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import aircraftImage from "@/assets/aircraft-flight.jpg";
import leasingAircraftImage from "@/assets/leasing-aircraft.jpg";
import cityImage from "@/assets/gift-city.jpg";
import giftCityAerial from "@/assets/gift-city-aerial.jpg";
import ahmedabadImage from "@/assets/ahmedabad-skyline.jpg";
import suratImage from "@/assets/surat-skyline.jpg";
import cpaLogo from "@/assets/cpa-logo.png";
import flightFilm from "@/assets/white-aircraft-flight.mp4.asset.json";
import flightStill from "@/assets/white-aircraft-still.jpg.asset.json";
import { useAviationMotion } from "@/hooks/use-aviation-motion";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "CPA Aviation Leasing Capital | Aircraft Leasing" },
    { name: "description", content: "CPA Aviation Leasing Capital IFSC Private Limited is based in GIFT City, Gujarat, India, with stated objectives in aircraft leasing, aviation asset financing, and leasing structures." },
    { property: "og:title", content: "CPA Aviation Leasing Capital | Aircraft Leasing" },
    { property: "og:description", content: "Aircraft operating lease activities and aviation asset structures from CPA Aviation Leasing Capital IFSC Private Limited in GIFT City, Gujarat." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const navigation = [
  { label: "About", id: "about" },
  { label: "Operating Lease", id: "leasing" },
  { label: "Business Scope", id: "business-scope" },
  { label: "GIFT City", id: "gift-city" },
];

function Wordmark() {
  return <a href="#top" className="wordmark" aria-label="CPA Aviation home">
    <img className="wordmark-logo" src={cpaLogo} alt="CPA Aviation — Elevating Aviation" width={268} height={159} />
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
    <div className="page-atmosphere" aria-hidden="true">
      <div className="atmo-sunwash" data-atmo-sunwash />
      <div className="atmo-cool-haze" data-atmo-haze />
    </div>
    <header className="site-header"><div className="page-width header-inner"><Wordmark />
      <nav aria-label="Main navigation" className="desktop-nav">{navLinks}<Button asChild variant="cinematic"><a href="#contact">Get in Touch <ArrowUpRight /></a></Button></nav>
      <Button variant="navigation" size="icon" className="mobile-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
    </div>{menuOpen && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{navLinks}<Button asChild variant="aviation"><a href="#contact" onClick={() => setMenuOpen(false)}>Get in Touch <ArrowUpRight /></a></Button></nav>}</header>

    <main>
      <section className="hero" aria-label="CPA Aviation">
        <div className="hero-film-reveal">
        <img src={flightStill.url} alt="Pure white aircraft flying through bright clouds" className="hero-poster" width={1920} height={1080} fetchPriority="high" />
        {!reducedMotion && <video ref={videoRef} className="hero-media" autoPlay loop muted playsInline preload="auto" poster={flightStill.url} aria-hidden="true"><source src={flightFilm.url} type="video/mp4" /></video>}
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
        </div>
        <div className="page-width hero-inner"><div className="hero-copy">
          <h1>CPA Aviation<br /><span>Leasing Capital</span></h1>
          <p className="hero-description">Aircraft operating lease activities and aviation asset structures from GIFT City, Gujarat.</p>
          <div className="hero-actions"><Button asChild variant="aviation"><a href="#about">About the Company <ArrowUpRight /></a></Button><Button asChild variant="cinematic"><a href="#contact">Contact Us <ArrowUpRight /></a></Button></div>
        </div></div>
        <div className="page-width hero-bottom"><Button asChild variant="navigation"><a href="#about" className="scroll-link"><span className="scroll-line" />Scroll to discover <ArrowDown size={12} /></a></Button><span className="location-tag"><MapPin size={12} /> GIFT City, India</span></div>
      </section>

      <section id="about" className="overview page-width">
        <div className="section-topline reveal"><p className="eyebrow">About the Company</p><span className="section-number">01</span></div>
        <div className="overview-grid">
          <div className="reveal" data-liquid-text>
            <h2>A Focused Approach<br /><span className="muted-heading">to Aircraft Leasing</span></h2>
            <div className="editorial-copy">
              <p className="section-description">CPA Aviation Leasing Capital IFSC Private Limited is based in GIFT City, Gujarat. The company has been established with a focus on aircraft leasing and aviation asset opportunities through an IFSC structure.</p>
              <p className="section-description">Its stated business objectives include aircraft leasing, aviation asset financing, asset ownership and management, along with related leasing and investment structures.</p>
            </div>
            <Button asChild variant="navigation"><a href="#leasing">Aircraft Operating Lease <ArrowUpRight /></a></Button>
          </div>
          <figure className="m-0" data-liquid="overview"><span className="liquid-frame"><img className="overview-image liquid-media" src={aircraftImage} alt="Business aircraft in flight above a cloudscape" width={1920} height={1088} loading="lazy" /><span className="frame-atmosphere" aria-hidden="true"><span className="atmo-depth-wrap frame-cloud-wrap--far" data-atmo-depth="frame-far"><span className="cloud-track cloud-track--frame-far" /></span><span className="atmo-depth-wrap frame-cloud-wrap--near" data-atmo-depth="frame-near"><span className="cloud-track cloud-track--frame-near" /></span><span className="frame-sunbeam" /><span className="frame-metallic-sheen" /><span className="frame-haze" /></span><span className="liquid-ribbon" aria-hidden="true" /><span className="liquid-sweep" aria-hidden="true" /></span><figcaption className="image-caption reveal"><span>Illustrative aircraft visual</span><ArrowUpRight size={13} /></figcaption></figure>
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
                <img className="leasing-image liquid-media" src={leasingAircraftImage} alt="Full commercial jetliner flying above sunlit clouds" width={1376} height={768} loading="lazy" />
                <span className="frame-atmosphere" aria-hidden="true"><span className="frame-sunbeam" /><span className="frame-metallic-sheen" /></span>
                <span className="liquid-ribbon" aria-hidden="true" />
                <span className="liquid-sweep" aria-hidden="true" />
              </span>
              <figcaption className="image-caption reveal"><span>Operating lease study · Illustrative aircraft visual</span><ArrowUpRight size={13} /></figcaption>
            </figure>
            <div className="reveal" data-liquid-text>
              <h2>Aircraft Operating<br /><span className="muted-heading">Lease</span></h2>
              <div className="editorial-copy">
                <p className="section-description">Aircraft operating leases provide an alternative to outright aircraft ownership. They form an important part of the commercial aviation ecosystem, allowing aircraft to be made available under agreed lease arrangements.</p>
                <p className="section-description">CPA Aviation Leasing Capital has received a Letter of Approval identifying operating lease for aircraft as an authorised operation, subject to the applicable regulatory conditions.</p>
              </div>
              <div className="leasing-meta">
                <span>Authorised Scope</span>
                <strong>Operating lease for aircraft under Letter of Approval conditions</strong>
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
          <div className="reveal" data-liquid-text>
            <h2>Based in<br /><span className="muted-heading">GIFT City</span></h2>
            <div className="editorial-copy">
              <p className="section-description">Located in Gujarat International Finance Tec-City, CPA Aviation Leasing Capital operates from an IFSC business environment designed for international financial services.</p>
              <p className="section-description">Its presence in GIFT City, anchored within Gujarat&apos;s broader commercial corridor spanning Gandhinagar, Ahmedabad, and Surat, forms an important part of the company&apos;s corporate identity and business structure.</p>
            </div>
            <div className="location-tag"><Building2 size={15} /> GIFT City, Gandhinagar, Gujarat</div>
          </div>
          <figure className="m-0" data-liquid="city">
            <span className="liquid-frame">
              <img src={cityImage} alt="Modern glass towers in GIFT City, Gandhinagar, Gujarat" className="city-lead-image liquid-media" width={1536} height={1024} loading="lazy" />
              <span className="liquid-ribbon" aria-hidden="true" />
              <span className="liquid-sweep" aria-hidden="true" />
            </span>
            <figcaption className="image-caption reveal"><span>GIFT City, Gandhinagar · Architectural visualisation</span><ArrowUpRight size={13} /></figcaption>
          </figure>
        </div>

        <div className="gujarat-gallery">
          <figure className="gujarat-card reveal m-0">
            <span className="liquid-frame">
              <img src={giftCityAerial} alt="Aerial golden-hour skyline of GIFT City, Gandhinagar, Gujarat" className="gujarat-card-image" width={1376} height={768} loading="lazy" />
            </span>
            <figcaption className="gujarat-caption"><strong>GIFT City, Gandhinagar</strong><span>International Financial Services Centre district visual</span></figcaption>
          </figure>
          <figure className="gujarat-card reveal m-0">
            <span className="liquid-frame">
              <img src={ahmedabadImage} alt="Sabarmati Riverfront and skyline of Ahmedabad, Gujarat" className="gujarat-card-image" width={1376} height={768} loading="lazy" />
            </span>
            <figcaption className="gujarat-caption"><strong>Ahmedabad, Gujarat</strong><span>Sabarmati Riverfront and commercial skyline visual</span></figcaption>
          </figure>
          <figure className="gujarat-card reveal m-0">
            <span className="liquid-frame">
              <img src={suratImage} alt="Modern financial district skyline of Surat, Gujarat" className="gujarat-card-image" width={1376} height={768} loading="lazy" />
            </span>
            <figcaption className="gujarat-caption"><strong>Surat, Gujarat</strong><span>Modern commercial district and riverfront visual</span></figcaption>
          </figure>
        </div>
      </section>

      <section id="corporate-info" className="corporate-section page-width">
        <div className="section-topline reveal"><p className="eyebrow">Corporate Information</p><span className="section-number">06</span></div>
        <div className="corporate-layout">
          <div className="corporate-heading reveal">
            <h2>Registered<br /><span className="muted-heading">Particulars</span></h2>
            <p className="corporate-note">Statutory company details and regulatory scope under the Letter of Approval and Memorandum of Association.</p>
          </div>
          <dl className="corporate-list reveal">
            <div className="corporate-row"><dt>Legal Name</dt><dd>CPA Aviation Leasing Capital IFSC Private Limited</dd></div>
            <div className="corporate-row"><dt>Corporate Identification Number</dt><dd>U66190GJ2026PTC180823</dd></div>
            <div className="corporate-row"><dt>Date of Incorporation</dt><dd>16 July 2026</dd></div>
            <div className="corporate-row"><dt>Registered Office</dt><dd>GIFT City, Gandhinagar, Gujarat</dd></div>
            <div className="corporate-row"><dt>Authorised Operation (LoA)</dt><dd>Operating lease for aircraft, subject to applicable regulatory conditions</dd></div>
            <div className="corporate-row"><dt>Official Email</dt><dd><a href="mailto:info@cpaaviations.com">info@cpaaviations.com</a></dd></div>
          </dl>
        </div>
      </section>

      <section id="advisor" className="advisor-section page-width">
        <div className="section-topline reveal"><p className="eyebrow">Service Finder</p><span className="section-number">07</span></div><div className="focus-heading reveal"><h2>Tell us what you need.<br /><span className="muted-heading">We will point you to the right area.</span></h2></div><ServiceAdvisor />
      </section>

      <section id="contact" className="contact-section"><span className="liquid-fill" data-liquid="contact"><img className="contact-background liquid-media" src={aircraftImage} width={1920} height={1088} alt="" loading="lazy" /><span className="frame-atmosphere frame-atmosphere--contact" aria-hidden="true"><span className="atmo-depth-wrap frame-cloud-wrap--far" data-atmo-depth="contact-far"><span className="cloud-track cloud-track--frame-far" /></span><span className="frame-sunbeam frame-sunbeam--contact" /><span className="frame-haze frame-haze--contact" /></span><span className="liquid-ribbon" aria-hidden="true" /><span className="liquid-sweep" aria-hidden="true" /></span><div className="reveal" data-liquid-text><p className="eyebrow">Contact</p><h2>Discuss an Aviation<br /><span className="muted-heading">Leasing Enquiry</span></h2><p className="contact-intro">For business enquiries and further information about our aircraft leasing activities, please get in touch with our team.</p><ContactForm /><a className="contact-email" href="mailto:info@cpaaviations.com">info@cpaaviations.com</a></div></section>
    </main>

    <footer><div className="page-width"><div className="footer-top"><div><Wordmark /><p className="legal-name">CPA AVIATION LEASING CAPITAL IFSC PRIVATE LIMITED</p><p className="footer-location">CIN: U66190GJ2026PTC180823 · GIFT City, Gandhinagar, Gujarat</p></div><nav className="footer-links" aria-label="Footer navigation">{navLinks}<Button asChild variant="navigation"><a href="#corporate-info">Corporate Info</a></Button><Button asChild variant="navigation"><a href="#contact">Contact <ArrowUpRight /></a></Button></nav></div><div className="footer-bottom"><span>© {new Date().getUTCFullYear()} CPA AVIATION LEASING CAPITAL IFSC PRIVATE LIMITED.</span><div className="footer-policies"><Button variant="navigation" onClick={() => setLegal("privacy")}>Privacy Policy</Button><Button variant="navigation" onClick={() => setLegal("terms")}>Terms &amp; Conditions</Button></div></div></div></footer>
    <Dialog open={legal !== null} onOpenChange={open => { if (!open) setLegal(null); }}><DialogContent><DialogTitle>{legal === "privacy" ? "Privacy Policy" : "Terms & Conditions"}</DialogTitle><DialogDescription className="leading-7">Our {legal === "privacy" ? "privacy policy is" : "website terms are"} not yet available on this website. For {legal === "privacy" ? "privacy enquiries" : "legal enquiries"}, please email <a className="text-primary" href="mailto:info@cpaaviations.com">info@cpaaviations.com</a>.</DialogDescription></DialogContent></Dialog>
    <svg className="liquid-defs" aria-hidden="true" focusable="false"><defs><filter id="liquid-refract" x="-15%" y="-60%" width="130%" height="220%"><feTurbulence type="fractalNoise" baseFrequency="0.011 0.055" numOctaves="2" seed="11" result="ripple" /><feDisplacementMap in="SourceGraphic" in2="ripple" scale="7" xChannelSelector="R" yChannelSelector="G" /></filter></defs></svg>
  </div>;
}