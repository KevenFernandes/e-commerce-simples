import clsx from "clsx";
import { WrenchIcon } from "lucide-react";

export default function OrderPage() {
  return (
    <div
      className={clsx("h-screen w-full flex", "items-center justify-center")}
    >
      <div className="text-center bg-white ml-6 max-w-150 p-6 rounded-md">
        <div className="flex justify-center items-center mb-6 gap-4">
          <h1 className="text-4xl font-bold">Página em criação</h1>
          <span className="[&_svg]:w-8 [&_svg]:h-8">
            <WrenchIcon />
          </span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero in iusto
          impedit fuga aperiam accusamus, voluptatum atque ab sit laboriosam?
        </p>
      </div>
    </div>
  );
}
