"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import CourseBrowser, { type SearchScope } from "@/components/search/CourseBrowser";
import { SearchIcon } from "@/components/ui/icons";
import PillSelect from "@/components/ui/PillSelect";

const scopes = [
  { value: "courses", label: "Courses" },
  { value: "creators", label: "Creators" },
];

export default function SearchResults({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const [draft, setDraft] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [scope, setScope] = useState<SearchScope>("courses");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuery(draft);
    router.replace(draft.trim() ? `/search?q=${encodeURIComponent(draft.trim())}` : "/search", { scroll: false });
  };

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
              <span className="sr-only">Search {scope}</span>
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
              value={scope}
              options={scopes}
              onChange={(value) => setScope(value as SearchScope)}
              variant="lime"
              className="md:px-6.5"
            />
          </form>
        </div>
      </section>

      {/* Re-keyed per search so filters and pagination start fresh for each query. */}
      <CourseBrowser key={`${scope}:${query}`} label="Search results" query={query} scope={scope} className="pt-12 pb-16 md:pt-18 md:pb-20" />
    </>
  );
}
