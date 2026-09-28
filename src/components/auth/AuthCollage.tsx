import CourseCard from "@/components/ui/CourseCard";
import Shape from "@/components/ui/Shape";
import { HappyStudentsCard } from "@/components/ui/StatCards";
import { courses } from "@/lib/content";
import styles from "./AuthCollage.module.css";

export default function AuthCollage() {
  return (
    <div className={styles.stage} aria-hidden>
      <div className={styles.canvas}>
        <div className={`${styles.item} ${styles.backCard}`} data-intro="3" data-intro-kind="pop">
          <CourseCard course={courses[1]} interactive={false} sizes="341px" />
        </div>
        <div className={`${styles.item} ${styles.frontCard}`} data-intro="3" data-intro-kind="pop">
          <CourseCard course={courses[2]} interactive={false} darkBadge sizes="341px" />
        </div>
        <Shape name="torus" tone="lime" intro className={styles.torus} />
        <Shape name="spring-alt" tone="white" intro className={styles.spring} />
        <Shape name="pyramid" tone="lime" intro className={styles.pyramid} />
        <div className={`${styles.item} ${styles.students}`} data-intro="4" data-intro-kind="pop">
          <HappyStudentsCard tone="lime" />
        </div>
      </div>
    </div>
  );
}
