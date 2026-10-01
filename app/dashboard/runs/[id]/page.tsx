"use client";

import { useEffect, useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";

type RunResponse = {
  run: {
    id: string;
    createdAt: string;
    inputs: Record<string, string>;
    result: {
      vendorRiskScore: number;
      fastTrackPath: string[];
      requiredControls: string[];
      reviewChecklist: string[];
      pilotContractSummary: string;
      summary: string;
    };
  };
};

export default function RunDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const [run, setRun] = useState<RunResponse["run"] | null>(null);

  useEffect(() => {
    async function load() {
      const { id } = await params;
      const res = await fetch(`/api/procure/${id}`);
      const data = (await res.json()) as RunResponse;
      setRun(data.run);
    }
    void load();
  }, [params]);

  if (!run) return <p className="text-slate-300">Loading run...</p>;

  return (
    <>
    <SubpageVisual variant="dashboard" />
      <div className="space-y-5">
      <section className="panel space-y-2">
        <p className="text-sm text-slate-400">{new Date(run.createdAt).toLocaleString()}</p>
        <h1 className="text-2xl font-semibold text-white">Vendor risk score: {run.result.vendorRiskScore}/100</h1>
        <p className="text-slate-300">{run.result.summary}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <article className="panel">
          <h2 className="font-semibold text-white">Required controls</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
            {run.result.requiredControls.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="panel">
          <h2 className="font-semibold text-white">Review checklist</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300">
            {run.result.reviewChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <article className="panel">
        <h2 className="font-semibold text-white">Pilot contract summary</h2>
        <p className="mt-2 text-slate-300">{run.result.pilotContractSummary}</p>
      </article>
    </div>
  </>
  )
}
