"use client";

import { registerAction } from "@/actions/login/registerAction";
import clsx from "clsx";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { toast } from "react-toastify";

export function RegisterForm() {
  const [state, action, pending] = useActionState(registerAction, undefined);

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
      toast.success(state.message);
    }
  }, [state]);

  return (
    <div className="text-center">
      <div className={clsx("text-center bg-[#379f7a] p-4 rounded-sm")}>
        <h1 className={clsx("font-bold text-2xl py-4")}>Criar Conta</h1>
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
            <label htmlFor="user">Criar Usuário:</label>
            <input type="text" id="user" name="user" className="mt-2" />
          </div>
          <div>
            <label htmlFor="pass">Criar Senha:</label>
            <input type="password" id="pass" name="pass" className="mt-2" />
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
              Registra-se
            </button>
          </div>
        </form>
      </div>
      <span className={clsx("text-white [&_a]:text-blue-600", "text-sm")}>
        Já possui conta?<Link href="/auth/login"> Entre</Link>
      </span>
    </div>
  );
}
