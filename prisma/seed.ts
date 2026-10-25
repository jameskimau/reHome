// Loads the mock catalogue into the database. Idempotent: upserts by slug / email.
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { mockProducts } from "../src/data/products";
import { PrismaClient } from "../src/generated/prisma/client";

const db = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

async function main() {
  for (const { isSold, ...product } of mockProducts) {
    const data = {
      ...product,
      // Let the DB assign cuids instead of the mock "p-001" ids.
      id: undefined,
      status: isSold ? ("SOLD" as const) : ("AVAILABLE" as const),
      soldAt: isSold ? product.createdAt : null,
    };
    await db.product.upsert({ where: { slug: product.slug }, create: data, update: data });
  }
  console.log(`Seeded ${mockProducts.length} products`);

  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  if (adminEmail) {
    await db.user.upsert({
      where: { email: adminEmail },
      create: { email: adminEmail, role: "ADMIN" },
      update: {},
    });
    console.log(`Seeded admin ${adminEmail}`);
  } else {
    console.log("SEED_ADMIN_EMAIL not set; skipped admin user");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => db.$disconnect());
