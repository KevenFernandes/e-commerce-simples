"use client";

import clsx from "clsx";
import { CartItem } from "../CartItem";
import {
  cartItems,
  deleteProductCart,
  updateProductCart,
} from "@/actions/shopcart/cartAction";
import React, { useEffect, useState } from "react";
import { CatalogCardPrice } from "../CatalogCardPrice";
import { LoginCardPrice } from "../LoginCardPrice";

type CartItemProps = {
  idProduto: number;
  name: string;
  price: number;
  quantity: number;
};

export function ShoppingCart({ variant }: { variant: "catalog" | "login" }) {
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
    await deleteProductCart(id);
    setItems((prevItems) => prevItems.filter((item) => item.idProduto !== id));
  }

  useEffect(() => {
    setTotal(calculateItems(items));
  }, [items]);

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div
      className={clsx(
        variant === "catalog" && "fixed right-4 top-16 bg-black/10",
        variant === "catalog" && "h-full w-full z-30",
        variant === "catalog" && "inset-0 backdrop-blur-md",
        variant === "catalog" && "flex justify-end",
        variant === "login" && "sm:pl-6 pl-2"
      )}
    >
      {variant === "login" && (
        <div>
          <h1 className={clsx("text-center text-xl my-4 text-zinc-800")}>
            Meu carrinho
          </h1>
        </div>
      )}
      <div
        className={clsx(
          variant === "catalog" &&
            "bg-white w-5/6 h-5/6 m-6 max-w-180 rounded-sm px-8",
          variant === "login" && "lg:flex-row lg:gap-4",
          "flex flex-col"
        )}
      >
        <div
          className={clsx(
            "flex flex-col flex-1",
            variant === "catalog" && "py-6 gap-2 overflow-y-auto",
            variant === "login" && "gap-4"
          )}
        >
          {variant === "catalog" && (
            <div className={clsx(variant === "catalog" && "border-b-2")}>
              <h1 className={clsx("text-center text-xl my-6 text-zinc-600")}>
                Carrinho de Compras
              </h1>
            </div>
          )}
          {items.map((item) => (
            <div key={item.idProduto}>
              <CartItem
                id={item.idProduto}
                name={item.name}
                quantity={item.quantity}
                price={item.price}
                onChangeQuantity={onChangeQuantity}
                onChangeDelete={onDelete}
              />
            </div>
          ))}
        </div>
        {variant === "catalog" && <CatalogCardPrice price={total} />}
        {variant === "login" && <LoginCardPrice price={total} />}
      </div>
    </div>
  );
}
