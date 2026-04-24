import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing-page";
import heroImage from "@/assets/hero-dashboard.jpg";
import { comparisonItemList, faqPage, softwareApplication } from "@/lib/structured-data";

const TITLE = "Clearbit Alternative — Liner Predictive Lead Generation";
const DESCRIPTION = "A Clearbit alternative built for the post-acquisition era. Liner enriches accounts with predictive intent — not just firmographic snapshots.";
const URL = "https://liner.ai/alternative-to-clearbit";
const ROWS: [string, string, string][] = [
  ["Primary use", "Firmographic enrichment", "Predictive opportunity discovery"],
  ["HubSpot lock-in", "Increasingly bundled", "Works with any CRM"],
  ["Intent layer", "Visitor reveal only", "Multi-source predictive"],
  ["Coverage of private companies", "Public-heavy", "Editorial sources include private"],
];
const FAQS = [
  { question: "Is Liner a good Clearbit alternative after the HubSpot acquisition?", answer: "Yes. Liner is CRM-agnostic and adds a predictive intent layer Clearbit (now Breeze Intelligence) does not provide outside the HubSpot bundle." },
  { question: "Does Liner enrich records like Clearbit did?", answer: "Liner provides firmographic and contact enrichment, plus temporal signals such as funding, hiring and exec changes — not just static snapshots." },
  { question: "Can Liner replace Clearbit Reveal for visitor de-anonymization?", answer: "Liner offers reveal alongside predictive scoring so you act on the visitors most likely to convert, not just the largest logos." },
];

export const Route = createFileRoute("/alternative-to-clearbit")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "Clearbit alternative, alternative to Clearbit, Clearbit competitor, Breeze Intelligence alternative, predictive enrichment" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImage },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: heroImage },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(comparisonItemList({ name: "Liner vs Clearbit — Capability comparison", url: URL, competitorName: "Clearbit", rows: ROWS })) },
      { type: "application/ld+json", children: JSON.stringify(faqPage(FAQS)) },
      { type: "application/ld+json", children: JSON.stringify(softwareApplication({ name: "Liner", url: URL, description: DESCRIPTION, image: heroImage })) },
    ],
  }),
  component: () => (
    <MarketingPage
      eyebrow="Compare · Clearbit"
      title={<>The <em>Clearbit alternative</em> for predictive teams.</>}
      intro="Since the HubSpot acquisition, Clearbit (now Breeze Intelligence) has narrowed its focus. Liner picks up where Clearbit left off — and adds predictive intent on top."
      competitorName="Clearbit"
      comparisonRows={ROWS}
      sections={[
        { heading: "Beyond firmographics", body: <p>Knowing a company's headcount doesn't tell you when they'll buy. Liner adds the missing temporal layer — when, why and through which executive entry point.</p> },
        { heading: "CRM-agnostic by design", body: <p>Salesforce, HubSpot, Attio, Pipedrive — Liner ships first-class integrations and never penalizes you for not standardizing on one platform.</p> },
      ]}
    />
  ),
});