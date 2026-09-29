"use client";

import { useState } from "react";
import { ShareIcon } from "@/components/ui/icons";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => undefined);
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={share}
      className="inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-lime-400 px-5 text-label-m font-medium text-neutral-950 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-lime-300"
    >
      <ShareIcon className="size-5" />
      <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}
