import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import FollowControls from "@/components/creator/FollowControls";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import CourseBrowser from "@/components/search/CourseBrowser";
import { courses } from "@/lib/content";
import { creator } from "@/lib/course-details";

export function generateStaticParams() {
  return [{ slug: creator.slug }];
}

export const metadata: Metadata = {
  title: creator.name,
  description: `${creator.name} — ${creator.headline}. Browse their courses on ByteSpace.`,
};

export default async function CreatorPage({ params }: PageProps<"/creators/[slug]">) {
  if ((await params).slug !== creator.slug) notFound();

  return (
    <>
      <Header />
      <main>
        <section aria-labelledby="creator-name" className="grid-backdrop pt-32.5 pb-14 md:pt-43 md:pb-20">
          <div className="container-page text-white">
            <div data-intro="1" className="flex items-center gap-4 md:gap-6">
              <Image
                src={creator.profilePhoto}
                alt=""
                width={96}
                height={96}
                preload
                className="size-18 shrink-0 rounded-2xl object-cover md:size-24"
              />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 id="creator-name" className="font-heading text-[clamp(1.5rem,1.5vw+1rem,2.25rem)] leading-[1.2] font-semibold">
                    {creator.name}
                  </h1>
                  <span className="inline-flex h-9 items-center rounded-full bg-lime-400 px-5 text-label-m font-medium text-neutral-950">
                    Creator
                  </span>
                </div>
                <p className="mt-1 text-body-m text-white/90 md:text-body-l">{creator.headline}</p>
              </div>
            </div>

            <div data-intro="2" className="mt-8 text-body-m text-white/90 md:mt-10 md:text-body-l">
              {creator.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <div data-intro="3">
              <FollowControls products={courses.length} followers={creator.followers} />
            </div>
          </div>
        </section>

        <CourseBrowser label={`Courses by ${creator.name}`} chipsOpen={false} paginate={false} className="pt-12 pb-16 md:pt-16" />
      </main>
      <Footer bordered />
    </>
  );
}
