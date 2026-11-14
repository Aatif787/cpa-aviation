import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowUpRight, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { CharterSkyBackdrop, PageBreadcrumbs, SiteShell } from "@/components/SiteLayout";
import { COMPANY_CIN, CORPORATE_EMAIL, LEGAL_NAME, buildPageHead } from "@/lib/seo";
import { REGISTERED_OFFICE_ADDRESS } from "@/lib/site-content";

const QUICK_ENQUIRY_SUBJECTS = [
  "Aircraft Operating Lease Enquiry",
  "Document Access Request: Certificate of Incorporation",
  "Document Access Request: Memorandum of Association (MoA)",
  "Document Access Request: Letter of Approval (LoA)",
] as const;

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { subject?: string } => {
    const raw = search["subject"];
    return typeof raw === "string" && raw.trim().length > 0
      ? { subject: raw.trim() }
      : {};
  },
  head: () => buildPageHead("/contact"),
  component: ContactPage,
});

function ContactPage() {
  const { subject: searchSubject } = Route.useSearch();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [prefilled, setPrefilled] = useState<{ value: string; seq: number } | null>(() =>
    searchSubject ? { value: searchSubject, seq: 1 } : null,
  );

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (searchSubject) {
      setPrefilled((prev) => ({ value: searchSubject, seq: (prev?.seq ?? 0) + 1 }));
    }
  }, [searchSubject]);

  const chooseSubject = (topic: string) => {
    setPrefilled((prev) => ({ value: topic, seq: (prev?.seq ?? 0) + 1 }));
  };

  return (
    <SiteShell routeKey="/contact">
      <section className="contact-section contact-page-section is-contact-visible">
        <CharterSkyBackdrop activeInView reducedMotion={reducedMotion} />

        <div className="contact-content page-width">
          <div className="contact-page-header">
            <PageBreadcrumbs currentLabel="Contact Us" />
            <p className="eyebrow justify-center">
              <span className="contact-pulse-dot" aria-hidden="true" />
              Corporate Enquiries
            </p>
            <h1 className="contact-reveal-up">
              Discuss an Aviation<br />
              <span className="muted-heading">Leasing Enquiry</span>
            </h1>
            <p className="contact-intro contact-reveal-right">
              For business enquiries, aircraft operating lease discussions, or verified corporate document requests, reach out directly to {LEGAL_NAME} in GIFT City SEZ.
            </p>
          </div>

          <div className="contact-page-grid">
            <aside className="contact-info-panel" aria-label="Registered Office and Corporate Contact">
              <div className="contact-info-card">
                <p className="eyebrow">Direct Corporate Channels</p>
                <h2>{LEGAL_NAME}</h2>
                <ul className="contact-details-list">
                  <li>
                    <Mail size={15} aria-hidden="true" />
                    <div>
                      <span>Official Email</span>
                      <a href={`mailto:${CORPORATE_EMAIL}`}>{CORPORATE_EMAIL}</a>
                    </div>
                  </li>
                  <li>
                    <Phone size={15} aria-hidden="true" />
                    <div>
                      <span>Telephone</span>
                      <a href="tel:+918527712949" className="whitespace-nowrap">
                        +91 85277 12949
                      </a>
                    </div>
                  </li>
                  <li>
                    <MapPin size={15} aria-hidden="true" />
                    <div>
                      <span>Registered Office (GIFT SEZ)</span>
                      <p>{REGISTERED_OFFICE_ADDRESS}</p>
                    </div>
                  </li>
                  <li>
                    <ShieldCheck size={15} aria-hidden="true" />
                    <div>
                      <span>Corporate Identification</span>
                      <p>CIN: {COMPANY_CIN} · Incorporated 16 July 2026</p>
                    </div>
                  </li>
                </ul>

                <div className="contact-topics-block">
                  <p className="eyebrow">Quick Enquiry Topics</p>
                  <div className="contact-subject-chips">
                    {QUICK_ENQUIRY_SUBJECTS.map((topic) => (
                      <button
                        key={topic}
                        type="button"
                        className="contact-topic-chip"
                        onClick={() => chooseSubject(topic)}
                      >
                        {topic.replace("Document Access Request: ", "Request: ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="contact-info-footer">
                  <Button asChild variant="navigation">
                    <Link to="/about">
                      Statutory &amp; Regulatory Records <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>

            <div className="contact-form-column">
              <ContactForm prefilledSubject={prefilled} initialSubject={searchSubject} />
            </div>
          </div>

          <div className="contact-scope-strip" aria-label="Enquiry Scope and Regulatory Context">
            <p className="eyebrow">Scope of Institutional Enquiries</p>
            <div className="contact-scope-grid">
              <article className="contact-scope-item">
                <h3>Operating Lease Enquiries</h3>
                <p>
                  Share airline or lessor counterparty details regarding aircraft operating lease requirements conducted under our GIFT SEZ Letter of Approval.
                </p>
                <div className="mt-3">
                  <Link to="/aircraft-leasing" className="home-preview-link">
                    Aircraft Leasing <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </article>
              <article className="contact-scope-item">
                <h3>Verified Document Disclosures</h3>
                <p>
                  Requests for the Certificate of Incorporation, Memorandum of Association, or Letter of Approval are reviewed against institutional credentials, excluding personal identification numbers.
                </p>
                <div className="mt-3">
                  <Link to="/about" className="home-preview-link">
                    Statutory Records <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </article>
              <article className="contact-scope-item">
                <h3>Regulatory Scope Boundary</h3>
                <p>
                  Operating lease for aircraft remains subject to regulatory conditions stated in the GIFT SEZ Letter of Approval; broader e-MOA objects require separate approvals where applicable.
                </p>
                <div className="mt-3">
                  <Link to="/gift-city" className="home-preview-link">
                    GIFT City &amp; LoA <ArrowUpRight size={13} aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

