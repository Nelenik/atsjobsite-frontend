import { HomeIcon } from "lucide-react";
import { IBreadcrumbPattern } from "./types";
import { capitalizeSentences } from "@/shared/lib/formatters/capitalizeSentence";
import { vacancyPositionsDict } from "@/entities/vacancy";

export const jobsitePathMapping: IBreadcrumbPattern[] = [
  {
    pattern: "/",
    handler: () => (
      <>
        <HomeIcon width={16} height={16} className="inline-block mr-2 -translate-y-[1.5px]" />
        <span className="align-baseline">Rekru.ru</span>
      </>
    ),
    isLink: true
  },
  {
    pattern: "/vacancies{/:position}{/:company}",
    handler: (params) => {
      const { position, company } = params as { position: string, company: string }
      if (!params || !Object.keys(params).length) {
        return 'All vacancies'
      }

      if (company) {
        return `${capitalizeSentences(company)}`
      }

      if (position && position !== 'all') {
        return `${vacancyPositionsDict[position] || capitalizeSentences(position)}`
      }

    },
    isLink: true
  },
  {
    pattern: "/vacancy/:vacancyId/:vacancyName",
    handler: (params) => {
      const name = params?.vacancyName || "Vacancy title";
      return decodeURIComponent(Array.isArray(name) ? name[0] : name);
    },
    isLink: true
  },
  {
    pattern: "/companies",
    handler: () => "Companies",
    isLink: true
  },
  {
    pattern: "/profile",
    handler: () => "Profile",
    isLink: true
  }
]