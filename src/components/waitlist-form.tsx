import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { joinWaitlist } from "@/utils/waitlist.functions";
import { Loader2, Check } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export function WaitlistForm({ source = "landing", variant = "light" }: { source?: string; variant?: "light" | "dark" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const join = useServerFn(joinWaitlist);

  const dark = variant === "dark";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const result = await join({
        data: {
          email,
          source,
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
        },
      });
      if (result.ok) {
        setStatus("success");
        setMessage(
          result.alreadyJoined
            ? "You're already on the list — we'll be in touch."
            : "You're in. Watch for a note from Liner soon.",
        );
        setEmail("");
      } else {
        setStatus("error");
        setMessage(result.error ?? "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error && err.message.includes("email") ? "Please enter a valid email." : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl">
      <div className={`flex flex-col gap-3 sm:flex-row ${dark ? "" : ""}`}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Corporate email"
          className={`flex-1 rounded-full border px-6 py-4 text-base outline-none transition-all focus:ring-2 focus:ring-offset-2 focus:ring-offset-background ${
            dark
              ? "border-paper/20 bg-paper/5 text-paper placeholder:text-paper/40 focus:ring-accent"
              : "border-rule bg-paper text-foreground placeholder:text-muted-foreground focus:ring-primary"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`group inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-all disabled:opacity-60 ${
            dark
              ? "bg-accent text-accent-foreground hover:opacity-90"
              : "bg-primary text-primary-foreground hover:opacity-90"
          }`}
        >
          {status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : status === "success" ? (
            <Check className="h-4 w-4" />
          ) : null}
          {status === "success" ? "Joined" : "Join Waitlist"}
        </button>
      </div>
      {message && (
        <p
          className={`mt-4 text-sm ${
            status === "success"
              ? dark ? "text-accent" : "text-foreground"
              : "text-destructive"
          }`}
        >
          {message}
        </p>
      )}
      <p className={`mt-3 text-xs ${dark ? "text-paper/40" : "text-muted-foreground"}`}>
        No spam. We'll only email you about early access.
      </p>
    </form>
  );
}