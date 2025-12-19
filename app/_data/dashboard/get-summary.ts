import { Prisma } from "@/app/_generated/prisma/client";
import { db } from "@/app/_lib/prisma";

interface SummaryDTO {
  totalRevenue: number;
  todayRevenue: number;
  totalSales: number;
  totalStock: number;
  totalProducts: number;
}

export const getDashboardSummary = async (): Promise<SummaryDTO> => {
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
    SELECT SUM("unitPrice" * "quantity") 
    AS "todayRevenue" FROM "SaleProduct" 
    WHERE "createdAt" >= ${startOfDay} AND "createdAt" <= ${endOfDay};
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
    totalStock: Number(totalStock._sum.stock),
    totalProducts,
    totalSales,
  };
};
