import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing-page";
import heroImage from "@/assets/hero-dashboard.jpg";

const TITLE = "Sales Intelligence Software — The 2026 Buyer's Guide | Liner";
const DESCRIPTION = "What sales intelligence software actually does in 2026, how it differs from CRMs and lead databases, and how to choose a platform built for predictive revenue teams.";

export const Route = createFileRoute("/sales-intelligence-software")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "sales intelligence software, best sales intelligence platform, B2B sales intelligence, revenue intelligence" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImage },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: heroImage },
    ],
    links: [{ rel: "canonical", href: "https://liner.ai/sales-intelligence-software" }],
  }),
  component: () => (
    <MarketingPage
      eyebrow="Guide"
      title={<>Sales intelligence software, <em>reconsidered.</em></>}
      intro="Sales intelligence platforms have evolved from contact directories into predictive systems that forecast revenue. Here's how to evaluate them in 2026."
      sections={[
        { heading: "What counts as sales intelligence in 2026", body: <p>Contact data is table stakes. Real sales intelligence now means predictive intent, real-time signals, AI reasoning and CRM-native workflow.</p> },
        { heading: "Categories of sales intelligence platforms", body: <p>Contact databases (ZoomInfo, Apollo), enrichment (Clearbit), ABM intent (6sense, Demandbase), predictive (Liner). Most teams need predictive layered on top of one of the others.</p> },
        { heading: "Build vs. buy", body: <p>Building predictive intent in-house requires data engineering, a signal pipeline and a model team. Buying lets you ship the same week.</p> },
        { heading: "Procurement checklist", body: <p>Coverage, refresh cadence, integration depth, citation transparency, pricing model, security posture, deliverability impact, time-to-value.</p> },
      ]}
    />
  ),
});