import { z } from "zod";

export const CreateProductSchema = z.object({
  nome: z
    .string()
    .min(1, "O Produto precisa ter um nome.")
    .max(100, "Nome muito grande, máx: 100 caracteres.")
    .trim(),
  code: z
    .string()
    .min(1, "Informe o código do produto.")
    .max(30, "Código muito grande, máx: 30 caracteres.")
    .trim(),
  preco: z.string().regex(/^\d+$/, {
    message: "O preço deve conter apenas números inteiros.",
  }),
  descricao: z
    .string()
    .min(0, "Informe a descrição do produto")
    .max(255, "Descrição muito grande, máx: 255 caracteres")
    .trim()
    .optional()
    .default(""),
  ativo: z
    .union([
      z.literal("on"),
      z.literal("true"),
      z.literal("false"),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform((val) => val === "on" || val === "true" || val === true),
  image_url: z.string().min(1, "Informe o caminho da imagem").trim(),
});
