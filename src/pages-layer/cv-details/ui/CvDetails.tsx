import { CvInfoBlock } from "@/entities/cv/ui/CvInfoBlock";
import { WorkExperienceList } from "@/entities/experience";
// import { getResumeById } from "@/shared/api/actions";
import { TResume } from "@/shared/api/types";
import { cn } from "@/shared/lib/utils";
import { CollapsibleSummary } from "@/shared/ui/Summary";
import { TextFormatter } from "@/shared/ui/TextFormatter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/shadcn/tabs";

const tabsDict = [
  { value: 'description', text: 'Description' },
  { value: 'matches', text: 'Matches' },
  { value: 'comments', text: 'Comments' },
  { value: 'history', text: 'History' },

]

type TProps = {
  cv: TResume
}

export const CvDetails = async ({ cv }: TProps) => {
  // const cv =
  return (
    <div>
      <h2 className="typography-h2 first:mt-0 mb-2 hyphens-auto [overflow-wrap:anywhere]">
        {cv.candy_name || 'Name not specified'}
      </h2>
      <h3 className="scroll-m-20 text-lg font-semibold  tracking-tight mb-6 w-[min(500px,_100%)] hyphens-auto [overflow-wrap:anywhere]">
        {cv.name || 'Role unknown'}
      </h3>
      <Tabs defaultValue="description" className="w-full ">
        <TabsList className="w-full justify-start gap-3.5 bg-transparent p-0 mb-6 flex-wrap min-h-10 h-[unset]">
          {tabsDict.map(({ value, text }) => (
            <TabsTrigger value={value} className="bg-[#e1e8ff]" key={value}>
              {text}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="description" className="m-0">
          <div
            className={cn(
              "flex flex-col gap-6 ",
              "md:grid md:grid-cols-[35%_1fr] md:gap-x-6 md:gap-y-6",)}
          >
            <CollapsibleSummary
              title="Resume summary"
              summary={cv.summary}
              defaultOpen={true}
              className="md:col-span-2 italic  ring-1 rounded-md  p-4"
            />
            <CvInfoBlock
              // role={cv.name}
              external_id={cv.external_id}
              work_status={cv.status}
              location={cv.candy_location}
              phone={cv.candy_phone}
              email={cv.candy_email}
              link={cv.link}
              bio={cv.bio}
              experience_duration={cv.experience_months}
              skills={cv.skills}
              className="shrink-0"
            />
            <div className="grow @container">
              <h2 className="scroll-m-20 text-lg font-semibold tracking-tight mb-6">
                Work experience
              </h2>
              {
                cv.workExperiences && cv.workExperiences.length
                  ? <WorkExperienceList experience={cv.workExperiences} />
                  : <TextFormatter text={cv.experience_raw || 'No experience data'} />
              }
            </div>
          </div>
        </TabsContent>

        <TabsContent value="matches">Matches, coming soon...</TabsContent>
        <TabsContent value="comments">Comments, coming soon...</TabsContent>
        <TabsContent value="history">History, coming soon...</TabsContent>
      </Tabs>
    </div>
  );
}
