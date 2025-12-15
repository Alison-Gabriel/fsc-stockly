"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema, UpsertProductSchema } from "./schema";

export const upsertProduct = async ({
  id,
  name,
  price,
  stock,
}: UpsertProductSchema) => {
  upsertProductSchema.parse({ id, name, price, stock });
  await db.product.upsert({
    where: { id: id ?? "" },
    update: {
      id,
      name,
      price,
      stock,
    },
    create: {
      id,
      name,
      price,
      stock,
    },
  });
  revalidatePath("/products");
};
