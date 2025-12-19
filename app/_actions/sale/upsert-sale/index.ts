"use server";

import { db } from "@/app/_lib/prisma";
import { upsertSaleSchema } from "./schema";
import { revalidatePath } from "next/cache";
import { actionClient } from "@/app/_lib/safe-action";
import { returnValidationErrors } from "next-safe-action";

export const upsertSale = actionClient
  .inputSchema(upsertSaleSchema)
  .action(async ({ parsedInput: { products, id } }) => {
    const isSaleUpdate = Boolean(id);

    await db.$transaction(async (transaction) => {
      if (isSaleUpdate) {
        const existingSale = await db.sale.findUnique({
          where: { id },
          include: {
            saleProducts: true,
          },
        });

        if (!existingSale) return;

        await transaction.sale.delete({
          where: { id },
        });

        for (const saleProduct of existingSale.saleProducts) {
          await transaction.product.update({
            where: { id: saleProduct.productId },
            data: {
              stock: {
                increment: saleProduct.quantity,
              },
            },
          });
        }
      }

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
          returnValidationErrors(upsertSaleSchema, {
            _errors: ["Product is not found."],
          });
        }

        const isProductOutOfStock = product.quantity > productFromDb.stock;
        if (isProductOutOfStock) {
          returnValidationErrors(upsertSaleSchema, {
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

    revalidatePath("/", "layout");
  });
