import { db } from "@/db/drizzle";
import { CartItem, CartService } from "./cart-interface";
import { cartItemTable, produtoTable } from "@/db/drizzle/schema";
import { and, eq, sql } from "drizzle-orm";

export class CartRepository implements CartService {
  private userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }

  async addItem(item: CartItem): Promise<void> {
    const existItem = await db
      .select({ id_product: cartItemTable.id_produto })
      .from(cartItemTable)
      .where(
        and(
          eq(cartItemTable.id_produto, item.idProduto),
          eq(cartItemTable.id_usuario, this.userId)
        )
      );

    if (existItem[0]) {
      await db
        .update(cartItemTable)
        .set({
          quantidade: sql`${cartItemTable.quantidade} + ${item.quantity}`,
        })
        .where(
          and(
            eq(cartItemTable.id_produto, item.idProduto),
            eq(cartItemTable.id_usuario, this.userId)
          )
        );
    } else {
      await db.insert(cartItemTable).values({
        id_produto: item.idProduto,
        id_usuario: this.userId,
        quantidade: item.quantity,
      });
    }
  }

  async deleteItem(id: number) {
    await db
      .delete(cartItemTable)
      .where(
        and(
          eq(cartItemTable.id_produto, id),
          eq(cartItemTable.id_usuario, this.userId)
        )
      );
  }

  async updateQtdItem(id: number, quantity: number) {
    if (quantity <= 0) {
      await this.deleteItem(id);
    } else {
      await db
        .update(cartItemTable)
        .set({ quantidade: quantity })
        .where(
          and(
            eq(cartItemTable.id_produto, id),
            eq(cartItemTable.id_usuario, this.userId)
          )
        );
    }
  }

  async getItems(): Promise<CartItem[]> {
    const userCartItems = await db
      .select({
        id_produto: cartItemTable.id_produto,
        quantidade: cartItemTable.quantidade,
      })
      .from(cartItemTable)
      .where(eq(cartItemTable.id_usuario, this.userId));

    const itemPromises = userCartItems.map(async (item) => {
      const productDetails = await db
        .select({
          nome: produtoTable.nome,
          preco: produtoTable.preco,
        })
        .from(produtoTable)
        .where(eq(produtoTable.idproduto, item.id_produto))
        .limit(1);

      if (productDetails.length === 0) {
        console.warn(
          `Produto com ID ${item.id_produto} não encontrado na tabela de produtos.`
        );
        return null;
      }

      return {
        idProduto: item.id_produto,
        name: productDetails[0].nome,
        price: parseFloat(productDetails[0].preco),
        quantity: item.quantidade,
      };
    });

    const cartItemsWithNulls = await Promise.all(itemPromises);

    const finalCartItems = cartItemsWithNulls.filter(
      (item) => item !== null
    ) as CartItem[];

    return finalCartItems;
  }

  async clearItems() {
    await db
      .delete(cartItemTable)
      .where(eq(cartItemTable.id_usuario, this.userId));
  }
}
