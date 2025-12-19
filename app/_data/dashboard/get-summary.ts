import { Prisma } from "@/app/_generated/prisma/client";
import { dateFormatter } from "@/app/_helpers/date-formatter";
import { db } from "@/app/_lib/prisma";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}

interface SummaryDTO {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
}

export const getDashboardSummary = async (): Promise<SummaryDTO> => {
  const today = new Date(new Date().setHours(0, 0, 0, 0)).getDate();
  const last14Days = [13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(
    (day) => new Date(new Date().setDate(today - day)),
  );

  const totalLast14DaysRevenue: DayTotalRevenue[] = [];

  for (const day of last14Days) {
    const startOfDay = new Date(day.setHours(0, 0, 0, 0));
    const endOfDay = new Date(day.setHours(23, 59, 59, 999));

    const dayTotalRevenueQuery = Prisma.sql`
      SELECT SUM("unitPrice" * "quantity") AS "totalRevenue" FROM "SaleProduct"
      JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
      WHERE "Sale"."date" >= ${startOfDay} AND "Sale"."date" <= ${endOfDay}
    `;

    const dayTotalRevenue =
      await db.$queryRaw<{ totalRevenue: number }[]>(dayTotalRevenueQuery);

    totalLast14DaysRevenue.push({
      day: dateFormatter(day),
      totalRevenue: Number(dayTotalRevenue[0].totalRevenue),
    });
  }

  const getTotalRevenueQuery = Prisma.sql`
    SELECT SUM("unitPrice" * "quantity") 
    AS "totalRevenue" 
    FROM "SaleProduct";
  `;

  const totalRevenuePromise =
    db.$queryRaw<{ totalRevenue: number }[]>(getTotalRevenueQuery);

  const startOfDay = new Date(new Date().setHours(0, 0, 0, 0));
  const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

  const getTodayRevenueQuery = Prisma.sql`
    SELECT SUM("unitPrice" * "quantity") AS "todayRevenue" FROM "SaleProduct"
    JOIN "Sale" ON "SaleProduct"."saleId" = "Sale"."id"
    WHERE "Sale"."date" >= ${startOfDay} AND "Sale"."date" <= ${endOfDay}
  `;

  const todayRevenuePromise =
    db.$queryRaw<{ todayRevenue: number }[]>(getTodayRevenueQuery);

  const totalStockPromise = db.product.aggregate({
    _sum: { stock: true },
  });

  const totalSalesPromise = db.sale.count();

  const totalProductsPromise = db.product.count();

  const [totalRevenue, todayRevenue, totalStock, totalProducts, totalSales] =
    await Promise.all([
      totalRevenuePromise,
      todayRevenuePromise,
      totalStockPromise,
      totalProductsPromise,
      totalSalesPromise,
    ]);

  return {
    totalRevenue: totalRevenue[0].totalRevenue,
    todayRevenue: todayRevenue[0].todayRevenue,
    totalLast14DaysRevenue: totalLast14DaysRevenue,
    totalStock: Number(totalStock._sum.stock),
    totalProducts,
    totalSales,
  };
};
