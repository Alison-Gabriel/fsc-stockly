import { Prisma } from "@/app/_generated/prisma/client";
import { db } from "@/app/_lib/prisma";
import "server-only";

export interface TotalRevenueDTO {
  totalRevenue: number;
}

export const getTotalRevenue = async (): Promise<TotalRevenueDTO> => {
  const totalRevenueQuery = Prisma.sql`
      SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity") 
      AS "totalRevenue" FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id";
    `;

  const [totalRevenue] =
    await db.$queryRaw<TotalRevenueDTO[]>(totalRevenueQuery);

  return totalRevenue;
};
