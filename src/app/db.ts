import { PrismaClient } from "@prisma/client";

const globalPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalPrisma.prisma ??
  new PrismaClient({
    log: ["query", "error"],
  });

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prisma;
