import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, FileText, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidVisualFrame, PageBreadcrumbs, SiteShell } from "@/components/SiteLayout";
import { COMPANY_CIN, LEGAL_NAME, buildPageHead } from "@/lib/seo";
import {
  ABOUT_AIRCRAFT_VISUAL,
  ABOUT_IDENTITY_DOSSIER,
  CORPORATE_DOCUMENTS,
  MOA_OBJECTIVE_CLAUSES,
} from "@/lib/site-content";

export const Route = createFileRoute("/about")({
  head: () => buildPageHead("/about"),
  component: AboutPage,
});

function AboutPage() {
  return (
    <SiteShell routeKey="/about">
      <section className="subpage-hero page-width">
        <PageBreadcrumbs currentLabel="About Us" />
        <div className="subpage-hero-grid">
          <div className="subpage-hero-copy">
            <p className="eyebrow">Corporate Identity · GIFT City IFSC</p>
            <h1>
              Corporate Identity &amp; <span className="muted-heading">IFSC Foundation</span>
            </h1>
            <p className="lead-description">
              Incorporated on 16 July 2026 under CIN {COMPANY_CIN}, {LEGAL_NAME} is a private
              limited company anchored in Gujarat International Finance Tec-City (GIFT City SEZ) for
              aircraft operating leases and aviation asset structuring.
            </p>
          </div>
          <div className="subpage-hero-visual">
            <LiquidVisualFrame liquidId="about-hero" asset={ABOUT_AIRCRAFT_VISUAL} eager />
          </div>
        </div>
      </section>

      <section id="corporate-overview" className="subpage-band page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Incorporation &amp; Corporate Background</p>
        </div>
        <div className="about-dossier-layout">
          <div className="reveal" data-liquid-text>
            <h2>
              Structured in GIFT City
              <br />
              <span className="muted-heading">for Aviation Leasing</span>
            </h2>
            <div className="editorial-copy">
              <p className="section-description">
                {LEGAL_NAME} was incorporated in Gujarat on 16 July 2026 under the Companies Act,
                2013 (CIN {COMPANY_CIN}) as a private limited company domiciled within GIFT Special
                Economic Zone.
              </p>
              <p className="section-description">
                This corporate profile sets out verified statutory records from the Ministry of
                Corporate Affairs (MCA), the electronic Memorandum of Association (e-MOA), and the
                company&apos;s GIFT SEZ Letter of Approval without extrapolating unverified fleet,
                client, or historical claims.
              </p>
            </div>
            <div className="subpage-inline-links">
              <Button asChild variant="navigation">
                <Link to="/our-approach">
                  Explore Our Approach <ArrowUpRight />
                </Link>
              </Button>
              <Button asChild variant="navigation">
                <Link to="/gift-city">
                  GIFT City &amp; LoA <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>

          <div
            className="about-dossier-grid reveal"
            aria-label="Verified Corporate Identity Summary"
          >
            {ABOUT_IDENTITY_DOSSIER.map((item) => (
              <article key={item.label} className="dossier-tile">
                <span className="dossier-label">{item.label}</span>
                <strong className="dossier-value">{item.value}</strong>
                <p className="dossier-detail">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="moa-objectives" className="subpage-band page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Electronic Memorandum of Association (e-MOA)</p>
        </div>
        <div className="scope-header reveal">
          <h2>
            Constitutional
            <br />
            <span className="muted-heading">Business Objectives</span>
          </h2>
          <p className="scope-intro">
            The clauses below summarise core corporate objects stated in the company&apos;s e-MOA.
            Operating lease for aircraft is presently permitted under the GIFT SEZ Letter of
            Approval; broader asset or financing objects remain subject to requisite regulatory
            permissions.
          </p>
        </div>

        <div className="subpage-cards-grid subpage-cards-grid--two reveal">
          {MOA_OBJECTIVE_CLAUSES.map((clause) => (
            <article key={clause.code} className="subpage-card">
              <div className="subpage-card-head">
                <span className="scope-code">{clause.code}</span>
                <span
                  className={
                    clause.code === "01" ? "scope-status scope-status--authorised" : "scope-status"
                  }
                >
                  {clause.status}
                </span>
              </div>
              <h3>{clause.title}</h3>
              <p>{clause.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="corporate-particulars" className="corporate-section page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Statutory Identity &amp; Records</p>
        </div>

        <div
          id="regulatory-scope"
          className="regulatory-panel reveal"
          aria-labelledby="about-regulatory-heading"
        >
          <div className="regulatory-panel-header">
            <p id="about-regulatory-heading" className="eyebrow">
              <ShieldCheck size={13} aria-hidden="true" />
              Regulatory Scope Distinction
            </p>
            <span className="documents-privacy-note">
              GIFT SEZ Authority &amp; Constitutional Objects
            </span>
          </div>
          <div className="regulatory-grid">
            <article className="regulatory-card regulatory-card--loa">
              <span className="regulatory-kicker regulatory-kicker--loa">
                Letter of Approval (LoA)
              </span>
              <h3>Permitted Operating Activity</h3>
              <p>
                Operating lease for aircraft, conducted subject to the terms and applicable
                regulatory conditions set out in the company&apos;s GIFT SEZ Letter of Approval.
              </p>
            </article>
            <article className="regulatory-card">
              <span className="regulatory-kicker">Memorandum of Association (MoA)</span>
              <h3>Stated Corporate Objectives</h3>
              <p>
                Broader stated objects cover aircraft, helicopter and engine leasing, aviation asset
                management, aviation asset financing, and SPV or co-ownership participation
                structures. Objectives outside aircraft operating lease remain subject to requisite
                regulatory approvals prior to commencement.
              </p>
            </article>
          </div>
        </div>

        <div
          id="official-documents"
          className="documents-panel reveal"
          aria-labelledby="about-docs-heading"
        >
          <div className="documents-header">
            <p id="about-docs-heading" className="eyebrow">
              Official Corporate Documents
            </p>
            <span className="documents-privacy-note">
              <Lock size={12} aria-hidden="true" /> Controlled counterparty access
            </span>
          </div>
          <ul className="documents-list">
            {CORPORATE_DOCUMENTS.map((doc) => (
              <li key={doc.code} className="document-row">
                <div className="document-card-head">
                  <span className="document-code">{doc.code}</span>
                  <span className="document-ref">{doc.reference}</span>
                </div>
                <h3 className="document-title">
                  <FileText size={15} aria-hidden="true" />
                  <span>{doc.title}</span>
                </h3>
                <p className="document-summary">{doc.summary}</p>
                <div className="document-card-foot">
                  <span className="document-access-label">Verified Institutional Request</span>
                  <Button asChild variant="navigation" className="document-request-btn">
                    <Link
                      to="/contact"
                      search={{ subject: `Document Access Request: ${doc.title}` }}
                    >
                      Request Access <ArrowUpRight />
                    </Link>
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <p className="documents-footnote">
            Statutory corporate documents are shared upon verified institutional request;
            confidential subscriber details and personal identification numbers are excluded.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
