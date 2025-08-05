import clsx from "clsx";
import Link from "next/link";

type DashLink = {
  href: string;
  name: string;
  icon: React.ReactNode;
};

export function DashLink({ href, name, icon }: DashLink) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex gap-2 items-center ",
        "py-2 px-2 hover:bg-red-300",
        "rounded-lg transition-colors"
      )}
    >
      {icon}
      {name}
    </Link>
  );
}
