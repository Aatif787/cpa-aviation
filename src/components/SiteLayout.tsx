import { Link, useRouterState } from "@tanstack/react-router";
import { Suspense, lazy, type ReactNode, useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAviationMotion } from "@/hooks/use-aviation-motion";
import type { PublicRoutePath } from "@/lib/seo";
import { CORPORATE_EMAIL, LEGAL_NAME } from "@/lib/seo";
import {
  BRAND_LOGO_ASSET,
  CHARTER_SKIES,
  FOOTER_NAVIGATION,
  NAVIGATION_ITEMS,
  REGISTERED_OFFICE_ADDRESS,
  type ResponsivePictureAsset,
} from "@/lib/site-content";

const LazyLegalDialog = lazy(() =>
  import("@/components/LegalDialog").then((m) => ({ default: m.LegalDialog })),
);

export function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      to="/"
      activeProps={{ className: "wordmark" }}
      activeOptions={{ exact: true }}
      className="wordmark"
      aria-label="CPA Aviation Leasing Capital IFSC Private Limited home"
      onClick={onClick}
    >
      <picture>
        <source srcSet={BRAND_LOGO_ASSET.avifSrcSet} sizes="96px" type="image/avif" />
        <source srcSet={BRAND_LOGO_ASSET.webpSrcSet} sizes="96px" type="image/webp" />
        <img
          className="wordmark-logo"
          src={BRAND_LOGO_ASSET.fallbackSrc}
          alt="CPA Aviation Leasing Capital IFSC Private Limited logo"
          width={BRAND_LOGO_ASSET.width}
          height={BRAND_LOGO_ASSET.height}
          decoding="async"
        />
      </picture>
    </Link>
  );
}

export function ResponsivePicture({
  asset,
  className,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
}: {
  asset: ResponsivePictureAsset;
  className?: string | undefined;
  loading?: "eager" | "lazy" | undefined;
  decoding?: "async" | "sync" | "auto" | undefined;
  fetchPriority?: "high" | "low" | "auto" | undefined;
}) {
  return (
    <picture>
      <source srcSet={asset.avifSrcSet} sizes={asset.sizes} type="image/avif" />
      <source srcSet={asset.webpSrcSet} sizes={asset.sizes} type="image/webp" />
      <img
        src={asset.src}
        alt={asset.alt}
        className={className}
        width={asset.width}
        height={asset.height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
}

export function LiquidVisualFrame({
  liquidId,
  asset,
  caption,
  frameClassName = "liquid-frame",
  mediaClassName = "overview-image liquid-media",
  eager = false,
}: {
  liquidId: string;
  asset: ResponsivePictureAsset;
  caption: string;
  frameClassName?: string;
  mediaClassName?: string;
  eager?: boolean;
}) {
  return (
    <figure className="m-0" data-liquid={liquidId}>
      <span className={frameClassName}>
        <ResponsivePicture
          asset={asset}
          className={mediaClassName}
          loading={eager ? "eager" : "lazy"}
          decoding={eager ? "sync" : "async"}
          fetchPriority={eager ? "high" : undefined}
        />
        <span className="frame-atmosphere" aria-hidden="true">
          <span className="frame-sunbeam" />
          <span className="frame-metallic-sheen" />
          <span className="frame-haze" />
        </span>
        <span className="liquid-ribbon" aria-hidden="true" />
        <span className="liquid-sweep" aria-hidden="true" />
      </span>
      <figcaption className="image-caption reveal">
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}

export function PageBreadcrumbs({ currentLabel }: { currentLabel: string }) {
  return (
    <nav className="breadcrumb-bar" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <ChevronRight size={12} aria-hidden="true" />
      <span aria-current="page">{currentLabel}</span>
    </nav>
  );
}

export function BlueprintSvg() {
  return (
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
  );
}

export function FlightPathSvg() {
  return (
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
  );
}

export function CharterSkyBackdrop({
  activeInView,
  reducedMotion,
}: {
  activeInView: boolean;
  reducedMotion: boolean;
}) {
  const [skyIndex, setSkyIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion || !activeInView) return;
    const timer = window.setInterval(() => {
      setSkyIndex((current) => (current + 1) % CHARTER_SKIES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [reducedMotion, activeInView]);

  return (
    <div className="contact-sky" aria-hidden="true">
      {CHARTER_SKIES.map((sky, index) => (
        <picture key={sky.id}>
          <source srcSet={sky.avifSrcSet} sizes="100vw" type="image/avif" />
          <source srcSet={sky.webpSrcSet} sizes="100vw" type="image/webp" />
          <img
            src={sky.src}
            alt=""
            className={`contact-sky-slide${index === skyIndex ? " is-active" : ""}`}
            width={1376}
            height={768}
            loading={activeInView ? "eager" : "lazy"}
            decoding="async"
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
  );
}

export function SiteShell({
  routeKey,
  overHeroHeader = false,
  children,
}: {
  routeKey: PublicRoutePath;
  overHeroHeader?: boolean;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [menuOpen, setMenuOpen] = useState(false);
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useAviationMotion(rootRef, routeKey);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reveals = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    if (typeof IntersectionObserver === "undefined") {
      reveals.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );

    reveals.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.96) {
        el.classList.add("is-visible");
      } else {
        revealObserver.observe(el);
      }
    });

    return () => {
      revealObserver.disconnect();
    };
  }, [routeKey]);

  const navLinks = NAVIGATION_ITEMS.map((item) => {
    const isActive = item.to === routeKey || pathname === item.to;
    return (
      <Button
        key={item.to}
        asChild
        variant="navigation"
        className={isActive ? "active" : undefined}
      >
        <Link
          to={item.to}
          aria-current={isActive ? "page" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          {item.label}
        </Link>
      </Button>
    );
  });

  const footerLinks = FOOTER_NAVIGATION.map((item) => {
    const isActive = item.to === routeKey || pathname === item.to;
    return (
      <Button
        key={item.to}
        asChild
        variant="navigation"
        className={isActive ? "active" : undefined}
      >
        <Link to={item.to} aria-current={isActive ? "page" : undefined}>
          {item.label}
        </Link>
      </Button>
    );
  });

  return (
    <div id="top" ref={rootRef}>
      <div className="page-atmosphere" aria-hidden="true">
        <div className="atmo-sunwash" data-atmo-sunwash />
        <div className="atmo-cool-haze" data-atmo-haze />
      </div>

      <header className={`site-header${overHeroHeader ? "" : " site-header--solid"}`}>
        <div className="page-width header-inner">
          <Wordmark onClick={() => setMenuOpen(false)} />
          <nav aria-label="Main navigation" className="desktop-nav">
            {navLinks}
            <Button
              asChild
              variant={routeKey === "/contact" ? "aviation" : "cinematic"}
            >
              <Link
                to="/contact"
                aria-current={routeKey === "/contact" ? "page" : undefined}
              >
                Contact Us <ArrowUpRight />
              </Link>
            </Button>
          </nav>
          <Button
            variant="navigation"
            size="icon"
            className="mobile-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {menuOpen && (
          <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">
            {navLinks}
            <Button asChild variant="aviation">
              <Link
                to="/contact"
                aria-current={routeKey === "/contact" ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                Contact Us <ArrowUpRight />
              </Link>
            </Button>
          </nav>
        )}
      </header>

      <main id="main-content" className="page-transition-stage">
        {children}
      </main>

      <footer>
        <div className="page-width">
          <div className="footer-grid">
            <div className="footer-brand">
              <Wordmark />
              <p className="legal-name">{LEGAL_NAME}</p>
              <p className="footer-cin">CIN: U66190GJ2026PTC180823 · Incorporated 16 July 2026</p>
            </div>
            <div className="footer-address-block">
              <p className="footer-heading">Registered Office</p>
              <p className="footer-location">{REGISTERED_OFFICE_ADDRESS}</p>
              <p className="footer-contact">
                <a href={`mailto:${CORPORATE_EMAIL}`}>{CORPORATE_EMAIL}</a>
                <span aria-hidden="true"> · </span>
                <a className="footer-phone whitespace-nowrap" href="tel:+918527712949">
                  +91 85277 12949
                </a>
              </p>
            </div>
            <div className="footer-nav-block">
              <p className="footer-heading">Navigation</p>
              <nav className="footer-links" aria-label="Footer navigation">
                {footerLinks}
              </nav>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getUTCFullYear()} {LEGAL_NAME}. All rights reserved.
            </span>
            <div className="footer-policies">
              <Button variant="navigation" onClick={() => setLegal("privacy")}>
                Privacy Policy
              </Button>
              <Button variant="navigation" onClick={() => setLegal("terms")}>
                Terms &amp; Conditions
              </Button>
            </div>
          </div>
        </div>
      </footer>

      {legal !== null && (
        <Suspense fallback={null}>
          <LazyLegalDialog legal={legal} onClose={() => setLegal(null)} />
        </Suspense>
      )}
    </div>
  );
}
