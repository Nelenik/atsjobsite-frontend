import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/shadcn/tabs";
import { MatchTab } from "./MatchTab";
import { ExperienceTab } from "./ExperienceTab";
import { TCandidateFull } from "@/shared/api/types";

const tabsDict = [
  { value: 'match', text: 'Match' },
  { value: 'experience', text: 'Experience' },
  { value: 'screening', text: 'Screening' },
  { value: 'interview', text: 'Interview' },
  { value: 'raport', text: 'Report' },
  { value: 'similar', text: 'Similar' },

]

export const MatchDetails = async ({ candidate }: { candidate: TCandidateFull }) => {

  return (
    <>

      <div>
        <h2 className="typography-h2 first:mt-0 mb-2 hyphens-auto [overflow-wrap:anywhere]">
          {candidate.cv.candy_name || 'Name not specified'}
        </h2>
        <h3 className="scroll-m-20 text-lg font-semibold tracking-tight mb-6 hyphens-auto [overflow-wrap:anywhere]">
          {candidate.cv.name || 'Role unknown'}
        </h3>
        <Tabs defaultValue="match" className="w-full ">
          <TabsList className="w-full justify-start gap-3.5 bg-transparent p-0 mb-6 flex-wrap min-h-10 h-[unset]">
            {tabsDict.map(({ value, text }) => (
              <TabsTrigger value={value} className="bg-[#e1e8ff]" key={value}>
                {text}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="match" className="m-0 @container">
            <MatchTab candidate={candidate} matchId={candidate.id} />
          </TabsContent>

          <TabsContent value="experience" className="@container">
            <ExperienceTab
              workExperiences={candidate.cv.workExperiences}
              experience_raw={candidate.cv.experience_raw}
            />
          </TabsContent>

          <TabsContent value="screening">Screening, coming soon...</TabsContent>
          <TabsContent value="interview">Interview, coming soon...</TabsContent>
          <TabsContent value="raport">Report, coming soon...</TabsContent>
          <TabsContent value="similar">Similar, coming soon...</TabsContent>
        </Tabs>
      </div>
    </>

  );
}
