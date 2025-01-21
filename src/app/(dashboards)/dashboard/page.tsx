import AddCompanyModal from "@/components/Modals/AddCompanyModal";
import AddResumeModal from "@/components/Modals/AddResumeModal";
import { AddVacancyModal } from "@/components/Modals/AddVacancyModal";

const DashboardMain = () => {
  return (
    <div>
      <div className="w-[70%]">

        <AddCompanyModal />
        <br />
        <br />
        <AddVacancyModal />
        <br />
        <br />
        <AddResumeModal />
      </div>
    </div>
  );
}

export default DashboardMain;