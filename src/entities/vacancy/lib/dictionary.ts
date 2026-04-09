import {
  EVacancyEmployment,
  EVacancyExperience,
  EVacancyPosition,
  EVacancyWorkFormat,
} from "@/shared/api/types";

export const vacancyPositionsDict: Record<string, string> = {
  [EVacancyPosition.DEVELOPER]: "Developer",
  [EVacancyPosition.TEAM_LEAD]: "Team Lead",
  [EVacancyPosition.TESTER]: "Tester",
  [EVacancyPosition.PM]: "Product/Project Manager",
  [EVacancyPosition.ANALYST]: "Analyst",
  [EVacancyPosition.DEVOPS]: "DevOps/SRE",
  [EVacancyPosition.DESIGNER]: "Designer",
  [EVacancyPosition.DATA_SCIENTIST]: "Data Scientist",
  [EVacancyPosition.TECHNICAL_SUPPORT]: "Tech Support",
};

export const vacancyEpmpoymentDict: Record<string, string> = {
  [EVacancyEmployment.FULL]: "full-time",
  [EVacancyEmployment.PARTIAL]: "part-time",
  [EVacancyEmployment.PROJECT]: "project-based",
};

export const vacancyWorkFormatDict: Record<string, string> = {
  [EVacancyWorkFormat.HYBRID]: "hybrid",
  [EVacancyWorkFormat.OFFICE]: "office",
  [EVacancyWorkFormat.REMOTE]: "remote",
};

export const vacancyExperienceDict: Record<string, string> = {
  [EVacancyExperience.LESS_THAN_1]: "less than 1 year",
  [EVacancyExperience.FROM_1_TO_3]: "1 to 3 years",
  [EVacancyExperience.FROM_3_TO_5]: "3 to 5 years",
  [EVacancyExperience.MORE_THAN_5]: "more than 5 years",
};

export const experienceAliases: Record<string, EVacancyExperience> = {
  "1 to 3 years": EVacancyExperience.FROM_1_TO_3,
  "1-3 years": EVacancyExperience.FROM_1_TO_3,
  "3 to 5 years": EVacancyExperience.FROM_3_TO_5,
  "more than 6 years": EVacancyExperience.MORE_THAN_5,
  "no experience": EVacancyExperience.LESS_THAN_1,
};
