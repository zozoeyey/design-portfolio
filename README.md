# Zoey Yan — Portfolio

A clean, code-owned rebuild of my portfolio (previously on Framer), built with
Next.js + Tailwind so I can keep refining it in code.

## Tech

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **TypeScript**
- Fonts: **Satoshi** (Fontshare) + **Instrument Serif** (Google Fonts), loaded in `app/layout.tsx`

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

Other commands:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint
```

## Where things live

```
app/
  layout.tsx            # fonts, <Navbar/>, <Footer/>, global metadata
  page.tsx              # Home (hero, approach, work, collaborate, testimonials)
  about/page.tsx        # About (collaborate, hobbies, travel, testimonials)
  work/page.tsx         # Work index
  work/[slug]/page.tsx  # Case-study template (one page per project)
  playground/page.tsx   # Playground grid
  globals.css           # design tokens (colors, fonts) + Tailwind theme
components/
  Navbar.tsx  Footer.tsx  SectionLabel.tsx  ProjectCard.tsx  Reveal.tsx
lib/
  data.ts               # all site content: projects, playground, copy, links
```

## Editing content

Almost everything you'll want to change is in **`lib/data.ts`** — project
case studies, playground items, testimonials, hero copy, nav, and footer
links. Add a new project by adding an object to the `projects` array; its
case-study page is generated automatically at `/work/<slug>`.

## Images & video

All images and videos are local, under `public/`. Assets originally hosted on
Framer's CDN were downloaded into `public/media/` via
`scripts/localize-assets.mjs`; hand-added files live in `public/about/`,
`public/approach/`, `public/testimonials/`. Reference them from `lib/data.ts`
as `/media/<file>` etc.

## Deploy

Easiest path is [Vercel](https://vercel.com): push this repo to GitHub,
import it in Vercel, and it deploys on every push. No config needed.

---

Rebuilt from the original Framer project — design and content preserved,
now fully in code.
