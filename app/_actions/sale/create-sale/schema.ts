import z from "zod";

export const createSaleSchema = z.object({
  products: z.array(
    z.object({
      id: z.uuid(),
      quantity: z.coerce
        .number<number>("Quantidade inválida.")
        .int("A quantidade do produto precisa ser inteira.")
        .positive("A quantidade do produto precisa ser maior do que zero."),
    }),
  ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;
