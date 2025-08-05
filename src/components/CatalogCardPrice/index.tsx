import clsx from "clsx";

export function CatalogCardPrice({ price }: { price: number }) {
  return (
    <>
      <div className={clsx("border-y-2 py-4")}>
        <div
          className={clsx(
            "flex justify-between",
            "text-zinc-800 text-2xl",
            "font-semibold"
          )}
        >
          <span>Total</span>
          <span>R$ {price.toFixed(2)}</span>
        </div>
      </div>
      <div className="py-4">
        <button
          className={clsx(
            "w-full py-2 bg-green-600",
            "text-lg text-zinc-50",
            "rounded-sm hover:bg-green-700",
            "transition-colors cursor-pointer"
          )}
        >
          Finalizar Compra
        </button>
      </div>
    </>
  );
}
