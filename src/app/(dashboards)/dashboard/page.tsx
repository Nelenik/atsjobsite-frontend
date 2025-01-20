import AddCompanyModal from "@/components/Modals/AddCompanyModal";
import { AddVacancyModal } from "@/components/Modals/AddVacancyModal";

const DashboardMain = () => {
  return (
    <div>
      <div className="w-[70%]">

        <AddCompanyModal />
        <AddVacancyModal />
      </div>
    </div>
  );
}

export default DashboardMain;