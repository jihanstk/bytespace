import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CourseSidebar from "@/components/course/CourseSidebar";
import CourseTabs from "@/components/course/CourseTabs";
import ShareButton from "@/components/course/ShareButton";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { LevelIcon, PlayIcon, StarIcon, UsersIcon } from "@/components/ui/icons";
import { courses } from "@/lib/content";
import { getCourse } from "@/lib/course-details";
import { creatorHref, getCreator } from "@/lib/creators";

export function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const course = getCourse((await params).slug);
  if (!course) return {};
  return {
    title: course.detail.heading,
    description: course.detail.subtitle,
    openGraph: { images: [{ url: course.image }] },
  };
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const course = getCourse((await params).slug);
  if (!course) notFound();
  const { detail } = course;
  const creator = getCreator(course.creator)!;

  const stats = [
    { icon: LevelIcon, label: detail.level },
    { icon: StarIcon, label: `${detail.rating} (${detail.reviews} reviews)` },
    { icon: UsersIcon, label: `${detail.students} Students` },
  ];

  return (
    <>
      <Header />
      <main>
        {/* The blue band ends below the video; on desktop the sidebar hangs over into the white section. */}
        <section aria-labelledby="course-title" className="grid-backdrop relative z-10 pt-32.5 pb-12 md:pt-41.5 lg:pb-15.5">
          <div className="container-page">
            <div className="flex flex-col-reverse items-start gap-6 md:flex-row md:justify-between xl:-mr-21">
              <div data-intro="1">
                <h1 id="course-title" className="font-heading text-[clamp(1.75rem,1.5vw+1.25rem,2.25rem)] leading-[1.2] font-semibold text-white">
                  {detail.heading}
                </h1>
                <p className="mt-1 font-heading text-body-l font-semibold text-white md:text-heading-xs">{detail.subtitle}</p>
              </div>
              <div data-intro="1" className="md:mt-1">
                <ShareButton title={detail.heading} />
              </div>
            </div>

            <p data-intro="2" className="mt-5 text-body-l text-white">
              by{" "}
              <Link href={creatorHref(creator.slug)} className="text-lime-400 hover:underline">
                {creator.name}
              </Link>
            </p>
            <ul data-intro="2" className="mt-5 flex flex-wrap gap-3 md:gap-4">
              {stats.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex h-9.75 items-center gap-2 rounded-full bg-white px-5 text-body-m text-neutral-950">
                  <Icon className="size-5 text-primary-800" />
                  {label}
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-8 md:mt-15 lg:grid-cols-[1fr_25.6875rem] lg:gap-16">
              <div data-intro="3" className="relative aspect-[719/478] overflow-hidden rounded-card bg-neutral-100">
                <Image
                  src={detail.videoPoster}
                  alt={`${course.title} course preview`}
                  fill
                  preload
                  sizes="(min-width: 1280px) 725px, (min-width: 1024px) 60vw, 100vw"
                  className="object-cover"
                />
                <span aria-hidden className="absolute top-1/2 left-1/2 grid size-21 -translate-1/2 place-items-center rounded-3xl bg-neutral-950/35 backdrop-blur-md">
                  <span className="grid size-13 place-items-center rounded-full bg-white/90 text-primary-900">
                    <PlayIcon className="ml-0.5 size-6" />
                  </span>
                </span>
              </div>
              <div data-intro="3" className="lg:relative">
                <div className="lg:absolute lg:inset-x-0 lg:top-0">
                  <CourseSidebar detail={detail} creator={creator} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container-page pt-12 pb-16 md:pt-16">
          <div className="grid gap-16 lg:min-h-120 lg:grid-cols-[1fr_25.6875rem]">
            <CourseTabs detail={detail} />
          </div>
        </section>
      </main>
      <Footer bordered />
    </>
  );
}
