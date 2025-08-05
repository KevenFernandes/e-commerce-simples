import clsx from "clsx";

type ContainerInputTextProps = {
  label?: string;
} & React.ComponentProps<"input">;

export function ContainerInputText({
  label,
  ...props
}: ContainerInputTextProps) {
  return (
    <div className={clsx("flex flex-col gap-1")}>
      {!!label && <label htmlFor={props.id}>{label}</label>}
      <input
        {...props}
        className={clsx("bg-white rounded-sm px-2 py-1", props.className)}
      />
    </div>
  );
}
