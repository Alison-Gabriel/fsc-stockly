"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { createProductSchema, CreateProductSchema } from "./schema";

export const createProduct = async ({
  name,
  price,
  stock,
}: CreateProductSchema) => {
  createProductSchema.parse({ name, price, stock });
  await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  });
  revalidatePath("/products");
};
