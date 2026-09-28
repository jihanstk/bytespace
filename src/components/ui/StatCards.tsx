import Image from "next/image";
import { StarIcon } from "@/components/ui/icons";
import { happyStudents } from "@/lib/content";
import styles from "./StatCards.module.css";

type CardProps = { className?: string };

export function TopicCard({ className = "" }: CardProps) {
  return (
    <div className={`${styles.card} ${styles.topic} ${className}`}>
      <p className={styles.title}>UI/UX Design</p>
      <p className={styles.meta}>
        200 Courses <span className={styles.dot} /> 1000+ Students
      </p>
    </div>
  );
}

export function ProgressCard({ className = "", value = 55 }: CardProps & { value?: number }) {
  return (
    <div className={`${styles.card} ${styles.progress} ${className}`}>
      <p className={styles.progressLabel}>Learning Progress</p>
      <p className={styles.progressValue}>{value}%</p>
      <div
        className={styles.track}
        role="progressbar"
        aria-label="Learning progress"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div className={styles.fill} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export function HappyStudentsCard({ className = "", tone = "white" }: CardProps & { tone?: "white" | "lime" }) {
  return (
    <div className={`${styles.card} ${styles.students} ${tone === "lime" ? styles.lime : ""} ${className}`}>
      <p className={styles.title}>Happy Students</p>
      <p className={styles.rating}>
        4.5 <span className={styles.muted}>(240)</span>
        <StarIcon className={styles.star} />
      </p>
      <div className={styles.avatars}>
        {happyStudents.map((src) => (
          <Image key={src} src={src} alt="" width={48} height={48} className={styles.avatar} />
        ))}
        <span className={styles.more}>2K+</span>
      </div>
    </div>
  );
}
