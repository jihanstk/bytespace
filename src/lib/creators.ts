import { courses } from "@/lib/content";

export type Creator = {
  slug: string;
  name: string;
  /** Short role used in compact places such as the course sidebar. */
  role: string;
  headline: string;
  expertise: string;
  photo: string;
  followers: number;
  students: number;
  rating: string;
  bio: string[];
};

export const creators: Creator[] = [
  {
    slug: "purepearl-studio",
    name: "PurePearl Studio",
    role: "Professional Creator",
    headline: "Passionate UI/UX, Web designer",
    expertise: "Design",
    photo: "/images/creator-profile.webp",
    followers: 12,
    students: 755,
    rating: "4.7",
    bio: [
      "Welcome to the creative world of PurePearl Studio. Here, you'll discover the passion, expertise, and inspiration that drive my creative journey. Let's explore and learn together!",
      "Dive into my creative portfolio, showcasing a glimpse of my artistic endeavors. From digital designs to multimedia projects, each piece tells a unique story. Explore the world of creativity with me.",
    ],
  },
  {
    slug: "wade-warren",
    name: "Wade Warren",
    role: "Startup Mentor",
    headline: "Founder, product strategist and startup mentor",
    expertise: "Business",
    photo: "/images/creator-wade-warren.webp",
    followers: 48,
    students: 298,
    rating: "4.6",
    bio: [
      "I've helped launch three products from a napkin sketch to paying customers, and I love sharing what worked—and what didn't.",
      "My courses focus on practical validation, lean launches and the habits that keep young companies moving.",
    ],
  },
  {
    slug: "kristin-watson",
    name: "Kristin Watson",
    role: "Finance Educator",
    headline: "Finance educator for freelancers and creators",
    expertise: "Finance",
    photo: "/images/creator-kristin-watson.webp",
    followers: 36,
    students: 256,
    rating: "4.5",
    bio: [
      "After a decade in accounting I now teach creative people how to budget, price their work and plan for irregular income.",
      "Expect clear frameworks, ready-to-use templates and zero jargon.",
    ],
  },
  {
    slug: "jacob-jones",
    name: "Jacob Jones",
    role: "Productivity Coach",
    headline: "Productivity coach focused on sustainable focus",
    expertise: "Productivity",
    photo: "/images/creator-jacob-jones.webp",
    followers: 29,
    students: 187,
    rating: "4.5",
    bio: [
      "I help busy professionals do deep, meaningful work without sacrificing their wellbeing.",
      "My lessons blend planning systems with the habits that protect your energy week after week.",
    ],
  },
];

export const creatorHref = (slug: string) => `/creators/${slug}`;

export const getCreator = (slug: string) => creators.find((creator) => creator.slug === slug);

export const coursesBy = (slug: string) => courses.filter((course) => course.creator === slug);
