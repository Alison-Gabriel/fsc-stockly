import "server-only";

import { db } from "@/app/_lib/prisma";

export interface ProductDTO {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  status: "IN_STOCK" | "OUT_OF_STOCK";
}

export const getProducts = async (): Promise<ProductDTO[]> => {
  const products = await db.product.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name,
    price: Number(product.price),
    stock: product.stock,
    status: product.stock <= 0 ? "OUT_OF_STOCK" : "IN_STOCK",
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  }));
};
