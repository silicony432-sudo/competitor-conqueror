import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing-page";
import heroImage from "@/assets/hero-dashboard.jpg";

const TITLE = "Liner Platform — Predictive Lead Generation Capabilities";
const DESCRIPTION = "The Liner platform: predictive lead mapping, buying intent intelligence, autonomous outreach, revenue forecasting, CRM-native sync and editorial briefings.";

export const Route = createFileRoute("/platform")({
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
    links: [{ rel: "canonical", href: "https://liner.ai/platform" }],
  }),
  component: () => (
    <MarketingPage
      eyebrow="Platform"
      title={<>One platform for <em>predictive revenue.</em></>}
      intro="Liner unifies signal collection, predictive scoring, autonomous outreach and CRM sync in a single editorial-grade platform."
      sections={[
        { heading: "Predictive Lead Mapping", body: <p>Map your total addressable market against 1,200+ live signal sources and surface the accounts most likely to enter a buying cycle in the next 30 days.</p> },
        { heading: "Buying Intent Intelligence", body: <p>Detect intent across editorial, regulatory, hiring, funding, executive and product signals — with citations.</p> },
        { heading: "Autonomous Outreach", body: <p>Generate personalized first-touch drafts grounded in the actual signal that surfaced the account. Approve, edit, send.</p> },
        { heading: "Revenue Forecasting", body: <p>Pipeline projections built from real demand signals — not last quarter's close-rate guesswork.</p> },
        { heading: "CRM-Native Workflow", body: <p>Salesforce, HubSpot, Attio. Bidirectional sync, custom field mapping, no zaps required.</p> },
        { heading: "Editorial Briefings", body: <p>Daily intelligence briefs written by the Liner editorial team, calibrated to your ICP and competitive set.</p> },
      ]}
    />
  ),
});