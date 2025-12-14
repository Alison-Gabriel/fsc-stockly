import z from "zod";

export const deleteProductSchema = z.object({
  id: z.uuid("ID inválido"),
});

export type DeleteProductSchema = z.infer<typeof deleteProductSchema>;
