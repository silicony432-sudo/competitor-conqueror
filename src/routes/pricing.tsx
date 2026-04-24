import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WaitlistForm } from "@/components/waitlist-form";
import heroImage from "@/assets/hero-dashboard.jpg";

const TITLE = "Liner Pricing — Transparent Predictive Sales Intelligence";
const DESCRIPTION = "Liner pricing is usage-aligned and transparent. No seat minimums, no annual lock-in. Built for revenue teams replacing legacy sales intelligence platforms.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImage },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: heroImage },
    ],
    links: [{ rel: "canonical", href: "https://liner.ai/pricing" }],
  }),
  component: PricingPage,
});

const tiers = [
  {
    name: "Founder",
    price: "$0",
    sub: "Waitlist invite",
    desc: "For founders running outbound themselves.",
    features: ["50 predictive opportunities / mo", "Editorial briefing", "Single user", "Email support"],
  },
  {
    name: "Team",
    price: "$890",
    sub: "/month",
    desc: "For modern revenue teams replacing legacy intel.",
    features: ["1,500 opportunities / mo", "Autonomous outreach drafts", "CRM sync (Salesforce, HubSpot, Attio)", "Up to 10 seats", "Slack support"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    sub: "",
    desc: "For revenue orgs replacing 6sense, ZoomInfo or Demandbase.",
    features: ["Unlimited opportunities", "Dedicated signal sources", "SSO + audit log", "Concierge migration", "Dedicated CSM"],
  },
];

function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-gradient-warm">
          <div className="mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Pricing</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight md:text-6xl">
              Transparent, <em>usage-aligned</em> pricing.
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
              No seat minimums. No annual lock-in. Pay for opportunities surfaced, not contacts stored.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-6 md:grid-cols-3">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`relative rounded-3xl border p-8 ${
                  t.featured
                    ? "border-foreground bg-ink text-paper shadow-editorial"
                    : "border-rule bg-paper"
                }`}
              >
                {t.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-accent px-3 py-1 text-xs uppercase tracking-widest text-accent-foreground">
                    Most popular
                  </span>
                )}
                <h3 className="font-serif text-2xl">{t.name}</h3>
                <p className={`mt-2 text-sm ${t.featured ? "text-paper/60" : "text-muted-foreground"}`}>
                  {t.desc}
                </p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="font-serif text-5xl">{t.price}</span>
                  <span className={`text-sm ${t.featured ? "text-paper/60" : "text-muted-foreground"}`}>
                    {t.sub}
                  </span>
                </div>
                <ul className="mt-8 space-y-3 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${t.featured ? "text-accent" : "text-foreground"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/"
                  hash="waitlist"
                  className={`mt-8 inline-block w-full rounded-full px-5 py-3 text-center text-sm font-medium ${
                    t.featured
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  Join waitlist
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="font-serif text-4xl">Be among the first 100.</h2>
          <p className="mt-4 text-muted-foreground">Waitlist members lock in launch pricing for 12 months.</p>
          <div className="mt-10">
            <WaitlistForm source="pricing" />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}