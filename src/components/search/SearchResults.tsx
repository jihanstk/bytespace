"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState, type FormEvent } from "react";
import CourseCard from "@/components/ui/CourseCard";
import { CategoryIcon, ChevronLeftIcon, ChevronRightIcon, FilterIcon, LevelIcon, SearchIcon, SortIcon } from "@/components/ui/icons";
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

const scopes = [
  { value: "courses", label: "Courses" },
  { value: "creators", label: "Creators" },
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

type Filters = { query: string; scope: string; level: string; category: string; sort: string };

function filterCatalog({ query, scope, level, category, sort }: Filters) {
  const needle = query.trim().toLowerCase();
  const matches = catalog.filter((course) => {
    const haystack = scope === "creators" ? courseMeta.author : `${course.title} ${course.detail.heading} ${course.categories.join(" ")}`;
    return (
      (!needle || haystack.toLowerCase().includes(needle)) &&
      (!level || course.detail.level === level) &&
      (!category || course.categories.includes(category))
    );
  });

  const by: Record<string, (a: CourseDetail, b: CourseDetail) => number> = {
    popular: (a, b) => b.students - a.students,
    rating: (a, b) => Number(b.rating) - Number(a.rating) || b.reviews - a.reviews,
  };
  if (sort === "title") return matches.sort((a, b) => a.title.localeCompare(b.title));
  return by[sort] ? matches.sort((a, b) => by[sort](a.detail, b.detail)) : matches;
}

export default function SearchResults({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const results = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState(initialQuery);
  const [filters, setFilters] = useState<Filters>({ query: initialQuery, scope: "courses", level: "", category: "", sort: "relevant" });
  const [showCategories, setShowCategories] = useState(true);
  const [page, setPage] = useState(1);

  const matches = useMemo(() => filterCatalog(filters), [filters]);
  const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  const visible = matches.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    update({ query: draft });
    router.replace(draft.trim() ? `/search?q=${encodeURIComponent(draft.trim())}` : "/search", { scroll: false });
  };

  const activeChip = filters.category || FEATURED;

  return (
    <>
      <section aria-labelledby="search-title" className="grid-backdrop pt-32.5 pb-14 md:pt-40.5 md:pb-17.5">
        <div className="container-page flex flex-col items-center text-center">
          <h1 id="search-title" data-intro="1" className="font-heading text-[clamp(1.75rem,1.5vw+1.25rem,2.25rem)] leading-[1.2] font-semibold text-white">
            Find Your Next Course
          </h1>
          <form role="search" onSubmit={handleSearch} data-intro="2" className="mt-8 flex w-full max-w-156 items-center gap-3 md:mt-7 md:gap-4">
            <label className="flex h-12.75 min-w-0 flex-1 items-center gap-3 rounded-full bg-white px-5 transition-shadow focus-within:shadow-[0_0_0_4px_rgb(212_251_32/0.5)]">
              <SearchIcon className="size-5 shrink-0 text-neutral-500" />
              <span className="sr-only">Search {filters.scope}</span>
              <input
                type="search"
                name="q"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Search"
                className="h-full min-w-0 flex-1 bg-transparent text-body-l text-neutral-950 outline-none placeholder:text-neutral-400"
              />
            </label>
            <PillSelect
              label="Search in"
              value={filters.scope}
              options={scopes}
              onChange={(scope) => update({ scope })}
              variant="lime"
              className="md:px-6.5"
            />
          </form>
        </div>
      </section>

      <section aria-label="Search results" className="container-page pt-12 pb-16 md:pt-18 md:pb-20">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-3 md:gap-4">
            <button
              type="button"
              aria-expanded={showCategories}
              aria-controls="category-chips"
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
          id="category-chips"
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

        <div ref={results} aria-live="polite" className="mt-12 md:mt-17.25">
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
      </section>
    </>
  );
}
