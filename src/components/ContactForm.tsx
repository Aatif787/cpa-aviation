import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contactSchema, submitEnquiry } from "@/lib/contact.functions";

export function ContactForm() {
  const send = useServerFn(submitEnquiry);
  const [form, setForm] = useState({ name: "", company: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (error) setError(null);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) { setError(parsed.error.issues[0]?.message ?? "Please check the form."); return; }
    setStatus("sending"); setError(null);
    try {
      const res = await send({ data: parsed.data });
      if (res.ok) { setStatus("sent"); setForm({ name: "", company: "", email: "", subject: "", message: "" }); }
      else { setStatus("idle"); setError("Your message could not be sent. Please try again or email cpaaviationleasing@gmail.com."); }
    } catch { setStatus("idle"); setError("Your message could not be sent. Please try again."); }
  }

  if (status === "sent") return <p className="contact-form-done" role="status">Thank you. Your enquiry has been received.</p>;

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-form-row">
        <label><span>Full Name</span><input value={form.name} onChange={set("name")} maxLength={100} autoComplete="name" required /></label>
        <label><span>Company</span><input value={form.company} onChange={set("company")} maxLength={150} autoComplete="organization" /></label>
      </div>
      <div className="contact-form-row">
        <label><span>Business Email</span><input type="email" value={form.email} onChange={set("email")} maxLength={255} autoComplete="email" required /></label>
        <label><span>Subject</span><input value={form.subject} onChange={set("subject")} maxLength={150} required /></label>
      </div>
      <label><span>Message</span><textarea value={form.message} onChange={set("message")} maxLength={1800} rows={4} required /></label>
      {error && <p className="advisor-error" role="alert">{error}</p>}
      <Button type="submit" variant="aviation" disabled={status === "sending"}>
        {status === "sending" ? <><Loader2 className="animate-spin" /> Sending</> : <>Submit Enquiry <ArrowUpRight /></>}
      </Button>
    </form>
  );
}
