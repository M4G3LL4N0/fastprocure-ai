import { z } from "zod";
import { BUDGET, DATA_EXPOSURE, RISK_LEVEL, USE_CASE, VENDOR_PROFILE } from "./types";

export const procureSchema = z.object({
  vendorProfile: z.enum(VENDOR_PROFILE),
  riskLevel: z.enum(RISK_LEVEL),
  dataExposure: z.enum(DATA_EXPOSURE),
  budgetBand: z.enum(BUDGET),
  useCase: z.enum(USE_CASE),
});
