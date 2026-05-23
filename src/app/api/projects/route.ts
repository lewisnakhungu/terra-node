import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { projectFromDb } from "@/lib/utils";

export async function GET() {
  try {
    const rows = await prisma.project.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(rows.map(projectFromDb));
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}
