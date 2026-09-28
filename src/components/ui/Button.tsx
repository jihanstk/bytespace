import Link from "next/link";
import type { ComponentProps } from "react";

const styles =
  "inline-flex h-11.25 shrink-0 items-center justify-center rounded-full bg-lime-400 px-6.5 font-sans text-label-m font-medium text-neutral-950 transition-[background-color,transform,box-shadow] duration-300 ease-out-expo hover:-translate-y-0.5 hover:bg-lime-300 hover:shadow-[0_10px_24px_-10px_rgb(212_251_32/0.9)] active:translate-y-0 disabled:pointer-events-none disabled:opacity-60";

type ButtonProps = ComponentProps<"button">;
type LinkButtonProps = ComponentProps<typeof Link>;

export function Button({ className = "", type = "button", ...props }: ButtonProps) {
  return <button type={type} className={`${styles} ${className}`} {...props} />;
}

export function LinkButton({ className = "", ...props }: LinkButtonProps) {
  return <Link className={`${styles} ${className}`} {...props} />;
}
