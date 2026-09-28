"use client";

import { useMemo, useRef, useState } from "react";
import CourseCard from "@/components/ui/CourseCard";
import { CategoryIcon, ChevronLeftIcon, ChevronRightIcon, FilterIcon, LevelIcon, SortIcon } from "@/components/ui/icons";
import PillSelect from "@/components/ui/PillSelect";
import { courseCategories, courseMeta, courses, FEATURED } from "@/lib/content";
import { getCourse, type CourseDetail } from "@/lib/course-details";
import { gsap, useGSAP, REDUCED_MOTION } from "@/lib/gsap";

const PAGE_SIZE = 9;

/** Quick filters shown as chips, as in the design; every category remains available in the Category menu. */
const quickCategories = [
  FEATURED,
  "Music",
  "Drawing & Painting",
  "Marketing",
  "Animation",
  "Social Media",
  "UI/UX Design",
  "Creative Marketing",
  "Cooking",
];

const levels = [
  { value: "", label: "All levels" },
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
];

const sorts = [
  { value: "relevant", label: "Most relevant" },
  { value: "popular", label: "Most popular" },
  { value: "rating", label: "Highest rated" },
  { value: "title", label: "Title A–Z" },
];

const categoryOptions = [
  { value: "", label: "All categories" },
  ...courseCategories.filter((category) => category !== FEATURED).map((category) => ({ value: category, label: category })),
];

const catalog = courses.map((course) => ({ ...course, detail: getCourse(course.slug)!.detail }));

export type SearchScope = "courses" | "creators";

type Filters = { level: string; category: string; sort: string };

const sorters: Record<string, (a: CourseDetail, b: CourseDetail) => number> = {
  popular: (a, b) => b.students - a.students,
  rating: (a, b) => Number(b.rating) - Number(a.rating) || b.reviews - a.reviews,
};

function filterCatalog(query: string, scope: SearchScope, { level, category, sort }: Filters) {
  const needle = query.trim().toLowerCase();
  const matches = catalog.filter((course) => {
    const haystack = scope === "creators" ? courseMeta.author : `${course.title} ${course.detail.heading} ${course.categories.join(" ")}`;
    return (
      (!needle || haystack.toLowerCase().includes(needle)) &&
      (!level || course.detail.level === level) &&
      (!category || course.categories.includes(category))
    );
  });

  if (sort === "title") return matches.sort((a, b) => a.title.localeCompare(b.title));
  return sorters[sort] ? matches.sort((a, b) => sorters[sort](a.detail, b.detail)) : matches;
}

type CourseBrowserProps = {
  label: string;
  query?: string;
  scope?: SearchScope;
  /** Whether the category chips start expanded; the Filter button toggles them. */
  chipsOpen?: boolean;
  paginate?: boolean;
  className?: string;
};

/** Filter bar, category chips and course grid shared by the search and creator pages. */
export default function CourseBrowser({
  label,
  query = "",
  scope = "courses",
  chipsOpen = true,
  paginate = true,
  className = "",
}: CourseBrowserProps) {
  const results = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<Filters>({ level: "", category: "", sort: "relevant" });
  const [showCategories, setShowCategories] = useState(chipsOpen);
  const [page, setPage] = useState(1);

  const matches = useMemo(() => filterCatalog(query, scope, filters), [query, scope, filters]);
  const pageSize = paginate ? PAGE_SIZE : matches.length;
  const pageCount = Math.max(1, Math.ceil(matches.length / Math.max(pageSize, 1)));
  const visible = matches.slice((page - 1) * pageSize, page * pageSize);

  const { contextSafe } = useGSAP({ scope: results });
  const animateResults = contextSafe(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    requestAnimationFrame(() =>
      gsap.fromTo(
        ":scope > ul > li, :scope > p",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.05, overwrite: true },
      ),
    );
  });

  const update = (patch: Partial<Filters>) => {
    setFilters((current) => ({ ...current, ...patch }));
    setPage(1);
    animateResults();
  };

  const activeChip = filters.category || FEATURED;
  const chipsId = `${label.toLowerCase().replace(/\W+/g, "-")}-categories`;

  return (
    <section aria-label={label} className={`container-page ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-3 md:gap-4">
          <button
            type="button"
            aria-expanded={showCategories}
            aria-controls={chipsId}
            onClick={() => setShowCategories((open) => !open)}
            className="inline-flex h-11.5 items-center gap-2 rounded-full border border-neutral-200 px-4 text-label-m font-medium text-neutral-950 transition-colors hover:border-neutral-950 aria-expanded:border-neutral-950"
          >
            <FilterIcon className="size-5" />
            Filter
          </button>
          <PillSelect
            label="Level"
            value={filters.level}
            options={levels}
            placeholder="Level"
            onChange={(level) => update({ level })}
            icon={<LevelIcon className="size-5" />}
          />
          <PillSelect
            label="Category"
            value={filters.category}
            options={categoryOptions}
            placeholder="Category"
            onChange={(category) => update({ category })}
            icon={<CategoryIcon className="size-5" />}
          />
        </div>
        <PillSelect
          label="Sort by"
          value={filters.sort}
          options={sorts}
          onChange={(sort) => update({ sort })}
          icon={<SortIcon className="size-5" />}
        />
      </div>

      <div
        id={chipsId}
        role="group"
        aria-label="Categories"
        hidden={!showCategories}
        className="-mx-(--page-gutter) mt-8 overflow-x-auto px-(--page-gutter) pb-2 [scrollbar-width:none] md:mt-8.5"
      >
        <div className="flex w-max gap-3 md:gap-4 xl:w-full xl:justify-between">
          {quickCategories.map((category) => (
            <button
              key={category}
              type="button"
              aria-pressed={activeChip === category}
              onClick={() => update({ category: category === FEATURED ? "" : category })}
              className="h-10.75 shrink-0 rounded-full bg-neutral-50 px-4 text-label-m font-medium whitespace-nowrap text-neutral-950 transition-colors hover:bg-neutral-100 aria-pressed:bg-lime-400"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div ref={results} aria-live="polite" className={showCategories ? "mt-12 md:mt-17.25" : "mt-8 md:mt-10"}>
        {visible.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {visible.map((course) => (
              <li key={course.slug} className="min-w-0">
                <CourseCard course={course} href={`/courses/${course.slug}`} level={course.detail.level} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-card bg-neutral-50 px-6 py-16 text-center text-body-l text-neutral-500">
            No courses match your search yet. Try another keyword or clear a filter.
          </p>
        )}
      </div>

      {paginate && (
        <nav aria-label="Pagination" className="mt-14 flex items-center justify-center gap-2 md:mt-18">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page === 1}
            onClick={() => setPage((current) => current - 1)}
            className="grid size-10 place-items-center rounded-full text-neutral-950 transition-colors hover:bg-neutral-50 disabled:text-neutral-300 disabled:hover:bg-transparent"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              aria-label={`Page ${number}`}
              aria-current={number === page ? "page" : undefined}
              onClick={() => setPage(number)}
              className="grid size-10 place-items-center rounded-full text-label-m font-medium text-neutral-950 transition-colors hover:bg-neutral-50 aria-[current=page]:bg-primary-800 aria-[current=page]:text-white"
            >
              {number}
            </button>
          ))}
          <button
            type="button"
            aria-label="Next page"
            disabled={page === pageCount}
            onClick={() => setPage((current) => current + 1)}
            className="grid size-10 place-items-center rounded-full text-neutral-950 transition-colors hover:bg-neutral-50 disabled:text-neutral-300 disabled:hover:bg-transparent"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </nav>
      )}
    </section>
  );
}
