import { NextRequest } from "next/server";
import { loadDb, ok, notFound } from "@/app/api/v1/_lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const db = loadDb();
  const { id } = await params;
  const vacancy = db.vacancies.find((v) => v.id === parseInt(id));
  if (!vacancy) return notFound();
  const company = db.companies.find((c) => c.id === vacancy.company_id);
  return ok({
    ...vacancy,
    link: "",
    addition: "",
    publication_at: vacancy.created_at,
    company: company
      ? {
          name: company.name,
          full_name: company.full_name,
          description: company.description,
        }
      : { name: "", full_name: "", description: "" },
  });
}
