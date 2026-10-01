import type { ProcureInput, ProcureResult } from "./types";

const MODEL_VERSION = "fastprocure-sim-1.0.0";

export function runProcure(input: ProcureInput): ProcureResult {
  const vendorW = input.vendorProfile === "New startup" ? 18 : input.vendorProfile === "Seed-stage startup" ? 14 : input.vendorProfile === "Series A/B startup" ? 9 : 5;
  const riskW = input.riskLevel === "low" ? 4 : input.riskLevel === "medium" ? 11 : input.riskLevel === "high" ? 20 : 28;
  const dataW = input.dataExposure === "none" ? 2 : input.dataExposure === "internal-only" ? 8 : input.dataExposure === "customer data" ? 16 : 24;
  const budgetW = input.budgetBand === "<$50k" ? 4 : input.budgetBand === "$50k-$200k" ? 8 : input.budgetBand === "$200k-$1M" ? 12 : 16;

  const vendorRiskScore = Math.max(22, Math.min(98, Math.round(28 + vendorW + riskW + dataW * 0.9 + budgetW * 0.5)));

  const fastTrackPath = [
    "Intake + use-case triage in 24 hours.",
    "Parallel security and legal review with standardized templates.",
    "Conditional pilot approval with milestone-based spend gates.",
    "Post-pilot scale decision with quantified risk delta.",
  ];

  const requiredControls = [
    "SOC2/ISO posture evidence or compensating controls memo.",
    "Data processing agreement and retention policy alignment.",
    "Vendor access boundary + audit logging requirements.",
    "Incident response escalation contact and SLA commitments.",
  ];

  const reviewChecklist = [
    "Security questionnaire completed.",
    "Data classification and handling approved.",
    "Procurement terms and payment schedule validated.",
    "Success metrics and rollback criteria signed off.",
  ];

  const pilotContractSummary = `Pilot scoped for ${input.useCase} under ${input.budgetBand} budget, with phased approvals tied to risk controls and measurable KPI milestones.`;

  const summary = `FastProcure scores vendor risk at ${vendorRiskScore}/100 for ${input.vendorProfile} targeting ${input.useCase} with ${input.dataExposure} exposure and ${input.riskLevel} risk posture.`;

  return { vendorRiskScore, fastTrackPath, requiredControls, reviewChecklist, pilotContractSummary, summary, modelVersion: MODEL_VERSION };
}
