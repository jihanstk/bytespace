import Image from "next/image";
import CourseCard from "@/components/ui/CourseCard";
import { CheckCircleIcon } from "@/components/ui/icons";
import SectionHeading from "@/components/ui/SectionHeading";
import Shape from "@/components/ui/Shape";
import { HappyStudentsCard, ProgressCard } from "@/components/ui/StatCards";
import { courses, creatorBenefits, growthStats } from "@/lib/content";
import styles from "./Growth.module.css";

export default function Growth() {
  return (
    <section aria-label="Grow with ByteSpace" className={`${styles.section} overflow-hidden py-20 md:py-30`}>
      <div className="container-page flex flex-col gap-20 md:gap-27.5">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-16">
          <div>
            <SectionHeading
              align="left"
              title={
                <>
                  Your Path to Professional
                  <br className="hidden lg:block" /> Growth Starts Here!
                </>
              }
            />
            <p data-reveal className="mt-8 max-w-118.25 text-body-m text-neutral-600 md:mt-10 md:text-body-l">
              Explore our curated selection of courses tailored to enhance your capabilities and accelerate your career
              journey. Whether you are looking to sharpen specific skills, gain industry expertise, or embark on a new
              career path entirely, we have the resources you need.
            </p>
            <dl data-reveal className="mt-10 flex gap-10 md:mt-12 md:gap-12.5">
              {growthStats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse">
                  <dt className="mt-1 text-body-m text-neutral-600">{stat.label}</dt>
                  <dd className="text-[2.25rem] leading-[1.2] font-medium text-primary-800">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal className={`${styles.stage} mx-auto max-w-144 md:mr-0`}>
            <div className={`${styles.canvas} ${styles.pathCanvas}`} aria-hidden>
              <CourseCard course={courses[0]} interactive={false} sizes="341px" className={`${styles.place} ${styles.pathCard}`} />
              <Image
                src="/images/hero-student.webp"
                alt=""
                width={516}
                height={483}
                sizes="512px"
                className={`${styles.place} ${styles.pathStudent}`}
              />
              <div className={`${styles.place} ${styles.pathProgress}`}>
                <ProgressCard />
              </div>
              <Shape name="spring" tone="lime" parallax={-40} className={styles.pathSpring} />
            </div>
          </div>
        </div>

        <div id="creators" className="grid scroll-mt-28 items-center gap-12 md:grid-cols-2 md:gap-10">
          <div data-reveal className={`${styles.stage} order-last mx-auto max-w-145 md:order-first md:ml-0 xl:-ml-9.5`}>
            <div className={`${styles.canvas} ${styles.creatorCanvas}`} aria-hidden>
              <div className={`${styles.place} ${styles.metricCard} ${styles.revenue}`}>
                <p className={styles.metricLabel}>Total Revenue</p>
                <p className={styles.metricPeriod}>July 1-28</p>
                <p className={styles.metricValue}>$120.29</p>
                <div className={styles.metricTrack}>
                  <div className={styles.metricFill} />
                </div>
              </div>
              <div className={`${styles.place} ${styles.metricCard} ${styles.yearToDate}`}>
                <p className={styles.metricLabel}>Year to Date</p>
                <p className={styles.metricPeriod}>2023</p>
                <p className={styles.metricValue}>$1,200.38</p>
                <span className={styles.metricBadge}>+12$</span>
              </div>
              <Image
                src="/images/creator-woman.webp"
                alt=""
                width={500}
                height={500}
                sizes="560px"
                className={`${styles.place} ${styles.woman}`}
              />
              <Shape name="spring-alt" tone="lime" parallax={-40} className={styles.creatorSpring} />
              <div className={`${styles.place} ${styles.creatorStudents}`}>
                <HappyStudentsCard />
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              align="left"
              title={
                <>
                  Create &amp; Manage
                  <br className="hidden lg:block" /> Courses Easily.
                </>
              }
            />
            <p data-reveal className="mt-8 max-w-115 text-body-m text-neutral-600 md:mt-12 md:text-body-l">
              <strong className="font-medium text-neutral-950">ByteSpace</strong> supports individuals or entities in the
              creation, publication, and administration of educational courses.
            </p>
            <ul data-reveal className="mt-8 flex flex-col gap-4 md:mt-10">
              {creatorBenefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2.5 text-label-l font-medium text-neutral-950">
                  <CheckCircleIcon className="size-5.5 shrink-0 text-primary-800" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
