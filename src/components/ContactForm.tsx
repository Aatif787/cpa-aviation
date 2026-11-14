import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactSchema, submitEnquiry } from "@/lib/contact.functions";

type ContactField = "name" | "company" | "email" | "subject" | "message";

type ContactFormProps = {
  prefilledSubject?: { value: string; seq: number } | null;
  initialSubject?: string | undefined;
};

export function ContactForm({ prefilledSubject, initialSubject }: ContactFormProps) {
  const send = useServerFn(submitEnquiry);
  const loadedAtRef = useRef<number>(Date.now());
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    subject: initialSubject ?? "",
    message: "",
    website: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<ContactField, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);

  const clearFieldError = (key: ContactField) => {
    setFieldErrors(prev => {
      if (!(key in prev)) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  useEffect(() => {
    loadedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    const nextSubject = prefilledSubject?.value ?? initialSubject;
    if (!nextSubject) return;
    setStatus("idle");
    setError(null);
    clearFieldError("subject");
    setForm(f => ({ ...f, subject: nextSubject }));
  }, [prefilledSubject, initialSubject]);

  const set = (k: ContactField | "website") => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setForm(f => ({ ...f, [k]: val }));
    if (k !== "website" && fieldErrors[k]) {
      clearFieldError(k);
    }
    if (error) setError(null);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse({ ...form, formLoadedAt: loadedAtRef.current });
    if (!parsed.success) {
      const nextFieldErrors: Partial<Record<ContactField, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && !(key in nextFieldErrors) && (key === "name" || key === "company" || key === "email" || key === "subject" || key === "message")) {
          nextFieldErrors[key] = issue.message;
        }
      }
      setFieldErrors(nextFieldErrors);
      setError(parsed.error.issues[0]?.message ?? "Please review the highlighted fields.");
      return;
    }

    setStatus("sending");
    setError(null);
    setFieldErrors({});
    try {
      const res = await send({ data: parsed.data });
      if (res.ok) {
        setStatus("sent");
        setForm({ name: "", company: "", email: "", subject: "", message: "", website: "" });
      } else {
        setStatus("idle");
        setError(res.error);
      }
    } catch {
      setStatus("idle");
      setError("Your enquiry could not be submitted right now. Please email cpaaviationleasing@gmail.com or call +91 85277 12949.");
    }
  }

  function resetForm() {
    loadedAtRef.current = Date.now();
    setStatus("idle");
    setError(null);
    setFieldErrors({});
  }

  if (status === "sent") {
    return (
      <div className="contact-form-done-card" role="status">
        <CheckCircle2 className="contact-done-icon" size={20} aria-hidden="true" />
        <p className="contact-form-done">Thank you. Your enquiry has been recorded by CPA Aviation Leasing Capital IFSC Private Limited.</p>
        <p className="contact-done-sub">
          For urgent corporate or statutory correspondence, you may also write directly to{" "}
          <a href="mailto:cpaaviationleasing@gmail.com">cpaaviationleasing@gmail.com</a>.
        </p>
        <Button type="button" variant="navigation" onClick={resetForm}>Submit another enquiry</Button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-honeypot" aria-hidden="true">
        <label>
          <span>Leave this field blank</span>
          <input name="website" type="text" value={form.website} onChange={set("website")} tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="contact-form-row">
        <label>
          <span>Full Name <abbr title="Required">*</abbr></span>
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
          {fieldErrors.name && <span id="contact-error-name" className="contact-field-error">{fieldErrors.name}</span>}
        </label>
        <label>
          <span>Company <em className="contact-optional">(Optional)</em></span>
          <input
            value={form.company}
            onChange={set("company")}
            maxLength={150}
            autoComplete="organization"
            placeholder="Airline, lessor, or institution"
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={fieldErrors.company ? "contact-error-company" : undefined}
          />
          {fieldErrors.company && <span id="contact-error-company" className="contact-field-error">{fieldErrors.company}</span>}
        </label>
      </div>
      <div className="contact-form-row">
        <label>
          <span>Business Email <abbr title="Required">*</abbr></span>
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
          {fieldErrors.email && <span id="contact-error-email" className="contact-field-error">{fieldErrors.email}</span>}
        </label>
        <label>
          <span>Subject <abbr title="Required">*</abbr></span>
          <input
            value={form.subject}
            onChange={set("subject")}
            maxLength={150}
            placeholder="Operating lease or corporate enquiry"
            aria-invalid={Boolean(fieldErrors.subject)}
            aria-describedby={fieldErrors.subject ? "contact-error-subject" : undefined}
            required
          />
          {fieldErrors.subject && <span id="contact-error-subject" className="contact-field-error">{fieldErrors.subject}</span>}
        </label>
      </div>
      <label>
        <span className="contact-label-split">
          <span>Message <abbr title="Required">*</abbr></span>
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
        {fieldErrors.message && <span id="contact-error-message" className="contact-field-error">{fieldErrors.message}</span>}
      </label>
      {error && <p className="contact-form-alert" role="alert">{error}</p>}
      <Button type="submit" variant="aviation" className="contact-submit-btn" disabled={status === "sending"}>
        <span>{status === "sending" ? <><Loader2 className="animate-spin" /> Sending Enquiry</> : <>Submit Enquiry <ArrowUpRight /></>}</span>
      </Button>
    </form>
  );
}
