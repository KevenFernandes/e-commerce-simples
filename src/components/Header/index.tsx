"use client";

import clsx from "clsx";
import { BarrelIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart } from "../ShoppingCart";

export function Header() {
  const buttonClasses = clsx(
    "bg-[#bbb749] px-4 py-1 rounded-sm",
    "hover:bg-[#dfd91c] transition-colors"
  );

  const [showCart, setShowCart] = useState(false);

  return (
    <header
      className={clsx("w-full bg-[#1f1c0d] text-[#bbb749] fixed top-0 z-30")}
    >
      <div
        className={clsx(
          "flex justify-between",
          "max-w-5xl m-auto",
          "py-4 px-4 items-center"
        )}
      >
        <div>
          <Link
            href="/"
            className={clsx(
              "flex gap-1 items-center",
              " text-xl font-bold tracking-widest",
              "hover:text-[#dfd91c] transition-colors"
            )}
          >
            <BarrelIcon /> <span>Buypop</span>
          </Link>
        </div>
        <div
          className={clsx(
            "flex gap-4 items-center",
            "text-[#1f1c0d] font-semibold"
          )}
        >
          <Link href="/auth/login" className={buttonClasses}>
            Login
          </Link>
          <Link
            href=""
            className={buttonClasses}
            onClick={() => setShowCart((prev) => !prev)}
          >
            Carrinho
          </Link>
        </div>
      </div>
      {showCart && <ShoppingCart variant="catalog" />}
    </header>
  );
}
