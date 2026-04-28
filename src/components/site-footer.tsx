import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-ink text-paper relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 -z-0 h-64 w-[80%] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-y-14 gap-x-12 md:grid-cols-4 md:divide-x md:divide-paper/15">
          <div className="md:col-span-2 md:pr-10">
            <div className="tilt-3d inline-flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_18px_var(--accent)]" />
              <span className="font-serif text-3xl tracking-tight">Liner</span>
            </div>
            <p className="mt-4 max-w-md font-serif text-lg italic text-paper">
              Editorial intelligence for the new economy.
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-paper/95">
              Liner is the upcoming AI predictive lead generation and sales
              intelligence platform from Tyora. Currently in stealth — join the
              waitlist to be first when we launch.
            </p>
          </div>

          <div className="md:px-8">
            <h4 className="relative pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent after:absolute after:left-0 after:bottom-0 after:h-px after:w-10 after:bg-accent">
              Platform
            </h4>
            <ul className="mt-5 space-y-3.5 text-sm font-medium text-paper">
              <li><Link to="/platform" className="footer-link">Capabilities</Link></li>
              <li><Link to="/predictive-lead-generation" className="footer-link">Predictive Leads</Link></li>
              <li><Link to="/sales-intelligence-software" className="footer-link">Sales Intelligence</Link></li>
              <li><Link to="/pricing" className="footer-link">Pricing</Link></li>
            </ul>
          </div>

          <div className="md:pl-8">
            <h4 className="relative pb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent after:absolute after:left-0 after:bottom-0 after:h-px after:w-10 after:bg-accent">
              Compare
            </h4>
            <ul className="mt-5 space-y-3.5 text-sm font-medium text-paper">
              <li><Link to="/alternative-to-zoominfo" className="footer-link">Alternative to ZoomInfo</Link></li>
              <li><Link to="/alternative-to-apollo" className="footer-link">Alternative to Apollo.io</Link></li>
              <li><Link to="/alternative-to-clearbit" className="footer-link">Alternative to Clearbit</Link></li>
              <li><Link to="/alternative-to-6sense" className="footer-link">Alternative to 6sense</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-paper/40 to-transparent" />
        <div className="mt-8 flex flex-col items-start justify-between gap-4 text-xs text-paper md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Tyora. Liner predictive lead generation platform.</p>
          <p className="inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" />
            Axiom B6 buying intent engine
          </p>
        </div>
      </div>
    </footer>
  );
}