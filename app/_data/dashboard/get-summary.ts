import "server-only";

import { Prisma } from "@/app/_generated/prisma/client";
import { dateFormatter } from "@/app/_helpers/date-formatter";
import { db } from "@/app/_lib/prisma";
import { ProductStatusDTO } from "../product/get-products";

export interface DayTotalRevenue {
  day: string;
  totalRevenue: number;
}

export interface MostSoldProductDTO {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDTO;
  price: number;
}

interface SummaryDTO {
  totalStock: number;
  totalProducts: number;
  totalLast14DaysRevenue: DayTotalRevenue[];
  mostSoldProducts: MostSoldProductDTO[];
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

  const totalStockPromise = db.product.aggregate({
    _sum: { stock: true },
  });

  const totalProductsPromise = db.product.count();

  const mostSoldProductsQuery = Prisma.sql`
    SELECT "Product"."name", SUM("SaleProduct"."quantity") AS "totalSold", 
    "Product"."price", "Product"."stock", "Product"."id" as "productId" FROM "SaleProduct"
    JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
    GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
    ORDER BY "totalSold" DESC
    LIMIT 5;
  `;

  const mostSoldProductsPromise = db.$queryRaw<
    {
      productId: string;
      name: string;
      stock: number;
      price: number;
      totalSold: number;
    }[]
  >(mostSoldProductsQuery);

  const [totalStock, totalProducts, mostSoldProducts] = await Promise.all([
    totalStockPromise,
    totalProductsPromise,
    mostSoldProductsPromise,
  ]);

  return {
    totalLast14DaysRevenue: totalLast14DaysRevenue,
    totalStock: Number(totalStock._sum.stock),
    totalProducts,
    mostSoldProducts: mostSoldProducts.map((product) => ({
      productId: product.productId,
      name: product.name,
      totalSold: product.totalSold,
      price: Number(product.price),
      status: product.stock <= 0 ? "OUT_OF_STOCK" : "IN_STOCK",
    })),
  };
};
