import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing-page";
import heroImage from "@/assets/hero-dashboard.jpg";

const TITLE = "What Is Predictive Lead Generation? Complete 2026 Guide — Liner";
const DESCRIPTION = "Predictive lead generation uses buying intent signals and AI to identify customers before public demand. The complete guide for B2B revenue teams.";

export const Route = createFileRoute("/predictive-lead-generation")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "keywords", content: "predictive lead generation, what is predictive lead generation, AI lead generation, B2B intent data, predictive prospecting" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:image", content: heroImage },
      { property: "og:type", content: "article" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: heroImage },
    ],
    links: [{ rel: "canonical", href: "https://liner.ai/predictive-lead-generation" }],
  }),
  component: () => (
    <MarketingPage
      eyebrow="Guide"
      title={<>What is <em>predictive lead generation?</em></>}
      intro="Predictive lead generation is the practice of using buying intent signals, market activity and AI analysis to identify likely customers before they enter the traditional sales funnel."
      sections={[
        { heading: "The shift from contact data to demand signals", body: <p>For two decades, B2B sales operated on contact databases — finding the right person at the right company. Predictive lead generation flips that: it finds the right <em>moment</em>, then surfaces the right person inside it.</p> },
        { heading: "What signals predict B2B buying intent?", body: <p>Hiring patterns, funding events, regulatory filings, executive moves, product launches, customer churn signals and editorial coverage all precede formal buying processes by weeks or months.</p> },
        { heading: "How AI scores predictive opportunities", body: <p>Modern models combine signal strength, account fit, timing decay and historical conversion data to rank opportunities by probability of closing in a defined window — typically 30, 60 or 90 days.</p> },
        { heading: "Predictive vs. intent data: the difference", body: <p>"Intent data" usually means topic research signals (Bombora, G2). "Predictive lead generation" is the broader practice — intent data is one input among many.</p> },
        { heading: "Implementing predictive lead gen on a modern stack", body: <p>You need a signal layer (Liner), a CRM (Salesforce, HubSpot, Attio), an outreach system (Liner native or your existing sequencer) and clear handoff workflows between marketing and sales.</p> },
        { heading: "Measuring predictive lead generation ROI", body: <p>Track signal-to-meeting rate, signal-to-opportunity rate, and time-from-signal-to-closed-won. Predictive teams typically see 3–5x higher reply rates and 40% faster sales cycles.</p> },
      ]}
    />
  ),
});