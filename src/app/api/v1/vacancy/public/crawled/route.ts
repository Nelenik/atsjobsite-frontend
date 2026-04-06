import { NextRequest } from "next/server";
import { loadDb, list, paginate } from "@/app/api/v1/_lib/db";

export async function GET(req: NextRequest) {
  const db = loadDb();
  const sp = req.nextUrl.searchParams;
  let data = [...db.vacancies];
  if (sp.get("position"))
    data = data.filter((v) => v.position === sp.get("position"));
  if (sp.get("company_id"))
    data = data.filter((v) => v.company_id === parseInt(sp.get("company_id")!));
  if (sp.get("location")) {
    const q = sp.get("location")!.toLowerCase();
    data = data.filter((v) => v.location?.toLowerCase().includes(q));
  }
  if (sp.get("salary_from"))
    data = data.filter(
      (v) => (v.salary_to || 0) >= parseInt(sp.get("salary_from")!),
    );
  if (sp.get("experience"))
    data = data.filter((v) => v.experience === sp.get("experience"));
  if (sp.get("work_format"))
    data = data.filter((v) => v.work_format === sp.get("work_format"));
  if (sp.get("level")) data = data.filter((v) => v.level === sp.get("level"));

  const publicData = data.map((v) => {
    const company = db.companies.find((c) => c.id === v.company_id);
    return {
      id: v.id,
      name: v.name,
      salary_from: v.salary_from,
      salary_to: v.salary_to,
      location: v.location,
      experience: v.experience,
      position: v.position,
      work_format: v.work_format,
      employment: v.employment,
      skills: v.skills,
      responsibilities: v.responsibilities,
      conditions: v.conditions,
      description: v.description,
      level: v.level,
      created_at: v.created_at,
      link: "",
      addition: "",
      publication_at: v.created_at,
      company: company
        ? {
            name: company.name,
            full_name: company.full_name,
            description: company.description,
          }
        : { name: "", full_name: "", description: "" },
    };
  });
  return list(paginate(publicData, sp.get("page"), sp.get("take") ?? "10", 10));
}
