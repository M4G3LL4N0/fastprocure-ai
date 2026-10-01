import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold tracking-tight text-white">FastProcure AI</p>
        <span className="rounded-full border border-sky-300/30 bg-sky-300/10 px-3 py-1 text-xs font-medium text-sky-100">
          Prototype
        </span>
      </div>

      <section className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <h1 className="max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Move an AI vendor from intake to pilot approval.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">
            Score startup risk, generate a procurement path, and keep legal and security review on one board.
          </p>
          <Link
            href="/planner"
            className="mt-8 inline-flex min-h-11 items-center rounded-lg bg-cyan-400 px-4 py-2.5 text-sm font-medium text-slate-950"
          >
            Open the procurement planner
          </Link>
        </div>
        <ApprovalBoardVisual />
      </section>
    </div>
  );
}

function ApprovalBoardVisual() {
  return (
    <figure className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1c28] p-5">
      <figcaption className="mb-4 flex items-center justify-between text-xs text-sky-100/70">
        <span>Approval path</span>
        <span>Pilot track</span>
      </figcaption>
      <svg viewBox="0 0 480 320" className="h-auto w-full" role="img" aria-label="Procurement board from vendor intake to pilot approval">
        <rect width="480" height="320" rx="18" fill="#102634" />
        {["Intake", "Risk", "Legal", "Pilot"].map((col, i) => (
          <g key={col} transform={`translate(${28 + i * 114} 28)`}>
            <text x="0" y="18" fill="#7dd3fc" fontSize="12">{col}</text>
            <rect y="32" width="100" height="70" rx="10" fill="#163445" stroke="#38bdf8" />
            <rect y="114" width="100" height="70" rx="10" fill="#163445" />
            <rect y="196" width="100" height="54" rx="10" fill={i === 3 ? "#22d3ee" : "#163445"} />
          </g>
        ))}
      </svg>
    </figure>
  );
}
