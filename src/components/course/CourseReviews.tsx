"use client";

import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@/components/ui/icons";
import { courseReviews, ratingSummary } from "@/lib/course-details";

const heading = "font-heading text-heading-xs font-semibold text-neutral-950";

function Stars({ count = 5, className = "" }: { count?: number; className?: string }) {
  return (
    <span className={`flex gap-1 text-neutral-950 ${className}`} aria-hidden>
      {Array.from({ length: count }, (_, index) => (
        <StarIcon key={index} className="size-4.5" />
      ))}
    </span>
  );
}

export default function CourseReviews({ courseTitle }: { courseTitle: string }) {
  const [rating, setRating] = useState<number | null>(null);
  const max = Math.max(...ratingSummary.counts);
  const visible = rating ? courseReviews.filter((review) => review.rating === rating) : courseReviews;
  const filters = [null, 5, 4, 3, 2, 1];

  return (
    <>
      <h2 className={heading}>What Learners Are Saying</h2>
      <p className="mt-4 text-body-m text-neutral-600">
        Discover what our learners have to say about their experience with &lsquo;{courseTitle}.&rsquo; Read reviews and
        ratings from individuals who have embarked on the transformative journey of mastering digital asset creation.
      </p>

      <div className="mt-6 flex flex-col gap-6 rounded-card border border-neutral-100 p-5 sm:flex-row sm:items-center sm:gap-8 md:p-6">
        <div className="grid size-32 shrink-0 place-items-center content-center rounded-xl bg-lime-400 text-neutral-950">
          <span className="text-body-s">Ratings</span>
          <span className="font-heading text-[2.5rem] leading-none font-semibold">{ratingSummary.average}</span>
        </div>
        <ul className="flex flex-1 flex-col gap-2.5" aria-label="Rating breakdown">
          {ratingSummary.counts.map((count, index) => {
            const stars = 5 - index;
            return (
              <li key={stars} className="flex items-center gap-4 text-body-s text-neutral-600">
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-50">
                  <span className="block h-full rounded-full bg-lime-400" style={{ width: `${(count / max) * 100}%` }} />
                </span>
                <Stars count={5} className="shrink-0" />
                <span className="w-8 text-right">
                  <span className="sr-only">{stars} star: </span>
                  {count}
                </span>
              </li>
            );
          })}
        </ul>
      </div>

      <h2 className={`${heading} mt-10`}>Individual Reviews:</h2>
      <div role="group" aria-label="Filter reviews by rating" className="mt-4 flex flex-wrap gap-3">
        {filters.map((value) => (
          <button
            key={value ?? "all"}
            type="button"
            aria-pressed={rating === value}
            onClick={() => setRating(value)}
            className="inline-flex h-9.5 items-center gap-1.5 rounded-full bg-neutral-50 px-4 text-label-s font-medium text-neutral-950 transition-colors hover:bg-neutral-100 aria-pressed:bg-lime-400"
          >
            {value === null ? (
              "All rating"
            ) : (
              <>
                <StarIcon className="size-4" aria-hidden />
                <span className="sr-only">Rated </span>
                {value}
              </>
            )}
          </button>
        ))}
      </div>

      <ul className="mt-6 flex flex-col gap-6">
        {visible.map((review) => (
          <li key={review.name} className="rounded-card border border-neutral-100 p-5 md:p-6">
            <div className="flex items-start gap-3">
              <Image src={review.avatar} alt="" width={48} height={48} className="size-10 rounded-full object-cover" />
              <div className="flex-1">
                <p className="text-label-m font-medium text-neutral-950">{review.name}</p>
                <p className="mt-0.5 text-body-s leading-[1.2] text-neutral-600">{review.role}</p>
              </div>
              <p className="text-body-s text-neutral-600">{review.postedAgo}</p>
            </div>
            <Stars count={review.rating} className="mt-4" />
            <span className="sr-only">Rated {review.rating} out of 5</span>
            <p className="mt-4 text-body-m text-neutral-600">&ldquo;{review.quote}&rdquo;</p>
          </li>
        ))}
        {visible.length === 0 && (
          <li className="rounded-card bg-neutral-50 px-6 py-12 text-center text-body-m text-neutral-500">
            No {rating}-star reviews yet.
          </li>
        )}
      </ul>
    </>
  );
}
