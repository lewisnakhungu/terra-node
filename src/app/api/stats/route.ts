import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { CONVERSION } from "@/data/constants";

export async function GET() {
  try {
    const projects = await prisma.project.findMany();
    const transactions = await prisma.transaction.findMany();

    const totalRestoredSqM = projects.reduce((s, p) => s + p.restoredArea, 0);
    const totalBackers = projects.reduce((s, p) => s + p.backers, 0);
    const totalFunded = projects.reduce((s, p) => s + p.fundingRaised, 0);
    const totalCredits = transactions
      .filter((t) => t.type === "corporate-purchase")
      .reduce((s, t) => s + t.creditsOrArea, 0);
    const activeProjects = projects.filter(
      (p) => p.status === "funding" || p.status === "in-progress"
    ).length;

    return NextResponse.json({
      totalRestoredSqM,
      totalBackers,
      totalCredits: totalCredits || Math.floor(totalRestoredSqM / CONVERSION.SQM_PER_CREDIT),
      totalFunded,
      activeProjects,
    });
  } catch {
    return NextResponse.json({
      totalRestoredSqM: 208100,
      totalBackers: 4340,
      totalCredits: 2081,
      totalFunded: 384750,
      activeProjects: 8,
    });
  }
}
