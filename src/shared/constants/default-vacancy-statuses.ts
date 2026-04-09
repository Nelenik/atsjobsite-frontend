import { TStatus } from "../api/types";

//tepmorar hardcoded while vac status api apear
export const vacanciesDefaultStatuses: TStatus[] = [
  {
    id: 191,
    name: "Draft",
    color: "#A9A9A9",
    rank: 1,
  },
  {
    id: 192,
    name: "In Progress",
    color: "#FFA500",
    rank: 2,
  },
  {
    id: 193,
    name: "On Hold",
    color: "#ADD8E6",
    rank: 3,
  },
  {
    id: 194,
    name: "Paused",
    color: "#4682B4",
    rank: 4,
  },
];
