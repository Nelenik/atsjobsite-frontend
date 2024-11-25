import AddVacancyDialog from "@/components/AddVacancyDialog";
import VacancyCard from "@/components/Cards/VacancyCard";

const VacancyesLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex gap-5">
      <aside className="w-56 flex flex-col gap-5">
        <AddVacancyDialog />

        <ul className="flex flex-col gap-1.5">
          <VacancyCard vacancyName="Менеджер по продажам" daysInProcessing={3} vacancyStatus="В работе" />
          <VacancyCard vacancyName="Разарботчик" daysInProcessing={17} vacancyStatus="Ожидание" />
        </ul>
      </aside>
      <div>
        {children}
      </div>
    </div>
  );
}

export default VacancyesLayout;