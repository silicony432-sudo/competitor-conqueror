import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const WaitlistInput = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  source: z.string().max(120).optional(),
  userAgent: z.string().max(500).optional(),
});

export const joinWaitlist = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => WaitlistInput.parse(input))
  .handler(async ({ data }) => {
    try {
      const { error } = await supabaseAdmin
        .from("waitlist_signups")
        .insert({
          email: data.email,
          source: data.source ?? "landing",
          user_agent: data.userAgent ?? null,
        });

      if (error) {
        // Unique violation -> treat as success (idempotent)
        if (error.code === "23505") {
          return { ok: true, alreadyJoined: true };
        }
        console.error("Waitlist insert error:", error);
        return { ok: false, error: "We couldn't save your signup. Please try again." };
      }

      return { ok: true, alreadyJoined: false };
    } catch (err) {
      console.error("Waitlist handler error:", err);
      return { ok: false, error: "Something went wrong. Please try again." };
    }
  });