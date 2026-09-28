"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FacebookIcon, GoogleIcon } from "@/components/ui/icons";

export type AuthField = {
  name: string;
  label: string;
  type: "text" | "email" | "password";
  placeholder: string;
  autoComplete: string;
  minLength?: number;
};

type AuthFormProps = {
  fields: AuthField[];
  submitLabel: string;
  socialSignIn?: boolean;
  footer: { prompt: string; linkLabel: string; href: string };
};

export default function AuthForm({ fields, submitLabel, socialSignIn = false, footer }: AuthFormProps) {
  const id = useId();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col md:mt-11">
        <div className="flex flex-col gap-6">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label htmlFor={`${id}-${field.name}`} className="text-label-s font-medium text-neutral-950">
                {field.label}
              </label>
              <input
                id={`${id}-${field.name}`}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                minLength={field.minLength}
                required
                className="h-13 rounded-xl border border-neutral-200 px-5 text-body-m text-neutral-950 transition-[border-color,box-shadow] outline-none placeholder:text-neutral-400 focus:border-primary-800 focus:shadow-[0_0_0_4px_rgb(0_59_226/0.12)]"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between gap-4 md:mt-7">
          <p role="status" className="text-body-s text-primary-800">
            {submitted ? "Thanks! Account access is coming soon." : ""}
          </p>
          <Button type="submit">{submitLabel}</Button>
        </div>
      </form>

      {socialSignIn && (
        <div className="mt-12 md:mt-17">
          <div className="flex items-center gap-4 text-body-m text-neutral-400">
            <span className="h-px flex-1 bg-neutral-200" />
            or
            <span className="h-px flex-1 bg-neutral-200" />
          </div>
          <div className="mt-8 flex justify-center gap-4 md:mt-10">
            {[
              { label: "Continue with Facebook", Icon: FacebookIcon },
              { label: "Continue with Google", Icon: GoogleIcon },
            ].map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                aria-label={label}
                className="grid size-18 place-items-center rounded-2xl border border-neutral-200 text-neutral-950 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-neutral-950"
              >
                <Icon className="size-8" />
              </button>
            ))}
          </div>
        </div>
      )}

      <p className={`${socialSignIn ? "mt-14 md:mt-16" : "mt-16 md:mt-29"} text-center text-body-m text-neutral-600`}>
        {footer.prompt}{" "}
        <Link href={footer.href} className="text-primary-800 hover:underline">
          {footer.linkLabel}
        </Link>
      </p>
    </>
  );
}
