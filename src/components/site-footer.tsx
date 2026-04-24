import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-32 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" />
              <span className="font-serif text-3xl">Liner</span>
            </div>
            <p className="mt-4 max-w-md font-serif text-lg italic text-paper/90">
              Editorial intelligence for the new economy.
            </p>
            <p className="mt-6 text-sm text-paper/75">
              Liner is the AI predictive lead generation and sales intelligence
              platform from Tyora. We help revenue teams discover buying intent
              before competitors do.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent">
              Platform
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-paper/85">
              <li><Link to="/platform" className="transition-colors hover:text-accent">Capabilities</Link></li>
              <li><Link to="/predictive-lead-generation" className="transition-colors hover:text-accent">Predictive Leads</Link></li>
              <li><Link to="/sales-intelligence-software" className="transition-colors hover:text-accent">Sales Intelligence</Link></li>
              <li><Link to="/pricing" className="transition-colors hover:text-accent">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-accent">
              Compare
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-paper/85">
              <li><Link to="/alternative-to-zoominfo" className="transition-colors hover:text-accent">Alternative to ZoomInfo</Link></li>
              <li><Link to="/alternative-to-apollo" className="transition-colors hover:text-accent">Alternative to Apollo.io</Link></li>
              <li><Link to="/alternative-to-clearbit" className="transition-colors hover:text-accent">Alternative to Clearbit</Link></li>
              <li><Link to="/alternative-to-6sense" className="transition-colors hover:text-accent">Alternative to 6sense</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-paper/20 pt-8 text-xs text-paper/70 md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} Tyora. Liner predictive lead generation platform.</p>
          <p>Axiom B6 buying intent engine</p>
        </div>
      </div>
    </footer>
  );
}