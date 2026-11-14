import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode, useEffect } from "react";
import { LEGAL_NAME, SEO_DESCRIPTION, SEO_TITLE } from "@/lib/seo";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  useEffect(() => {
    document.title = "Page Not Found | CPA Aviation Leasing Capital";
    let robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robotsMeta) {
      robotsMeta = document.createElement("meta");
      robotsMeta.name = "robots";
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.content = "noindex, nofollow";
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6 py-16 text-foreground">
      <div className="max-w-xl text-center">
        <p className="eyebrow justify-center">404 · Page Unavailable</p>
        <h1 className="mt-2 text-5xl font-normal tracking-tight text-foreground sm:text-6xl">
          Page Not <span className="muted-heading">Found</span>
        </h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">
          The requested URL is not available on the {LEGAL_NAME} website.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="aviation-button">
            Home Page
          </Link>
          <Link to="/about" className="text-cta">
            About Us
          </Link>
          <Link to="/aircraft-leasing" className="text-cta">
            Aircraft Leasing
          </Link>
          <Link to="/contact" className="text-cta">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Please try again or return to the home page.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Return to home page
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const verificationToken = (import.meta.env["VITE_GOOGLE_SITE_VERIFICATION"] as string | undefined)?.trim();

    return {
      // Each content route, / included, sets its own head() via buildPageHead().
      // Never add og:image, twitter:image, og:url, or canonical here so child routes do not duplicate or inherit wrong metadata.
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: SEO_TITLE },
        { name: "description", content: SEO_DESCRIPTION },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { property: "og:title", content: SEO_TITLE },
        { property: "og:description", content: SEO_DESCRIPTION },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "en_IN" },
        { property: "og:site_name", content: LEGAL_NAME },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: SEO_TITLE },
        { name: "twitter:description", content: SEO_DESCRIPTION },
        ...(verificationToken ? [{ name: "google-site-verification", content: verificationToken }] : []),
      ],
      links: [
        { rel: "preload", href: "/fonts/Gambarino-Regular.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: appCss,
        },
        { rel: "icon", href: "/favicon.png", type: "image/png", sizes: "192x192" },
        { rel: "icon", href: "/favicon.ico", sizes: "any" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap"
          media="print"
          onLoad={e => { e.currentTarget.media = "all"; }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500&display=swap"
          />
        </noscript>
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
