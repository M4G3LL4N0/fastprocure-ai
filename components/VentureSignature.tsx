const AUTOBUILDER_URL = "https://autobuilder.noaerth.com";
const NOAERTH_URL = "https://www.noaerth.com";

export type VentureSignatureVariant =
  | "default"
  | "ai"
  | "robotics"
  | "finance"
  | "construction"
  | "health"
  | "marketplace"
  | "consumer"
  | "climate";

export type VentureSignatureTone = "dark" | "light";

function SignatureMark({ variant }: { variant: VentureSignatureVariant }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
    className: "shrink-0",
  };

  if (variant === "robotics") {
    return (
      <svg {...common}>
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.1" opacity="0.45" />
        <path d="M8 16V10l4-3 4 3v6" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
        <circle cx="12" cy="9" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (variant === "finance") {
    return (
      <svg {...common}>
        <path d="M5 18V8l7-4 7 4v10" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" opacity="0.55" />
        <path d="M9 14h6M9 11h6M9 8h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === "construction") {
    return (
      <svg {...common}>
        <path d="M4 18h16M6 18V9l6-4 6 4v9" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
        <path d="M9 13h6M9 10h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      </svg>
    );
  }

  if (variant === "health") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.1" opacity="0.4" />
        <path d="M6 12c2-3 4-3 6 0s4 3 6 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (variant === "climate") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1" opacity="0.35" />
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="0.9" opacity="0.35" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" opacity="0.5" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1" className="opacity-40" />
      <circle cx="8" cy="12" r="2" fill="currentColor" className="opacity-90" />
      <circle cx="16" cy="8" r="2" fill="currentColor" className="opacity-70" />
      <circle cx="16" cy="16" r="2" fill="currentColor" className="opacity-70" />
      <path d="M10 12h3M13 10.5l2.5-2M13 13.5l2.5 2" stroke="currentColor" strokeWidth="1" strokeLinecap="round" className="opacity-50" />
    </svg>
  );
}

export interface VentureSignatureProps {
  tone?: VentureSignatureTone;
  variant?: VentureSignatureVariant;
  showSupportingLine?: boolean;
  className?: string;
}

/** Premium venture signature: Built with Autobuilder by Noaerth (server-safe). */
export function VentureSignature({
  tone = "dark",
  variant = "default",
  showSupportingLine = true,
  className = "",
}: VentureSignatureProps) {
  const dark = tone === "dark";

  const card = dark
    ? "border-white/10 bg-white/[0.03] text-zinc-300 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:border-white/20 hover:bg-white/[0.05]"
    : "border-slate-200/90 bg-white/90 text-slate-600 shadow-sm hover:border-slate-300 hover:bg-white";

  const markBox = dark
    ? "border-white/10 bg-black/25 text-cyan-400/90"
    : "border-slate-200 bg-slate-50 text-slate-700";

  const link = dark
    ? "font-medium text-cyan-300/95 underline decoration-cyan-400/30 underline-offset-2 transition hover:text-white hover:decoration-cyan-300/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 rounded-sm"
    : "font-medium text-slate-800 underline decoration-slate-300 underline-offset-2 transition hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm";

  const tagline = dark ? "text-zinc-500" : "text-slate-500";

  const gradient = dark
    ? "linear-gradient(135deg, rgba(34,211,238,0.07) 0%, transparent 50%, rgba(148,163,184,0.06) 100%)"
    : "linear-gradient(135deg, rgba(15,23,42,0.04) 0%, transparent 55%, rgba(148,163,184,0.08) 100%)";

  return (
    <aside
      className={`mx-auto w-full max-w-6xl px-4 pb-6 pt-4 sm:px-6 ${className}`.trim()}
      aria-label="Built with Autobuilder by Noaerth"
    >
      <div
        className={`flex max-w-md flex-col gap-3 rounded-2xl border px-4 py-3.5 backdrop-blur-sm transition sm:flex-row sm:items-center sm:gap-4 ${card}`}
        style={{ backgroundImage: gradient }}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border shadow-inner ${markBox}`}
          >
            <SignatureMark variant={variant} />
          </div>
          <div className="min-w-0 space-y-0.5">
            <p className="text-xs leading-relaxed sm:text-[13px]">
              Built with{" "}
              <a href={AUTOBUILDER_URL} target="_blank" rel="noopener noreferrer" className={link}>
                Autobuilder
              </a>{" "}
              by{" "}
              <a href={NOAERTH_URL} target="_blank" rel="noopener noreferrer" className={link}>
                Noaerth
              </a>
            </p>
            {showSupportingLine ? (
              <p className={`text-[10px] leading-4 sm:text-[11px] ${tagline}`}>
                AI-powered venture creation system
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
