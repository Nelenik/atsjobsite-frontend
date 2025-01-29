import Resume from "@/components/pages/Resume";


const CandidatePage = async ({ params }: { params: Promise<{ candidateId: string }> }) => {
  const { candidateId } = await params;
  console.log('candidate id', candidateId);
  return (
    <div>
      <Resume />
    </div>
  );
}

export default CandidatePage;