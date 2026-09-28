import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import MotionController from "@/components/motion/MotionController";
import SmoothScroll from "@/components/motion/SmoothScroll";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600"],
});

const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    { path: "./fonts/Satoshi-Regular.woff2", weight: "400" },
    { path: "./fonts/Satoshi-Medium.woff2", weight: "500" },
    { path: "./fonts/Satoshi-Bold.woff2", weight: "700" },
  ],
});

const description =
  "Unlock your creativity, gain valuable knowledge, and grow your business with ByteSpace — hundreds of courses from creators around the world.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: {
    default: "ByteSpace — Get Access to Hundreds of Courses",
    template: "%s | ByteSpace",
  },
  description,
  openGraph: {
    title: "ByteSpace — Get Access to Hundreds of Courses",
    description,
    siteName: "ByteSpace",
    images: [{ url: "/images/hero-student.webp", width: 516, height: 483 }],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#003be2",
};

// Hides animated elements before hydration so the intro doesn't flash; skipped for reduced motion.
const motionFlag = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js-motion')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} ${satoshi.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionFlag }} />
      </head>
      <body>
        <SmoothScroll />
        <MotionController />
        {children}
      </body>
    </html>
  );
}
