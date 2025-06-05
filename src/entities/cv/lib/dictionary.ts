import { ECvStatus } from "@/shared/api/types";

import HhIcon from "@/assets/sources/hh.ru.svg?rc";

export const workStatusDict = {
  [ECvStatus.LOOKING]: "в поиске",
  [ECvStatus.CONSIDERING]: "рассматривает предложения",
  [ECvStatus.NOT_LOOKING]: "не в поиске",
  [ECvStatus.OFFER]: "есть оффер",
};

export const cvSource = {
  hh: {
    url: "https://hh.ru/resume/",
    HhIcon,
  },
};
