"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const createSale = actionClient
  .inputSchema(createSaleSchema)
  .action(async ({ parsedInput: { products } }) => {
    await db.$transaction(async (transaction) => {
      const sale = await transaction.sale.create({
        data: {
          date: new Date(),
        },
      });

      for (const product of products) {
        const productFromDb = await db.product.findUnique({
          where: { id: product.id },
        });

        const isProductNotFounded = !productFromDb;
        if (isProductNotFounded) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Product is not found."],
          });
        }

        const isProductOutOfStock = product.quantity > productFromDb.stock;
        if (isProductOutOfStock) {
          returnValidationErrors(createSaleSchema, {
            _errors: ["Product is out of stock."],
          });
        }

        await transaction.saleProduct.create({
          data: {
            saleId: sale.id,
            productId: product.id,
            quantity: product.quantity,
            unitPrice: productFromDb.price,
          },
        });

        await transaction.product.update({
          where: { id: product.id },
          data: {
            stock: {
              decrement: product.quantity,
            },
          },
        });
      }
    });

    revalidatePath("/products");
  });
