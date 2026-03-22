import { PrismaClient } from "@/prisma/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const debugPrisma = process.env.DEBUG?.includes("prisma");

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const adapter = new PrismaPg({
  connectionString: process.env.POSTGRES_URL,
});

const prisma =
  global.prisma ||
  new PrismaClient({
    adapter,
    log: debugPrisma ? ["query", "error", "warn"] : ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export { prisma };
