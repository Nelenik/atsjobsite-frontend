import { EMatchStatus } from "../types";

export const getBadgeStyle = (color: string): string => {
  return `ring-${color} text-${color} hover:text-white hover:bg-${color}/70`;
};

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
