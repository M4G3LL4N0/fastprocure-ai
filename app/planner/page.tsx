"use client";

import { useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useRouter } from "next/navigation";
import { runProcure } from "@/lib/engine";
import { BUDGET, DATA_EXPOSURE, RISK_LEVEL, USE_CASE, VENDOR_PROFILE, type ProcureInput, type ProcureResult } from "@/lib/types";

const initial: ProcureInput = {
  vendorProfile: VENDOR_PROFILE[1],
  riskLevel: RISK_LEVEL[1],
  dataExposure: DATA_EXPOSURE[1],
  budgetBand: BUDGET[1],
  useCase: USE_CASE[0],
};

export default function PlannerPage() {
  const router = useRouter();
  const [form, setForm] = useState<ProcureInput>(initial);
  const [result, setResult] = useState<ProcureResult | null>(null);
  const [runId, setRunId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fields: Array<{ key: keyof ProcureInput; label: string; options: readonly string[] }> = [
    { key: "vendorProfile", label: "Vendor profile", options: VENDOR_PROFILE },
    { key: "riskLevel", label: "Risk level", options: RISK_LEVEL },
    { key: "dataExposure", label: "Data exposure", options: DATA_EXPOSURE },
    { key: "budgetBand", label: "Budget band", options: BUDGET },
    { key: "useCase", label: "Use case", options: USE_CASE },
  ];

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const draft = runProcure(form);
      setResult(draft);
      setRunId(null);
      const res = await fetch("/api/procure", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) return;
      setResult(data.result ?? draft);
      setRunId(data.id ?? null);
    } catch {
      // The draft above still stands when the save is unavailable.
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <SubpageVisual variant="default" />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="panel space-y-4">
        <h1 className="text-2xl font-semibold text-white">Procurement workflow dashboard</h1>
        <p className="text-sm text-slate-300">Evaluate vendor posture and generate a fast-track pilot approval package.</p>

        {fields.map(({ key, label, options }) => (
          <label key={key} className="block space-y-1 text-sm">
            <span className="text-slate-200">{label}</span>
            <select
              value={form[key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value as ProcureInput[typeof key] }))}
              className="w-full rounded-lg border border-white/15 bg-slate-900 px-3 py-2 text-slate-100"
            >
              {options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        ))}

        <button disabled={loading} className="rounded-lg bg-cyan-400 px-4 py-2 font-medium text-slate-950 disabled:opacity-60">
          {loading ? "Generating..." : "Generate approval package"}
        </button>
      </form>

      <aside className="panel space-y-4">
        <h2 className="text-xl font-semibold text-white">Pilot output</h2>
        {!result ? (
          <p className="text-sm text-slate-300">Run the planner to view risk score, controls, checklist, and contract summary.</p>
        ) : (
          <>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">{runId ? "Saved package" : "Draft package"}</p>
            <p className="text-3xl font-semibold text-cyan-300">Risk {result.vendorRiskScore}/100</p>
            <p className="text-sm text-slate-300">{result.summary}</p>
            <div>
              <h3 className="font-medium text-white">Fast-track approval path</h3>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
                {result.fastTrackPath.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
            <p className="rounded-lg border border-white/15 bg-slate-900/60 p-3 text-sm text-slate-200">{result.pilotContractSummary}</p>
            {runId ? (
              <button onClick={() => router.push(`/dashboard/runs/${runId}`)} className="rounded-lg border border-cyan-300/40 px-4 py-2 text-cyan-200 hover:bg-cyan-400/10">
                Open run detail
              </button>
            ) : null}
          </>
        )}
      </aside>
    </div>
  </>
  )
}
