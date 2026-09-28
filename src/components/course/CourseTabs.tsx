"use client";

import Image from "next/image";
import { useId, useState, type KeyboardEvent } from "react";
import CourseReviews from "@/components/course/CourseReviews";
import { CheckCircleIcon } from "@/components/ui/icons";
import type { CourseDetail } from "@/lib/course-details";

const tabs = ["About", "Lesson", "Reviews"] as const;
type Tab = (typeof tabs)[number];

const heading = "font-heading text-heading-xs font-semibold text-neutral-950";

export default function CourseTabs({ detail }: { detail: CourseDetail }) {
  const id = useId();
  const [active, setActive] = useState<Tab>("About");

  // Arrow keys move between tabs, per the WAI-ARIA tabs pattern.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    const next = tabs[(tabs.indexOf(active) + step + tabs.length) % tabs.length];
    setActive(next);
    document.getElementById(`${id}-tab-${next}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Course information" onKeyDown={onKeyDown} className="flex gap-3 md:gap-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            id={`${id}-tab-${tab}`}
            type="button"
            role="tab"
            aria-selected={active === tab}
            aria-controls={`${id}-panel`}
            tabIndex={active === tab ? 0 : -1}
            onClick={() => setActive(tab)}
            className="h-10.75 rounded-full bg-neutral-50 px-4 text-label-m font-medium text-neutral-950 transition-colors hover:bg-neutral-100 aria-selected:bg-lime-400"
          >
            {tab}
          </button>
        ))}
      </div>

      <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${active}`} className="mt-10 md:mt-12">
        {active === "About" && (
          <>
            <h2 className={heading}>Description</h2>
            <div className="mt-5 flex flex-col gap-6 text-body-m text-neutral-600">
              {detail.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <h2 className={`${heading} mt-8`}>Sneak Peak</h2>
            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-4.75">
              {detail.sneakPeek.map((src, index) => (
                <li key={src} className="relative aspect-[167/125] overflow-hidden rounded-xl">
                  <Image src={src} alt={`Course preview ${index + 1}`} fill sizes="(min-width: 640px) 167px, 45vw" className="object-cover" />
                </li>
              ))}
            </ul>

            <h2 className={`${heading} mt-8`}>Key Points</h2>
            <ul className="mt-5 flex flex-col gap-3.5">
              {detail.keyPoints.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-body-m text-neutral-600">
                  <CheckCircleIcon className="size-5.5 shrink-0 text-primary-800" />
                  {point}
                </li>
              ))}
            </ul>
          </>
        )}

        {active === "Lesson" && (
          <>
            <h2 className={heading}>
              {detail.lessonCount} Lessons ({detail.hours} hours)
            </h2>
            <ol className="mt-5 divide-y divide-neutral-100 rounded-card border border-neutral-100">
              {detail.lessons.map((lesson, index) => (
                <li key={lesson.title} className="flex items-center gap-4 px-5 py-4 text-body-m">
                  <span className="text-neutral-500">{String(index + 1).padStart(2, "0")}</span>
                  <span className="flex-1 text-neutral-950">{lesson.title}</span>
                  <span className="text-primary-800">{lesson.duration}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-body-s text-neutral-500">
              {detail.moreVideos} more videos unlock when you enroll.
            </p>
          </>
        )}

        {active === "Reviews" && <CourseReviews courseTitle={detail.heading} />}
      </div>
    </div>
  );
}
