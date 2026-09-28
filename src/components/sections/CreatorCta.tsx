import { LinkButton } from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Shape from "@/components/ui/Shape";
import styles from "./CreatorCta.module.css";

export default function CreatorCta() {
  return (
    <section aria-labelledby="cta-title" className={`${styles.cta} grid-backdrop relative overflow-hidden`}>
      <div className={styles.frame} aria-hidden>
        <Shape name="spring" tone="lime" parallax={40} className={styles.springTopLeft} />
        <Shape name="spring-alt" tone="white" parallax={30} className={styles.springSmall} />
        <Shape name="pyramid" tone="lime" parallax={40} className={styles.pyramid} />
        <Shape name="cylinder" tone="white" parallax={50} className={styles.cylinder} />
        <Shape name="cone" tone="white" parallax={30} className={styles.cone} />
        <Shape name="torus" tone="lime" parallax={40} className={styles.torus} />
        <Shape name="spring" tone="lime" parallax={30} className={styles.springBottomRight} />
      </div>

      <div className="container-page relative flex flex-col items-center py-20 text-center md:py-21.5">
        <SectionHeading
          id="cta-title"
          tone="light"
          title={
            <>
              Unlock Your Potential as a
              <br /> Creator with ByteSpace
            </>
          }
          description="Experience the collaboration of numerous creators and an expanding selection of courses. Register now and become a part of a community comprising over 10,000 local and international creators. Utilize our Course Editor, and showcase your expertise by publishing your finest course on the ByteSpace Course Library."
          className="gap-6 md:gap-10 [&_p]:max-w-240"
        />
        <div data-reveal className="mt-8 md:mt-10">
          <LinkButton href="/register">Join as Creator</LinkButton>
        </div>
      </div>
    </section>
  );
}
