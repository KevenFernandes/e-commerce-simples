"use client";

import { LoginForm } from "@/components/LoginForm";
import clsx from "clsx";
import { CircleArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div
      className={clsx(
        "bg-[#1f1c0d] w-full h-screen relative",
        "flex justify-center items-center"
      )}
    >
      <Link
        href="/"
        className={clsx(
          "absolute top-8 left-8",
          "[&_svg]:w-10 [&_svg]:h-10",
          "text-[#e0fbac]"
        )}
      >
        <CircleArrowLeft />
      </Link>
      <LoginForm />
    </div>
  );
}
