"use server";

import { actionClient } from "@/app/_lib/safe-action";
import { deleteSaleSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { returnValidationErrors } from "next-safe-action";

export const deleteSale = actionClient
  .inputSchema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.$transaction(async (transaction) => {
      const saleToDelete = await db.sale.findUnique({
        where: { id },
        include: {
          saleProducts: true,
        },
      });
      const hasNotFoundSaleToDelete = !saleToDelete;

      if (hasNotFoundSaleToDelete) {
        returnValidationErrors(deleteSaleSchema, {
          _errors: ["Sale to delete has not found"],
        });
      }

      for (const saleProduct of saleToDelete.saleProducts) {
        const { quantity, productId } = saleProduct;

        await transaction.product.update({
          where: { id: productId },
          data: {
            stock: {
              increment: quantity,
            },
          },
        });
      }

      await transaction.sale.delete({
        where: { id: saleToDelete.id },
      });
    });

    revalidatePath("/sales");
    revalidatePath("/products");
    revalidatePath("/");
  });
