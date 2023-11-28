import { PrismaClient } from "@prisma/client";

const debugPrisma = process.env.DEBUG?.includes("prisma");

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: debugPrisma ? ["query", "error", "warn"] : ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
