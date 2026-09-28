"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/layout/Logo";
import { BagIcon, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { mainNav } from "@/lib/content";

const SCROLLED_OFFSET = 24;

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLLED_OFFSET);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      data-intro="0"
      data-intro-kind="fade"
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ease-out-expo ${
        solid ? "bg-primary-800/95 py-3.5 shadow-[0_8px_30px_-12px_rgb(0_20_90/0.6)] backdrop-blur-md" : "py-8.75"
      }`}
    >
      <div className="container-page flex items-center justify-between">
        <Link href="/" aria-label="ByteSpace home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Main" className="absolute left-1/2 hidden -translate-x-1/2 md:block">
          <ul className="flex items-center gap-6">
            {mainNav.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  aria-current={isCurrent(link.href, pathname) ? "page" : undefined}
                  className="group relative text-body-m text-white/90 transition-colors hover:text-white aria-[current=page]:font-medium aria-[current=page]:text-white"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-lime-400 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5">
          <Link href="/login" className="hidden text-body-m text-white/90 transition-colors hover:text-lime-400 md:inline">
            Sign In
          </Link>
          <Link href="/register" className="hidden text-body-m text-white/90 transition-colors hover:text-lime-400 md:inline">
            Join Us
          </Link>
          <button
            type="button"
            aria-label="Cart"
            className="grid size-8 place-items-center text-white transition-transform hover:-translate-y-0.5"
          >
            <BagIcon className="size-5.5" />
          </button>
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
            className="grid size-10 place-items-center rounded-full text-white md:hidden"
          >
            {menuOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!menuOpen}
        className="container-page pt-4 pb-6 md:hidden"
      >
        <ul className="flex flex-col gap-1 border-t border-white/15 pt-4">
          {[...mainNav, { label: "Sign In", href: "/login" }, { label: "Join Us", href: "/register" }].map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block rounded-xl px-3 py-3 text-label-l text-white transition-colors hover:bg-white/10"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

function isCurrent(href: string, pathname: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href) || (href === "/search" && pathname.startsWith("/courses"));
}
