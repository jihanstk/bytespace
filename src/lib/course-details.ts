import { courses, type Course } from "@/lib/content";

export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Lesson = { title: string; duration: string };

export type CourseDetail = {
  heading: string;
  subtitle: string;
  level: Level;
  rating: string;
  reviews: number;
  students: number;
  lessonCount: number;
  /** Remaining videos beyond the preview list. */
  moreVideos: number;
  hours: number;
  videoPoster: string;
  lessons: Lesson[];
  description: string[];
  sneakPeek: string[];
  keyPoints: string[];
};

const sneakPeek = [
  "/images/sneak-peek-1.webp",
  "/images/sneak-peek-2.webp",
  "/images/sneak-peek-3.webp",
  "/images/sneak-peek-4.webp",
];

const details: Record<string, CourseDetail> = {
  "build-digital-asset": {
    heading: "Build Digital Asset: A Comprehensive Guide",
    subtitle: "Unlock the Power of Digital Creation with Expert Guidance",
    level: "Intermediate",
    rating: "4.8",
    reviews: 172,
    students: 199,
    lessonCount: 112,
    moreVideos: 99,
    hours: 24,
    videoPoster: "/images/course-video-poster.webp",
    lessons: [
      { title: "Introduction to Digital Assets", duration: "12 mins" },
      { title: "Design Principles for Impacts", duration: "21 mins" },
      { title: "Advanced Techniques in Digital Creation", duration: "16 mins" },
    ],
    description: [
      "Embark on an enlightening exploration into the world of digital creation with our comprehensive course, \"Build Digital Assets: A Comprehensive Guide.\" This transformative learning experience invites you to delve deep into the intricacies of crafting impactful digital content. From laying the groundwork with foundational concepts to mastering advanced techniques, this guide is meticulously curated to empower you with the skills essential for navigating the dynamic landscape of digital asset creation.",
      "In the initial modules, you'll establish a solid foundation by immersing yourself in the foundational concepts that form the backbone of digital asset creation. Understand the fundamental elements that constitute compelling digital content and gain proficiency in leveraging these elements to communicate effectively in the digital realm.",
      "As you progress through the course, you'll ascend to higher levels of expertise, delving into the nuances of design principles that drive impactful creations. Uncover the secrets behind effective visual communication, exploring color theory, typography, and layout strategies that elevate your digital assets to new heights. Engage in hands-on exercises that reinforce your understanding, allowing you to apply these principles in practical scenarios.",
    ],
    sneakPeek,
    keyPoints: [
      "Foundational Concepts",
      "Design Principles Mastery",
      "Advanced Techniques in Digital Creation",
      "Project Showcase and Critique",
      "Optimizing for Various Platforms",
      "Digital Asset Management Best Practices",
      "Monetization Strategies",
      "Capstone Project: Building Your Portfolio",
    ],
  },
  "learn-figma-from-basic": {
    heading: "Learn Figma from Basic: Design Your First Interface",
    subtitle: "Go from a blank canvas to a polished, shareable prototype",
    level: "Beginner",
    rating: "4.5",
    reviews: 128,
    students: 342,
    lessonCount: 17,
    moreVideos: 14,
    hours: 2,
    videoPoster: "/images/course-figma.webp",
    lessons: [
      { title: "Getting Around the Figma Workspace", duration: "9 mins" },
      { title: "Frames, Shapes and Auto Layout", duration: "18 mins" },
      { title: "Components and Variants", duration: "14 mins" },
    ],
    description: [
      "This course introduces Figma from the very first click. You'll learn how the workspace is organised, how to build layouts with frames and auto layout, and how to keep designs consistent with styles and components.",
      "By the end you'll have designed and prototyped a small mobile app screen by screen, and you'll know how to share it with teammates and hand it off to developers.",
    ],
    sneakPeek,
    keyPoints: [
      "Figma Workspace Essentials",
      "Auto Layout and Constraints",
      "Components, Variants and Styles",
      "Interactive Prototyping",
      "Developer Handoff",
    ],
  },
  "the-power-of-big-data": {
    heading: "The Power of Big Data: From Raw Numbers to Decisions",
    subtitle: "Learn how teams collect, process and act on data at scale",
    level: "Intermediate",
    rating: "4.5",
    reviews: 96,
    students: 214,
    lessonCount: 17,
    moreVideos: 14,
    hours: 2,
    videoPoster: "/images/course-big-data.webp",
    lessons: [
      { title: "What Makes Data “Big”", duration: "11 mins" },
      { title: "Pipelines and Storage", duration: "17 mins" },
      { title: "Dashboards that Drive Action", duration: "15 mins" },
    ],
    description: [
      "Big data is only valuable when it leads to better decisions. This course walks through how large datasets are gathered, cleaned, stored and analysed, using practical examples from product and marketing teams.",
      "You'll finish by designing a dashboard that turns raw metrics into a clear story your team can act on.",
    ],
    sneakPeek,
    keyPoints: [
      "Data Collection Strategies",
      "Pipelines and Warehousing",
      "Exploratory Analysis",
      "Visualisation and Dashboards",
      "Data Ethics and Privacy",
    ],
  },
  "balancing-productivity-and-wellbeing": {
    heading: "Balancing Productivity and Wellbeing",
    subtitle: "Do focused work without burning out",
    level: "Beginner",
    rating: "4.5",
    reviews: 84,
    students: 187,
    lessonCount: 17,
    moreVideos: 14,
    hours: 2,
    videoPoster: "/images/course-productivity.webp",
    lessons: [
      { title: "Understanding Your Energy", duration: "10 mins" },
      { title: "Planning a Sustainable Week", duration: "14 mins" },
      { title: "Deep Work Without Burnout", duration: "13 mins" },
    ],
    description: [
      "Productivity isn't about doing more—it's about doing what matters while protecting your energy. This course blends proven planning techniques with habits that support rest and focus.",
      "You'll build a weekly system that fits your workload and leaves room for recovery.",
    ],
    sneakPeek,
    keyPoints: [
      "Energy and Attention Management",
      "Weekly Planning Systems",
      "Focus Techniques",
      "Healthy Boundaries",
      "Building Lasting Habits",
    ],
  },
  "mastering-money-management": {
    heading: "Mastering Money Management for Creators",
    subtitle: "Budget, price and plan with confidence",
    level: "Beginner",
    rating: "4.5",
    reviews: 101,
    students: 256,
    lessonCount: 17,
    moreVideos: 14,
    hours: 2,
    videoPoster: "/images/course-money.webp",
    lessons: [
      { title: "Understanding Cash Flow", duration: "12 mins" },
      { title: "Pricing Your Work", duration: "16 mins" },
      { title: "Saving and Investing Basics", duration: "15 mins" },
    ],
    description: [
      "Whether you freelance or run a small studio, managing money well gives you the freedom to focus on your craft. This course covers budgeting, pricing, invoicing and planning for irregular income.",
      "Practical templates help you apply each lesson to your own finances straight away.",
    ],
    sneakPeek,
    keyPoints: [
      "Budgeting for Irregular Income",
      "Pricing and Invoicing",
      "Taxes for Freelancers",
      "Emergency Funds",
      "Long-term Planning",
    ],
  },
  "from-idea-to-startup-success": {
    heading: "From Idea to Startup Success",
    subtitle: "Validate, launch and grow your first product",
    level: "Advanced",
    rating: "4.5",
    reviews: 143,
    students: 298,
    lessonCount: 17,
    moreVideos: 14,
    hours: 2,
    videoPoster: "/images/course-startup.webp",
    lessons: [
      { title: "Finding a Problem Worth Solving", duration: "13 mins" },
      { title: "Validating with Real Customers", duration: "18 mins" },
      { title: "Launching Your First Version", duration: "17 mins" },
    ],
    description: [
      "Great startups begin with a real problem. This course guides you from an early idea through customer research, a lean first version and a focused launch.",
      "Along the way you'll learn how to measure traction, prioritise features and tell your story to early users and investors.",
    ],
    sneakPeek,
    keyPoints: [
      "Problem Discovery",
      "Customer Validation",
      "Building an MVP",
      "Go-to-market Planning",
      "Measuring Traction",
    ],
  },
};

export function getCourse(slug: string): (Course & { detail: CourseDetail }) | undefined {
  const course = courses.find((item) => item.slug === slug);
  return course && { ...course, detail: details[course.slug] };
}

export const courseIncludes = [
  { label: "Learning Resources", icon: "resources" },
  { label: "Quality Lesson Videos", icon: "video" },
  { label: "Certificate of Completion", icon: "certificate" },
  { label: "Private Consultation", icon: "consultation" },
] as const;


export type Review = {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  postedAgo: string;
  quote: string;
};

/** Star breakdown from the design, highest rating first. */
export const ratingSummary = {
  average: "4.7",
  counts: [720, 120, 21, 12, 16],
};

export const courseReviews: Review[] = [
  {
    name: "PurePearl Studio",
    role: "UI/UX Designer",
    avatar: "/images/creator-purepearl.webp",
    rating: 5,
    postedAgo: "a year ago",
    quote:
      "The course provided me with a comprehensive understanding of digital asset creation. The lessons were in-depth, practical, and immediately applicable to my work. Highly recommended!",
  },
  {
    name: "Albert Flores",
    role: "UI/UX Designer",
    avatar: "/images/avatar-8.webp",
    rating: 5,
    postedAgo: "a year ago",
    quote:
      "This course transformed my approach to digital design. The combination of theory, hands-on exercises, and real-world applications made it a truly enriching experience. Excited to implement what I've learned!",
  },
  {
    name: "Cody Fisher",
    role: "UI/UX Designer",
    avatar: "/images/avatar-7.webp",
    rating: 5,
    postedAgo: "a year ago",
    quote:
      "The project showcase and critique module created a collaborative environment where I could showcase my work, receive valuable feedback, and refine my skills. It added a unique and valuable dimension to the learning process.",
  },
  {
    name: "Brooklyn Simmons",
    role: "UI/UX Designer",
    avatar: "/images/avatar-6.webp",
    rating: 5,
    postedAgo: "a year ago",
    quote:
      "The lessons on optimizing digital assets for various platforms were particularly insightful. The course adapts to the evolving digital landscape, and the engaging content kept me motivated throughout.",
  },
];
