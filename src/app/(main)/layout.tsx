import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

import clsx from "clsx";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className={clsx("bg-[#e0fbac]")}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
