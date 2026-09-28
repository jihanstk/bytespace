import Image from "next/image";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { SearchIcon } from "@/components/ui/icons";
import Shape from "@/components/ui/Shape";
import { HappyStudentsCard, ProgressCard, TopicCard } from "@/components/ui/StatCards";
import styles from "./Hero.module.css";

const headingLines = ["Get Access to Hundreds", "Courses Available"];

export default function Hero() {
  return (
    <section className={`${styles.hero} grid-backdrop relative overflow-hidden`} aria-labelledby="hero-title">
      <Header />

      <div className={styles.frame} aria-hidden>
        <Shape name="spring" tone="lime" intro parallax={-50} className={styles.springLeft} />
        <Shape name="spring-alt" tone="white" intro parallax={-30} className={styles.springSmall} />
        <Shape name="cylinder" tone="lime" intro parallax={-60} className={styles.cylinder} />
        <Shape name="pyramid" tone="white" intro parallax={-35} className={styles.pyramid} />
      </div>

      <div className="container-page relative z-10 flex flex-col items-center pt-32.5 text-center text-white md:pt-40">
        <h1
          id="hero-title"
          className="font-heading text-[clamp(2.5rem,4.2vw+0.75rem,4.5rem)] leading-[1.2] font-semibold"
        >
          {headingLines.map((line) => (
            <span key={line} className="block overflow-hidden pb-1">
              <span data-intro="1" className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p data-intro="2" className="mt-6 max-w-205 text-body-m text-white/95 md:mt-10 md:text-body-l">
          Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.
        </p>

        <form
          role="search"
          action="/"
          data-intro="3"
          className="mt-10 flex w-full max-w-145 items-center gap-3 md:mt-15 md:gap-4"
        >
          <label className="group flex h-12.75 min-w-0 flex-1 items-center gap-3 rounded-full bg-white px-5 transition-shadow focus-within:shadow-[0_0_0_4px_rgb(212_251_32/0.5)]">
            <SearchIcon className="size-5 shrink-0 text-neutral-500" />
            <span className="sr-only">Search courses</span>
            <input
              type="search"
              name="q"
              placeholder="Course, topic, creator"
              className="h-full min-w-0 flex-1 bg-transparent text-body-l text-neutral-950 outline-none placeholder:text-neutral-400"
            />
          </label>
          <Button type="submit" className="px-5 md:px-6.5">
            Search
          </Button>
        </form>
      </div>

      <div className={styles.visual}>
        <div className={styles.circle} data-intro="4" data-intro-kind="scale" />
        <Image
          src="/images/hero-student.webp"
          alt="Smiling student with headphones holding a laptop"
          width={516}
          height={483}
          preload
          sizes="(min-width: 1440px) 520px, 40vw"
          data-intro="5"
          className={styles.student}
        />
        <Shape name="torus" tone="white" intro parallax={-40} className={styles.torus} />
        <Shape name="spring" tone="white" intro parallax={-40} className={styles.springRight} />
        <div className={styles.topic} data-intro="6" data-intro-kind="pop">
          <TopicCard />
        </div>
        <div className={styles.progress} data-intro="6" data-intro-kind="pop">
          <ProgressCard />
        </div>
        <div className={styles.students} data-intro="6" data-intro-kind="pop">
          <HappyStudentsCard />
        </div>
      </div>
    </section>
  );
}
