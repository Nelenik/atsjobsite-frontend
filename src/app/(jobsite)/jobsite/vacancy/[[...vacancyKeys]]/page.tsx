import { CompanyInfoCard } from '@/entities/company/ui/CompanyInfoCard';
import { RekruVacancyDescription, RekruVacancyParams, vacancyEpmpoymentDict } from '@/entities/vacancy';
import { getPubVacancy } from '@/shared/api/actions/public-vacancy';
import { TPublicVacancy } from '@/shared/api/types';
import { encodeSegment } from '@/shared/lib/encodeSegments';
import { cn } from '@/shared/lib/utils';
import { RekruCTA } from '@/shared/ui/buttons/RekruCTA';
import { addMonths, format } from 'date-fns';
import { Check } from 'lucide-react';
import { redirect } from 'next/navigation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateJsonLd = (vacancyData: TPublicVacancy) => {
  const dateFromServer = new Date(vacancyData.publication_at || Date.now())
  const dateValidThrough = addMonths(dateFromServer, 3)
  const publicationAt = format(dateFromServer, 'MM/dd/yyyy')
  const validThrough = format(dateValidThrough, 'MM/dd/yyyy')

  const jsonLd = {
    "@context": "http://schema.org",
    "@type": "JobPosting",
    "title": vacancyData.name,
    "hiringOrganization": vacancyData.company,
    "jobLocation": {
      "@type": "Place",
      "address": vacancyData.location
    },
    "datePosted": publicationAt,
    "validThrough": validThrough,
    "employmentType": vacancyData.employment ? vacancyEpmpoymentDict[vacancyData.employment] : '',
    "baseSalary": {
      "@type": "MonetaryAmount",
      "currency": "₽",
      "value": vacancyData.salary_from
    },
    "description": vacancyData.description || vacancyData.skills
  }
  return jsonLd
}

const JobsiteVacancyDetails = async ({
  params,
}: {
  params: Promise<{ vacancyKeys: string[] }>;
}) => {
  const { vacancyKeys } = await params;
  //redirect to vacancies list if vacancyKeys is not valid
  if (!vacancyKeys || vacancyKeys.length < 1 || vacancyKeys.length > 2) {
    redirect('/vacancies');
  }

  const [vacancyId, vacancyName] = vacancyKeys;

  const vacancy = await getPubVacancy(vacancyId)
  if (!vacancy) return null;

  //if  vacancyName segment is not provided , redirect to valid url with vacancy name got from API response
  const vacancySlug = encodeSegment(vacancy.name)
  if (!vacancyName || vacancyName !== vacancySlug) {
    redirect(`/vacancy/${vacancyId}/${vacancySlug}`)
  }

  return (
    <div className='pt-2 pb-10 md-lg:py-10 flex flex-col gap-10'>
      {/* UNCOMMENT WHEN GET DATA FOR REAL VACANCY */}
      {/* JSON-LD google for job markup */}
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateJsonLd(vacancy)).replace(/</g, '\\u003c'),
        }}
      /> */}
      <section>
        <div className='rekru-container'>
          <CompanyInfoCard
            company={vacancy.company}
            ResponseButton={<RekruCTA
              view="dark"
              className="self-start w-full"
              asChild
            >
              <a
                href={vacancy.link || '#!'}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Check />
                Откликнуться
              </a>


            </RekruCTA>}
          />
        </div>
      </section>
      <section>
        <div className='rekru-container flex flex-col gap-10'>
          <RekruVacancyParams
            vacancy={vacancy}
            className='w-full'
          />
          <RekruVacancyDescription
            vacancy={vacancy}
            className={cn(
              'w-full'
            )}
          />
          <RekruCTA
            view="dark"
            className="self-center w-full max-w-[350px]"
            asChild
          >
            <a
              href={vacancy.link || '#!'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Check />
              Откликнуться
            </a>
          </RekruCTA>
        </div>
      </section>
    </ div>
  )
};

export default JobsiteVacancyDetails;
