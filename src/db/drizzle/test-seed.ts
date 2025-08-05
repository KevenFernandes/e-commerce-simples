// // import { eq } from "drizzle-orm";
// import { eq } from "drizzle-orm/mysql-core/expressions";
// import { db } from ".";
// import { cartItemTable, produtoTable } from "./schema";

// async function seedProduct() {
//   //  -- Produto teste --

//   const product: typeof produtoTable.$inferInsert = {
//     nome: "Azeite de Oliva Extra Virgem",
//     descricao:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus commodo ipsum vel tempor. Maecenas maximus magna sed nunc efficitur hendrerit. Mauris vel metus luctus, vulputate lorem non, porttitor quam. Quisque facilisis euismod eros, sit amet placerat libero scelerisque id. Aliquam sodales blandit sapien. Duis in mauris suscipit, sollicitudin massa consectetur, tincidunt ligula. ",
//     preco: "36.99",
//     code: "AND-AZE-500ML",
//     image_url: "./images/azeite001.png",
//     ativo: true,
//   };

//   // -- inserção teste --

//   await db.insert(produtoTable).values(product);
//   console.log("Produto criado com sucesso!");

//   /* -- Ver todos os produtos -- */
//   const products = await db.select().from(produtoTable);
//   const itemsCart = await db.select().from(cartItemTable);
//   console.log(itemsCart);
//   console.log("Todos os produtos:", products);

//   // -- Atulizar teste --

//   await db
//     .update(produtoTable)
//     .set({
//       descricao:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus commodo ipsum vel tempor.",
//     })
//     .where(eq(produtoTable.idproduto, 1));
//   console.log("Produto atualizado com sucesso!");

//   // -- Delete teste --
//   await db.delete(produtoTable).where(eq(produtoTable.idproduto, 1));
//   console.log("Produto deletado com sucesso!");
// }

// seedProduct();
