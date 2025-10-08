import { cn } from "@/shared/lib/utils";
import { Card } from "@/shared/ui/shadcn/card";
import Image from "next/image";

export const StepsSection = () => {
  return (
    <>
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
    </>
  );
}