import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { testimonials } from "@/lib/content";
import styles from "./Testimonials.module.css";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className={`${styles.section} relative overflow-hidden py-18 md:pt-19 md:pb-15`}
    >
      <div className="container-page">
        <div className="grid items-center gap-6 md:grid-cols-[1fr_1.07fr] md:gap-10">
          <SectionHeading
            id="testimonials-title"
            align="left"
            title={
              <>
                Discover What Our
                <br /> Community Is Saying
              </>
            }
          />
          <p data-reveal className="text-body-m text-neutral-600 md:text-body-l">
            At ByteSpace, our vibrant community of learners and creators is at the heart of what we do. Hear directly
            from those who have experienced the transformative journey of learning and creating on our platform. Explore
            testimonials that reflect the diverse perspectives of enthusiastic learners and accomplished creators.
          </p>
        </div>

        <ul className="mt-12 grid items-start gap-6 md:mt-17.5 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {testimonials.map((item) => (
            <li key={item.name} data-reveal>
              <figure className="flex h-full flex-col rounded-card bg-white p-6 shadow-[0_24px_48px_-32px_rgb(8_20_80/0.25)] transition-transform duration-500 ease-out-expo hover:-translate-y-1.5">
                <Image src={item.avatar} alt="" width={80} height={80} className="size-20 rounded-full object-cover" />
                <figcaption className="mt-6">
                  <p className="font-heading text-heading-xs font-semibold text-neutral-950">{item.name}</p>
                  <p className="mt-1 text-body-l text-primary-800">{item.role}</p>
                </figcaption>
                <blockquote className="mt-5 text-body-l text-neutral-600">&quot;{item.quote}&quot;</blockquote>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
