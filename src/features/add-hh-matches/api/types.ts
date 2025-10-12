export enum EHhExperience {
  NO_EXPERIENCE = "noExperience",
  BETWEEN_1_AND_3 = "between1And3",
  BETWEEN_3_AND_6 = "between3And6",
  MORE_THAN_6 = "moreThan6",
}

export enum EHhGender {
  MALE = "male",
  FEMALE = "female",
  UNKNOWN = "unknown",
}

export enum EHhEmployment {
  FULL = "full",
  PART = "part",
  PROJECT = "project",
  VOLUNTEER = "volunteer",
  PROBATION = "probation",
}

export type THhMatchRequest = {
  vacancy_id: number | string;
  text: string;
  professional_role: number[];
  area: number[];
  search_period: number;
  age_from: number;
  age_to: number;
  experience: EHhExperience;
  gender: EHhGender;
  salary: number;
  employent: EHhEmployment[];
};

export type TLocation = {
  id: number;
  parent_id: number | null;
  name: string;
};

export type TCategory = {
  id: number;
  name: string;
};
