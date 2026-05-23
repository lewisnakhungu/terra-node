import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { projectFromDb } from "@/lib/utils";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const row = await prisma.project.findUnique({ where: { id } });
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(projectFromDb(row));
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await req.json();
    const data: Record<string, number> = {};
    if (typeof body.fundingRaised === "number") data.fundingRaised = body.fundingRaised;
    if (typeof body.restoredArea === "number") data.restoredArea = body.restoredArea;
    if (typeof body.backers === "number") data.backers = body.backers;
    const row = await prisma.project.update({ where: { id }, data });
    return NextResponse.json(projectFromDb(row));
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
