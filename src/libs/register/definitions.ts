import { z } from "zod";

export const RegisterUserSchema = z.object({
  username: z
    .string()
    .min(2, { message: "O nome deve ter no mínimo 2 caracteres." })
    .max(100, { message: "O nome deve ter no máximo 100 caracteres" })
    .trim(),
  pass: z
    .string()
    .min(8, { message: "A senha precisa no mínimo de 8 caracteres" })
    .regex(/[a-zA-Z]/, { message: "A senha deve no mínimo 1 letra" })
    .regex(/[0-9]/, { message: "A senha deve no mínimo 1 numero" })
    .trim(),
});

export type RegisterUserState =
  | {
      errors?: {
        username?: string[];
        pass?: string[];
      };
      message?: string;
    }
  | undefined;
