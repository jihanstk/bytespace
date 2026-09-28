import Link from "next/link";
import Logo from "@/components/layout/Logo";
import NewsletterForm from "@/components/layout/NewsletterForm";
import { footerColumns, legalLinks } from "@/lib/content";

export default function Footer() {
  return (
    <footer id="footer" className="bg-white pt-14 pb-10 md:pt-17.5 md:pb-11">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-[1fr_38.75rem] lg:gap-10">
          <div data-reveal>
            <Link href="/" aria-label="ByteSpace home" className="inline-block">
              <Logo variant="dark" />
            </Link>
            <p className="mt-4 text-body-s text-neutral-950">
              Stay Up to date with our latest features and releases by joining our newsletter.
            </p>
            <NewsletterForm />
            <p className="max-w-103 text-body-xs text-neutral-950">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>

          <nav data-reveal aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:gap-0 lg:pt-12">
            {footerColumns.map((column, index) => (
              <ul key={index} className="flex flex-col gap-4">
                {column.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-body-s text-neutral-950 transition-colors hover:text-primary-800">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ))}
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-neutral-200 pt-6 md:mt-17 md:flex-row md:items-center md:justify-between">
          <p className="text-body-xs text-neutral-950">@ 2023 ByteSpace. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href} className="text-body-xs text-neutral-950 transition-colors hover:text-primary-800">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
