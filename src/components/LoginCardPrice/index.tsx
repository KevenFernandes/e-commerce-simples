import clsx from "clsx";

export function LoginCardPrice({ price }: { price: number }) {
  return (
    <div
      className={clsx(
        "border-t mt-4",
        "lg:bg-white lg:p-4 lg:border-t-0",
        "lg:mt-0 lg:rounded-md "
      )}
    >
      <h2
        className={clsx(
          "hidden lg:block text-center text-zinc-600",
          "border-b-1 pb-4 text-lg"
        )}
      >
        Resumo do Pedido
      </h2>
      <div className="py-4 text-zinc-600">
        <div>
          <span>Subtotal: {price.toFixed(2)}</span>
        </div>
        <div>
          <span>Desconto: 0</span>
        </div>
        <div>
          <span>Frete: 0</span>
        </div>
      </div>
      <div
        className={clsx(
          "border-t pt-4 flex justify-between items-center",
          "lg:gap-4"
        )}
      >
        <div className="font-semibold text-xl text-nowrap">
          <span>Total: {price.toFixed(2)}</span>
        </div>
        <div>
          <button
            className={clsx(
              "bg-green-600 py-2 px-3 rounded-sm",
              "cursor-pointer hover:bg-green-700"
            )}
          >
            Finalizar
          </button>
        </div>
      </div>
    </div>
  );
}
