import type { ContactEnquiry } from "@/lib/contact";

// Browser-side client for the CPA leads API. The site key is a public, origin-bound key:
// the API only accepts it from this website's origins (CORS + Origin check), so it is safe to
// ship in the client bundle. Both values are inlined at build time from .env.production.
const LEADS_API_URL =
  (import.meta.env["VITE_LEADS_API_URL"] as string | undefined) ??
  "https://clp.cpaleasing.com/api/v1/leads";
const LEADS_SITE_KEY = (import.meta.env["VITE_LEADS_SITE_KEY"] as string | undefined) ?? "";

export const leadsConfigured = LEADS_SITE_KEY.length > 0;

export type LeadField = "name" | "email" | "message";
export type LeadResult =
  { status: "accepted" } | { status: "invalid"; fields: LeadField[] } | { status: "rejected" };

/** Maps a validated enquiry to the leads API payload. Company and subject go into the message. */
export function buildLeadPayload(enquiry: ContactEnquiry, honeypot: string) {
  const header = [
    `Subject: ${enquiry.subject}`,
    enquiry.company ? `Company: ${enquiry.company}` : null,
  ]
    .filter((line): line is string => line !== null)
    .join("\n");
  return {
    type: "quote" as const,
    name: enquiry.name,
    email: enquiry.email,
    phone: "",
    message: `${header}\n\n${enquiry.message}`,
    website: honeypot, // honeypot: real visitors leave it empty
  };
}

export async function submitLead(enquiry: ContactEnquiry, honeypot: string): Promise<LeadResult> {
  try {
    const response = await fetch(LEADS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Site-Key": LEADS_SITE_KEY },
      body: JSON.stringify(buildLeadPayload(enquiry, honeypot)),
    });

    if (response.status === 201) return { status: "accepted" };

    if (response.status === 400) {
      const body = (await response.json().catch(() => ({}))) as { errors?: Record<string, string> };
      const fields = Object.keys(body.errors ?? {}).filter(
        (key): key is LeadField => key === "name" || key === "email" || key === "message",
      );
      if (fields.length > 0) return { status: "invalid", fields };
    }
    return { status: "rejected" };
  } catch {
    return { status: "rejected" };
  }
}
