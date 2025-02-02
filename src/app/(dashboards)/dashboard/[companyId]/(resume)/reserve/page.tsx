import { mockResume } from "@/actions/mockData";
import AddEntityModal from "@/components/modals/AddEntityModal";
import EditEntityModal from "@/components/modals/EditEntityModal";

const ReservePage = () => {
  return (
    <div>
      Reserve page
      <AddEntityModal entityType="resume" />
      <br />
      <br />
      <EditEntityModal initialData={mockResume[0]} entityType="resume" />

    </div>
  );
}

export default ReservePage;