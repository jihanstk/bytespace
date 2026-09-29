import type { Metadata } from "next";
import CreatorDirectory from "@/components/creator/CreatorDirectory";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CreatorCta from "@/components/sections/CreatorCta";
import Shape from "@/components/ui/Shape";
import { courses } from "@/lib/content";
import { creators } from "@/lib/creators";

export const metadata: Metadata = {
  title: "Creators",
  description: "Meet the designers, founders and educators who teach on ByteSpace.",
};

const compact = new Intl.NumberFormat("en", { notation: "compact" });

export default function CreatorsPage() {
  const stats = [
    { value: creators.length, label: "Creators" },
    { value: courses.length, label: "Courses" },
    { value: compact.format(creators.reduce((sum, creator) => sum + creator.students, 0)), label: "Students" },
  ];

  return (
    <>
      <Header />
      <main>
        <section aria-labelledby="creators-title" className="grid-backdrop relative overflow-hidden pt-32.5 pb-16 md:pt-43 md:pb-24">
          <div aria-hidden className="hidden lg:block">
            <Shape name="spring" tone="lime" intro parallax={-40} className="top-28 -left-14 size-64 -rotate-12" />
            <Shape name="torus" tone="white" intro parallax={-30} className="-right-10 bottom-4 size-60 rotate-35" />
          </div>

          <div className="container-page relative flex flex-col items-center text-center text-white">
            <span data-intro="1" className="inline-flex h-9 items-center rounded-full bg-lime-400 px-5 text-label-m font-medium text-neutral-950">
              Our Creators
            </span>
            <h1 id="creators-title" data-intro="1" className="mt-6 font-heading text-[clamp(2.25rem,3vw+1rem,3.5rem)] leading-[1.2] font-semibold">
              Learn From Creators
              <br className="hidden sm:block" /> Who Love to Teach
            </h1>
            <p data-intro="2" className="mt-5 max-w-160 text-body-m text-white/90 md:text-body-l">
              Designers, founders and educators sharing what they know best. Find a creator whose style fits you and
              explore every course they&rsquo;ve published.
            </p>
            <dl data-intro="3" className="mt-10 flex flex-wrap justify-center gap-3 md:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="inline-flex h-12 flex-row-reverse items-center gap-2 rounded-full bg-white px-5 text-label-m text-neutral-950">
                  <dt>{stat.label}</dt>
                  <dd className="font-medium text-primary-800">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <CreatorDirectory />
        <CreatorCta />
      </main>
      <Footer />
    </>
  );
}
