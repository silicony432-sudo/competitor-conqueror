import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing-page";
import heroImage from "@/assets/hero-dashboard.jpg";

const TITLE = "Clearbit Alternative — Liner Predictive Lead Generation";
const DESCRIPTION = "A Clearbit alternative built for the post-acquisition era. Liner enriches accounts with predictive intent — not just firmographic snapshots.";

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
    links: [{ rel: "canonical", href: "https://liner.ai/alternative-to-clearbit" }],
  }),
  component: () => (
    <MarketingPage
      eyebrow="Compare · Clearbit"
      title={<>The <em>Clearbit alternative</em> for predictive teams.</>}
      intro="Since the HubSpot acquisition, Clearbit (now Breeze Intelligence) has narrowed its focus. Liner picks up where Clearbit left off — and adds predictive intent on top."
      competitorName="Clearbit"
      comparisonRows={[
        ["Primary use", "Firmographic enrichment", "Predictive opportunity discovery"],
        ["HubSpot lock-in", "Increasingly bundled", "Works with any CRM"],
        ["Intent layer", "Visitor reveal only", "Multi-source predictive"],
        ["Coverage of private companies", "Public-heavy", "Editorial sources include private"],
      ]}
      sections={[
        { heading: "Beyond firmographics", body: <p>Knowing a company's headcount doesn't tell you when they'll buy. Liner adds the missing temporal layer — when, why and through which executive entry point.</p> },
        { heading: "CRM-agnostic by design", body: <p>Salesforce, HubSpot, Attio, Pipedrive — Liner ships first-class integrations and never penalizes you for not standardizing on one platform.</p> },
      ]}
    />
  ),
});