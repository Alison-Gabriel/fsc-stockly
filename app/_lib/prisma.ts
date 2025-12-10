import "dotenv/config";
import { PrismaClient } from "../_generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

declare global {
  var cachedPrisma: ReturnType<typeof createPrismaClient>;
}

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });

const createPrismaClient = () => {
  return new PrismaClient({ adapter }).$extends({
    result: {
      product: {
        status: {
          needs: { stock: true },
          compute(product) {
            return product.stock <= 0 ? "OUT_OF_STOCK" : "IN_STOCK";
          },
        },
      },
    },
  });
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
