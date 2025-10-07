import { cn } from "@/shared/lib/utils";
import { HeroSwiper } from "./HeroSwiper";
import { MobileMenu } from "@/widgets/rekru-nav";
import { SearchBar } from "@/features/search-bar/ui/SearchBar";
import { CompaniesSwiper } from "./CompaniesSwiper";
import { getFilterCompanies } from "@/shared/api/actions";
import { Card } from "@/shared/ui/shadcn/card";
import Image from "next/image";

import HowOneImg from '@/assets/img/how1.png'
import HowTwoImg from '@/assets/img/how2.png'
import HowThreeImg from '@/assets/img/how3.png'

export const RekruHome = async () => {

  const companies = await getFilterCompanies()

  return (
    <>
      <section className={cn(
        "py-4 bg-background sticky top-0 z-[10]",
        ' md-lg:hidden md-lg:invisible'
      )}>
        <div className="rekru-container flex items-center justify-end gap-20 ">
          <MobileMenu />
        </div>
      </section>

      <section
        className='min-h-[495px] overflow-hidden'
      >
        <HeroSwiper />
      </section >

      <section className="py-10">
        <div className="rekru-container p-10">
          <SearchBar />
        </div>
      </section>

      <section className="mb-10">
        <div className="rekru-container">
          <h2 className={cn(
            'mb-10 text-3xl font-semibold -tracking-[3px] text-center',
            'lg:text-5xl'
          )}>
            Вакансии лучших компаний
          </h2>
          <CompaniesSwiper
            companiesList={companies}
          />
        </div>
      </section>

      <section className="my-10">
        <div className="rekru-container">
          <h2 className={cn(
            'mb-10 text-3xl font-semibold -tracking-[3px] text-center',
            'lg:text-5xl'
          )}>
            Как это работает
          </h2>
          <div className="flex flex-col md:gap-8 md:flex-row">
            <Card className="p-6 border-none shadow-none flex gap-10 md:flex-col ">
              <Image
                src={HowOneImg}
                alt=''
                aria-hidden
                width={160}
                height={160}
                className="mx-auto w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
              />
              <div className="flex flex-col gap-2.5">

                <h3 className="text-xl lg:text-[28px] font-medium text-center lg:-tracking-[3px] leading-[110%] md:mb-auto hyphens-auto [overflow-wrap:anywhere]">Найдите подходящуюю вакансию </h3>
                <p className="w-full max-w-[350px] text-base -tracking-[1px] leading-[130%] text-center hyphens-auto [overflow-wrap:anywhere]">
                  Фильтруйте по сфере, зарплате, формату работы и локации.
                  Только проверенные предложения
                </p>
              </div>
            </Card>
            <Card className="p-6 border-none shadow-none flex gap-10 md:flex-col ">
              <Image
                src={HowTwoImg}
                alt=''
                aria-hidden
                width={160}
                height={160}
                className="mx-auto w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
              />
              <div className="flex flex-col gap-2.5">

                <h3 className="text-xl lg:text-[28px] font-medium text-center lg:-tracking-[3px] leading-[110%] md:mb-auto hyphens-auto [overflow-wrap:anywhere]">Посмотрите детали и сделайте выбор</h3>
                <p className="w-full max-w-[350px] text-base -tracking-[1px] leading-[130%] text-center hyphens-auto [overflow-wrap:anywhere]">
                  Сравните условия, узнайте о работодателе и требования.
                  Быстрый предпросмотр вакансий
                </p>
              </div>
            </Card>
            <Card className="p-6 border-none shadow-none flex gap-10 md:flex-col ">
              <Image
                src={HowThreeImg}
                alt=''
                aria-hidden
                width={160}
                height={160}
                className="mx-auto w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
              />
              <div className="flex flex-col gap-2.5">

                <h3 className="text-xl lg:text-[28px] font-medium text-center lg:-tracking-[3px] leading-[110%] md:mb-auto hyphens-auto [overflow-wrap:anywhere]">Откликайтесь в один клик</h3>
                <p className="w-full max-w-[350px] text-base -tracking-[1px] leading-[130%] text-center hyphens-auto [overflow-wrap:anywhere]">
                  Отправьте отклик без лишних формальностей. Получайте обратную связь напрямую от работодателей
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}