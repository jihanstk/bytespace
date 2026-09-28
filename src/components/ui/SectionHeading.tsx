import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({
  id,
  title,
  description,
  align = "center",
  tone = "dark",
  className = "",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={`flex flex-col gap-4 ${centered ? "items-center text-center" : ""} ${className}`}>
      <h2
        id={id}
        data-reveal
        className={`font-heading text-[clamp(2rem,2vw+1.25rem,2.75rem)] leading-[1.2] font-semibold ${
          tone === "light" ? "text-white" : "text-neutral-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          data-reveal
          className={`text-body-m md:text-body-l ${tone === "light" ? "text-white/90" : "text-neutral-400"} ${
            centered ? "max-w-230" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
