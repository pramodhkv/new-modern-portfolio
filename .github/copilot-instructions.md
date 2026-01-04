# Repo-specific Copilot instructions

This file gives an AI coding agent focused, actionable guidance to be productive in this repository.

Summary

- This is a React + TypeScript portfolio built with Vite and TailwindCSS. Key directories: `src/`, `public/`, `src/components/`.
- Use `npm run dev` to start (Vite), `npm run build` to build (runs `tsc --noEmit` then `vite build`), and `npm test` (Vitest).

Architecture & patterns

- Single-page React app (Vite) with TypeScript under `src/`.
- Components are organized as folders under `src/components/` and typically expose a default component in `index.tsx` (e.g. `src/components/ContactForm/GetInTouch/index.tsx`).
- Styling mixes Tailwind utility classes and local SCSS files. Global styles: `src/index.scss`, `src/App.scss`. Component-local SCSS exists (example: `src/components/Projects/ProjectCard/styles.scss`).
- Tailwind customization lives in `tailwind.config.js` (custom colors like `web3-text1`, `web3-text2`, and safelisted patterns). Use these tokens when adding UI colors.
- Assets: `src/assets/` (fonts, images) and `public/` for static webroot resources. Reference images using `/src/assets/...` or `public/` for static paths.

Build & test workflows

- Development: `npm run dev` (Vite on default port).
- Production build: `npm run build` (TypeScript type-check via `tsc --noEmit` then `vite build`).
- Preview production bundle: `npm run preview` (Vite preview).
- Tests: `npm test` runs `vitest`. Test environment is configured in `vite.config.ts` and `src/setupTests.ts`.
- Node engine: `20.x` (see `package.json` `engines`).

Conventions the agent should follow

- Files: When creating components, follow the existing pattern: a component folder with an `index.tsx` default export and any local styles in the same folder.
- Types: Add or update type declarations in `src/` or `types/` and add new declarations under `types/` when introducing ambient types.
- CSS: Prefer Tailwind utilities for layout and small tweaks; use SCSS files for component-scoped complex styles (match how `ProjectCard` uses `styles.scss`).
- Tests: Add unit tests alongside components under `src/` using Vitest + Testing Library; mirror existing test setup in `src/setupTests.ts`.

Security & integration notes (discoverable in code)

- Email integration: `src/components/ContactForm/GetInTouch/index.tsx` uses `@emailjs/browser`. Service/template/public keys are currently hard-coded in that file — treat them as sensitive if you plan to move them to env-vars or CI secrets.
- Deployment: `vercel.json` is present; assume Vercel for continuous deployment. Do not change deployment settings without verifying `vercel.json` intent.

Guidance for edits and PRs

- Keep changes minimal and consistent with project style: small focused commits.
- Update `tailwind.config.js` only when new design tokens are required, and mirror safelist usage for dynamically-generated classes.
- When adding runtime configuration/secrets, prefer environment variables and document their names in the README or a `.env.example`.

Key files to inspect when working on features or bugs

- `package.json` — scripts and dependencies.
- `vite.config.ts` — Vite options and test setup.
- `tailwind.config.js` — tokens and safelist.
- `src/components/` — primary UI surface. Inspect the component tree first to find where to make changes.
- `types/` — ambient type declarations.
- `public/` and `src/assets/` — static assets and fonts.

If something is ambiguous, ask a short clarifying question listing 1) the file you plan to change and 2) the desired outcome.

---

If you want, I can update `README.md` to reflect Vite (the current README still references Create React App). Reply to confirm whether to update it as well.
