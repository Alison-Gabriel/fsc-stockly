import "dotenv/config";
import { PrismaClient } from "../_generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var cachedPrisma: ReturnType<typeof createPrismaClient>;
}

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

const createPrismaClient = () => {
  return new PrismaClient({ adapter });
};

let prisma: ReturnType<typeof createPrismaClient>;

if (process.env.NODE_ENV === "production") {
  prisma = createPrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = createPrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
