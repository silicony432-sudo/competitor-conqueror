import { createFileRoute } from "@tanstack/react-router";
import { MarketingPage } from "@/components/marketing-page";
import heroImage from "@/assets/hero-dashboard.jpg";

const TITLE = "6sense Alternative — Liner Predictive Sales Intelligence";
const DESCRIPTION = "A 6sense alternative without the enterprise price tag. Liner delivers predictive account intelligence and intent signals for modern revenue teams.";

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
    links: [{ rel: "canonical", href: "https://liner.ai/alternative-to-6sense" }],
  }),
  component: () => (
    <MarketingPage
      eyebrow="Compare · 6sense"
      title={<>A leaner <em>6sense alternative</em>.</>}
      intro="6sense built the enterprise ABM category. Liner brings predictive intent to teams that don't have a six-month implementation budget."
      competitorName="6sense"
      comparisonRows={[
        ["Best fit", "Enterprise ABM programs", "Series A → IPO-stage revenue teams"],
        ["Implementation", "3–6 months with CSM", "Self-serve, days not months"],
        ["Pricing floor", "~$120K ARR typical", "Sub-$10K starter tier"],
        ["Intent signals", "Anonymous web + topic", "Editorial + market signal fusion"],
        ["Outreach", "Orchestration only", "Autonomous draft generation"],
      ]}
      sections={[
        { heading: "Predictive without the platform tax", body: <p>You shouldn't need a dedicated ABM team to use predictive intent. Liner is opinionated software you turn on and start using the same day.</p> },
        { heading: "Editorial-grade reasoning", body: <p>6sense scores accounts. Liner explains them — every signal arrives with the underlying news, filing or hiring change cited.</p> },
      ]}
    />
  ),
});