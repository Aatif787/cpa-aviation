import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, buildEnquiryMailto, contactSchema } from "@/lib/contact";
import { leadsConfigured, submitLead } from "@/lib/leads";

type ContactField = "name" | "company" | "email" | "subject" | "message";

type ContactFormProps = {
  prefilledSubject?: { value: string; seq: number } | null;
  initialSubject?: string | undefined;
};

export function ContactForm({ prefilledSubject, initialSubject }: ContactFormProps) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    subject: initialSubject ?? "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactField, string>>>({});
  // "sent": accepted by the leads API. "drafted": opened as an email draft (API not configured).
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "drafted">("idle");
  const [error, setError] = useState<string | null>(null);
  const [fallbackMailto, setFallbackMailto] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  const clearFieldError = (key: ContactField) => {
    setFieldErrors((prev) => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  useEffect(() => {
    const nextSubject = prefilledSubject?.value ?? initialSubject;
    if (!nextSubject) return;
    setStatus("idle");
    setError(null);
    clearFieldError("subject");
    setForm((f) => ({ ...f, subject: nextSubject }));
  }, [prefilledSubject, initialSubject]);

  const set =
    (k: ContactField) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value;
      setForm((f) => ({ ...f, [k]: val }));
      if (fieldErrors[k]) {
        clearFieldError(k);
      }
      if (error) setError(null);
    };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const nextFieldErrors: Partial<Record<ContactField, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (
          typeof key === "string" &&
          !(key in nextFieldErrors) &&
          (key === "name" ||
            key === "company" ||
            key === "email" ||
            key === "subject" ||
            key === "message")
        ) {
          nextFieldErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextFieldErrors);
      setError(parsed.error.issues[0]?.message ?? "Please review the highlighted fields.");
      return;
    }

    setError(null);
    setFieldErrors({});
    setFallbackMailto(null);
    const mailto = buildEnquiryMailto(parsed.data);

    // Leads API not configured in this build: open a prefilled email draft instead.
    if (!leadsConfigured) {
      window.location.href = mailto;
      setStatus("drafted");
      return;
    }

    setStatus("sending");
    const result = await submitLead(parsed.data, honeypot);
    if (result.status === "accepted") {
      setForm({ name: "", company: "", email: "", subject: "", message: "" });
      setStatus("sent");
      return;
    }

    setStatus("idle");
    if (result.status === "invalid") {
      const nextFieldErrors: Partial<Record<ContactField, string>> = {};
      for (const field of result.fields) nextFieldErrors[field] = "Please check this field.";
      setFieldErrors(nextFieldErrors);
      setError("Please review the highlighted fields.");
      return;
    }
    setFallbackMailto(mailto);
    setError("Your enquiry could not be sent right now. Please try again, or send it by email.");
  }

  function resetForm() {
    setStatus("idle");
    setError(null);
    setFieldErrors({});
  }

  if (status === "sent") {
    return (
      <div className="contact-form-done-card" role="status">
        <CheckCircle2 className="contact-done-icon" size={20} aria-hidden="true" />
        <p className="contact-form-done">
          Thank you. Your enquiry has been received by CPA Aviation Leasing Capital IFSC Private
          Limited, and the team will respond to your email.
        </p>
        <Button type="button" variant="navigation" onClick={resetForm}>
          Send another enquiry
        </Button>
      </div>
    );
  }

  if (status === "drafted") {
    return (
      <div className="contact-form-done-card" role="status">
        <CheckCircle2 className="contact-done-icon" size={20} aria-hidden="true" />
        <p className="contact-form-done">
          Your enquiry is ready in your email app. Please press send there to deliver it to CPA
          Aviation Leasing Capital IFSC Private Limited.
        </p>
        <p className="contact-done-sub">
          If no email app opened, write directly to{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <Button type="button" variant="navigation" onClick={resetForm}>
          Edit enquiry
        </Button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-form-row">
        <label>
          <span>
            Full Name <abbr title="Required">*</abbr>
          </span>
          <input
            value={form.name}
            onChange={set("name")}
            maxLength={100}
            autoComplete="name"
            placeholder="Full name"
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? "contact-error-name" : undefined}
            required
          />
          {fieldErrors.name && (
            <span id="contact-error-name" className="contact-field-error">
              {fieldErrors.name}
            </span>
          )}
        </label>
        <label>
          <span>
            Company <em className="contact-optional">(Optional)</em>
          </span>
          <input
            value={form.company}
            onChange={set("company")}
            maxLength={150}
            autoComplete="organization"
            placeholder="Airline, lessor, or institution"
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={fieldErrors.company ? "contact-error-company" : undefined}
          />
          {fieldErrors.company && (
            <span id="contact-error-company" className="contact-field-error">
              {fieldErrors.company}
            </span>
          )}
        </label>
      </div>
      <div className="contact-form-row">
        <label>
          <span>
            Business Email <abbr title="Required">*</abbr>
          </span>
          <input
            type="email"
            value={form.email}
            onChange={set("email")}
            maxLength={255}
            autoComplete="email"
            placeholder="name@company.com"
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "contact-error-email" : undefined}
            required
          />
          {fieldErrors.email && (
            <span id="contact-error-email" className="contact-field-error">
              {fieldErrors.email}
            </span>
          )}
        </label>
        <label>
          <span>
            Subject <abbr title="Required">*</abbr>
          </span>
          <input
            value={form.subject}
            onChange={set("subject")}
            maxLength={150}
            placeholder="Operating lease or corporate enquiry"
            aria-invalid={Boolean(fieldErrors.subject)}
            aria-describedby={fieldErrors.subject ? "contact-error-subject" : undefined}
            required
          />
          {fieldErrors.subject && (
            <span id="contact-error-subject" className="contact-field-error">
              {fieldErrors.subject}
            </span>
          )}
        </label>
      </div>
      <label>
        <span className="contact-label-split">
          <span>
            Message <abbr title="Required">*</abbr>
          </span>
          <span className="contact-char-count">{form.message.length} / 1800</span>
        </span>
        <textarea
          value={form.message}
          onChange={set("message")}
          maxLength={1800}
          rows={4}
          placeholder="Provide brief details regarding your aircraft operating lease enquiry or institutional request."
          aria-invalid={Boolean(fieldErrors.message)}
          aria-describedby={fieldErrors.message ? "contact-error-message" : undefined}
          required
        />
        {fieldErrors.message && (
          <span id="contact-error-message" className="contact-field-error">
            {fieldErrors.message}
          </span>
        )}
      </label>
      {/* Honeypot for spam bots: hidden from people and assistive tech, must stay empty. */}
      <div
        aria-hidden="true"
        style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}
      >
        <input
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
      {error && (
        <p className="contact-form-alert" role="alert">
          {error}
          {fallbackMailto && (
            <>
              {" "}
              <a href={fallbackMailto}>Send by email to {CONTACT_EMAIL}</a>
            </>
          )}
        </p>
      )}
      <Button
        type="submit"
        variant="aviation"
        className="contact-submit-btn"
        disabled={status === "sending"}
        aria-busy={status === "sending"}
      >
        <span>
          {status === "sending" ? "Sending…" : "Submit Enquiry"} <ArrowUpRight />
        </span>
      </Button>
    </form>
  );
}
