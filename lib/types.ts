export const VENDOR_PROFILE = ["New startup", "Seed-stage startup", "Series A/B startup", "Established vendor"] as const;
export const RISK_LEVEL = ["low", "medium", "high", "critical"] as const;
export const DATA_EXPOSURE = ["none", "internal-only", "customer data", "regulated data"] as const;
export const BUDGET = ["<$50k", "$50k-$200k", "$200k-$1M", ">$1M"] as const;
export const USE_CASE = ["Workflow automation", "Customer support AI", "Security analytics", "Finance ops AI", "Developer productivity"] as const;

export type ProcureInput = {
  vendorProfile: (typeof VENDOR_PROFILE)[number];
  riskLevel: (typeof RISK_LEVEL)[number];
  dataExposure: (typeof DATA_EXPOSURE)[number];
  budgetBand: (typeof BUDGET)[number];
  useCase: (typeof USE_CASE)[number];
};

export type ProcureResult = {
  vendorRiskScore: number;
  fastTrackPath: string[];
  requiredControls: string[];
  reviewChecklist: string[];
  pilotContractSummary: string;
  summary: string;
  modelVersion: string;
};
