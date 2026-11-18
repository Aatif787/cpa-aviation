import { z } from "zod";

export const CONTACT_EMAIL = "cpaaviationleasing@gmail.com";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(100, "Name must be 100 characters or fewer"),
  company: z
    .string()
    .trim()
    .max(150, "Company name must be 150 characters or fewer")
    .optional()
    .default(""),
  email: z.string().trim().email("Please enter a valid business email address").max(255),
  subject: z
    .string()
    .trim()
    .min(2, "Please enter a brief subject")
    .max(150, "Subject must be 150 characters or fewer"),
  message: z
    .string()
    .trim()
    .min(10, "Please provide at least 10 characters of detail")
    .max(1800, "Message must be 1800 characters or fewer"),
});

export type ContactEnquiry = z.infer<typeof contactSchema>;

/** Builds a mailto: link that opens the visitor's email app with the enquiry filled in. */
export function buildEnquiryMailto(enquiry: ContactEnquiry): string {
  const lines = [
    `Name: ${enquiry.name}`,
    enquiry.company ? `Company: ${enquiry.company}` : null,
    `Email: ${enquiry.email}`,
    "",
    enquiry.message,
  ].filter((line): line is string => line !== null);

  const params = `subject=${encodeURIComponent(enquiry.subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
  return `mailto:${CONTACT_EMAIL}?${params}`;
}
