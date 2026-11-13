import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your full name").max(100),
  company: z.string().trim().max(150).optional().default(""),
  email: z.string().trim().email("Please enter a valid business email").max(255),
  subject: z.string().trim().min(2, "Please enter a subject").max(150),
  message: z.string().trim().min(10, "Please add a little more detail").max(1800),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const formattedMessage = `Subject: ${data.subject}\n\n${data.message}`;
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      message: formattedMessage,
    });
    if (error) { console.error("contact insert failed", error.message); return { ok: false as const }; }
    return { ok: true as const };
  });
