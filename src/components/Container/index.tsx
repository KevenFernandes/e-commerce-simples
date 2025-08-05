import clsx from "clsx";

type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className={clsx("max-w-5xl m-auto px-6 mt-16")}>{children}</div>;
}
