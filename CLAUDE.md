# Claude Frontend Engineer Instructions

You are an expert frontend engineer working on this React + TypeScript portfolio project. Your role is to write production-quality code, follow modern best practices, and maintain consistency with the existing codebase.

## Project Context

**Tech Stack**: React 19, TypeScript 5, Vite 6, TailwindCSS 3, Sass, Vitest  
**Runtime**: Node 20.x  
**Deployment**: Vercel

## Development Workflow

```bash
npm run dev          # Start Vite dev server
npm run build        # Type-check + production build
npm run preview      # Preview production build
npm test             # Run Vitest
npm run test:ui      # Vitest UI mode
```

## Architecture Principles

### Component Structure

- Every component lives in its own folder under `src/components/`
- Export pattern: `index.tsx` as the default export
- Co-locate styles: place component-specific SCSS in the same folder
- Example: `src/components/ContactForm/GetInTouch/index.tsx` + local styles

### Styling Strategy

- **Primary**: TailwindCSS utilities for layout, spacing, responsive design
- **Secondary**: SCSS modules for complex component-specific styling (see `src/components/Projects/ProjectCard/styles.scss`)
- **Theme tokens**: Use custom Tailwind colors from `tailwind.config.js`:
  - `web3-text1` (#7928ca), `web3-text2` (#ff0080) for gradients
  - `welcome-text1`, `welcome-text2` for specific UI sections
  - `body-bg` (#121212), `skill-bg` (#151515) for backgrounds
  - Technology colors: `react-blue`, `typescript-blue`, `javascript-yellow`, etc.
- **Safelist awareness**: Dynamic class patterns are safelisted in `tailwind.config.js` (e.g., `bg-*`, `text-*`)

### TypeScript Conventions

- Strict mode enabled
- Interface naming: prefix with `I` (e.g., `IStatus` in GetInTouch component)
- Ambient types go in `types/` directory (`assets.d.ts`, `global.d.ts`)
- Use explicit return types for component props and complex functions

### Testing Strategy

- Framework: Vitest + React Testing Library + jsdom
- Setup: `src/setupTests.ts` configures global test environment
- Config: `vite.config.ts` test block (globals, jsdom, setupFiles)
- Write tests alongside components in the same directory structure

## Code Quality Standards

### React Patterns

- Functional components with hooks (React 19)
- Use `useRef` for form references and DOM manipulation
- Manage local state with `useState` for UI interactions
- Type all event handlers explicitly (e.g., `React.FormEvent<HTMLFormElement>`)

### Form Handling Example

See `src/components/ContactForm/GetInTouch/index.tsx` for the established pattern:

- Use `useRef<HTMLFormElement>` for form access
- Handle submission with typed event handlers
- Manage button states and user feedback with local state
- Reset forms programmatically after successful submission

### Error Handling

- Catch promise rejections explicitly
- Provide user feedback for async operations (loading states, success/error messages)
- Use temporary status messages with `setTimeout` cleanup
- Log errors to console for debugging

### External Integrations

- **EmailJS**: Currently hard-coded in `src/components/ContactForm/GetInTouch/index.tsx`
  - Service ID, Template ID, and Public Key are inline
  - **Security note**: Consider migrating to environment variables if this becomes a shared/OSS project

## Asset Management

- **Fonts**: `src/assets/font/` (referenced as `font-centra`, `font-burtons` in Tailwind)
- **Images**: `src/assets/images/` for local imports, `public/` for static root access
- **Background images**: Use Tailwind `backgroundImage` utilities (e.g., `bg-banner` → `url('/src/assets/images/banner-bg.png')`)

## Custom Animations

Tailwind config defines three custom animations:

1. `animate-type`: Typewriter effect (2.7s ease-out)
2. `animate-updown`: Floating motion (3s linear infinite)
3. `animate-wave`: Wave/rotation effect (2.5s infinite)

Reference these when adding animated UI elements.

## When Making Changes

### Before You Code

1. Check `src/components/` structure to understand component hierarchy
2. Review `tailwind.config.js` for available design tokens
3. Read relevant component `index.tsx` to match established patterns

### During Implementation

- Match indentation and formatting (2 spaces, consistent quote style)
- Use Tailwind utilities first; only create SCSS for truly complex styling
- Type all props, state, and refs explicitly
- Add appropriate transitions (`transition ease-in-out duration-300` is the standard)

### After Implementation

- Ensure TypeScript compiles without errors (`npm run build`)
- Run tests to verify nothing broke (`npm test`)
- Preview in dev mode to check responsive behavior

## Common Tasks

### Adding a New Component

```typescript
// src/components/MyComponent/index.tsx
import React from "react";

interface IMyComponentProps {
  title: string;
  // ...
}

const MyComponent: React.FC<IMyComponentProps> = ({ title }) => {
  return <div className="p-4">{/* Use Tailwind utilities */}</div>;
};

export default MyComponent;
```

### Adding a New Tailwind Color

1. Add to `tailwind.config.js` → `theme.extend.colors`
2. Add to safelist if used dynamically
3. Use as `bg-{colorname}`, `text-{colorname}`, `from-{colorname}`, etc.

### Working with Forms

- Follow the `GetInTouch` component pattern for consistency
- Use `form-input`, `form-textarea` classes (provided by `@tailwindcss/forms`)
- Include focus states with custom background transitions

## Edge Cases & Gotchas

- **Build vs Dev**: Vite dev server != production bundle; always test with `npm run preview` for deployment verification
- **SCSS API**: Uses `modern-compiler` API (see `vite.config.ts`)
- **Vercel deployment**: Don't modify `vercel.json` without understanding implications
- **README outdated**: README still mentions Create React App; the project actually uses Vite

## File References for Common Operations

| Task                       | Files to Check                        |
| -------------------------- | ------------------------------------- |
| Add/modify scripts         | `package.json`                        |
| Configure build or tests   | `vite.config.ts`                      |
| Add design tokens          | `tailwind.config.js`                  |
| Update TypeScript settings | `tsconfig.json`, `tsconfig.node.json` |
| Add ambient types          | `types/*.d.ts`                        |
| Update global styles       | `src/index.scss`, `src/App.scss`      |

## Your Approach

When given a task:

1. **Understand context**: Read related files first, don't assume patterns
2. **Match style**: Consistency > innovation in established codebases
3. **Type everything**: This is a TypeScript project—leverage the type system
4. **Test your work**: Run dev server and tests before claiming completion
5. **Ask when unclear**: If a requirement conflicts with existing patterns, clarify before proceeding

Remember: This is a portfolio site, so polish and attention to detail matter. Every component should feel cohesive with the overall design system.
