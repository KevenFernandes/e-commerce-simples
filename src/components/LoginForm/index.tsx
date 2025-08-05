"use client";

import { loginAction } from "@/actions/login/loginAction";
import clsx from "clsx";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, undefined);

  useEffect(() => {
    if (state?.errors) {
      toast.dismiss();

      const allErrors: string[] = [];

      Object.values(state.errors).forEach((fieldErrors) => {
        if (fieldErrors && fieldErrors.length > 0) {
          allErrors.push(...fieldErrors);
        }
      });

      allErrors.forEach((err) => toast.error(err));
    }

    if (state?.message) {
      toast.dismiss();
      toast.error(state.message);
    }
  }, [state]);

  return (
    <div className="text-center">
      <div className={clsx("bg-[#379f7a] p-4 rounded-sm")}>
        <h1 className={clsx("font-semibold text-2xl py-4")}>Faça Login</h1>
        <form
          action={action}
          className={clsx(
            "[&_input]:w-full [&_input]:bg-white",
            "flex flex-col text-center gap-6",
            "[&_input]:py-1 [&_input]:px-2",
            "[&_input]:rounded-sm"
          )}
        >
          <div>
            <label htmlFor="user">Usuário:</label>
            <input
              type="text"
              id="user"
              name="user"
              disabled={pending}
              className="mt-2"
            />
          </div>
          <div>
            <label htmlFor="pass">Senha:</label>
            <input
              type="password"
              id="pass"
              name="pass"
              disabled={pending}
              className="mt-2"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={pending}
              className={clsx(
                "bg-[#bbb749] w-40 py-2 rounded-md",
                "cursor-pointer hover:bg-[#b9b429]"
              )}
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
      <span className={clsx("text-white [&_a]:text-blue-600", "text-sm")}>
        Ainda nao possui conta? <Link href="/auth/register">crie agora</Link>
      </span>
    </div>
  );
}
