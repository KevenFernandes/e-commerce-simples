"use client";

import clsx from "clsx";
import {
  CircleArrowLeft,
  LogOutIcon,
  MenuIcon,
  ShoppingCartIcon,
  TruckIcon,
  UserRoundIcon,
} from "lucide-react";
import { DashLink } from "../DashLink";
import { useState } from "react";

import { logout } from "@/actions/login/logoutAction";
import Link from "next/link";

export function Sidebar() {
  const [showMenu, setShowMenu] = useState(false);

  async function getOut() {
    await logout();
  }

  return (
    <aside
      className={clsx(
        "fixed top-0 left-0 bg-red-200",
        "w-12 h-screen",
        showMenu && "w-54",
        "sm:w-54 transition-all"
      )}
    >
      <div
        className={clsx(
          "flex justify-center items-center pt-2 sm:hidden",
          showMenu && "justify-start",
          showMenu && "px-2"
        )}
      >
        <button
          className={clsx("[&_svg]:w-8 [&_svg]:h-8", "cursor-pointer")}
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <MenuIcon />
        </button>
      </div>
      <div className={clsx("sm:block", !showMenu && "hidden")}>
        <ul
          className={clsx(
            "flex flex-col gap-4",
            "px-2 mt-10 text-zinc-900",
            "font-bold text-lg tracking-wide",
            "[&_a]:flex [&_a]:gap-2 [&_a]:items-center",
            "[&_li]:text-nowrap"
          )}
        >
          <li>
            <DashLink href="/" name="Voltar" icon={<CircleArrowLeft />} />
          </li>
          <li>
            <DashLink
              href="/auth/dashboard/UserDashboard/perfil"
              name="Perfil"
              icon={<UserRoundIcon />}
            />
          </li>
          <li>
            <DashLink
              href="/auth/dashboard/UserDashboard/cart"
              name="Meu Carrinho"
              icon={<ShoppingCartIcon />}
            />
          </li>
          <li>
            <DashLink
              href="/auth/dashboard/UserDashboard/order"
              name="Meus Pedidos"
              icon={<TruckIcon />}
            />
          </li>
          <li>
            <Link
              href="#"
              className={clsx(
                "flex gap-2 items-center",
                "py-2 px-2 hover:bg-red-300",
                "rounded-lg transition-colors"
              )}
              onClick={() => getOut()}
            >
              <LogOutIcon />
              Sair
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
