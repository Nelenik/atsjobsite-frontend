import { decodeSegment } from "@/shared/lib/encodeSegments";
import { isSegmentPosition } from "./isSegmentPosition";

type VacanciesPath = { position: string; company: string };

export const normalizeVacanciesFilterPath = (
  filters: string[]
): VacanciesPath => {
  const result: VacanciesPath = {
    company: "",
    position: "",
  };
  const decoded = filters.map((f) => decodeSegment(f));
  for (const segment of decoded) {
    if (isSegmentPosition(segment)) {
      result.position = segment;
    } else {
      result.company = segment;
    }
  }
  return result;
};
