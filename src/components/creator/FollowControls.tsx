"use client";

import { useState } from "react";

type FollowControlsProps = {
  products: number;
  followers: number;
};

export default function FollowControls({ products, followers }: FollowControlsProps) {
  const [following, setFollowing] = useState(false);
  const stats = [
    { value: products, label: "Products" },
    { value: followers + (following ? 1 : 0), label: "Followers" },
  ];

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 md:mt-10">
      <ul className="flex flex-wrap gap-3 md:gap-4">
        {stats.map((stat) => (
          <li key={stat.label} className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-5 text-label-m text-neutral-950">
            <span className="font-medium text-primary-800">{stat.value}</span>
            {stat.label}
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-pressed={following}
        onClick={() => setFollowing((value) => !value)}
        className="inline-flex h-12 items-center rounded-full bg-lime-400 px-6 text-label-l font-medium text-neutral-950 transition-[background-color,transform] duration-300 hover:-translate-y-0.5 hover:bg-lime-300 aria-pressed:bg-white"
      >
        {following ? "Following" : "Follow"}
      </button>
    </div>
  );
}
