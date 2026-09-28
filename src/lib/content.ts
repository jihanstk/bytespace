export type NavLink = { label: string; href: string };

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Courses", href: "/#courses" },
  { label: "Creators", href: "/#creators" },
];

export const partners = [
  { src: "/logos/partner-1.svg", width: 167, height: 41 },
  { src: "/logos/partner-2.svg", width: 168, height: 41 },
  { src: "/logos/partner-3.svg", width: 170, height: 41 },
  { src: "/logos/partner-4.svg", width: 170, height: 41 },
  { src: "/logos/partner-5.svg", width: 169, height: 42 },
];

export const FEATURED = "Featured";

/** Split into rows to match the centred three-line layout of the design on wide screens. */
export const courseCategoryRows: string[][] = [
  [FEATURED, "Music", "Drawing & Painting", "Marketing", "Animation", "Social Media", "UI/UX Design", "Creative Marketing"],
  ["Digital Illustration", "Film & Video", "Crafts", "Freelance & Entrepreneurship", "Graphic Design", "Photography"],
  ["Productivity", "Web Development", "Data Science", "Cooking"],
];

export type Course = {
  title: string;
  image: string;
  categories: string[];
};

export const courses: Course[] = [
  { title: "Learn Figma from Basic", image: "/images/course-figma.webp", categories: ["UI/UX Design", "Graphic Design"] },
  { title: "Build Digital Asset", image: "/images/course-digital-asset.webp", categories: ["Digital Illustration", "Graphic Design", "Freelance & Entrepreneurship"] },
  { title: "the Power of Big Data", image: "/images/course-big-data.webp", categories: ["Data Science", "Web Development"] },
  { title: "Balancing Productivity and Wellbeing", image: "/images/course-productivity.webp", categories: ["Productivity"] },
  { title: "Mastering Money Management", image: "/images/course-money.webp", categories: ["Freelance & Entrepreneurship", "Marketing"] },
  { title: "From Idea to Startup Success", image: "/images/course-startup.webp", categories: ["Freelance & Entrepreneurship", "Marketing", "Social Media", "Creative Marketing"] },
];

export const courseMeta = {
  lessons: "17 Lessons",
  duration: "2 hours 16 mins",
  comments: "59 Comments",
  rating: "4.5",
  author: "purepearl studio",
  level: "Beginner",
  price: "$25",
  learners: ["/images/avatar-2.webp", "/images/avatar-6.webp", "/images/avatar-4.webp", "/images/avatar-3.webp"],
  learnersMore: "26+",
};

export const happyStudents = [
  "/images/avatar-3.webp",
  "/images/avatar-2.webp",
  "/images/avatar-6.webp",
  "/images/avatar-7.webp",
  "/images/avatar-1.webp",
  "/images/avatar-9.webp",
  "/images/avatar-5.webp",
];

export const learningPaths = [
  { label: "Design", icon: "/icons/category-design.svg" },
  { label: "Development", icon: "/icons/category-development.svg" },
  { label: "IT & Software", icon: "/icons/category-it-software.svg" },
  { label: "Business", icon: "/icons/category-business.svg" },
  { label: "Marketing", icon: "/icons/category-marketing.svg" },
  { label: "Photography", icon: "/icons/category-photography.svg" },
];

export const growthStats = [
  { value: "12K", label: "Students" },
  { value: "70+", label: "Courses" },
  { value: "16", label: "Creators" },
];

export const creatorBenefits = [
  "Share Your Expertise",
  "Monetize Your Passion",
  "Flexibility and Autonomy",
  "Build a Community",
];

export const testimonials = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    avatar: "/images/testimonial-sarah.webp",
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    avatar: "/images/testimonial-james.webp",
    quote:
      "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    avatar: "/images/testimonial-alex.webp",
    quote:
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses making a positive impact on learners globally.",
  },
];

export const footerColumns: NavLink[][] = [
  [
    { label: "Featured Courses", href: "/#courses" },
    { label: "Featured Categories", href: "/#categories" },
    { label: "Business", href: "/#categories" },
    { label: "IT", href: "/#categories" },
    { label: "Design", href: "/#categories" },
  ],
  [
    { label: "Development", href: "/#categories" },
    { label: "Marketing", href: "/#categories" },
    { label: "Photography", href: "/#categories" },
    { label: "Finance", href: "/#categories" },
    { label: "Sport", href: "/#categories" },
  ],
  [
    { label: "Become a Creator", href: "/register" },
    { label: "Affiliate Program", href: "/register" },
    { label: "Contact", href: "/#testimonials" },
    { label: "Help", href: "/#testimonials" },
    { label: "About", href: "/#creators" },
  ],
];

export const legalLinks: NavLink[] = [
  { label: "Privacy Policy", href: "/#footer" },
  { label: "Terms of Service", href: "/#footer" },
  { label: "Cookies Settings", href: "/#footer" },
];
