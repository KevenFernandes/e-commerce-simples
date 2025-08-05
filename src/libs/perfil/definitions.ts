import z from "zod";

export const PerfilFormSchema = z.object({
  nome: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo 2 caracteres." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres." })
    .trim(),
  email: z
    .string()
    .email({ message: "Por favor entrar com e-mail válido." })
    .trim(),
  cpf: z
    .string()
    .min(11, { message: "CPF deve conter pelo menos 11 caracteres." })
    .max(14, { message: "CPF deve conter no máximo 14 caracteres." })
    .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, {
      message: "Invalid CPF format.",
    }),
  telefone: z
    .string()
    .min(10, { message: "Telefone deve conter pelo menos 10 dígitos" })
    .max(15, { message: "Telefone deve conter no máximo 15 dígitos" })
    .regex(
      /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)?\s?(?:[2-5]|9[0-9])[0-9]{3}\-?[0-9]{4}$/,
      { message: "Formato de número inválido." }
    ),
});

export type PerfilFormState =
  | {
      errors?: {
        nome?: string[];
        email?: string[];
        cpf?: string[];
        telefone?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;
