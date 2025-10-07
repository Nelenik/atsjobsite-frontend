import { cn } from "@/shared/lib/utils";
import { HeroSwiper } from "./HeroSwiper";
import { MobileMenu } from "@/widgets/rekru-nav";
import { SearchBar } from "@/features/search-bar/ui/SearchBar";
import { CompaniesSwiper } from "./CompaniesSwiper";
import { getFilterCompanies } from "@/shared/api/actions";
import { Card } from "@/shared/ui/shadcn/card";
import Image from "next/image";

import ReviewSvg from '@/assets/icons/carbon_review.svg?rc'
import SecureSvg from '@/assets/icons/secure.svg?rc'
import AwardSvg from '@/assets/icons/award.svg?rc'
import PeopleSvg from '@/assets/icons/people.svg?rc'

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
        <div className="rekru-container">
          <SearchBar className="py-5 md:p-10" />
        </div>
      </section>

      <section className="mb-10">
        <div className="rekru-container">
          <h2 className={cn(
            'mb-10 text-3xl font-semibold tracking-tighter text-center',
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
            'mb-5 md:mb-10 text-3xl font-semibold tracking-tighter text-center',
            'lg:text-5xl'
          )}>
            Как это работает
          </h2>
          <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
            <Card className="md:w-1/3 p-6 border-none shadow-none flex gap-5 md:gap-10 flex-col xs:flex-row md:flex-col ">
              <Image
                src={'/assets/other-img/how1.png'}
                alt=''
                aria-hidden
                width={160}
                height={160}
                className="mx-auto w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
              />
              <div className="flex flex-col items-center gap-2.5">

                <h3 className="text-xl lg:text-[28px] font-medium text-center lg:tracking-tighter leading-[110%] md:mb-auto hyphens-auto [overflow-wrap:anywhere]">Найдите подходящуюю вакансию </h3>
                <p className="w-full max-w-[320px] text-base -tracking-[1px] leading-[130%] text-center hyphens-auto [overflow-wrap:anywhere]">
                  Фильтруйте по сфере, зарплате, формату работы и локации.
                  Только проверенные предложения
                </p>
              </div>
            </Card>
            <Card className="md:w-1/3 p-6 border-none shadow-none flex gap-5 md:gap-10 flex-col xs:flex-row md:flex-col ">
              <Image
                src={'/assets/other-img/how2.png'}
                alt=''
                aria-hidden
                width={160}
                height={160}
                className="mx-auto w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
              />
              <div className="flex flex-col items-center gap-2.5">

                <h3 className="text-xl lg:text-[28px] font-medium text-center lg:tracking-tighter leading-[110%] md:mb-auto hyphens-auto [overflow-wrap:anywhere]">Посмотрите детали и сделайте выбор</h3>
                <p className="w-full max-w-[320px] text-base -tracking-[1px] leading-[130%] text-center hyphens-auto [overflow-wrap:anywhere]">
                  Сравните условия, узнайте о работодателе и требования.
                  Быстрый предпросмотр вакансий
                </p>
              </div>
            </Card>
            <Card className="md:w-1/3 p-6 border-none shadow-none flex gap-5 md:gap-10 flex-col xs:flex-row md:flex-col ">
              <Image
                src={'/assets/other-img/how3.png'}
                alt=''
                aria-hidden
                width={160}
                height={160}
                className="mx-auto w-[100px] h-[100px] md:w-[160px] md:h-[160px]"
              />
              <div className="flex flex-col items-center gap-2.5">

                <h3 className="text-xl lg:text-[28px] font-medium text-center lg:tracking-tighter leading-[110%] md:mb-auto hyphens-auto [overflow-wrap:anywhere]">Откликайтесь в один клик</h3>
                <p className="w-full max-w-[320px] text-base -tracking-[1px] leading-[130%] text-center hyphens-auto [overflow-wrap:anywhere]">
                  Отправьте отклик без лишних формальностей. Получайте обратную связь напрямую от работодателей
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="my-10">
        <div className="rekru-container">
          <h2 className={cn(
            'mb-5 md:mb-10 text-3xl font-semibold tracking-tighter text-center',
            'lg:text-5xl'
          )}>
            Почему нам доверяют
          </h2>
          <ul className="flex flex-col gap-5">
            <li className="flex">
              <div className="basis-1/2 p-[50px] flex flex-col gap-4 items-end">
                <span className="w-12 h-12 p-3 rounded-md bg-accent2">
                  <ReviewSvg />
                </span>
                <h3 className="text-[28px] leading-[110%] font-medium tracking-tighter">Анна, маркетолог</h3>
                <p className="text-base text-accent2/80 text-end hyphens-auto [overflow-wrap:anywhere]">“Сайт оказался очень удобным и понятным. Нашла здесь подходящую вакансию и смогла выйти на работу, которая действительно мне нравится”</p>
              </div>
              <div className="basis-1/2">
                <Image
                  src={'/assets/other-img/trust1.webp'}
                  alt=""
                  aria-hidden
                  width={473}
                  height={300}
                  className=" lg:w-3/4 h-full object-cover object-right"
                />
              </div>
            </li>
            <li className="flex">
              <div className="basis-1/2">

                <Image
                  src={'/assets/other-img/trust2.webp'}
                  alt=""
                  aria-hidden
                  width={473}
                  height={300}
                  className="lg:w-3/4 h-full object-cover object-left ml-auto"
                />
              </div>
              <div className="basis-1/2 p-[50px] flex flex-col gap-4 items-start">
                <span className="w-12 h-12 p-3 rounded-md bg-[#BFDFF6]">
                  <SecureSvg />
                </span>
                <h3 className="text-[28px] leading-[110%] font-medium tracking-tighter">Безопасность данных</h3>
                <p className="text-base text-accent2/80 text-start hyphens-auto [overflow-wrap:anywhere]">Мы заботимся о вашей безопасности: применяем SSL-шифрование, проверяем работодателей и защищаем ваши персональные данные на каждом этапе поиска вакансий</p>
              </div>
            </li>
            <li className="flex">
              <div className="basis-1/2 p-[50px] flex flex-col gap-4 items-end">
                <span className="w-12 h-12 p-3 rounded-md bg-accent2">
                  <AwardSvg className="fill-white" />
                </span>
                <h3 className="text-[28px] leading-[110%] font-medium tracking-tighter">Премия HR-Tech 2024</h3>
                <p className="text-base text-accent2/80 text-end hyphens-auto [overflow-wrap:anywhere]">RekrutAI признан лучшим цифровым сервисом для поиска работы по версии DigitalHR</p>
              </div>
              <div className="basis-1/2">

                <Image
                  src={'/assets/other-img/trust3.webp'}
                  alt=""
                  aria-hidden
                  width={473}
                  height={300}
                  className="lg:w-3/4 h-full object-cover object-right"
                />
              </div>
            </li>
            <li className="flex">
              <div className="basis-1/2">

                <Image
                  src={'/assets/other-img/trust4.webp'}
                  alt=""
                  aria-hidden
                  width={473}
                  height={300}
                  className="lg:w-3/4 h-full object-cover object-left ml-auto"
                />
              </div>
              <div className="basis-1/2 p-[50px] flex flex-col gap-4 items-start">
                <span className="w-12 h-12 p-3 rounded-md bg-[#BFDFF6]">
                  <PeopleSvg />
                </span>
                <h3 className="text-[28px] leading-[110%] font-medium tracking-tighter">Надежные партнеры</h3>
                <p className="text-base text-accent2/80 text-start hyphens-auto [overflow-wrap:anywhere]">Мы заботимся о вашей безопасности: размещаем вакансии только от проверенных компаний и агентств</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

    </>
  );
}