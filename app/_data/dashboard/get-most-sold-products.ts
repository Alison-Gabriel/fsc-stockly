import "server-only";
import { ProductStatusDTO } from "../product/get-products";
import { Prisma } from "@/app/_generated/prisma/client";
import { db } from "@/app/_lib/prisma";

export interface MostSoldProductDTO {
  productId: string;
  name: string;
  totalSold: number;
  status: ProductStatusDTO;
  price: number;
}

export const getMostSoldProducts = async (): Promise<MostSoldProductDTO[]> => {
  const mostSoldProductsQuery = Prisma.sql`
    SELECT "Product"."name", SUM("SaleProduct"."quantity") AS "totalSold", "Product"."price", "Product"."stock", "Product"."id" AS "productId" 
    FROM "SaleProduct"
    JOIN "Product" ON "SaleProduct"."productId" = "Product"."id"
    GROUP BY "Product"."name", "Product"."price", "Product"."stock", "Product"."id"
    ORDER BY "totalSold" DESC
    LIMIT 5;
  `;

  const mostSoldProducts = await db.$queryRaw<
    {
      productId: string;
      name: string;
      stock: number;
      price: number;
      totalSold: number;
    }[]
  >(mostSoldProductsQuery);

  return mostSoldProducts.map((product) => ({
    name: product.name,
    price: product.price,
    productId: product.productId,
    totalSold: product.totalSold,
    status: product.stock <= 0 ? "OUT_OF_STOCK" : "IN_STOCK",
  }));
};
