/**
 * 
 * enum EHhExperience {
  NO_EXPERIENCE = "noExperience",
  BETWEEN_1_AND_3 = "between1And3",
  BETWEEN_3_AND_6 = "between3And6",
  MORE_THAN_6 = "moreThan6",
}

enum EHhGender {
  MALE = "male",
  FEMALE = "female",
  UNKNOWN = "unknown",
}

enum EHhEmployment {
  FULL = "full",
  PART = "part",
  PROJECT = "project",
  VOLUNTEER = "volunteer",
  PROBATION = "probation",
}
 */

import { EHhEmployment, EHhExperience, EHhGender } from "../api/types";

export const hhExperienceDictionary = {
  [EHhExperience.NO_EXPERIENCE]: "нет опыта",
  [EHhExperience.BETWEEN_1_AND_3]: "от 1 года до 3",
  [EHhExperience.BETWEEN_3_AND_6]: "от 3 до 6 лет",
  [EHhExperience.MORE_THAN_6]: "более 6 лет",
};

// занятость
export const hhEmploymentDictionary = {
  [EHhEmployment.FULL]: "полная занятость",
  [EHhEmployment.PART]: "частичная занятость",
  [EHhEmployment.PROJECT]: "проектная работа",
  [EHhEmployment.VOLUNTEER]: "волонтерство",
  [EHhEmployment.PROBATION]: "стажировка",
};

export const hhGenderDictionary = {
  [EHhGender.FEMALE]: "женский",
  [EHhGender.MALE]: "мужской",
  [EHhGender.UNKNOWN]: "не имеет значения",
};
