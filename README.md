# ByteSpace New

Landing, course search, course details, creator profile, 404, sign-in and registration pages for ByteSpace, an online course platform, implemented from the "ByteSpace New" Figma design.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) with React 19
- TypeScript
- Tailwind CSS v4, plus CSS Modules for the illustration compositions
- [GSAP](https://gsap.com) with ScrollTrigger for entrance, reveal and parallax animations
- [Lenis](https://lenis.darkroom.engineering) for smooth scrolling, synced with ScrollTrigger

## Development

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Routes:

| Route             | Page                                    |
| ----------------- | --------------------------------------- |
| `/`               | Landing page                            |
| `/search`         | Course search with filters (`?q=` supported) |
| `/courses/[slug]` | Course details                          |
| `/creators/[slug]` | Creator profile (`/creators/purepearl-studio`) |
| `/login`          | Sign in                                 |
| `/register`       | Create account                          |

```bash
npm run lint   # ESLint
```

## Build

```bash
npm run build
npm run start
```

## Project structure

```
src/
  app/                 routes, root layout, global tokens and fonts
  components/
    layout/            header, footer, logo, newsletter form
    sections/          landing page sections
    auth/              shared layout, form and illustration for auth pages
    search/            search page and the shared course filter/grid
    course/            course details sidebar, tabs and share button
    creator/           creator profile follow controls
    ui/                buttons, cards, icons, 3D ornaments
    motion/            smooth scrolling and page animation controller
  lib/                 page and course content, GSAP setup
public/
  images/ logos/ icons/
```

Design tokens (colours, type scale, spacing helpers) live in `src/app/globals.css` and mirror the Figma style guide. Decorative illustrations are positioned on their Figma coordinates and scale with the viewport through a `--u` design-pixel unit.

Animations are driven by data attributes so sections can stay Server Components:

- `data-intro="n"` — entrance sequence on page load, ordered by `n`
- `data-reveal` — fade-up when scrolled into view
- `data-parallax="n"` — scroll-linked drift of `n` pixels

All motion is disabled when the visitor prefers reduced motion.

## Deployment

The project deploys to [Vercel](https://vercel.com) with the default Next.js settings; no environment variables are required.
