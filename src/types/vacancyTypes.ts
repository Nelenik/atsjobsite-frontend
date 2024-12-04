import {
  vacancyBasicSchema,
  vacancyFullSchema,
} from "@/schemas/vacancySchemas";
import { z } from "zod";

export type VacancyFull = z.infer<typeof vacancyFullSchema>;

export type VacancyBasic = z.infer<typeof vacancyBasicSchema>;

export interface ISummaryData {
  daysInProcessing: number;
  salaryOfferFrom: number;
  salaryOfferTo: number;
  salaryMiddle: number;
  salaryCandidate: number;
  candidatesCount: number;
  jobReactions: number;
}
