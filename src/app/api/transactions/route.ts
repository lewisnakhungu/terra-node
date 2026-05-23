import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const rows = await prisma.transaction.findMany({
      orderBy: { timestamp: "desc" },
      take: 100,
    });
    return NextResponse.json(
      rows.map((t) => ({
        id: t.id,
        type: t.type,
        timestamp: t.timestamp.toISOString(),
        amount: t.amount,
        creditsOrArea: t.creditsOrArea,
        projectId: t.projectId,
        buyerName: t.buyerName,
        status: t.status,
      }))
    );
  } catch {
    return NextResponse.json({ error: "Database unavailable" }, { status: 503 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, amount, creditsOrArea, projectId, buyerName } = body;
    if (!type || !projectId || !buyerName || amount == null) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const tx = await prisma.transaction.create({
      data: {
        type,
        amount: Number(amount),
        creditsOrArea: Number(creditsOrArea ?? 0),
        projectId,
        buyerName,
        status: "confirmed",
      },
    });

    const areaFunded =
      type === "micro-fund"
        ? Number(amount) / project.costPerSqMeter
        : Number(creditsOrArea ?? 0) * 100;

    await prisma.project.update({
      where: { id: projectId },
      data: {
        fundingRaised: { increment: Number(amount) },
        restoredArea: { increment: areaFunded },
        backers: { increment: 1 },
      },
    });

    return NextResponse.json({
      id: tx.id,
      type: tx.type,
      timestamp: tx.timestamp.toISOString(),
      amount: tx.amount,
      creditsOrArea: tx.creditsOrArea,
      projectId: tx.projectId,
      buyerName: tx.buyerName,
      status: tx.status,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Transaction failed" }, { status: 500 });
  }
}
