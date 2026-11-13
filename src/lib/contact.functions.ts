import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  company: z.string().trim().max(150).optional().default(""),
  message: z.string().trim().min(10, "Please add a little more detail").max(2000),
});

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name, email: data.email, company: data.company || null, message: data.message,
    });
    if (error) { console.error("contact insert failed", error.message); return { ok: false as const }; }
    return { ok: true as const };
  });
