import Image from "next/image";
import CourseExplorer from "@/components/sections/CourseExplorer";
import SectionHeading from "@/components/ui/SectionHeading";
import { learningPaths } from "@/lib/content";

export default function Courses() {
  return (
    <section id="courses" aria-labelledby="courses-title" className="scroll-mt-20 bg-white pt-16 pb-20 md:pt-18 md:pb-30">
      <div className="container-page">
        <SectionHeading
          id="courses-title"
          title={
            <>
              Discover Your Passion,
              <br /> Build Your Skills
            </>
          }
          description="At Bytespace Courses, we bring you closer to life-changing knowledge. Explore a variety of courses across different fields, from technology to the arts, and make a difference in your career and life."
        />

        <CourseExplorer />

        <div id="categories" className="mt-20 scroll-mt-28 md:mt-18">
          <SectionHeading
            title="Explore Diverse Learning Paths at Bytespace"
            description="At Bytespace, we believe in empowering individuals through knowledge. Our diverse range of courses spans various fields, ensuring there's something for everyone. Unleash your potential and explore our carefully curated categories."
          />

          <ul className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:mt-17 md:gap-6 lg:grid-cols-6 xl:gap-10">
            {learningPaths.map((path) => (
              <li key={path.label} data-reveal>
                <a
                  href="#courses"
                  className="group flex aspect-square flex-col items-center justify-center gap-4 rounded-card border border-neutral-200 bg-white transition-[border-color,box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-lime-400 hover:shadow-[0_24px_40px_-24px_rgb(8_20_80/0.3)]"
                >
                  <span className="grid size-15 place-items-center rounded-full bg-lime-400 transition-transform duration-500 ease-out-expo group-hover:scale-110">
                    <Image src={path.icon} alt="" width={36} height={36} className="size-9" />
                  </span>
                  <span className="text-label-l font-medium text-neutral-950">{path.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
