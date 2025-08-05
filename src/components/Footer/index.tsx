import clsx from "clsx";
import { FacebookIcon, InstagramIcon, MailIcon } from "lucide-react";

export function Footer() {
  const svgClasses = clsx(
    "[&_svg]:w-5 [&_svg]:h-5",
    "[&_svg]:border-1 [&_svg]:rounded-sm",
    "hover:[&_svg]:bg-[#bbb749]",
    "hover:[&_svg]:text-[#1f1c0d]",
    "[&_svg]:transition-colors"
  );

  return (
    <footer className={clsx("w-full bg-[#1f1c0d] text-[#bbb749]")}>
      <div className={clsx("max-w-5xl m-auto px-4 py-4 text-sm")}>
        <div className={clsx("flex gap-5 pb-6")}>
          <div
            className={clsx("[&_a]:flex [&_a]:gap-1", "flex flex-col gap-2")}
          >
            <a href="#" className={svgClasses}>
              <FacebookIcon /> Facebook
            </a>
            <a href="#" className={svgClasses}>
              <InstagramIcon /> Instagram
            </a>
            <a href="#" className={svgClasses}>
              <MailIcon /> E-mail
            </a>
          </div>
          <div className={clsx("flex-1")}>
            <p className={clsx("text-xs")}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
              voluptatibus aliquid, enim molestias, corrupti excepturi
              voluptatem sunt dolorum asperiores quae cumque! Temporibus enim
              dolore aut expedita quo eum adipisci totam?
            </p>
          </div>
        </div>
        <p className={clsx("text-center")}>
          <span>Copyright &copy; {new Date().getFullYear()} - </span> Keven
          Fernandes
        </p>
      </div>
    </footer>
  );
}
