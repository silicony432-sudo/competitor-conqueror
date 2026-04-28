import { useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Mail, Phone, ShieldCheck, Sparkles, Briefcase, MapPin } from "lucide-react";

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
  confidence: number; // 0-100
  jobFitScore: number; // 0-100
  signals: string[];
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
  },
];

function MapFlyTo({ target }: { target: Business | null }) {
  // Replaced by inline component once leaflet is loaded
  void target;
  return null;
}

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
  const idxRef = useRef(0);
  const [RL, setRL] = useState<LeafletExports | null>(null);

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

  // Autoplay: cycle stages, then advance to next pin
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

  const onPinClick = (b: Business) => {
    setAutoplay(false);
    setActiveId(b.id);
    setStage(0);
    // Animate stages forward once
    let s = 0;
    const t = setInterval(() => {
      s += 1;
      if (s >= STAGES.length) {
        clearInterval(t);
        return;
      }
      setStage(s);
    }, 700);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-rule bg-paper shadow-editorial">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule bg-ink/95 px-5 py-3 text-paper">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em]">
          <span className="inline-block h-2 w-2 animate-pulse-soft rounded-full bg-accent" />
          Axiom B6 — Live preview · concept demo
        </div>
        <div className="flex items-center gap-1 text-[11px]">
          {STAGES.map((s, i) => (
            <div
              key={s.k}
              className={`flex items-center gap-1 rounded-full px-2.5 py-1 transition-colors ${
                i <= stage ? "bg-accent/20 text-accent" : "text-paper/55"
              }`}
            >
              <span className={`inline-block h-1.5 w-1.5 rounded-full ${i <= stage ? "bg-accent" : "bg-paper/30"}`} />
              {s.label}
            </div>
          ))}
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

          {/* Legend */}
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-md border border-paper/15 bg-ink/70 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-paper/85">
            Tap a pin · {BUSINESSES.length} signals shown
          </div>
        </div>

        {/* Side panel: verified business card */}
        <div className="relative md:col-span-2">
          <div className="absolute inset-0 bg-gradient-to-b from-paper to-background" />
          <div className="relative h-full p-5 md:p-6">
            <VerifiedCard key={active.id + stage} business={active} stage={stage} />
          </div>
        </div>
      </div>
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

function VerifiedCard({ business, stage }: { business: Business; stage: number }) {
  const showVerify = stage >= 1;
  const showContact = stage >= 2;
  const showMatch = stage >= 3;

  return (
    <div className="flex h-full flex-col gap-4">
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-accent">
          <MapPin className="h-3 w-3" /> Discovered
        </div>
        <h3 className="mt-2 font-serif text-2xl leading-tight">{business.name}</h3>
        <p className="text-sm text-muted-foreground">
          {business.industry} · {business.city}
        </p>
      </div>

      {/* Signals */}
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

      {/* Verify */}
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
          <span className="font-serif text-lg">{showVerify ? business.confidence : 0}%</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-rule">
          <div
            className="h-full bg-accent transition-all duration-1000"
            style={{ width: `${showVerify ? business.confidence : 0}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Cross-checked against registry, web & licensed signal sources.
        </p>
      </div>

      {/* Contact */}
      <div
        className={`rounded-2xl border border-rule bg-paper p-4 transition-all duration-500 ${
          showContact ? "translate-y-0 opacity-100" : "translate-y-2 opacity-40"
        }`}
      >
        <div className="flex items-center gap-2 text-sm font-medium">
          <CheckCircle2 className={`h-4 w-4 ${showContact ? "text-accent" : "text-muted-foreground"}`} />
          Verified contact
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

      {/* Match */}
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