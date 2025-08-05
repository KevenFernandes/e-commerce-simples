import clsx from "clsx";
import { EditIcon } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "../DeleteButton";
import { productRespository } from "@/repository/product-repository";

export async function AdminListProduct() {
  const produtos = await productRespository.findAllProduct();

  return (
    <div className="bg-zinc-300 mt-20 sm:mt-0 p-8 rounded-sm shadow-xl/20">
      <div className={clsx("flex flex-col gap-6")}>
        {produtos.map((produto) => {
          return (
            <div
              key={produto.idproduto}
              className={clsx(
                "flex justify-between items-center gap-8",
                "bg-zinc-800 px-3 py-3 rounded-sm"
              )}
            >
              <p className="text-zinc-50">{produto.nome}</p>
              {!produto.ativo && (
                <span className="text-xs text-red-400">
                  Produto não público
                </span>
              )}
              <div className={clsx("flex gap-2 items-center")}>
                <Link
                  href={`/auth/dashboard/AdminDashboard/${produto.idproduto}`}
                  className={clsx("text-blue-600")}
                >
                  <EditIcon />
                </Link>
                <DeleteButton id={produto.idproduto} title={produto.nome} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
