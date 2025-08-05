import { RegisterForm } from "@/components/RegisterForm";
import clsx from "clsx";

export default function RegisterPage() {
  return (
    <div
      className={clsx(
        "bg-[#1f1c0d] w-full h-screen",
        "flex justify-center items-center"
      )}
    >
      <RegisterForm />
    </div>
  );
}
