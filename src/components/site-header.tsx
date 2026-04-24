import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const nav = [
  { to: "/platform", label: "Platform" },
  { to: "/predictive-lead-generation", label: "Predictive Leads" },
  { to: "/alternative-to-zoominfo", label: "Compare" },
  { to: "/pricing", label: "Pricing" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-rule/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-accent animate-pulse-soft" />
          <span className="font-serif text-2xl tracking-tight">Liner</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-semibold" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            hash="waitlist"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 sm:inline-block"
          >
            Join Waitlist
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-rule/60 bg-background md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-base text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/"
              hash="waitlist"
              onClick={() => setOpen(false)}
              className="mt-2 inline-block rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}