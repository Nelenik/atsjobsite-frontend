import AddEntityModal from "@/components/modals/AddEntityModal";

const CompaniesPage = async () => {
  // const tariffs = await getTariffs();
  return (
    <div>Companies page
      <AddEntityModal entityType="company" />
      {/* <AddCompanyModal /> */}
    </div>
  );
}

export default CompaniesPage;