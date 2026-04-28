import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Radar, Send, LineChart, Target, Zap } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WaitlistForm } from "@/components/waitlist-form";
import heroImage from "@/assets/hero-dashboard.jpg";
import { IntelMapWidget } from "@/components/intel-map-widget";
import { Search, ShieldCheck, UserCheck, Briefcase, Sparkles as SparklesIcon } from "lucide-react";

const TITLE = "Liner — AI Predictive Lead Generation & Sales Intelligence";
const DESCRIPTION =
  "Discover buying intent before competitors. Liner is the AI predictive lead generation and sales intelligence platform that finds opportunities early and automates outreach.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "predictive lead generation, sales intelligence software, AI prospecting platform, buying intent data, B2B lead discovery, revenue intelligence software, autonomous outreach, ZoomInfo alternative, Apollo alternative, Clearbit alternative, 6sense alternative" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImage },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: heroImage },
    ],
    links: [{ rel: "canonical", href: "https://liner.ai/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Liner",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: DESCRIPTION,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "127" },
          publisher: { "@type": "Organization", name: "Tyora", brand: "Liner", url: "https://liner.ai" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "What is predictive lead generation?", acceptedAnswer: { "@type": "Answer", text: "Predictive lead generation uses buying intent signals and AI to identify likely buyers before demand becomes public." } },
            { "@type": "Question", name: "Is Liner an alternative to ZoomInfo?", acceptedAnswer: { "@type": "Answer", text: "Yes — Liner is a modern alternative to ZoomInfo, Apollo.io, Clearbit and 6sense. Instead of static contact databases, Liner forecasts demand and surfaces opportunities before they hit the public market." } },
            { "@type": "Question", name: "Who uses sales intelligence software?", acceptedAnswer: { "@type": "Answer", text: "B2B sales teams, consultants, agencies and revenue operations leaders." } },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-warm" />
          <div className="mx-auto max-w-6xl px-6 pb-16 pt-20 lg:pt-28">
            <div className="mx-auto max-w-4xl text-center">
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-rule bg-paper/60 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <Sparkles className="h-3 w-3 text-accent" /> In stealth · Pre-launch waitlist open
              </p>
              <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-balance md:text-7xl">
                A preview of how Liner <span className="italic">will work</span> at launch.
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground md:text-xl">
                Liner is still in stealth. The interactive demo below is a concept preview of how our Axiom B6 engine will discover businesses, verify contacts, and help you land roles or close deals — once we launch.
              </p>

              <div id="waitlist" className="mt-12 scroll-mt-24">
                <WaitlistForm source="hero" />
              </div>
            </div>

            <div className="perspective-1000 relative mx-auto mt-20 max-w-6xl">
              <div className="absolute inset-0 -z-10 translate-y-8 scale-95 bg-gradient-editorial opacity-20 blur-3xl" />
              <IntelMapWidget />
            </div>

            <p className="mt-12 text-center text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Concept preview · Built as the future alternative to ZoomInfo, Apollo, Clearbit & 6sense
            </p>
          </div>
        </section>

        {/* WHAT IS */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="grid gap-16 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">01 · Definition</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
                What is predictive lead generation?
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                Predictive lead generation uses buying intent signals, market activity and AI analysis to identify potential customers <em>before</em> traditional demand appears.
              </p>
              <p>
                When Liner launches, it will combine sales intelligence, AI prospecting and autonomous outreach so revenue teams act earlier — and win deals competitors don't even know exist yet.
              </p>
              <Link to="/predictive-lead-generation" className="inline-flex items-center gap-2 text-foreground underline-offset-4 hover:underline">
                Read the full guide <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-paper py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">02 · Method</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">How Liner will work</h2>
              <p className="mt-4 text-muted-foreground">A preview of the four-stage Axiom B6 pipeline at launch.</p>
            </div>
            <ol className="grid gap-px overflow-hidden rounded-3xl border border-rule bg-rule md:grid-cols-4">
              {[
                { n: "01", t: "Collect", d: "Verified market signals from 1,200+ public and licensed sources." },
                { n: "02", t: "Analyze", d: "AI models surface buying intent patterns weeks before public demand." },
                { n: "03", t: "Score", d: "Predictive opportunity scores ranked by deal probability and timing." },
                { n: "04", t: "Outreach", d: "Autonomous, on-brand outreach drafted for each opportunity." },
              ].map((s) => (
                <li key={s.n} className="bg-background p-8">
                  <div className="font-serif text-sm text-accent">{s.n}</div>
                  <h3 className="mt-3 font-serif text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">03 · Capabilities</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">What you'll get at launch.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { i: Radar, t: "Predictive Lead Mapping", d: "Identify market shifts, hiring waves and funding events before public opportunities emerge." },
              { i: Target, t: "Buying Intent Intelligence", d: "Detect likely purchase signals across web, news, regulatory and social channels." },
              { i: Send, t: "Autonomous Outreach", d: "Generate tailored, on-brand messaging recommendations per prospect." },
              { i: LineChart, t: "Revenue Forecasting", d: "Pipeline projections grounded in real demand signals, not gut feel." },
              { i: Zap, t: "CRM-Native", d: "Push enriched opportunities directly into Salesforce, HubSpot or Attio." },
              { i: Sparkles, t: "Editorial Briefings", d: "Daily intelligence briefs written for revenue teams who think like operators." },
            ].map((f) => (
              <div key={f.t} className="lift-3d group rounded-3xl border border-rule bg-paper p-8 shadow-soft">
                <f.i className="h-7 w-7 text-accent" />
                <h3 className="mt-6 font-serif text-2xl">{f.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* COMPARE */}
        <section className="bg-paper py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 max-w-3xl">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">04 · Comparison</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
                Designed as the alternative to ZoomInfo, Apollo & Clearbit.
              </h2>
              <p className="mt-6 text-lg text-muted-foreground">
                Traditional lead databases store yesterday's contacts. Liner is being built to forecast tomorrow's buyers.
              </p>
            </div>

            <div className="overflow-hidden rounded-3xl border border-rule">
              <table className="w-full text-left">
                <thead className="bg-ink text-paper">
                  <tr>
                    <th className="p-5 font-serif text-base font-normal">Capability</th>
                    <th className="p-5 font-serif text-base font-normal">Legacy databases</th>
                    <th className="p-5 font-serif text-base font-normal text-accent">Liner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule bg-background">
                  {[
                    ["Data model", "Static contact lists", "Predictive opportunity graph"],
                    ["Intent signals", "Cookie-based topic tracking", "Editorial + market signal fusion"],
                    ["Outreach", "Manual sequences", "Autonomous, on-brand drafts"],
                    ["Refresh rate", "Quarterly enrichment", "Real-time signal pipeline"],
                    ["Pricing", "Seat-based, opaque", "Usage-aligned, transparent"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      <td className="p-5 font-medium">{row[0]}</td>
                      <td className="p-5 text-muted-foreground">{row[1]}</td>
                      <td className="p-5 font-medium text-foreground">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/alternative-to-zoominfo" className="rounded-full border border-rule bg-background px-5 py-2.5 text-sm hover:bg-paper">vs ZoomInfo →</Link>
              <Link to="/alternative-to-apollo" className="rounded-full border border-rule bg-background px-5 py-2.5 text-sm hover:bg-paper">vs Apollo.io →</Link>
              <Link to="/alternative-to-clearbit" className="rounded-full border border-rule bg-background px-5 py-2.5 text-sm hover:bg-paper">vs Clearbit →</Link>
              <Link to="/alternative-to-6sense" className="rounded-full border border-rule bg-background px-5 py-2.5 text-sm hover:bg-paper">vs 6sense →</Link>
            </div>
          </div>
        </section>

        {/* PULL QUOTES */}
        <section className="mx-auto max-w-5xl px-6 py-32">
          <div className="space-y-16">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">From early design partners</p>
            <blockquote className="border-l-2 border-accent pl-8 font-serif text-3xl leading-snug md:text-4xl">
              "If Liner ships what they're previewing, it'll be the first tool that shows us deals <em>before</em> they exist in any CRM."
              <footer className="mt-4 text-sm not-italic text-muted-foreground">— Head of Revenue, design-partner SaaS (stealth)</footer>
            </blockquote>
            <blockquote className="border-l-2 border-accent pl-8 font-serif text-3xl leading-snug md:text-4xl">
              "We've been previewing Liner internally — the predictive layer is what ZoomInfo and Apollo never gave us."
              <footer className="mt-4 text-sm not-italic text-muted-foreground">— VP Sales, fintech design partner</footer>
            </blockquote>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-paper py-24">
          <div className="mx-auto max-w-4xl px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">05 · FAQ</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Frequently asked questions</h2>
            <div className="mt-12 divide-y divide-rule border-y border-rule">
              {[
                { q: "What is predictive lead generation software?", a: "Software that uses data signals — hiring, funding, web activity, regulatory changes — to forecast likely sales opportunities weeks before traditional demand appears." },
                { q: "Is Liner a ZoomInfo alternative?", a: "Yes. Liner is built as a modern alternative to ZoomInfo, Apollo.io, Clearbit and 6sense. Instead of selling static contact records, we forecast demand." },
                { q: "Who uses sales intelligence software?", a: "B2B sales teams, RevOps leaders, agencies, consultants and founders running outbound." },
                { q: "Does Liner integrate with my CRM?", a: "Yes — native integrations with Salesforce, HubSpot and Attio. Push opportunities and intent scores directly into your pipeline." },
                { q: "When does Liner launch?", a: "Liner is currently in stealth. Early access will open to waitlist members in waves once we launch — join the waitlist to get an invite." },
              ].map((f) => (
                <details key={f.q} className="group py-6">
                  <summary className="flex cursor-pointer items-center justify-between font-serif text-xl">
                    {f.q}
                    <span className="ml-4 text-accent transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative overflow-hidden bg-ink py-32 text-paper">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-serif text-5xl leading-tight md:text-6xl">
              Be first in line when Liner launches.
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-paper/85">
              Liner is in stealth. Join the waitlist to get an early-access invite at launch — plus the weekly editorial intelligence briefing.
            </p>
            <div className="mt-12">
              <WaitlistForm source="footer" variant="dark" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
