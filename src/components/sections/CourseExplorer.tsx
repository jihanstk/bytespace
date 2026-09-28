"use client";

import { useRef, useState } from "react";
import CourseCard from "@/components/ui/CourseCard";
import { courseCategoryRows, courses, FEATURED } from "@/lib/content";
import { gsap, useGSAP, REDUCED_MOTION } from "@/lib/gsap";

export default function CourseExplorer() {
  const [active, setActive] = useState(FEATURED);
  const grid = useRef<HTMLDivElement>(null);
  const visible = active === FEATURED ? courses : courses.filter((course) => course.categories.includes(active));

  const { contextSafe } = useGSAP({ scope: grid });
  const selectCategory = contextSafe((category: string) => {
    setActive(category);
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    // Runs after React commits the filtered list.
    requestAnimationFrame(() =>
      gsap.fromTo(
        ":scope > ul > li, :scope > p",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, overwrite: true },
      ),
    );
  });

  return (
    <>
      <div
        role="group"
        aria-label="Filter courses by category"
        className="-mx-(--page-gutter) mt-10 flex flex-col gap-y-3 overflow-x-auto px-(--page-gutter) pb-2 md:mx-0 md:mt-10.5 md:gap-y-5.25 md:overflow-visible md:px-0 md:pb-0"
      >
        {courseCategoryRows.map((row, rowIndex) => (
          <div key={rowIndex} data-reveal className="flex w-max gap-3 md:w-auto md:flex-wrap md:justify-center md:gap-4">
            {row.map((category) => (
              <button
                key={category}
                type="button"
                aria-pressed={active === category}
                onClick={() => selectCategory(category)}
                className="h-10.75 shrink-0 rounded-full bg-neutral-50 px-4 text-label-m font-medium whitespace-nowrap text-neutral-950 transition-colors duration-300 hover:bg-neutral-100 aria-pressed:bg-lime-400"
              >
                {category}
              </button>
            ))}
            {rowIndex === courseCategoryRows.length - 1 && (
              <a href="#categories" className="flex h-10.75 shrink-0 items-center px-1 text-label-m font-medium text-primary-800 hover:underline">
                + More
              </a>
            )}
          </div>
        ))}
      </div>

      <div ref={grid} data-reveal aria-live="polite" className="mt-12 md:mt-19.25">
        {visible.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {visible.map((course) => (
              <li key={course.title} className="min-w-0">
                <CourseCard course={course} href={`/courses/${course.slug}`} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-card bg-neutral-50 px-6 py-16 text-center text-body-l text-neutral-500">
            New {active} courses are coming soon.
          </p>
        )}
      </div>
    </>
  );
}
