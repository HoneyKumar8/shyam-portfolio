<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Copilot / AI agent instructions — shyam-portfolio

Purpose: provide focused, actionable guidance so an AI coding agent can be immediately productive working in this repository.

Key facts
- Project type: Create React App (CRA) single-page React site. Entry: `src/index.js` → `src/App.js`.
- Styling: `styled-components` + a global theme. See `src/theme.js` and `src/styles/GlobalStyles.js`.
- Routing/navigation: simple hash-based section navigation. See `src/App.js` and `src/components/Header.js`.
- Deployment: GitHub Pages. See `package.json` (`predeploy` -> `build`, `deploy` uses `gh-pages`). `homepage` is set.

Big-picture architecture
- Single-page app with discrete sections (home/about/services/resume/skills/projects/certifications/contact).
  - Sections are lazily loaded via `React.lazy()` + `Suspense` in `src/App.js`.
  - `App.js` holds the canonical `VALID_SECTIONS` list, `parseFromHash()` and `renderSection()` mapping — update here when adding/removing sections.
- Header component controls navigation and theme toggle. It accepts props: `themeName`, `toggleTheme`, `active`, `onNavigate`. See `src/components/Header.js` for `NavItem` and mobile menu logic.
- Animations: `react-transition-group` (`SwitchTransition` + `CSSTransition`) in `App.js` drives enter/exit animations for sections. Components should respect reduced motion (`prefers-reduced-motion` is checked in `App.js`).

Developer workflows (commands)
- Start dev server: `npm start` (CRA `react-scripts start`).
- Build production bundle: `npm run build`.
- Run tests: `npm test` (CRA test runner).
- Deploy to GitHub Pages: `npm run deploy` (runs `predeploy` → `build`, then `gh-pages -d build`).
- Quick static serve of build (not built-in): `npx serve -s build` (useful to smoke-check `build` output locally).

Project-specific conventions & patterns
- Section navigation
  - Canonical list is `VALID_SECTIONS` in `src/App.js`. Hash formats supported: `#projects` and `#section=projects` (via `parseFromHash`).
  - To add a section: (1) add lazy import in `src/App.js`, (2) add a `case` in `renderSection()`, (3) add ID to `VALID_SECTIONS`, (4) add a nav item in `src/components/Header.js` (both desktop and mobile lists).
- Styling
  - Uses `styled-components` across components. Global variables and theme values live in `src/theme.js` and `src/styles/GlobalStyles.js`.
  - Avoid adding plain CSS files unless necessary; preferred pattern is component-scoped `styled` definitions as in `Header.js`.
- Theme and persistence
  - Theme name stored in `localStorage` under the key `theme` (see `App.js` initialiser). Use `toggleTheme()` prop from `Header` to flip theme.
- Accessibility & mobility
  - Mobile nav is a sliding panel toggled by `MobileBtn` and uses `.open` / `.closed` classes; when open, body `overflow` is hidden.
  - Respect `prefers-reduced-motion` — animations may be disabled by setting timeout to 0 (already implemented in `App.js`).
- Lazy-loading
  - Sections are intentionally lazy-loaded to reduce initial bundle size. Use `Suspense` fallbacks consistent with existing pattern (see `App.js`).

Integration points & dependencies
- No backend; static portfolio only.
- Key dependencies to be aware of: `react`, `react-dom`, `react-scripts`, `styled-components`, `react-transition-group`, `react-icons`, `gh-pages` (devDependency). See `package.json`.
- Static assets: `src/assets/images/*` and `public/`. Built output appears under `build/static/*`.

Common tasks & examples (copyable)
- Add a new section "blog":
  - In `src/App.js`: add `const Blog = lazy(() => import('./components/Blog'));`, add `'blog'` to `VALID_SECTIONS`, and add `case 'blog': return <Blog />;` to `renderSection()`.
  - In `src/components/Header.js`: add a `NavItem` for `id='blog'` and a mobile `button` entry.

- Debugging hash/navigation issues: check `window.location.hash`, and `VALID_SECTIONS` in `App.js`. Header syncs to `hashchange` events.

Files to inspect first (examples)
- `src/App.js` — central state, navigation, theme, transitions.
- `src/components/Header.js` — navigation UI, `onNavigate` usage, mobile menu patterns.
- `src/styles/GlobalStyles.js` and `src/theme.js` — styling conventions and variables.
- `src/Resume/*` — example nested component folder structure used elsewhere.
- `package.json` — scripts and deployment config.

What to avoid
- Don't change hash-routing to full React Router without a clear reason — the app intentionally uses simple hash navigation to keep it static-hosting friendly and easily deep-linkable.
- Avoid adding global CSS files; prefer `styled-components` to match existing patterns.

When in doubt
- Follow the existing patterns in `Header.js` and `App.js` for navigation, lazy-loading and theme behavior.
- Ask to confirm if a change affects routing or the `VALID_SECTIONS` list — it must be updated in multiple places.

If you want changes merged into an existing `.github/copilot-instructions.md`, reply and I'll attempt an intelligent merge preserving unique lines.

— End of file
