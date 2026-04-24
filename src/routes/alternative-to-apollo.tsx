import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing-page";
import heroImage from "@/assets/hero-dashboard.jpg";
import { comparisonItemList, faqPage, softwareApplication } from "@/lib/structured-data";

const TITLE = "Apollo.io Alternative — Liner Predictive Sales Intelligence";
const DESCRIPTION = "The Apollo.io alternative for teams that want predictive intent signals, not just contact data. Liner forecasts deals before they hit your competitors' radar.";
const URL = "https://liner.ai/alternative-to-apollo";
const ROWS: [string, string, string][] = [
  ["Core focus", "Contact database + sequencer", "Predictive opportunity engine"],
  ["Intent signals", "Limited topic intent", "Editorial + market signal fusion"],
  ["Email quality", "Bulk verification", "Per-account, signal-grounded drafts"],
  ["Deliverability risk", "High-volume sequence flagging", "Quality-over-quantity outreach"],
  ["Pricing", "Per-seat with credit limits", "Usage-aligned, transparent"],
];
const FAQS = [
  { question: "Is Liner a true Apollo.io alternative?", answer: "Yes. Liner replaces Apollo's database + sequencer model with a predictive opportunity engine that surfaces accounts most likely to buy in the next 30 days." },
  { question: "Can I import my Apollo contacts and sequences into Liner?", answer: "Yes — Liner offers concierge migration for waitlist members switching from Apollo, including saved searches and sequence templates." },
  { question: "How does Liner pricing compare to Apollo?", answer: "Liner uses transparent usage-aligned pricing rather than per-seat credit limits, which typically removes the credit anxiety Apollo teams hit mid-quarter." },
];

export const Route = createFileRoute("/alternative-to-apollo")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "Apollo alternative, Apollo.io alternative, alternative to Apollo, Apollo competitor, predictive sales intelligence" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImage },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: heroImage },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(comparisonItemList({ name: "Liner vs Apollo.io — Capability comparison", url: URL, competitorName: "Apollo.io", rows: ROWS })) },
      { type: "application/ld+json", children: JSON.stringify(faqPage(FAQS)) },
      { type: "application/ld+json", children: JSON.stringify(softwareApplication({ name: "Liner", url: URL, description: DESCRIPTION, image: heroImage })) },
    ],
  }),
  component: () => (
    <MarketingPage
      eyebrow="Compare · Apollo.io"
      title={<>The premium <em>Apollo.io alternative</em>.</>}
      intro="Apollo gives you contacts and sequences. Liner gives you predictive opportunities — accounts that will buy in the next 30 days, with editorial-grade reasoning attached."
      competitorName="Apollo.io"
      comparisonRows={ROWS}
      sections={[
        { heading: "Beyond bulk outbound", body: <p>Apollo's strength is volume. Liner's strength is precision. Send 90% fewer emails and book more meetings — because every message is grounded in a verified buying signal.</p> },
        { heading: "Editorial reasoning, not just credits", body: <p>Liner doesn't burn credits per export. Every opportunity arrives with a citation trail your reps can quote back to the prospect — funding rounds, exec moves, product launches.</p> },
      ]}
    />
  ),
});