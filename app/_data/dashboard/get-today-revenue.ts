import { Prisma } from "@/app/_generated/prisma/client";
import { db } from "@/app/_lib/prisma";
import "server-only";

interface TodayRevenueDTO {
  todayRevenue: number;
}

export const getTodayRevenue = async (): Promise<TodayRevenueDTO> => {
  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

  const todayRevenueQuery = Prisma.sql`
      SELECT SUM("SaleProduct"."unitPrice" * "SaleProduct"."quantity")
      AS "todayRevenue" FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= ${startOfDay} AND "Sale"."date" <= ${endOfDay}
    `;

  const [todayRevenue] =
    await db.$queryRaw<TodayRevenueDTO[]>(todayRevenueQuery);

  return todayRevenue;
};
