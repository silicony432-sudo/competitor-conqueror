import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing-page";
import heroImage from "@/assets/hero-dashboard.jpg";
import { comparisonItemList, faqPage, softwareApplication } from "@/lib/structured-data";

const TITLE = "6sense Alternative — Liner Predictive Sales Intelligence";
const DESCRIPTION = "A 6sense alternative without the enterprise price tag. Liner delivers predictive account intelligence and intent signals for modern revenue teams.";
const URL = "https://liner.ai/alternative-to-6sense";
const ROWS: [string, string, string][] = [
  ["Best fit", "Enterprise ABM programs", "Series A → IPO-stage revenue teams"],
  ["Implementation", "3–6 months with CSM", "Self-serve, days not months"],
  ["Pricing floor", "~$120K ARR typical", "Sub-$10K starter tier"],
  ["Intent signals", "Anonymous web + topic", "Editorial + market signal fusion"],
  ["Outreach", "Orchestration only", "Autonomous draft generation"],
];
const FAQS = [
  { question: "How is Liner different from 6sense?", answer: "Liner delivers predictive intent without the enterprise platform tax — same-week activation, transparent pricing and citation-grounded reasoning instead of opaque scores." },
  { question: "Do I need a dedicated ABM team to use Liner?", answer: "No. Unlike 6sense, Liner is opinionated software designed for self-serve adoption by individual AEs and small revenue teams." },
  { question: "Can Liner replace 6sense for predictive scoring?", answer: "Yes. Liner produces account-level predictions with cited signals, so reps know not just which accounts to prioritize but exactly why." },
];

export const Route = createFileRoute("/alternative-to-6sense")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "6sense alternative, alternative to 6sense, 6sense competitor, Demandbase alternative, predictive ABM, account intelligence" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImage },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: heroImage },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(comparisonItemList({ name: "Liner vs 6sense — Capability comparison", url: URL, competitorName: "6sense", rows: ROWS })) },
      { type: "application/ld+json", children: JSON.stringify(faqPage(FAQS)) },
      { type: "application/ld+json", children: JSON.stringify(softwareApplication({ name: "Liner", url: URL, description: DESCRIPTION, image: heroImage })) },
    ],
  }),
  component: () => (
    <MarketingPage
      eyebrow="Compare · 6sense"
      title={<>A leaner <em>6sense alternative</em>.</>}
      intro="6sense built the enterprise ABM category. Liner brings predictive intent to teams that don't have a six-month implementation budget."
      competitorName="6sense"
      comparisonRows={ROWS}
      sections={[
        { heading: "Predictive without the platform tax", body: <p>You shouldn't need a dedicated ABM team to use predictive intent. Liner is opinionated software you turn on and start using the same day.</p> },
        { heading: "Editorial-grade reasoning", body: <p>6sense scores accounts. Liner explains them — every signal arrives with the underlying news, filing or hiring change cited.</p> },
      ]}
    />
  ),
});