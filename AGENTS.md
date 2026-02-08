# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## What this repo is
A small client-side RSVP (Rapid Serial Visual Presentation) speed-reading web app built with React + Vite and styled with Tailwind CSS.

## Common commands
Prereqs (from `README.md`): Node.js v18+ recommended.

Install deps:
- `npm install`

Run locally (Vite dev server):
- `npm run dev`
- App entry: `index.html` (loads `src/main.jsx`)

Production build:
- `npm run build`
- Output: `dist/`

Preview the production build locally:
- `npm run preview`

Linting / tests:
- No lint or test scripts are currently configured in `package.json`.
- There is no “run a single test” command until a test runner (e.g., Vitest/Jest) is added.

## High-level architecture

### Runtime flow (big picture)
- `index.html` mounts the app at `#root` and loads `src/main.jsx`.
- `src/main.jsx` renders `<App />` and imports global Tailwind styles from `src/styles/index.css`.
- `src/App.jsx` holds essentially all application state and behavior:
  - File upload -> reads a `.txt` file via `FileReader`, splits into `words`, and resets playback state.
  - Playback -> advances `currentIndex` on a timer derived from `wpm` (`60000 / wpm`) while `isPlaying` is true.
  - Progress -> computed from `currentIndex / words.length` and exposed to the progress UI.
  - Theme -> selected theme key maps to a Tailwind-class bundle in `src/constants/themes.js`.

### UI composition
`src/App.jsx` composes a small set of mostly-presentational components:
- `src/components/FileUpload.jsx`: file selection UI; delegates handling to `handleFileUpload`.
- `src/components/WordDisplay.jsx`: renders the current word.
- `src/components/Controls.jsx`: play/pause + speed adjustments + “back 10 words” + reset.
- `src/components/ProgressBar.jsx`: visual progress + hidden range input for seeking.
- `src/components/ThemeSelector.jsx`: dropdown for choosing among theme keys.

### Styling and theme mechanics
- Tailwind entrypoint: `src/styles/index.css`.
- Theme definitions: `src/constants/themes.js` provides Tailwind class strings grouped by theme.
- Tailwind config (`tailwind.config.js`) includes a `safelist` to prevent purge of dynamic classes used via theme objects. If you add new theme tokens/classes, update the `safelist` patterns if necessary.

### Reference/original implementation
- `rsvp-reader.jsx` at repo root contains the original monolithic component; `README.md` notes the refactor preserved this logic. It is not wired into the Vite entrypoint, but is useful as a reference when validating behavior changes.