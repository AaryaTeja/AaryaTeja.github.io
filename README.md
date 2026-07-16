# Aarya — Portfolio

A single-page, dark, cinematic portfolio built with **React + Vite + TypeScript + Tailwind CSS**,
featuring "liquid glass" morphism UI and smooth blur/fade animations via **Framer Motion**.

Two full-screen sections: **Hero** and **Capabilities**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build to /dist
npm run preview  # preview the production build
```

## Where to edit content

| What | File |
| --- | --- |
| Headline, subtext, badge, stats, nav links, trust-bar tech, contact links | `src/sections/Hero.tsx` |
| Section heading + the three capability cards (titles, tags, body) | `src/sections/Capabilities.tsx` |
| Background video URLs | `HERO_VIDEO` in `Hero.tsx`, `CAP_VIDEO` in `Capabilities.tsx` |
| Fonts | `index.html` (`<link>`) + `tailwind.config.js` (`fontFamily`) |
| Liquid-glass styles | `src/index.css` (`.liquid-glass`, `.liquid-glass-strong`) |

Contact links currently point to `mailto:hello@aaryateja.dev` and GitHub `AaryaTeja` — update in `Hero.tsx`.

## Components

- `FadingVideo` — `<video>` that fades in on load, fades out before the clip ends, and loops
  (single `src`) or cycles (array `src`).
- `BlurText` — word-by-word staggered blur-in, triggered on scroll via IntersectionObserver.
- `icons.tsx` — hand-rolled SVG icons (no icon library).

## Note

The previous Next.js version of this portfolio was archived to `backup/` when this Vite
version replaced it. Nothing was deleted.
