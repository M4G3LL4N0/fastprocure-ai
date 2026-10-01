"use client";

import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { useEffect, useState } from "react";

type RunRow = { id: string; createdAt: string; result: { vendorRiskScore?: number; summary?: string } };

export default function DashboardPage() {
  const [runs, setRuns] = useState<RunRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/procure");
        const data = await res.json();
        setRuns(data.runs ?? []);
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  return (
    <>
    <SubpageVisual variant="dashboard" />
      <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-white">Pilot approval dashboard</h1>
        <Link href="/planner" className="rounded-lg bg-cyan-400 px-4 py-2 font-medium text-slate-950">
          New run
        </Link>
      </div>

      <div className="grid gap-4">
        {loading ? <p className="text-slate-300">Loading runs...</p> : null}
        {!loading && runs.length === 0 ? (
          <div className="panel py-12 text-center">
            <p className="text-slate-200">No approval simulations saved yet.</p>
            <p className="mt-2 text-sm text-slate-400">Generate an approval package in the planner. A draft appears here only after it is saved locally.</p>
            <Link href="/planner" className="mt-4 inline-flex rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950">
              Open workflow planner
            </Link>
          </div>
        ) : null}
        {runs.map((run) => (
          <Link key={run.id} href={`/dashboard/runs/${run.id}`} className="panel block hover:border-cyan-300/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-400">{new Date(run.createdAt).toLocaleString()}</p>
                <p className="mt-1 text-slate-200">{run.result?.summary ?? "Procurement run"}</p>
              </div>
              <p className="text-lg font-semibold text-cyan-300">{run.result?.vendorRiskScore ?? "-"}/100</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </>
  )
}
