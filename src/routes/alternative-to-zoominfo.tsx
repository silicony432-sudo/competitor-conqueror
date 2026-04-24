import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing-page";
import heroImage from "@/assets/hero-dashboard.jpg";
import { comparisonItemList, softwareApplication } from "@/lib/structured-data";

const TITLE = "The Best ZoomInfo Alternative in 2026 — Liner";
const DESCRIPTION =
  "Looking for a ZoomInfo alternative? Liner replaces static contact databases with predictive lead generation, real-time buying intent and autonomous outreach — at a fraction of the cost.";
const URL = "https://liner.ai/alternative-to-zoominfo";
const ROWS: [string, string, string][] = [
  ["Core data model", "Static contact database", "Predictive opportunity graph"],
  ["Intent signals", "Bombora-licensed topic data", "Editorial + market signal fusion"],
  ["Refresh cadence", "Quarterly enrichment", "Real-time signal pipeline"],
  ["Outreach", "Engage add-on, manual sequences", "Autonomous, on-brand drafts included"],
  ["Pricing model", "Seat-based, $15K+ minimums", "Usage-aligned, transparent tiers"],
  ["Time to value", "6–12 weeks onboarding", "Same-week activation"],
  ["GDPR / data ethics", "Scraped contact compliance flags", "Editorial-source first, opt-in friendly"],
];

export const Route = createFileRoute("/alternative-to-zoominfo")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "ZoomInfo alternative, alternative to ZoomInfo, ZoomInfo competitor, cheaper than ZoomInfo, ZoomInfo replacement, predictive lead generation, sales intelligence software" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImage },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: heroImage },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            { "@type": "Question", name: "Is Liner cheaper than ZoomInfo?", acceptedAnswer: { "@type": "Answer", text: "Yes. Liner uses transparent usage-aligned pricing, typically 40–70% less than comparable ZoomInfo seats." } },
            { "@type": "Question", name: "Does Liner have the same coverage as ZoomInfo?", acceptedAnswer: { "@type": "Answer", text: "Liner covers the same companies plus predictive intent layer ZoomInfo lacks. Where ZoomInfo lists contacts, Liner forecasts deals." } },
            { "@type": "Question", name: "Can I migrate my ZoomInfo lists to Liner?", acceptedAnswer: { "@type": "Answer", text: "Yes — concierge migration is included for waitlist members." } },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(comparisonItemList({ name: "Liner vs ZoomInfo — Capability comparison", url: URL, competitorName: "ZoomInfo", rows: ROWS })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(softwareApplication({ name: "Liner", url: URL, description: DESCRIPTION, image: heroImage })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to migrate from ZoomInfo to Liner",
          description: "Switch your sales intelligence stack from ZoomInfo to Liner in under a week with concierge migration.",
          step: [
            { "@type": "HowToStep", position: 1, name: "Join the waitlist", text: "Submit your work email to reserve concierge migration for the first 100 ZoomInfo switchers." },
            { "@type": "HowToStep", position: 2, name: "Export your saved searches and lists", text: "Use ZoomInfo's standard CSV export to download your saved searches, lists and contact data." },
            { "@type": "HowToStep", position: 3, name: "Import into Liner", text: "Liner's migration team maps your ZoomInfo segments to predictive opportunity views inside Liner." },
            { "@type": "HowToStep", position: 4, name: "Activate predictive signals", text: "Connect your CRM and turn on the editorial + market signal pipeline to start receiving real-time intent." },
          ],
        }),
      },
    ],
  }),
  component: () => (
    <MarketingPage
      eyebrow="Compare · ZoomInfo"
      title={<>The intelligent <em>alternative to ZoomInfo</em>.</>}
      intro="ZoomInfo sells contacts. Liner predicts deals. See why revenue teams are migrating from ZoomInfo to Liner for predictive lead generation and real-time buying intent."
      competitorName="ZoomInfo"
      comparisonRows={ROWS}
      sections={[
        {
          heading: "Why teams replace ZoomInfo with Liner",
          body: (
            <>
              <p className="mb-4">ZoomInfo built the largest B2B contact database — but databases are commoditized. Email finders cost $20/month now. What revenue teams actually need is <em>signal</em>: which accounts will buy, and when.</p>
              <p>Liner is built around that question. We monitor 1,200+ public sources — hiring, funding, regulatory filings, product launches, executive moves — and surface the accounts most likely to buy in the next 30 days.</p>
            </>
          ),
        },
        {
          heading: "Predictive vs. retrospective intelligence",
          body: (
            <>
              <p className="mb-4">ZoomInfo intent (powered by Bombora) tells you which companies <em>have already</em> researched a topic. By the time it shows up, your competitor's SDR is already in their inbox.</p>
              <p>Liner's predictive engine identifies the precursor signals — <em>before</em> a buying committee starts researching. You're first, not fastest.</p>
            </>
          ),
        },
        {
          heading: "Pricing built for modern teams",
          body: (
            <>
              <p className="mb-4">ZoomInfo's annual contracts start in the five figures with seat minimums that punish growing teams. Liner pricing scales with opportunities surfaced — you only pay for what works.</p>
              <p>Migration concierge included for the first 100 waitlist members switching from ZoomInfo.</p>
            </>
          ),
        },
        {
          heading: "Coverage you can verify",
          body: (
            <>
              <p className="mb-4">We don't sell vanity coverage numbers. Every Liner opportunity ships with citations to the underlying signals: the funding round, the job posting, the regulatory filing.</p>
              <p>Your reps know <em>why</em> a lead matters — which is the difference between a 2% and a 20% reply rate.</p>
            </>
          ),
        },
      ]}
    />
  ),
});