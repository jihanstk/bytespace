import { VideoIcon } from "@/components/ui/icons";
import type { CourseDetail } from "@/lib/course-details";

const heading = "font-heading text-heading-xs font-semibold text-neutral-950";
const PROGRESS = 55;

export default function CourseLessons({ detail }: { detail: CourseDetail }) {
  const modules =
    detail.modules ??
    detail.lessons.map((lesson, index) => ({
      title: `Module ${index + 1}: ${lesson.title}`,
      description: `A ${lesson.duration} video lesson with notes, resources and a short quiz.`,
    }));

  return (
    <>
      <h2 className={heading}>Explore the Modules</h2>
      <p className="mt-4 text-body-m text-neutral-600">
        Immerse yourself in the course content as we break down each module into comprehensive lessons, providing
        practical insights and hands-on experiences.
      </p>

      <h2 className={`${heading} mt-8`}>Lesson List</h2>
      <ol className="mt-5 flex flex-col gap-5">
        {modules.map((module) => (
          <li key={module.title} className="flex items-start gap-4">
            <span className="grid size-13 shrink-0 place-items-center rounded-2xl bg-lime-400 text-neutral-950">
              <VideoIcon className="size-6" />
            </span>
            <div>
              <h3 className="text-label-m font-medium text-neutral-950">{module.title}</h3>
              <p className="mt-1 text-body-m text-neutral-600">{module.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <h2 className={`${heading} mt-8`}>Lesson Content</h2>
      <p className="mt-4 text-body-m text-neutral-600">
        Engage with each lesson through captivating video content, detailed textual explanations, and interactive
        elements. Download resources, complete assignments, and test your understanding with quizzes.
      </p>

      <h2 className={`${heading} mt-8`}>Lesson Progress Tracking</h2>
      <p className="mt-4 text-body-m text-neutral-600">
        Witness your growth as you complete lessons, with an intuitive progress tracking feature guiding you through
        your learning journey.
      </p>
      <div className="mt-5 rounded-2xl border border-neutral-100 p-4 shadow-[0_12px_32px_-20px_rgb(8_20_80/0.25)]">
        <p className="text-body-s leading-[1.2] text-neutral-950">Learning Progress</p>
        <p className="mt-2 text-[2rem] leading-[1.1] font-bold text-neutral-950">{PROGRESS}%</p>
        <div
          className="mt-2.5 h-2 overflow-hidden rounded-full bg-neutral-50"
          role="progressbar"
          aria-label="Learning progress"
          aria-valuenow={PROGRESS}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full rounded-full bg-lime-400" style={{ width: `${PROGRESS}%` }} />
        </div>
      </div>
    </>
  );
}
