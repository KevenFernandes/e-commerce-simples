import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(1, { message: "O nome do usuário é obrigatório" })
    .max(100, { message: "Limite excedido de caracteres" })
    .trim(),
  pass: z
    .string()
    .min(1, { message: "A senha do usuário é obrigatória" })
    .max(100, { message: "Limite excedido de caracteres" })
    .trim(),
});

export type LoginState =
  | {
      errors?: {
        username?: string[];
        pass?: string[];
      };
      message?: string;
    }
  | undefined;
