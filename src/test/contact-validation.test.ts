import { describe, expect, it } from "vitest";
import { buildEnquiryMailto, contactSchema } from "@/lib/contact";

describe("contactSchema", () => {
  it("accepts a complete business enquiry payload", () => {
    const parsed = contactSchema.safeParse({
      name: "Aarav Mehta",
      company: "Skybridge Aviation",
      email: "aarav@skybridge.example",
      subject: "Document Access Request: Letter of Approval (LoA)",
      message: "Requesting access to the authorised operating lease scope summary.",
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


describe("buildEnquiryMailto", () => {
  it("addresses the company inbox with the enquiry encoded", () => {
    const href = buildEnquiryMailto({
      name: "Aarav Mehta",
      company: "",
      email: "aarav@skybridge.example",
      subject: "Lease & finance",
      message: "Requesting corporate details for operating lease.",
    });

    expect(href.startsWith("mailto:cpaaviationleasing@gmail.com?subject=Lease%20%26%20finance&body=")).toBe(true);
    expect(decodeURIComponent(href.split("body=")[1] ?? "")).toContain("Email: aarav@skybridge.example");
    expect(href).not.toContain("Company");
  });
});
