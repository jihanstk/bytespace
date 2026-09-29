import Image from "next/image";
import Link from "next/link";
import { ChevronRightIcon, StarIcon } from "@/components/ui/icons";
import { coursesBy, creatorHref, type Creator } from "@/lib/creators";

const compact = new Intl.NumberFormat("en", { notation: "compact" });

export default function CreatorCard({ creator }: { creator: Creator }) {
  const courses = coursesBy(creator.slug);
  const stats = [
    { label: "Courses", value: courses.length },
    { label: "Students", value: compact.format(creator.students) },
    { label: "Rating", value: creator.rating, star: true },
  ];

  return (
    <article className="group relative flex h-full flex-col rounded-card border border-neutral-100 bg-white p-6 transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-neutral-200 hover:shadow-[0_24px_48px_-24px_rgb(8_20_80/0.28)]">
      <div className="flex items-start gap-4">
        <Image src={creator.photo} alt="" width={72} height={72} className="size-18 shrink-0 rounded-2xl object-cover" />
        <div className="min-w-0 flex-1">
          <span className="inline-flex h-6.5 items-center rounded-full bg-lime-400 px-3 text-label-xs font-medium text-neutral-950">
            {creator.expertise}
          </span>
          <h3 className="mt-2 font-heading text-heading-xs font-semibold text-neutral-950">
            <Link href={creatorHref(creator.slug)} className="after:absolute after:inset-0 after:rounded-card">
              {creator.name}
            </Link>
          </h3>
          <p className="mt-1 text-body-s text-neutral-600">{creator.headline}</p>
        </div>
      </div>

      <dl className="mt-6 grid grid-cols-3 divide-x divide-neutral-100 rounded-2xl bg-neutral-50 py-3 text-center">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse gap-1 px-2">
            <dt className="text-body-xs text-neutral-500">{stat.label}</dt>
            <dd className="inline-flex items-center justify-center gap-1 text-label-l font-medium text-neutral-950">
              {stat.value}
              {stat.star && <StarIcon className="size-4 text-lime-600" />}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-5 flex gap-2" aria-label={`Courses by ${creator.name}`}>
        {courses.slice(0, 3).map((course) => (
          <li key={course.slug} className="relative aspect-[4/3] w-1/3 overflow-hidden rounded-xl">
            <Image src={course.image} alt={course.title} fill sizes="120px" className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105" />
          </li>
        ))}
      </ul>

      <p className="mt-auto flex items-center gap-1 pt-6 text-label-m font-medium text-primary-800">
        View profile
        <ChevronRightIcon className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
      </p>
    </article>
  );
}
