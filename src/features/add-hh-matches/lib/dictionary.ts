// import { EHhEmployment, EHhExperience, EHhGender } from "../api/types";

// export const hhExperienceDictionary = {
//   [EHhExperience.NO_EXPERIENCE]: "нет опыта",
//   [EHhExperience.BETWEEN_1_AND_3]: "от 1 года до 3",
//   [EHhExperience.BETWEEN_3_AND_6]: "от 3 до 6 лет",
//   [EHhExperience.MORE_THAN_6]: "более 6 лет",
// };

// // занятость
// export const hhEmploymentDictionary = {
//   [EHhEmployment.FULL]: "полная занятость",
//   [EHhEmployment.PART]: "частичная занятость",
//   [EHhEmployment.PROJECT]: "проектная работа",
//   [EHhEmployment.VOLUNTEER]: "волонтерство",
//   [EHhEmployment.PROBATION]: "стажировка",
// };

// export const hhGenderDictionary = {
//   [EHhGender.FEMALE]: "женский",
//   [EHhGender.MALE]: "мужской",
//   [EHhGender.UNKNOWN]: "не имеет значения",
// };

export const HH_FIELDS_DICT = {
  job_search_statuses_applicant: [
    { id: "active_search", name: "активно ищу работу" },
    { id: "looking_for_offers", name: "рассматриваю предложения" },
    { id: "not_looking_for_job", name: "не ищу работу" },
    { id: "has_job_offer", name: "предложили работу, пока думаю" },
    { id: "accepted_job_offer", name: "уже выхожу на новое место" },
  ],
  gender: [
    { id: "male", name: "мужской" },
    { id: "female", name: "женский" },
    { id: "unknown", name: "не имеет значения" },
  ],
  experience: [
    { id: "noExperience", name: "нет опыта" },
    { id: "between1And3", name: "от 1 года до 3 лет" },
    { id: "between3And6", name: "от 3 до 6 лет" },
    { id: "moreThan6", name: "более 6 лет" },
  ],
  employment: [
    { id: "full", name: "полная занятость" },
    { id: "part", name: "частичная занятость" },
    { id: "project", name: "проектная работа" },
    { id: "volunteer", name: "волонтерство" },
    { id: "probation", name: "стажировка" },
  ],
};
