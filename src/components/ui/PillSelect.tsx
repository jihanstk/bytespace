import type { ReactNode } from "react";
import { ChevronDownIcon } from "@/components/ui/icons";

type Option = { value: string; label: string };

type PillSelectProps = {
  label: string;
  value: string;
  options: Option[];
  onChange: (value: string) => void;
  icon?: ReactNode;
  /** Text shown while the first ("any") option is selected; defaults to that option's label. */
  placeholder?: string;
  variant?: "outline" | "lime";
  className?: string;
};

/** A native select presented as a pill, so keyboard and screen-reader behaviour come for free. */
export default function PillSelect({
  label,
  value,
  options,
  onChange,
  icon,
  placeholder,
  variant = "outline",
  className = "",
}: PillSelectProps) {
  const selected = options.find((option) => option.value === value) ?? options[0];
  const text = selected === options[0] && placeholder ? placeholder : selected.label;

  return (
    <label
      className={`relative inline-flex shrink-0 items-center gap-2 rounded-full text-label-m font-medium whitespace-nowrap text-neutral-950 transition-colors focus-within:ring-2 focus-within:ring-primary-800 ${
        variant === "lime"
          ? "h-11.25 bg-lime-400 px-5 hover:bg-lime-300"
          : "h-11.5 border border-neutral-200 bg-white px-4 hover:border-neutral-950"
      } ${className}`}
    >
      {icon}
      <span>{text}</span>
      {variant === "lime" && <ChevronDownIcon className="size-4.5" />}
      <select
        aria-label={label}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="absolute inset-0 cursor-pointer appearance-none opacity-0"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
