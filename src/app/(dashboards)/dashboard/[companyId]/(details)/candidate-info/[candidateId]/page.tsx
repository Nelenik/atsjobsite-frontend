import MatchInfo from "@/components/matchInfoPage/MatchInfo";

const CandidatePage = async ({ params }: { params: Promise<{ candidateId: string }> }) => {
  const { candidateId } = await params;
  return (
    <div>
      <MatchInfo matchId={Number(candidateId)} />
    </div>
  );
}

export default CandidatePage;