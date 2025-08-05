"use client";

import { addProductCart } from "@/actions/shopcart/cartAction";
import clsx from "clsx";
import { ShoppingCartIcon } from "lucide-react";
import Image from "next/image";

type ProductItemProps = {
  srcImage: string | null;
  nome: string;
  preco: string;
  id: number;
};

export function ProductItem({ srcImage, nome, preco, id }: ProductItemProps) {
  const parsedPreco = parseFloat(preco);

  return (
    <div
      className={clsx(
        "flex gap-4 max-h-50 w-full min-w-[370]",
        "rounded-lg overflow-hidden",
        "bg-[#78ae62]/50 backdrop-blur-sm"
      )}
    >
      <div
        className={clsx(
          "h-full max-w-50",
          "flex bg-white",
          "items-center justify-center"
        )}
      >
        <Image
          src={srcImage ? srcImage : ""}
          alt={nome}
          width={1200}
          height={720}
          className={clsx("max-w-50 h-50 object-contain object-center ")}
        />
      </div>
      <div className={clsx("flex flex-col justify-between py-4 pr-4 flex-1")}>
        <h3 className={clsx("font-semibold tracking-wide")}>{nome}</h3>
        <div className={clsx("flex justify-between items-center min-w-35 ")}>
          <p
            className={clsx(
              "bg-emerald-50 w-full",
              "rounded-md py-2 pl-4 block",
              "font-bold rounded-l-full"
            )}
          >
            R$ {preco}
          </p>
          <div>
            <button
              className={clsx(
                "flex items-center h-full",
                "bg-[#379f7a] rounded-r-full",
                "pl-2 pr-3 py-2 cursor-pointer",
                "hover:bg-[#3a6254] transition-colors"
              )}
              title="Adicionar ao carrinho"
              aria-label="Adicionar ao carrinho"
              onClick={(e) => {
                e.preventDefault();
                return addProductCart(
                  { idProduto: id, name: nome, price: parsedPreco },
                  1
                );
              }}
            >
              <ShoppingCartIcon className="w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
