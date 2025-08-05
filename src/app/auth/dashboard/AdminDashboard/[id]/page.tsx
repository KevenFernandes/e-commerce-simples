import { AdminManageProduct } from "@/components/AdminManageProduct";
import { productRespository } from "@/repository/product-repository";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminSingleProductPage({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;

  const produto = await productRespository.findByIdProduct(id);

  if (!produto) return notFound();

  return (
    <>
      <div className="w-full">
        <AdminManageProduct mode="update" product={produto} />
      </div>
    </>
  );
}
