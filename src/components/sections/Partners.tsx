import Image from "next/image";
import { partners } from "@/lib/content";

export default function Partners() {
  return (
    <section aria-label="Trusted by" className="bg-neutral-50">
      <ul className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-8 py-14 md:justify-between md:py-20 xl:max-w-283">
        {partners.map((logo, index) => (
          <li key={logo.src} data-reveal>
            <Image
              src={logo.src}
              alt={`Partner logo ${index + 1}`}
              width={logo.width}
              height={logo.height}
              className="h-8 w-auto opacity-90 grayscale transition-opacity hover:opacity-100 md:h-10.25"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
