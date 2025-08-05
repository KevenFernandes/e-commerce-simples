"use client";

import { deleteProductAction } from "@/actions/product/deleteProductAction";
import clsx from "clsx";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

type DeleteButtonProps = {
  id: number;
  title: string;
};

export function DeleteButton({ id, title }: DeleteButtonProps) {
  const [showDialog, setShowDialog] = useState(false);

  async function handleConfirm() {
    toast.dismiss();

    const result = await deleteProductAction(id);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success("Produto apagado com sucesso");
  }

  return (
    <>
      <div className="flex items-center">
        <button
          className={clsx("cursor-pointer text-red-600")}
          onClick={() => setShowDialog(true)}
        >
          <TrashIcon />
        </button>
      </div>
      {showDialog && (
        <div
          className={clsx(
            "fixed top-[50%] left-[50%]",
            "-translate-x-[50%] -translate-y-[50%]",
            "w-screen h-screen bg-black/30 backdrop-blur-xs",
            "flex justify-center items-center flex-col"
          )}
          onClick={() => setShowDialog(false)}
        >
          <div
            className={clsx(
              "text-center bg-zinc-50 max-w-96",
              "mx-6 p-6 rounded-sm",
              "flex flex-col gap-4"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h1 className="my-4 text-lg font-bold">
                Clique em <span className="text-green-600">OK</span> para
                confirmar
              </h1>
              <p>
                <span className="font-semibold">Produto:</span> {title}
              </p>
            </div>
            <div className="flex gap-4 justify-center items-center font-semibold">
              <button
                className={clsx(
                  "cursor-pointer bg-green-700 px-4 py-1 rounded-sm",
                  "hover:bg-green-800"
                )}
                onClick={handleConfirm}
              >
                OK
              </button>
              <button
                className={clsx(
                  "cursor-pointer bg-red-700 px-4 py-1 rounded-sm text-zinc-100",
                  "hover:bg-red-800"
                )}
                onClick={() => setShowDialog(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
