import { useEffect, useMemo, useRef, useState, useCallback, KeyboardEvent } from "react";
import {
  CheckCircle2,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Briefcase,
  MapPin,
  MessageSquare,
  Send,
  Copy,
  Check,
  X,
  Pause,
  Play,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// Lazy import react-leaflet & leaflet CSS only on the client
type LeafletExports = typeof import("react-leaflet");

type Business = {
  id: string;
  name: string;
  city: string;
  lat: number;
  lng: number;
  industry: string;
  contactName: string;
  role: string;
  email: string;
  phone: string;
  confidence: number;
  jobFitScore: number;
  signals: string[];
  openRoles: string[];
};

const BUSINESSES: Business[] = [
  {
    id: "b1",
    name: "Helix Robotics",
    city: "San Francisco, CA",
    lat: 37.7793,
    lng: -122.4192,
    industry: "Industrial AI · Series B",
    contactName: "Dana Okafor",
    role: "VP, Talent",
    email: "dana.o@helixrobotics.io",
    phone: "+1 (415) 555-0142",
    confidence: 96,
    jobFitScore: 88,
    signals: ["Hiring 14 engineers", "Just raised $42M", "New SF HQ"],
    openRoles: ["Senior ML Engineer", "Robotics SWE", "Field Deployment Lead"],
  },
  {
    id: "b2",
    name: "Northwind Capital",
    city: "New York, NY",
    lat: 40.7549,
    lng: -73.984,
    industry: "Asset management",
    contactName: "Marco Bellini",
    role: "Head of Operations",
    email: "m.bellini@northwind.fund",
    phone: "+1 (212) 555-0188",
    confidence: 92,
    jobFitScore: 81,
    signals: ["Backfilling 6 ops roles", "Q1 fund close", "Tech modernization RFP"],
    openRoles: ["Ops Associate", "Investor Relations", "Data Analyst"],
  },
  {
    id: "b3",
    name: "Atlas Bio Labs",
    city: "Boston, MA",
    lat: 42.3611,
    lng: -71.0707,
    industry: "Biotech R&D",
    contactName: "Priya Raman",
    role: "Director, People",
    email: "praman@atlasbio.com",
    phone: "+1 (617) 555-0199",
    confidence: 89,
    jobFitScore: 84,
    signals: ["FDA Phase II", "30% headcount plan", "New Cambridge lab"],
    openRoles: ["Lab Scientist II", "Regulatory Affairs", "Bioinformatics"],
  },
  {
    id: "b4",
    name: "Riverbend Studios",
    city: "Austin, TX",
    lat: 30.2711,
    lng: -97.7437,
    industry: "Creative tech",
    contactName: "Jordan Pierce",
    role: "Studio Lead",
    email: "jordan@riverbend.studio",
    phone: "+1 (512) 555-0110",
    confidence: 87,
    jobFitScore: 79,
    signals: ["Netflix deal signed", "Hiring producers", "Expanding to LA"],
    openRoles: ["Producer", "VFX Supervisor", "Pipeline Engineer"],
  },
  {
    id: "b5",
    name: "Lumen Health",
    city: "Seattle, WA",
    lat: 47.6097,
    lng: -122.3331,
    industry: "Digital health",
    contactName: "Aiko Tanaka",
    role: "Chief of Staff",
    email: "aiko@lumen.health",
    phone: "+1 (206) 555-0173",
    confidence: 94,
    jobFitScore: 90,
    signals: ["CMS contract win", "Engineering scale-up", "Remote-first"],
    openRoles: ["Senior Backend Engineer", "Clinical PM", "Growth Lead"],
  },
];

const STAGES = [
  { k: "discover", label: "Discover" },
  { k: "verify", label: "Verify" },
  { k: "contact", label: "Contact" },
  { k: "match", label: "Match" },
] as const;

export function IntelMapWidget() {
  const [activeId, setActiveId] = useState<string>(BUSINESSES[0].id);
  const [stage, setStage] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  const idxRef = useRef(0);
  const [RL, setRL] = useState<LeafletExports | null>(null);
  const pinRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      import("react-leaflet"),
      import("leaflet/dist/leaflet.css" as string),
    ]).then(([mod]) => {
      if (!cancelled) setRL(mod as LeafletExports);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const active = useMemo(
    () => BUSINESSES.find((b) => b.id === activeId) ?? BUSINESSES[0],
    [activeId],
  );

  // Autoplay
  useEffect(() => {
    if (!autoplay) return;
    const t = setInterval(() => {
      setStage((s) => {
        if (s < STAGES.length - 1) return s + 1;
        idxRef.current = (idxRef.current + 1) % BUSINESSES.length;
        setActiveId(BUSINESSES[idxRef.current].id);
        return 0;
      });
    }, 2200);
    return () => clearInterval(t);
  }, [autoplay]);

  // Announce stage changes for screen readers
  useEffect(() => {
    const stageLabel = STAGES[stage].label;
    let msg = `${stageLabel} stage for ${active.name} in ${active.city}.`;
    if (stage === 1) msg += ` Verification confidence ${active.confidence}%.`;
    if (stage === 2) msg += ` Verified contact: ${active.contactName}, ${active.role}.`;
    if (stage === 3) msg += ` Job-fit probability ${active.jobFitScore}%.`;
    setAnnouncement(msg);
  }, [active, stage]);

  const selectBusiness = useCallback((b: Business, opts: { advance?: boolean } = {}) => {
    setAutoplay(false);
    setActiveId(b.id);
    setStage(0);
    if (opts.advance) {
      let s = 0;
      const t = setInterval(() => {
        s += 1;
        if (s >= STAGES.length) {
          clearInterval(t);
          return;
        }
        setStage(s);
      }, 700);
    }
  }, []);

  const onPinClick = (b: Business) => selectBusiness(b, { advance: true });

  const onPinKey = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (idx + 1) % BUSINESSES.length;
      selectBusiness(BUSINESSES[next]);
      pinRefs.current[BUSINESSES[next].id]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (idx - 1 + BUSINESSES.length) % BUSINESSES.length;
      selectBusiness(BUSINESSES[prev]);
      pinRefs.current[BUSINESSES[prev].id]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      selectBusiness(BUSINESSES[0]);
      pinRefs.current[BUSINESSES[0].id]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const last = BUSINESSES[BUSINESSES.length - 1];
      selectBusiness(last);
      pinRefs.current[last.id]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectBusiness(BUSINESSES[idx], { advance: true });
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-rule bg-paper shadow-editorial">
      {/* ARIA live region */}
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
        {announcement}
      </div>

      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-ink/95 px-5 py-3 text-paper">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em]">
          <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-accent" />
          Axiom B6 — Live preview · concept demo
        </div>
        <div className="flex items-center gap-2">
          <ol className="flex items-center gap-1 text-[11px]" aria-label="Pipeline stages">
            {STAGES.map((s, i) => (
              <li
                key={s.k}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors ${
                  i <= stage ? "bg-accent/20 text-accent" : "text-paper/55"
                }`}
                aria-current={i === stage ? "step" : undefined}
              >
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${i <= stage ? "bg-accent" : "bg-paper/30"}`} />
                {s.label}
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => setAutoplay((v) => !v)}
            aria-label={autoplay ? "Pause demo" : "Play demo"}
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full border border-paper/20 text-paper/80 hover:bg-paper/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {autoplay ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-5">
        {/* Map */}
        <div className="relative h-[420px] md:col-span-3 md:h-[520px]">
          {RL ? (
            <LiveMap RL={RL} active={active} activeId={activeId} onPinClick={onPinClick} />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[#0e1f1a] text-paper/60">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em]">
                <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-accent" />
                Loading map…
              </div>
            </div>
          )}

          {/* Keyboard-accessible pin list */}
          <div
            role="listbox"
            aria-label="Discovered businesses — use arrow keys to navigate"
            className="pointer-events-auto absolute right-3 top-3 flex max-w-[60%] flex-col gap-1 rounded-md border border-paper/15 bg-ink/75 p-2 backdrop-blur"
          >
            {BUSINESSES.map((b, idx) => {
              const isActive = b.id === activeId;
              return (
                <button
                  key={b.id}
                  ref={(el) => {
                    pinRefs.current[b.id] = el;
                  }}
                  role="option"
                  aria-selected={isActive}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onPinClick(b)}
                  onKeyDown={(e) => onPinKey(e, idx)}
                  className={`flex items-center gap-2 rounded px-2 py-1 text-left text-[11px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive ? "bg-accent/20 text-accent" : "text-paper/80 hover:bg-paper/10"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`inline-block h-2 w-2 rounded-full ${isActive ? "bg-accent" : "bg-paper/40"}`}
                  />
                  <span className="font-medium">{b.name}</span>
                  <span className="text-paper/55">· {b.city}</span>
                </button>
              );
            })}
          </div>

          <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-paper/15 bg-ink/70 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-paper/85">
            ← → arrows to navigate · Enter to verify
          </div>
        </div>

        {/* Side panel */}
        <div className="relative md:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-b from-paper to-background" />
          <div className="relative h-full p-5 md:p-6">
            <VerifiedCard
              key={active.id + stage}
              business={active}
              stage={stage}
              onContact={() => setContactOpen(true)}
            />
          </div>
        </div>
      </div>

      <ContactDialog
        open={contactOpen}
        onOpenChange={setContactOpen}
        business={active}
      />
    </div>
  );
}

function LiveMap({
  RL,
  active,
  activeId,
  onPinClick,
}: {
  RL: LeafletExports;
  active: Business;
  activeId: string;
  onPinClick: (b: Business) => void;
}) {
  const { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } = RL;

  function FlyTo({ target }: { target: Business }) {
    const map = useMap();
    useEffect(() => {
      map.flyTo([target.lat, target.lng], 6, { duration: 1.6 });
    }, [target, map]);
    return null;
  }

  return (
    <MapContainer
      center={[39.5, -98]}
      zoom={4}
      scrollWheelZoom={false}
      zoomControl={false}
      attributionControl={false}
      style={{ height: "100%", width: "100%", background: "#0e1f1a" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        subdomains={["a", "b", "c", "d"]}
      />
      <FlyTo target={active} />
      {BUSINESSES.map((b) => {
        const isActive = b.id === activeId;
        return (
          <CircleMarker
            key={b.id}
            center={[b.lat, b.lng]}
            radius={isActive ? 11 : 7}
            pathOptions={{
              color: isActive ? "#f0a85c" : "#fdfbf7",
              weight: 2,
              fillColor: isActive ? "#f0a85c" : "#9bb1a8",
              fillOpacity: isActive ? 0.95 : 0.6,
            }}
            eventHandlers={{ click: () => onPinClick(b) }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1}>
              <span style={{ fontWeight: 500 }}>{b.name}</span> · {b.city}
            </Tooltip>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}

function VerifiedCard({
  business,
  stage,
  onContact,
}: {
  business: Business;
  stage: number;
  onContact: () => void;
}) {
  const showVerify = stage >= 1;
  const showContact = stage >= 2;
  const showMatch = stage >= 3;

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-accent">
          <MapPin className="h-3 w-3" /> Discovered
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-tight">{business.name}</h3>
        <p className="text-sm text-muted-foreground">
          {business.industry} · {business.city}
        </p>
      </div>

      <div className="animate-fade-up flex flex-wrap gap-1.5">
        {business.signals.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1 rounded-full border border-rule bg-paper px-2.5 py-1 text-[11px] text-foreground"
          >
            <Sparkles className="h-3 w-3 text-accent" />
            {s}
          </span>
        ))}
      </div>

      <div
        className={`rounded-2xl border border-rule bg-paper p-4 transition-all duration-500 ${
          showVerify ? "translate-y-0 opacity-100" : "translate-y-2 opacity-40"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ShieldCheck className={`h-4 w-4 ${showVerify ? "text-accent" : "text-muted-foreground"}`} />
            Verification confidence
          </div>
          <span className="font-serif text-lg" aria-live="off">
            {showVerify ? business.confidence : 0}%
          </span>
        </div>
        <div
          className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-rule"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={showVerify ? business.confidence : 0}
          aria-label="Verification confidence"
        >
          <div
            className="h-full bg-accent transition-all duration-1000"
            style={{ width: `${showVerify ? business.confidence : 0}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Cross-checked against registry, web & licensed signal sources.
        </p>
      </div>

      <div
        className={`rounded-2xl border border-rule bg-paper p-4 transition-all duration-500 ${
          showContact ? "translate-y-0 opacity-100" : "translate-y-2 opacity-40"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CheckCircle2 className={`h-4 w-4 ${showContact ? "text-accent" : "text-muted-foreground"}`} />
            Verified contact
          </div>
          {showContact && (
            <button
              type="button"
              onClick={onContact}
              className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[11px] font-medium text-ink transition-transform hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <MessageSquare className="h-3 w-3" /> Contact for jobs
            </button>
          )}
        </div>
        <div className="mt-2 text-sm">
          <p className="font-medium">{business.contactName}</p>
          <p className="text-muted-foreground">{business.role}</p>
        </div>
        <div className="mt-3 space-y-1.5 text-xs text-foreground">
          <p className="flex items-center gap-2">
            <Mail className="h-3 w-3 text-accent" /> {showContact ? business.email : "•••••••••@•••••"}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-3 w-3 text-accent" /> {showContact ? business.phone : "+• (•••) •••-••••"}
          </p>
        </div>
      </div>

      <div
        className={`mt-auto rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 to-transparent p-4 transition-all duration-500 ${
          showMatch ? "translate-y-0 opacity-100" : "translate-y-2 opacity-40"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Briefcase className="h-4 w-4 text-accent" />
            Job-fit probability
          </div>
          <span className="font-serif text-2xl text-accent">{showMatch ? business.jobFitScore : 0}%</span>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Profile-tailored intro + role match — drafted on-brand & ready to send.
        </p>
      </div>
    </div>
  );
}

function ContactDialog({
  open,
  onOpenChange,
  business,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  business: Business;
}) {
  const [selectedRole, setSelectedRole] = useState(business.openRoles[0]);
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setSelectedRole(business.openRoles[0]);
    setCopied(false);
    setSent(false);
  }, [business]);

  const draft = useMemo(
    () =>
      `Hi ${business.contactName.split(" ")[0]},\n\nI saw ${business.name} is scaling — congrats on the recent ${business.signals[0].toLowerCase()}. I'd love to be considered for the ${selectedRole} role.\n\nQuick intro: I'm a builder who's shipped products end-to-end and would bring momentum to your team from week one. Happy to share a tailored profile and a 60-second loom.\n\nWould Tuesday or Thursday work for a quick call?\n\nBest,\n— Sent via Liner`,
    [business, selectedRole],
  );

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* noop */
    }
  };

  const onSend = () => {
    setSent(true);
    setTimeout(() => onOpenChange(false), 1400);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg overflow-hidden border-rule bg-paper p-0 sm:rounded-2xl">
        <div className="border-b border-rule bg-ink px-6 py-4 text-paper">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-serif text-lg">
              <MessageSquare className="h-4 w-4 text-accent" />
              Contact {business.contactName}
            </DialogTitle>
            <DialogDescription className="text-paper/70">
              {business.role} · {business.name}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-4 px-6 py-5">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Open roles · select to tailor message
            </p>
            <div className="flex flex-wrap gap-1.5">
              {business.openRoles.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setSelectedRole(r)}
                  aria-pressed={selectedRole === r}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    selectedRole === r
                      ? "border-accent bg-accent text-ink"
                      : "border-rule bg-background text-foreground hover:bg-paper"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-rule bg-background p-4">
            <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-accent">
              Drafted by Axiom B6
            </p>
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground">
              {draft}
            </pre>
          </div>

          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Mail className="h-3 w-3 text-accent" /> {business.email}
            </span>
            <span className="inline-flex items-center gap-1">
              <Phone className="h-3 w-3 text-accent" /> {business.phone}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-rule bg-paper px-6 py-4">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            <X className="h-4 w-4" /> Close
          </Button>
          <Button type="button" variant="outline" onClick={onCopy}>
            {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            type="button"
            onClick={onSend}
            className="bg-accent text-ink hover:bg-accent/90"
            disabled={sent}
          >
            {sent ? <Check className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {sent ? "Queued" : "Send via Liner"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
