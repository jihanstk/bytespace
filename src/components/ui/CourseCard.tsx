import Image from "next/image";
import Link from "next/link";
import { LevelIcon, StarIcon } from "@/components/ui/icons";
import { courseMeta, type Course } from "@/lib/content";
import styles from "./CourseCard.module.css";

type CourseCardProps = {
  course: Pick<Course, "title" | "image">;
  /** Makes the whole card a link to this URL. */
  href?: string;
  level?: string;
  /** Hover lift and image zoom; disabled when the card is purely illustrative. */
  interactive?: boolean;
  /** Dark "more learners" badge, used where the card sits on a lime background. */
  darkBadge?: boolean;
  sizes?: string;
  className?: string;
};

export default function CourseCard({
  course,
  href,
  level = courseMeta.level,
  interactive = true,
  darkBadge = false,
  sizes = "(min-width: 1280px) 341px, (min-width: 768px) 45vw, 90vw",
  className = "",
}: CourseCardProps) {
  const { lessons, duration, comments, rating, author, price, learners, learnersMore } = courseMeta;

  return (
    <article
      className={`${styles.card} ${interactive ? styles.interactive : ""} ${darkBadge ? styles.dark : ""} ${className}`}
    >
      <div className={styles.media}>
        <Image src={course.image} alt="" fill sizes={sizes} className={styles.image} />
        <ul className={styles.pills} aria-label="Course details">
          {[lessons, duration, comments].map((item) => (
            <li key={item} className={styles.pill}>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.heading}>
        <h3 className={styles.title} title={course.title}>
          {href ? (
            <Link href={href} className={styles.link}>
              {course.title}
            </Link>
          ) : (
            course.title
          )}
        </h3>
        <p className={styles.rating} aria-label={`Rated ${rating} out of 5`}>
          {rating}
          <StarIcon className={styles.star} />
        </p>
      </div>
      <p className={styles.author}>
        by <span>{author}</span>
      </p>

      <div className={styles.details}>
        <span className={styles.level}>
          <LevelIcon className={styles.levelIcon} />
          {level}
        </span>
        <div className={styles.learners} aria-label={`${learnersMore} more learners enrolled`}>
          {learners.map((src) => (
            <Image key={src} src={src} alt="" width={40} height={40} className={styles.learner} />
          ))}
          <span className={styles.more}>{learnersMore}</span>
        </div>
      </div>

      <p className={styles.price}>
        <strong>{price}</strong>/lifetime
      </p>
    </article>
  );
}
