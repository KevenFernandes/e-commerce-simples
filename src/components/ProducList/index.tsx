import { getProductsCache } from "@/libs/product/queries/public";
import clsx from "clsx";

import { ProductItem } from "../ProductItem";

export async function ProductList() {
  const products = await getProductsCache();

  return (
    <section>
      <div className={clsx("grid gap-6 md:grid-cols-2 mb-16")}>
        {products.map((product) => {
          return (
            <div key={product.idproduto}>
              <ProductItem
                srcImage={product.image_url}
                nome={product.nome}
                preco={product.preco}
                id={product.idproduto}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
