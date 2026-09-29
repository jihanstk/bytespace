"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import CreatorCard from "@/components/creator/CreatorCard";
import { ChevronRightIcon, SearchIcon } from "@/components/ui/icons";
import { creators } from "@/lib/creators";
import { gsap, useGSAP, REDUCED_MOTION } from "@/lib/gsap";

const ALL = "All";
const expertiseFilters = [ALL, ...new Set(creators.map((creator) => creator.expertise))];

export default function CreatorDirectory() {
  const grid = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [expertise, setExpertise] = useState(ALL);

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return creators.filter(
      (creator) =>
        (expertise === ALL || creator.expertise === expertise) &&
        (!needle || `${creator.name} ${creator.headline} ${creator.expertise}`.toLowerCase().includes(needle)),
    );
  }, [query, expertise]);

  const { contextSafe } = useGSAP({ scope: grid });
  const animate = contextSafe(() => {
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    requestAnimationFrame(() =>
      gsap.fromTo(":scope > li", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out", stagger: 0.06, overwrite: true }),
    );
  });

  const selectExpertise = (value: string) => {
    setExpertise(value);
    animate();
  };

  return (
    <section aria-label="Creator directory" className="container-page pt-12 pb-20 md:pt-18 md:pb-30">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex h-12.75 w-full items-center gap-3 rounded-full border border-neutral-200 px-5 transition-[border-color,box-shadow] focus-within:border-primary-800 focus-within:shadow-[0_0_0_4px_rgb(0_59_226/0.12)] lg:max-w-100">
          <SearchIcon className="size-5 shrink-0 text-neutral-500" />
          <span className="sr-only">Search creators</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search creators or skills"
            className="h-full min-w-0 flex-1 bg-transparent text-body-m text-neutral-950 outline-none placeholder:text-neutral-400"
          />
        </label>
        <div role="group" aria-label="Filter by expertise" className="-mx-(--page-gutter) overflow-x-auto px-(--page-gutter) [scrollbar-width:none] lg:mx-0 lg:px-0">
          <div className="flex w-max gap-3">
            {expertiseFilters.map((value) => (
              <button
                key={value}
                type="button"
                aria-pressed={expertise === value}
                onClick={() => selectExpertise(value)}
                className="h-10.75 shrink-0 rounded-full bg-neutral-50 px-4 text-label-m font-medium text-neutral-950 transition-colors hover:bg-neutral-100 aria-pressed:bg-lime-400"
              >
                {value}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p aria-live="polite" className="mt-8 text-body-m text-neutral-500 md:mt-10">
        Showing {visible.length} of {creators.length} creators
      </p>

      <ul ref={grid} className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
        {visible.map((creator) => (
          <li key={creator.slug} className="min-w-0">
            <CreatorCard creator={creator} />
          </li>
        ))}
        <li className="min-w-0">
          <Link
            href="/register"
            className="group flex h-full min-h-80 flex-col justify-between rounded-card bg-lime-400 p-6 transition-transform duration-500 ease-out-expo hover:-translate-y-1.5"
          >
            <span className="grid-backdrop grid size-14 place-items-center rounded-2xl text-2xl text-lime-400" aria-hidden>
              +
            </span>
            <span>
              <span className="block font-heading text-heading-xs font-semibold text-neutral-950">Become a Creator</span>
              <span className="mt-2 block text-body-m text-neutral-800">
                Share your expertise with thousands of learners and earn from every enrollment.
              </span>
              <span className="mt-6 inline-flex items-center gap-1 text-label-m font-medium text-neutral-950">
                Start teaching
                <ChevronRightIcon className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
