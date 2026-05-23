import { PrismaClient } from "@prisma/client";
import { MOCK_PROJECTS } from "../src/data/projects";
import { MOCK_COMPANIES } from "../src/data/companies";

const prisma = new PrismaClient();

async function main() {
  await prisma.transaction.deleteMany();
  await prisma.project.deleteMany();
  await prisma.company.deleteMany();

  for (const p of MOCK_PROJECTS) {
    await prisma.project.create({
      data: {
        id: p.id,
        name: p.name,
        region: p.location.region,
        country: p.location.country,
        lat: p.location.coordinates[0],
        lng: p.location.coordinates[1],
        description: p.description,
        category: p.category,
        targetArea: p.targetArea,
        restoredArea: p.restoredArea,
        fundingGoal: p.fundingGoal,
        fundingRaised: p.fundingRaised,
        costPerSqMeter: p.costPerSqMeter,
        status: p.status,
        imageUrl: p.imageUrl,
        startDate: p.timeline.startDate,
        estimatedCompletion: p.timeline.estimatedCompletion,
        backers: p.backers,
        verificationScore: p.verificationScore,
      },
    });
  }

  for (const c of MOCK_COMPANIES) {
    await prisma.company.create({
      data: { id: c.id, name: c.name, industry: c.industry, logoUrl: c.logoUrl },
    });
  }

  console.log(`Seeded ${MOCK_PROJECTS.length} projects and ${MOCK_COMPANIES.length} companies`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
