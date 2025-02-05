import { getResumeList } from "@/actions/getData";
import { mockResume } from "@/actions/mockData";
import AddEntityModal from "@/components/modals/AddEntityModal";
import EditEntityModal from "@/components/modals/EditEntityModal";
import ReserveFilter from "@/components/ReserveFilter";
import ReserveList from "@/components/ReserveList";

const ReservePage = async () => {
  const resumeList = await getResumeList()
  return (
    <div className="flex gap-10">
      <div className="w-[20%] flex flex-col gap-10">
        <AddEntityModal entityType="resume" />
        <ReserveFilter />
      </div>
      <ReserveList resumeList={resumeList} />
      {/* <EditEntityModal initialData={mockResume[0]} entityType="resume" /> */}

    </div>
  );
}

export default ReservePage;