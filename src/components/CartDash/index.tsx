"use client";

import { cartItems, updateProductCart } from "@/actions/shopcart/cartAction";
import { useEffect, useState } from "react";
import { CartItem } from "../CartItem";
import clsx from "clsx";
import { deleteProductAction } from "@/actions/product/deleteProductAction";

type CartItemProps = {
  idProduto: number;
  name: string;
  price: number;
  quantity: number;
};

export function CartDash() {
  const [items, setItems] = useState<CartItemProps[]>([]);
  const [total, setTotal] = useState<number>(0);

  async function onChangeQuantity(id: number, quantity: number) {
    try {
      await updateProductCart(id, quantity);

      setItems((prevItem) =>
        prevItem.map((item) =>
          item.idProduto === id ? { ...item, quantity: quantity } : item
        )
      );
    } catch (error) {
      console.log("Error ao tentar atualizar a quantidade dos items", error);
    }
  }

  async function loadCart() {
    try {
      const cartItem = await cartItems();
      setItems(cartItem);
    } catch (error) {
      console.log(error);
    }
  }

  function calculateItems(items: CartItemProps[]) {
    return items.reduce(
      (acum, crt) => (acum = acum + crt.price * crt.quantity),
      0
    );
  }

  async function onDelete(id: number) {
    await deleteProductAction(id);
    setItems((prevItems) => prevItems.filter((item) => item.idProduto !== id));
  }

  useEffect(() => {
    setTotal(calculateItems(items));
  }, [items]);
  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="sm:pl-6 pl-2">
      <h1 className="text-center py-4 text-xl text-zinc-700">Meu carrinho</h1>
      <div className="flex flex-col lg:flex-row lg:gap-4">
        <div className=" flex flex-col gap-4 flex-1">
          {items.map((item) => {
            return (
              <div key={item.idProduto}>
                <CartItem
                  id={item.idProduto}
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  onChangeQuantity={onChangeQuantity}
                  onChangeDelete={onDelete}
                />
              </div>
            );
          })}
        </div>
        <div
          className={clsx(
            "border-t mt-4",
            "lg:bg-white lg:p-4 lg:border-t-0",
            "lg:mt-0 lg:rounded-md"
          )}
        >
          <h2
            className={clsx(
              "hidden lg:block text-center text-zinc-600",
              "border-b-1 pb-4 text-lg"
            )}
          >
            Resumo do Pedido
          </h2>
          <div className="py-4 text-zinc-600">
            <div>
              <span>Subtotal: {total.toFixed(2)}</span>
            </div>
            <div>
              <span>Desconto: 0</span>
            </div>
            <div>
              <span>Frete: 0</span>
            </div>
          </div>
          <div
            className={clsx(
              "border-t pt-4 flex justify-between items-center",
              "lg:gap-4"
            )}
          >
            <div className="font-semibold text-xl text-nowrap">
              <span>Total: {total.toFixed(2)}</span>
            </div>
            <div>
              <button
                className={clsx(
                  "bg-green-600 py-2 px-3 rounded-sm",
                  "cursor-pointer hover:bg-green-700"
                )}
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
