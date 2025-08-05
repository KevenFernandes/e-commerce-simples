import { z } from "zod";

export const EnderecoFormSchema = z.object({
  rua: z
    .string()
    .min(1, "Informe a Rua")
    .max(100, "Limite de caracteres excedido (rua)")
    .trim(),
  bairro: z
    .string()
    .min(1, "Informe o Bairro")
    .max(100, "Limite de caracteres excedido (bairro)")
    .trim(),
  cidade: z
    .string()
    .min(1, "Infome a Cidade")
    .max(100, "Limite de caracteres excedido (cidade)")
    .trim(),
  complemento: z.string().max(100, "Limite excedido de caracteres").trim(),
  estado: z.string().min(2, "UF obrigatório").max(2, "UF obrigatório").trim(),
  cep: z
    .string()
    .regex(
      /^\d{5}-?\d{3}$/,
      "CEP inválido. Use o formato '99999-999' ou '99999999'."
    ),
});

export type EnderecoFormSchema =
  | {
      errors?: {
        rua?: string[];
        bairro?: string[];
        cidade?: string[];
        complemento?: string[];
        estado?: string[];
        cep?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
