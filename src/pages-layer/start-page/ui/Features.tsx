import { BrainCircuit, FileCheck, StarHalf, UserSearch } from "lucide-react";


const features = [
  { icon: <BrainCircuit className="shrink-0" />, text: "LLM. A large language model analyzes and evaluates candidate responses." },
  { icon: <StarHalf className="shrink-0" />, text: "Rating system. We evaluate resume quality and assign ratings." },
  { icon: <UserSearch className="shrink-0" />, text: "Search system. We help find candidates by various criteria." },
  { icon: <FileCheck className="shrink-0" />, text: "We track changes in resumes and verify candidates against job requirements." },
];

export const Features = () => {
  return (
    <div className="w-[min(100%,_500px)]">
      <h3 className="text-2xl lg:text-4xl font-semibold leading-relaxed mb-16">
        REKRUTAI — your AI hiring assistant
      </h3>
      <ul className=" self-start list-inside ml-2 space-y-4">
        {features.map((feature, index) => (
          <li
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
            key={index}
          >
            {feature.icon}
            {feature.text}
          </li>
        ))}
      </ul>
    </div>
  );
}