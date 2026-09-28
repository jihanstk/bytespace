import Image from "next/image";
import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";
import { CertificateIcon, ConsultationIcon, ResourcesIcon, VideoIcon } from "@/components/ui/icons";
import { courseMeta } from "@/lib/content";
import { courseIncludes, creator, creatorHref, type CourseDetail } from "@/lib/course-details";

const includeIcons = {
  resources: ResourcesIcon,
  video: VideoIcon,
  certificate: CertificateIcon,
  consultation: ConsultationIcon,
};

const pitch = "Ready to Dive In? Enroll Now and Start Building Your Digital Future!";
const heading = "font-heading text-heading-xs font-semibold text-neutral-950";

export default function CourseSidebar({ detail }: { detail: CourseDetail }) {
  return (
    <aside
      aria-label="Enrollment"
      className="rounded-card border border-neutral-100 bg-white p-6 shadow-[0_32px_64px_-40px_rgb(8_20_80/0.35)] sm:p-10"
    >
      <h2 className={heading}>
        {detail.lessonCount} Lessons ({detail.hours} hours)
      </h2>
      <ol className="mt-4 flex flex-col gap-3">
        {detail.lessons.map((lesson, index) => (
          <li key={lesson.title} className="flex gap-3 text-body-m leading-[1.2] text-neutral-950">
            <span className="w-5 shrink-0">{String(index + 1).padStart(2, "0")}</span>
            <span className="flex-1 sm:max-w-45">{lesson.title}</span>
            <span className="ml-auto shrink-0 text-primary-800">{lesson.duration}</span>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-body-s text-neutral-600">{detail.moreVideos} more videos</p>

      <p className="mt-6 text-body-m text-neutral-600">{pitch}</p>
      <p className="mt-4 text-body-s text-neutral-600">
        <strong className="text-[2.25rem] leading-none font-bold text-primary-800">{courseMeta.price}</strong>/lifetime
      </p>
      <LinkButton href="/register" className="mt-4 w-full">
        Enroll Now
      </LinkButton>

      <h2 className={`${heading} mt-8`}>This course include</h2>
      <ul className="mt-4 flex flex-col gap-3.5">
        {courseIncludes.map(({ label, icon }) => {
          const Icon = includeIcons[icon];
          return (
            <li key={label} className="flex items-center gap-2.5 text-body-m leading-[1.2] text-neutral-600">
              <Icon className="size-5 shrink-0 text-primary-800" />
              {label}
            </li>
          );
        })}
      </ul>

      <hr className="my-8 border-neutral-200" />

      <div className="flex items-center gap-3">
        <Image src={creator.avatar} alt="" width={52} height={52} className="size-13 rounded-full object-cover" />
        <div>
          <p className="text-label-l font-medium text-neutral-950">{creator.name}</p>
          <p className="mt-1 text-body-m leading-[1.2] text-neutral-600">{creator.role}</p>
        </div>
      </div>
      <p className="mt-6 text-body-m text-neutral-600">{pitch}</p>
      <Link
        href={creatorHref}
        className="mt-4 inline-flex h-8.5 items-center rounded-full border border-neutral-200 px-4 text-body-s font-medium text-neutral-950 transition-colors hover:border-neutral-950"
      >
        See Full Profile
      </Link>
    </aside>
  );
}
