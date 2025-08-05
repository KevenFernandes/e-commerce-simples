"use server";

import { getCartService } from "@/services/factoryCart";
import { CartItem } from "@/repository/cart-interface";

export async function addProductCart(
  product: Omit<CartItem, "quantity">,
  quantity: number
) {
  const cartService = await getCartService();
  const itemToAdd = { ...product, quantity };
  cartService.addItem(itemToAdd);
}

export async function deleteProductCart(idProduct: number) {
  const cartService = await getCartService();
  cartService.deleteItem(idProduct);
}

export async function updateProductCart(idProduct: number, quantity: number) {
  const cartService = await getCartService();
  cartService.updateQtdItem(idProduct, quantity);
}

export async function cartItems() {
  const cartService = await getCartService();
  const items = await cartService.getItems();
  return items;
}

export async function clearItems() {
  const cartService = await getCartService();
  cartService.clearItems();
}
