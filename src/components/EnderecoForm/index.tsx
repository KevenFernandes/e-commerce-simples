"use client";

import { enderecoAction } from "@/actions/perfil/enderecoAction";
import { EnderecoModel } from "@/models/endereco-model";
import clsx from "clsx";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

export function EnderecoForm({ data }: { data: EnderecoModel }) {
  const siglasValidas = [
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
  ];

  const [rua, setRua] = useState(data.rua);
  const [bairro, setBairro] = useState(data.bairro);
  const [cidade, setCidade] = useState(data.cidade);
  const [complemento, setComplemento] = useState(data.complemento || "");
  const [estado, setEstado] = useState(data.estado);
  const [cep, setCep] = useState(data.cep);

  const [state, actio, pending] = useActionState(enderecoAction, undefined);

  useEffect(() => {
    if (state?.errors) {
      toast.dismiss();

      const allErrors: string[] = [];

      Object.values(state.errors).forEach((errs) => {
        if (errs && errs.length > 0) {
          allErrors.push(...errs);
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
    <div className="flex  item w-full justify-center mt-4 mx-3">
      <div className={clsx("bg-emerald-100 w-xl max-w-lg ", "rounded-md ")}>
        <h3 className="text-zinc-500 text-center pt-4 text-lg">Endereço</h3>

        <form
          action={actio}
          className={clsx(
            "[&_input]:w-full [&_input]:bg-white p-4",
            "[&_input]:rounded-sm [&_input]:mt-1 [&_input]:py-1",
            "[&_input]:pl-2 [&_input]:disabled:opacity-50"
          )}
        >
          <div className="mb-3">
            <label htmlFor="rua">Rua:</label>
            <input
              type="text"
              id="rua"
              name="rua"
              value={rua}
              onChange={(e) => setRua(e.target.value)}
              disabled={pending}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              disabled={pending}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              disabled={pending}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="complemento">Complemento:</label>
            <input
              type="text"
              id="complemento"
              name="complemento"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              disabled={pending}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="estado">Estado:</label>
            <select
              name="estado"
              id="estado"
              className="bg-white p-1 ml-2 rounded-md"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              disabled={pending}
            >
              <option value="">UF</option>
              {siglasValidas.map((sigla) => (
                <option key={sigla} value={sigla}>
                  {sigla}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              disabled={pending}
            />
          </div>

          <button
            type="submit"
            className={clsx(
              "bg-emerald-400 py-2 px-6 rounded-sm",
              "hover:bg-emerald-500 cursor-pointer",
              "transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            )}
            disabled={pending}
          >
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}
