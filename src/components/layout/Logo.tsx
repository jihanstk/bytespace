import Image from "next/image";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export default function Logo({ variant = "light", className = "" }: LogoProps) {
  return (
    <Image
      src={variant === "light" ? "/logos/bytespace.svg" : "/logos/bytespace-dark.svg"}
      alt="ByteSpace"
      width={171}
      height={37}
      preload={variant === "light"}
      className={`h-auto w-35 md:w-42.75 ${className}`}
    />
  );
}
