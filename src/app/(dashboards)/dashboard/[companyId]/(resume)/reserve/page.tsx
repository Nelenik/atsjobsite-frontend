import AddEntityModal from "@/components/modals/AddEntityModal";

const ReservePage = () => {
  return (
    <div>
      Reserve page
      <AddEntityModal entityType="resume" />
      {/* <AddResumeModal /> */}
    </div>
  );
}

export default ReservePage;