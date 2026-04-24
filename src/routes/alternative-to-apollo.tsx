import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing-page";
import heroImage from "@/assets/hero-dashboard.jpg";

const TITLE = "Apollo.io Alternative — Liner Predictive Sales Intelligence";
const DESCRIPTION = "The Apollo.io alternative for teams that want predictive intent signals, not just contact data. Liner forecasts deals before they hit your competitors' radar.";

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
    links: [{ rel: "canonical", href: "https://liner.ai/alternative-to-apollo" }],
  }),
  component: () => (
    <MarketingPage
      eyebrow="Compare · Apollo.io"
      title={<>The premium <em>Apollo.io alternative</em>.</>}
      intro="Apollo gives you contacts and sequences. Liner gives you predictive opportunities — accounts that will buy in the next 30 days, with editorial-grade reasoning attached."
      competitorName="Apollo.io"
      comparisonRows={[
        ["Core focus", "Contact database + sequencer", "Predictive opportunity engine"],
        ["Intent signals", "Limited topic intent", "Editorial + market signal fusion"],
        ["Email quality", "Bulk verification", "Per-account, signal-grounded drafts"],
        ["Deliverability risk", "High-volume sequence flagging", "Quality-over-quantity outreach"],
        ["Pricing", "Per-seat with credit limits", "Usage-aligned, transparent"],
      ]}
      sections={[
        { heading: "Beyond bulk outbound", body: <p>Apollo's strength is volume. Liner's strength is precision. Send 90% fewer emails and book more meetings — because every message is grounded in a verified buying signal.</p> },
        { heading: "Editorial reasoning, not just credits", body: <p>Liner doesn't burn credits per export. Every opportunity arrives with a citation trail your reps can quote back to the prospect — funding rounds, exec moves, product launches.</p> },
      ]}
    />
  ),
});