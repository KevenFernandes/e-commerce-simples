"use client";
import { updateProductCart } from "@/actions/shopcart/cartAction";
import clsx from "clsx";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";

type CartItemProps = {
  id: number;
  name: string;
  quantity: number;
  price: number;
  onChangeQuantity: (id: number, quantity: number) => Promise<void>;
  onChangeDelete: (id: number) => void;
};

export function CartItem({
  id,
  name,
  quantity,
  price,
  onChangeQuantity,
  onChangeDelete,
}: CartItemProps) {
  const buttonQuantity = clsx(
    "cursor-pointer bg-[#BBB749]",
    "w-6 h-6 rounded-full",
    "flex justify-center items-center",
    "hover:bg-[#379F7A] transition-colors",
    "text-xl"
  );

  const [qtd, setQtd] = useState(quantity);

  async function updatedQuantity(action: "increase" | "decrease") {
    const newQtd = action === "increase" ? qtd + 1 : Math.max(1, qtd - 1);
    setQtd(newQtd);

    await onChangeQuantity(id, newQtd);
  }

  useEffect(() => {
    updateProductCart(id, qtd);
  }, [qtd, id]);

  return (
    <div
      className={clsx(
        "flex justify-between sm:text-lg",
        "text-zinc-800 bg-zinc-300",
        "py-3 px-4 rounded-sm min-w-80"
      )}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          className={clsx(
            "cursor-pointer hover:text-[#BBB749] transition-colors"
          )}
          onClick={() => onChangeDelete(id)}
        >
          <TrashIcon />
        </button>
        <p className="text-sm sm:text-base">{name}</p>
      </div>
      <div className="flex sm:gap-6 items-center">
        <div className="flex gap-2 items-center">
          <button
            className={buttonQuantity}
            onClick={() => updatedQuantity("decrease")}
          >
            -
          </button>
          <span className="bg-white px-2 rounded-sm">{qtd}</span>
          <button
            className={buttonQuantity}
            onClick={() => updatedQuantity("increase")}
          >
            +
          </button>
        </div>
        <div className="min-w-25 flex items-center justify-center">
          <p>
            R$<span>{(price * qtd).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
