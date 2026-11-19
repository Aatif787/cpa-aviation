import { describe, expect, it } from "vitest";
import { buildLeadPayload } from "@/lib/leads";

describe("buildLeadPayload", () => {
  it("maps an enquiry to the leads API payload with subject and company in the message", () => {
    const payload = buildLeadPayload(
      {
        name: "Aarav Mehta",
        company: "Skybridge Aviation",
        email: "aarav@skybridge.example",
        subject: "Operating lease",
        message: "Requesting corporate details for operating lease.",
      },
      "",
    );

    expect(payload).toEqual({
      type: "quote",
      name: "Aarav Mehta",
      email: "aarav@skybridge.example",
      phone: "",
      message:
        "Subject: Operating lease\nCompany: Skybridge Aviation\n\nRequesting corporate details for operating lease.",
      website: "",
    });
  });

  it("omits the company line when none is given and passes the honeypot through", () => {
    const payload = buildLeadPayload(
      {
        name: "Aarav Mehta",
        company: "",
        email: "aarav@skybridge.example",
        subject: "Enquiry",
        message: "Requesting corporate details.",
      },
      "bot-filled",
    );

    expect(payload.message).toBe("Subject: Enquiry\n\nRequesting corporate details.");
    expect(payload.website).toBe("bot-filled");
  });
});
