import "server-only";

import { Product } from "@/app/_generated/prisma/client";
import { db } from "@/app/_lib/prisma";

export const getProducts = async (): Promise<Product[]> => {
  const products = await db.product.findMany({});
  const serializedProducts = JSON.parse(JSON.stringify(products));
  return serializedProducts;
};
