import { mockCompanies } from "@/actions/mockData";
import AddEntityModal from "@/components/modals/AddEntityModal";
import EditEntityModal from "@/components/modals/EditEntityModal";

const CompaniesPage = async () => {
  return (
    <div>Companies page
      <AddEntityModal entityType="company" />
      <br />
      <br />
      <EditEntityModal initialData={mockCompanies[0]} entityType="company" />
    </div>
  );
}

export default CompaniesPage;