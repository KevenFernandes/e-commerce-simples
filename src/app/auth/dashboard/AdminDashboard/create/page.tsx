import { AdminManageProduct } from "@/components/AdminManageProduct";
import clsx from "clsx";

export default function CreateAdminPage() {
  /* nome, preco, code, image-url, ativo e descricao */
  return (
    <div className={clsx("w-full h-screen")}>
      {/* <h1>Criação de Produto</h1> */}
      <AdminManageProduct mode="create" />
    </div>
  );
}
