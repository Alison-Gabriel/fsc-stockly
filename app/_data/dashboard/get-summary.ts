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
  mostSoldProducts: MostSoldProductDTO[];
}

export const getDashboardSummary = async (): Promise<SummaryDTO> => {
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

  const [mostSoldProducts] = await Promise.all([mostSoldProductsPromise]);

  return {
    mostSoldProducts: mostSoldProducts.map((product) => ({
      productId: product.productId,
      name: product.name,
      totalSold: product.totalSold,
      price: Number(product.price),
      status: product.stock <= 0 ? "OUT_OF_STOCK" : "IN_STOCK",
    })),
  };
};
