import { MatchDetails } from "@/pages-layer/match-details";
import { getCandidateFull } from "@/shared/api/actions";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

const MatchDetailsPage = async ({ params }: { params: Promise<{ matchId: string, companyId: string }> }) => {
  const { matchId, companyId } = await params;
  const candidate = await getCandidateFull(Number(matchId))
  return (
    <div>
      <Link
        href={`/dashboard/${companyId}/vacancies/${candidate.vacancy_id}?name=${candidate.vacancy.name}`}

        className="flex items-center mb-6 font-medium text-sm text-primary/80 underline underline-offset-2 decoration-transparent hover:decoration-current transition-colors duration-300"
      >
        Перейти к мэтчам
        <LinkIcon className="h-[1cap]" />
      </Link>
      <MatchDetails candidate={candidate} />
    </div>
  );
}

export default MatchDetailsPage;