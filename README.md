# KStV Ravensberg zu Münster

Website for KStV Ravensberg — a Catholic, non-dueling, color-bearing student fraternity at the University of Münster, founded 1919.

## Tech Stack

- [Next.js 16](https://nextjs.org) — static export (`output: "export"`)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Framer Motion](https://motion.dev) — scroll animations
- [Bun](https://bun.sh) — package manager

## Getting Started

This project uses [Devbox](https://www.jetify.com/devbox) for reproducible tooling. With [direnv](https://direnv.net/) hooked into your shell, the environment activates automatically on `cd`.

```bash
devbox install    # install pinned node, bun, biome
bun install       # install dependencies
bun run dev       # start dev server
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Static export to `/out` |
| `bun run lint` | Run Biome lint |
| `bun run lint:fix` | Run Biome lint with auto-fix |

## Updating Content

All content lives in `src/data/`. The only file that changes regularly is `vorstand.ts` (board members). To update:

1. Add portrait images to `public/images/vorstand/`
2. Edit `src/data/vorstand.ts`
3. Push to `main` — deployment is automatic

## Updating Semesterprogramm

Export the new semester PDF and calendar file, then run:

```bash
bun run import:semester -- \
  --pdf "/path/to/SemPro.pdf" \
  --ics "/path/to/Ravensberg.ics" \
  --slug "sose-2026" \
  --title "Sommersemester 2026"
```

Use a new lowercase slug for each semester, for example `wise-2026-27`.
The import copies the PDF and ICS into `public/semesterprogramm/`, generates a
cover image, and updates `src/data/semesterprogramm.ts`.

Before pushing, verify the site:

```bash
bun run lint
bun run build
```

## Deployment

GitHub Actions builds and deploys to Hostinger via FTP on every push to `main`. See `.github/workflows/deploy.yml`.
