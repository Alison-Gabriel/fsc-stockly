import z from "zod";

export const upsertProductSchema = z.object({
  id: z.uuid().optional(),
  name: z
    .string("Digite um nome válido.")
    .trim()
    .min(1, "O nome do produto é obrigatório."),
  price: z.coerce
    .number<number>("Digite um preço válido.")
    .positive("Valores negativos não são permitidos.")
    .min(0.01, "O preço do produto é obrigatório."),
  stock: z.coerce
    .number<number>("Digite uma quantidade em estoque válida.")
    .nonnegative("Valores negativos não são permitidos.")
    .int("Valores decimais não são permitidos.")
    .min(0, "A quantidade em estoque é obrigatória."),
});

export type UpsertProductSchema = z.infer<typeof upsertProductSchema>;
