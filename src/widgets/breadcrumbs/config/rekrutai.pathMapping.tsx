import { HomeIcon } from "lucide-react";
import { IBreadcrumbPattern } from "./types";
import { CompanySwitcher } from "@/features/company-switcher";


export const rekrutaiPathMapping: IBreadcrumbPattern[] = [
  {
    pattern: "/dashboard",
    handler: () => (
      <HomeIcon width={16} height={16} />
    ),
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId",
    handler: () => <CompanySwitcher />,
    isLink: false
  },
  {
    pattern: "/dashboard/:companyId/vacancies",
    handler: () => "Vacancies",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/reports",
    handler: () => "Reports",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/vacancies/:vacancyId/:vacancyName",
    handler: (params) => {
      const name = params?.vacancyName || "Vacancy";
      return decodeURIComponent(Array.isArray(name) ? name[0] : name);
    },
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/companies",
    handler: () => "Settings: Companies",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/users",
    handler: () => "Settings: Users",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/reserve",
    handler: () => "Resumes: Reserve",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/search",
    handler: () => "Resumes: Search",
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/matchDetails/:matchId/:matchName",
    handler: (params) => {
      const name = params?.matchName || "Match";
      return decodeURIComponent(Array.isArray(name) ? name[0] : name);
    },
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/vacancyDetails/:vacancyId/:vacancyName",
    handler: (params) => {
      const name = params?.vacancyName || "Vacancy title";
      return decodeURIComponent(Array.isArray(name) ? name[0] : name);
    },
    isLink: true
  },
  {
    pattern: "/dashboard/:companyId/cvDetails/:cvId/:cvName",
    handler: (params) => {
      const name = params?.cvName || "Resume";
      return decodeURIComponent(Array.isArray(name) ? name[0] : name);
    },
    isLink: true
  },
];