import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const MIN_FORM_FILL_MS = 2000;
const recentSubmissions = new Map<string, number[]>();

function isRateLimited(key: string, now: number): boolean {
  const history = (recentSubmissions.get(key) ?? []).filter(ts => now - ts < RATE_WINDOW_MS);
  if (history.length >= MAX_REQUESTS_PER_WINDOW) {
    recentSubmissions.set(key, history);
    return true;
  }
  history.push(now);
  recentSubmissions.set(key, history);
  return false;
}

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(100, "Name must be 100 characters or fewer"),
  company: z.string().trim().max(150, "Company name must be 150 characters or fewer").optional().default(""),
  email: z.string().trim().email("Please enter a valid business email address").max(255),
  subject: z.string().trim().min(2, "Please enter a brief subject").max(150, "Subject must be 150 characters or fewer"),
  message: z.string().trim().min(10, "Please provide at least 10 characters of detail").max(1800, "Message must be 1800 characters or fewer"),
  website: z.string().optional().default(""),
  formLoadedAt: z.number().finite().optional(),
});

export type SubmitEnquiryResult =
  | { ok: true }
  | { ok: false; error: string };

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }): Promise<SubmitEnquiryResult> => {
    if (data.website.trim().length > 0) {
      return { ok: false, error: "Unable to process this submission. Please email cpaaviationleasing@gmail.com directly." };
    }

    const now = Date.now();
    if (typeof data.formLoadedAt === "number" && data.formLoadedAt > 0 && now - data.formLoadedAt < MIN_FORM_FILL_MS) {
      return { ok: false, error: "Please take a moment to review your details before submitting." };
    }

    const urlMatches = data.message.match(/https?:\/\/|www\./gi);
    if (urlMatches && urlMatches.length > 3) {
      return { ok: false, error: "For security reasons, enquiries may include at most three links." };
    }

    if (isRateLimited(data.email.toLowerCase(), now)) {
      return {
        ok: false,
        error: "Multiple enquiries were recently submitted from this email address. Please wait a few minutes or email cpaaviationleasing@gmail.com.",
      };
    }

    try {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const companyLine = data.company ? `Company: ${data.company}\n` : "";
      const formattedMessage = `${companyLine}Subject: ${data.subject}\n\n${data.message}`;
      const { error } = await supabaseAdmin.from("contact_submissions").insert({
        name: data.name,
        email: data.email,
        company: data.company || null,
        message: formattedMessage,
      });
      if (error) {
        console.error("contact insert failed", error.message);
        return {
          ok: false,
          error: "We could not record your enquiry right now. Please contact cpaaviationleasing@gmail.com or call +91 85277 12949.",
        };
      }
      return { ok: true };
    } catch (err) {
      console.error("contact service unavailable", err);
      return {
        ok: false,
        error: "Enquiry submission service is currently unavailable. Please email cpaaviationleasing@gmail.com directly.",
      };
    }
  });
