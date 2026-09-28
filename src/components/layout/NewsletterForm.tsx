"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export default function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
    event.currentTarget.reset();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 md:mt-10.5" aria-label="Newsletter">
      <div className="flex max-w-103 items-center gap-3 md:gap-5">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Enter your email"
          className="h-12.75 min-w-0 flex-1 rounded-full border border-neutral-200 bg-white px-5 text-body-m text-neutral-950 transition-[border-color,box-shadow] outline-none placeholder:text-neutral-600 focus:border-primary-800 focus:shadow-[0_0_0_4px_rgb(0_59_226/0.12)]"
        />
        <Button type="submit">Search</Button>
      </div>
      <p role="status" className="mt-3 min-h-5 text-body-s text-primary-800">
        {subscribed ? "Thanks! You're on the list." : ""}
      </p>
    </form>
  );
}
