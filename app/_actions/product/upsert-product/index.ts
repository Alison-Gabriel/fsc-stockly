"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";
import { actionClient } from "@/app/_lib/safe-action";

export const upsertProduct = actionClient
  .inputSchema(upsertProductSchema)
  .action(async ({ parsedInput: { id = "", name, price, stock } }) => {
    await db.product.upsert({
      where: { id },
      update: { id, name, price, stock },
      create: { name, price, stock },
    });

    revalidatePath("/", "layout");
  });
