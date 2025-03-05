import { EMatchStatus, EVacancyStatus } from "../types";

// 'ring-primary text-primary hover:text-white hover:bg-primary/70'
export const vacancyBadgeColors: Record<EVacancyStatus, string> = {
  [EVacancyStatus.SETTING]:
    "ring-primary text-primary hover:text-white hover:bg-primary/70",
  [EVacancyStatus.WORK]:
    "ring-blue-300 text-blue-300 hover-text-white hover:bg-blue-300/70",
  [EVacancyStatus.PAUSE]:
    "ring-gray-400 text-gray-400 hover:text-white hover:bg-gray-400/70",
  [EVacancyStatus.WAIT]:
    "ring-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-400/70",
  [EVacancyStatus.UNASSIGNED]:
    "ring-orange-500 text-orange-500 hover:text-white hover:bg-orange-500/70",
} as const;

export const matchBadgeColors: { [key: string]: string } = {
  [EMatchStatus.SCREENING]:
    "ring-primary text-primary hover:text-white hover:bg-primary/70",
  [EMatchStatus.SCORING]:
    "ring-yellow-400 text-yellow-400 hover:text-white hover:bg-yellow-400/70",
  [EMatchStatus.INTERVIEW]:
    "ring-orange-500 text-orange-500 hover:text-white hover:bg-orange-500/70",
  [EMatchStatus.REFUSAL]:
    "ring-destructive text-destructive hover:text-white hover:bg-destructive/70",
  [EMatchStatus.OFFER]:
    "ring-emerald-400 text-emerald-400 hover:text-white hover:bg-emerald-400/70",
  default: "ring-gray-400 text-gray-400 hover:text-white hover:bg-gray-400/70",
} as const;
