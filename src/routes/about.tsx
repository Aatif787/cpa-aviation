import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, FileText, Lock, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LiquidVisualFrame, PageBreadcrumbs, SiteShell } from "@/components/SiteLayout";
import { COMPANY_CIN, CORPORATE_EMAIL, LEGAL_NAME, buildPageHead } from "@/lib/seo";
import {
  ABOUT_AIRCRAFT_VISUAL,
  CORPORATE_DOCUMENTS,
  CORPORATE_PARTICULARS,
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
            <p className="eyebrow">About the Company</p>
            <h1>
              Corporate Identity &amp; <span className="muted-heading">IFSC Foundation</span>
            </h1>
            <p className="lead-description">
              {LEGAL_NAME} is an aircraft leasing company incorporated in Gujarat, India and positioned inside GIFT City&apos;s International Financial Services Centre (IFSC).
            </p>
          </div>
          <div className="subpage-hero-visual">
            <LiquidVisualFrame
              liquidId="about-hero"
              asset={ABOUT_AIRCRAFT_VISUAL}
              caption="CPA Aviation Leasing Capital IFSC Private Limited · Illustrative visual"
              eager
            />
          </div>
        </div>
      </section>

      <section id="corporate-overview" className="subpage-band page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Corporate Background</p>
          <span className="section-number">01</span>
        </div>
        <div className="overview-grid">
          <div className="reveal" data-liquid-text>
            <h2>
              Structured in GIFT City<br />
              <span className="muted-heading">for Aviation Leasing</span>
            </h2>
          </div>
          <div className="editorial-copy reveal">
            <p className="section-description">
              Incorporated on 16 July 2026 under Corporate Identification Number {COMPANY_CIN}, {LEGAL_NAME} is constituted as a private limited company anchored in Gujarat International Finance Tec-City (GIFT City), Gandhinagar.
            </p>
            <p className="section-description">
              Our Memorandum of Association sets out corporate objectives spanning aircraft leasing, acquisition, asset management, and related ownership or participation structures, while our Letter of Approval in GIFT SEZ identifies aircraft operating lease as our permitted operation subject to applicable regulatory conditions.
            </p>
            <div className="subpage-inline-links">
              <Button asChild variant="navigation">
                <Link to="/our-approach">
                  Explore Our Approach <ArrowUpRight />
                </Link>
              </Button>
              <Button asChild variant="navigation">
                <Link to="/gift-city">
                  Explore GIFT City <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="corporate-particulars" className="corporate-section page-width">
        <div className="section-topline reveal">
          <p className="eyebrow">Statutory Identity &amp; Records</p>
          <span className="section-number">02</span>
        </div>
        <div className="corporate-layout">
          <div className="corporate-heading reveal">
            <h2>
              Registered Particulars<br />
              <span className="muted-heading">&amp; Governance</span>
            </h2>
            <p className="corporate-note">
              Official corporate identification records and statutory seat of {LEGAL_NAME}. Personal subscriber identification numbers are intentionally omitted from public disclosures.
            </p>
          </div>
          <div className="corporate-stack">
            <dl className="corporate-list reveal">
              {CORPORATE_PARTICULARS.map((item) => (
                <div key={item.label} className="corporate-row">
                  <dt>{item.label}</dt>
                  <dd>
                    {item.label === "Corporate Contact" ? (
                      <>
                        <a href={`mailto:${CORPORATE_EMAIL}`}>{CORPORATE_EMAIL}</a> ·{" "}
                        <a href="tel:+918527712949" className="whitespace-nowrap">
                          +91 85277 12949
                        </a>
                      </>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div id="regulatory-scope" className="regulatory-panel reveal" aria-labelledby="about-regulatory-heading">
              <div className="regulatory-panel-header">
                <p id="about-regulatory-heading" className="eyebrow">
                  <ShieldCheck size={12} className="inline mr-1.5" aria-hidden="true" />
                  Regulatory Scope Distinction
                </p>
              </div>
              <div className="regulatory-grid">
                <article className="regulatory-card">
                  <span className="regulatory-kicker regulatory-kicker--loa">Letter of Approval (LoA)</span>
                  <h3>Permitted Operating Activity</h3>
                  <p>
                    Operating lease for aircraft, conducted subject to the terms and applicable regulatory conditions set out in the company&apos;s GIFT SEZ Letter of Approval.
                  </p>
                </article>
                <article className="regulatory-card">
                  <span className="regulatory-kicker">Memorandum of Association (MoA)</span>
                  <h3>Stated Corporate Objectives</h3>
                  <p>
                    Broader stated objects cover aircraft, helicopter and engine leasing, aviation asset management, aviation asset financing, and SPV or co-ownership participation structures. Objectives outside aircraft operating lease remain subject to requisite regulatory approvals prior to commencement.
                  </p>
                </article>
              </div>
            </div>

            <div id="official-documents" className="documents-panel reveal" aria-labelledby="about-docs-heading">
              <div className="documents-header">
                <p id="about-docs-heading" className="eyebrow">Official Corporate Documents</p>
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
                    <Button asChild variant="navigation" className="document-request-btn">
                      <Link
                        to="/contact"
                        search={{ subject: `Document Access Request: ${doc.title}` }}
                      >
                        Request Access <ArrowUpRight />
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
              <p className="documents-footnote">
                Statutory corporate documents are shared upon verified institutional request; confidential subscriber details and personal identification numbers are excluded.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

