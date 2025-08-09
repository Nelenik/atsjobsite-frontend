import { cn } from '@/shared/lib/utils';
import { Card } from '@/shared/ui/shadcn/card';
import Link from 'next/link';



const DashboardMainPage = async ({ params }: {
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params

  const sections = [
    {
      title: 'Вакансии',
      link: `/dashboard/${companyId}/vacancies`,
    },
    {
      title: 'Резерв',
      link: `/dashboard/${companyId}/reserve`,
    },
    {
      title: 'Компании',
      link: `/dashboard/${companyId}/companies`,
    }
  ]

  return (
    <div className="flex gap-6 flex-wrap justify-center pt-8">
      {sections.map((item) => (
        <Link key={item.title} href={item.link}>
          <Card
            className={cn('p-6 min-w-60 text-center text-xl font-bold', "hover:shadow-md transform hover:-translate-y-1 transition-all duration-200")}
          >
            {item.title}
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default DashboardMainPage;
