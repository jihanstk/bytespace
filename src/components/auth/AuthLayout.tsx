import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import AuthCollage from "@/components/auth/AuthCollage";

type AuthLayoutProps = {
  title: string;
  description: string;
  eyebrow: string;
  heading: ReactNode;
  children: ReactNode;
};

export default function AuthLayout({ title, description, eyebrow, heading, children }: AuthLayoutProps) {
  return (
    <main className="grid-backdrop min-h-svh overflow-hidden pt-8.75 pb-12 lg:pb-30">
      <div className="container-page">
        <Link href="/" aria-label="Back to ByteSpace home" className="inline-block" data-intro="0" data-intro-kind="fade">
          <Image src="/logos/bytespace-mark.svg" alt="" width={29} height={32} preload />
        </Link>

        <div className="mt-8 grid items-start gap-10 lg:mt-13.25 lg:grid-cols-[1fr_36.125rem] lg:gap-15">
          <div className="text-white">
            <h1 data-intro="1" className="font-heading text-heading-xs font-semibold">
              {title}
            </h1>
            <p data-intro="2" className="mt-4 max-w-118 text-body-m text-white/90 md:text-body-l lg:min-h-21.75">
              {description}
            </p>
            <div className="mt-14.5 hidden lg:block">
              <AuthCollage />
            </div>
          </div>

          <section
            aria-labelledby="auth-heading"
            data-intro="2"
            className="rounded-card bg-white px-6 py-10 shadow-[0_40px_80px_-40px_rgb(0_10_60/0.6)] sm:px-10 md:px-16 md:pt-14.5 md:pb-12"
          >
            <p className="text-body-m text-primary-800">{eyebrow}</p>
            <h2 id="auth-heading" className="mt-1 font-heading text-[clamp(2rem,2vw+1.25rem,2.75rem)] leading-[1.2] font-semibold text-neutral-950">
              {heading}
            </h2>
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}
