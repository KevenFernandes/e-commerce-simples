"use client";

import { perfilAction } from "@/actions/perfil/perfilAction";
import { PerfilModel } from "@/models/perfil-model";
import clsx from "clsx";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export function PerfilForm({ data }: { data: PerfilModel }) {
  const [nome, setNome] = useState(data.nome);
  const [email, setEmail] = useState(data.email);
  const [cpf, setCpf] = useState(data.cpf);
  const [telefone, setTelefone] = useState(data.telefone);

  const [state, action, pending] = useActionState(perfilAction, undefined);

  useEffect(() => {
    setNome(data.nome);
    setEmail(data.email);
    setCpf(data.cpf);
    setTelefone(data.telefone);
  }, [data]);

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
      toast.info(state.message);
    }
  }, [state]);

  return (
    <div className="flex w-full  justify-center mx-3">
      <div className={clsx("bg-red-100 w-xl max-w-lg", "rounded-md")}>
        <h3 className="text-zinc-500 text-center pt-4 text-lg">
          Perfil do usuário
        </h3>
        <form
          action={action}
          className={clsx(
            "[&_input]:w-full [&_input]:bg-white p-4",
            "[&_input]:rounded-sm [&_input]:mt-1 [&_input]:py-1",
            "[&_input]:pl-2 [&_input]:disabled:opacity-50"
          )}
        >
          <div className="mb-3">
            <label htmlFor="nome">Nome:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => {
                setNome(e.target.value);
              }}
              disabled={pending}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled={pending}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={cpf}
              onChange={(e) => {
                setCpf(e.target.value);
              }}
              disabled={pending}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={telefone}
              onChange={(e) => {
                setTelefone(e.target.value);
              }}
              disabled={pending}
            />
          </div>
          <div className="flex items-center gap-2">
            <button
              type="submit"
              className={clsx(
                "bg-red-400 py-2 px-6 rounded-sm",
                "hover:bg-red-500 cursor-pointer",
                "transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
              )}
              disabled={pending}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
