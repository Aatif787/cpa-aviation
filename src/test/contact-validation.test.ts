import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact.functions";

describe("contactSchema", () => {
  it("accepts a complete business enquiry payload", () => {
    const parsed = contactSchema.safeParse({
      name: "Aarav Mehta",
      company: "Skybridge Aviation",
      email: "aarav@skybridge.example",
      subject: "Document Access Request: Letter of Approval (LoA)",
      message: "Requesting access to the authorised operating lease scope summary.",
      website: "",
      formLoadedAt: Date.now() - 5000,
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects invalid emails and short messages", () => {
    const badEmail = contactSchema.safeParse({
      name: "Aarav Mehta",
      email: "not-an-email",
      subject: "Enquiry",
      message: "Requesting corporate details for operating lease.",
    });
    const shortMessage = contactSchema.safeParse({
      name: "Aarav Mehta",
      email: "aarav@skybridge.example",
      subject: "Enquiry",
      message: "Hi",
    });

    expect(badEmail.success).toBe(false);
    expect(shortMessage.success).toBe(false);
  });
});

