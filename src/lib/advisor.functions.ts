import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const getServiceAdvice = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ needs: z.string().trim().min(15).max(1500) }).parse(input))
  .handler(async ({ data }) => {
    const { recommendServices } = await import("./advisor.server");
    return recommendServices(data.needs);
  });
