"use client";

import { createProductAction } from "@/actions/product/createProductAction";
import { updateProductAction } from "@/actions/product/updateProductAction";
import { ProducModel } from "@/models/product-model";
import { useActionState, useEffect } from "react";
import { ContainerInputText } from "../ContainerInputText";
import clsx from "clsx";
import { ImageUploader } from "../ImageUploader";
import { toast } from "react-toastify";

type createManageProductProps = {
  mode: "create";
};

type updateManageProductProps = {
  mode: "update";
  product?: ProducModel;
};

type AdminManageProductProps =
  | createManageProductProps
  | updateManageProductProps;

export function AdminManageProduct({ ...props }: AdminManageProductProps) {
  const actionMap = {
    create: createProductAction,
    update: updateProductAction,
  };

  const { mode } = props;

  let product;
  if (mode === "update") {
    product = props.product;
  }

  const productPublic = {
    idproduto: product?.idproduto || 0,
    nome: product?.nome || "",
    code: product?.code || "",
    preco: product?.preco || "",
    descricao: product?.descricao || "",
    ativo: product?.ativo || false,
    image_url: product?.image_url || "",
  };

  const initialState = {
    formState: productPublic,
    errors: [],
    message: [],
  };

  const [state, action, pending] = useActionState(
    actionMap[mode],
    initialState
  );

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
    } else if (state.message) {
      toast.dismiss();
      state.message.forEach((message) => toast.info(message));
    } else {
      toast.dismiss();
      toast.success("Produto salvo com sucesso!");
    }
  }, [state]);

  const { formState } = state;

  return (
    <>
      <section className="flex h-full w-full sm:h-auto justify-center bg-zinc-500">
        <div
          className={clsx(
            "w-full sm:max-w-250 p-6",
            "sm:rounded-xl pt-35 sm:py-8",
            "sm:mx-4 sm:mt-30 bg-zinc-300",
            "h-full sm:h-auto sm:mb-8 sm:mt-4"
          )}
        >
          <form action={action}>
            <div className={clsx("flex flex-col gap-8 rounded-sm")}>
              <ContainerInputText
                label="ID do produto"
                type="text"
                name="idproduto"
                id="idproduto"
                defaultValue={formState.idproduto}
                readOnly={true}
              />

              <ContainerInputText
                label="Nome do Produto: "
                type="text"
                name="nome"
                id="nome"
                placeholder="Fritadeira Elétrica..."
                defaultValue={formState.nome}
                disabled={pending}
              />

              {/* Apesar do tipo ser number, o comportamento do html o faz ser string */}
              <ContainerInputText
                label="Preço:"
                type="string"
                name="preco"
                id="preco"
                placeholder="429,00"
                defaultValue={Number(formState.preco)}
                disabled={pending}
              />

              <ContainerInputText
                label="Cód. do Produto:"
                type="text"
                name="code"
                id="code"
                placeholder="XXX-XXX-XXXX..."
                defaultValue={formState.code}
                disabled={pending}
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="descricao">Descrição:</label>
                <textarea
                  name="descricao"
                  id="descricao"
                  placeholder="Descreva uma breve descrição"
                  className="bg-white rounded-sm p-2 resize-none"
                  maxLength={420}
                  rows={8}
                  defaultValue={formState.descricao}
                  disabled={pending}
                ></textarea>
              </div>

              <div className="flex flex-col gap-4">
                <ImageUploader disabled={pending} />
                <ContainerInputText
                  label="Cole URL da imagem:"
                  type="text"
                  name="image_url"
                  id="image_url"
                  placeholder="Cole a url aqui"
                  defaultValue={formState.image_url}
                  disabled={pending}
                />
              </div>

              {/* Provavelmente o error está aqui, está esperando um boolean e está recebendo uma string */}
              <div className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  name="ativo"
                  id="ativo"
                  defaultChecked={formState.ativo}
                  disabled={pending}
                />
                <label htmlFor="ativo">Deseja torna pública?</label>
              </div>
              <div>
                <button
                  className={clsx(
                    "bg-blue-600 px-4 py-3",
                    "rounded-sm font-bold transition-colors",
                    "text-zinc-50 tracking-wide",
                    "hover:bg-blue-800 cursor-pointer"
                  )}
                  type="submit"
                  disabled={pending}
                >
                  Salvar Produto
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
