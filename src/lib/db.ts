// Prisma client singleton. Cached on globalThis so dev HMR doesn't open a new pool per reload.
import "server-only";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// Neon URLs ship with sslmode=require, which pg treats as verify-full today but will loosen in its
// next major (and warns about on every boot). Pin the strict mode explicitly; `neon env pull`
// rewrites .env, so this lives in code rather than in the URL.
function withStrictSsl(url: string | undefined): string | undefined {
  return url?.replace(/([?&])sslmode=(?:prefer|require|verify-ca)(?=&|$)/, "$1sslmode=verify-full");
}

function createClient(): PrismaClient {
  const adapter = new PrismaPg({ connectionString: withStrictSsl(process.env.DATABASE_URL) });
  return new PrismaClient({ adapter });
}

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
