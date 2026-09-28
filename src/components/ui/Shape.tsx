import Image from "next/image";

export type ShapeName = "spring" | "spring-alt" | "torus" | "pyramid" | "cone" | "cylinder";

type ShapeProps = {
  name: ShapeName;
  tone: "lime" | "white";
  className?: string;
  /** Scroll-linked drift in px (see MotionController). */
  parallax?: number;
  /** Include in the page-load intro sequence. */
  intro?: boolean;
};

/** Decorative 3D ornament; position and size come from the parent's CSS. */
export default function Shape({ name, tone, className = "", parallax, intro = false }: ShapeProps) {
  return (
    <div aria-hidden className={`pointer-events-none absolute ${className}`}>
      <div data-parallax={parallax} className="size-full">
        <Image
          src={`/images/shape-${name}-${tone}.webp`}
          alt=""
          width={640}
          height={640}
          sizes="320px"
          data-intro={intro ? 7 : undefined}
          data-intro-kind={intro ? "scale" : undefined}
          className="size-full object-contain"
        />
      </div>
    </div>
  );
}
