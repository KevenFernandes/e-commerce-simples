import { productRespository } from "@/repository/product-repository";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getProductsCache = cache(
  unstable_cache(
    async () => {
      return await productRespository.findAllProductPublic();
    },
    ["products"],
    { tags: ["products"] }
  )
);
