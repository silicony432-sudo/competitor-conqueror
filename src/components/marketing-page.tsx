import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { WaitlistForm } from "./waitlist-form";

export interface MarketingPageProps {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  sections?: { heading: string; body: React.ReactNode }[];
  comparisonTitle?: string;
  comparisonRows?: [string, string, string][];
  competitorName?: string;
}

export function MarketingPage(props: MarketingPageProps) {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-gradient-warm">
          <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{props.eyebrow}</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-tight text-balance md:text-6xl">
              {props.title}
            </h1>
            <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">{props.intro}</p>
            <div className="mt-10">
              <WaitlistForm source={props.eyebrow.toLowerCase().replace(/\s+/g, "-")} />
            </div>
          </div>
        </section>

        {props.comparisonRows && (
          <section className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="mb-12 max-w-3xl font-serif text-4xl md:text-5xl">
              {props.comparisonTitle ?? `Liner vs ${props.competitorName}`}
            </h2>
            <div className="overflow-hidden rounded-3xl border border-rule">
              <table className="w-full text-left">
                <thead className="bg-ink text-paper">
                  <tr>
                    <th className="p-5 font-serif font-normal">Capability</th>
                    <th className="p-5 font-serif font-normal">{props.competitorName}</th>
                    <th className="p-5 font-serif font-normal text-accent">Liner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule bg-paper">
                  {props.comparisonRows.map((row) => (
                    <tr key={row[0]}>
                      <td className="p-5 font-medium">{row[0]}</td>
                      <td className="p-5 text-muted-foreground">{row[1]}</td>
                      <td className="p-5 font-medium">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {props.sections && (
          <section className="bg-paper py-24">
            <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2">
              {props.sections.map((s, i) => (
                <article key={i} className="space-y-4">
                  <h2 className="font-serif text-3xl">{s.heading}</h2>
                  <div className="leading-relaxed text-muted-foreground">{s.body}</div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="font-serif text-4xl md:text-5xl">Ready to switch?</h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Join the Liner waitlist for an early-access invite.
          </p>
          <div className="mt-10">
            <WaitlistForm source="compare-cta" />
          </div>
          <Link to="/" className="mt-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            Back to overview <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}