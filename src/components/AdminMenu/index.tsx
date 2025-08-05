"use client";

import { logout } from "@/actions/login/logoutAction";
import clsx from "clsx";
import {
  LogOutIcon,
  SquarePenIcon,
  SquarePlusIcon,
  SquareUserRoundIcon,
} from "lucide-react";
import Link from "next/link";

export function AdminMenu() {
  async function getOut() {
    await logout();
  }

  const linkClasses = clsx(
    "hover:bg-zinc-700 hover:text-zinc-50",
    "p-2 rounded-sm transition-colors flex"
  );
  return (
    <div
      className={clsx(
        "fixed top-0 left-[50%] sm:left-5",
        "bg-zinc-700/60 rounded-b-sm",
        "py-3 px-4 backdrop-blur-xs -translate-x-[50%] sm:translate-0"
      )}
    >
      <ul className={clsx("flex gap-4")}>
        <li>
          <Link
            href="/auth/dashboard/AdminDashboard/create"
            className={linkClasses}
          >
            <SquarePlusIcon />
          </Link>
        </li>
        <li>
          <Link
            href="/auth/dashboard/AdminDashboard/update"
            className={linkClasses}
          >
            <SquarePenIcon />
          </Link>
        </li>
        <li>
          <Link
            href="/auth/dashboard/AdminDashboard/users"
            className={linkClasses}
          >
            <SquareUserRoundIcon />
          </Link>
        </li>
        <li>
          <Link href="#" onClick={() => getOut()} className={linkClasses}>
            <LogOutIcon />
          </Link>
        </li>
      </ul>
    </div>
  );
}
