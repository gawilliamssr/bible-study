# Repository Guidelines

This repository is currently in the planning stage and only contains `PRD.md`. Use this document to keep contributor guidance aligned with the evolving implementation. If you add tooling or code, update these sections immediately.

## Project Structure & Module Organization
- `PRD.md` is the product source of truth and includes the planned architecture.
- Current scaffolding in place:
  - `src/main/` for Electron main-process code (placeholder modules).
  - `src/renderer/` for the React UI and components (placeholder modules).
  - `src/types/` for shared TypeScript types (placeholder module).
  - `src/styles/` for global styling (placeholder module).
  - `resources/` for app assets.
  - `dist/` for generated builds (to be created when build tooling exists).
- If you introduce a different structure, document it here and in `PRD.md`.

## Build, Test, and Development Commands
- Renderer dev tooling is wired with Vite:
  - `npm run dev` starts the renderer dev server (default `http://localhost:5173`).
  - `npm run build` builds the renderer bundle to `dist/renderer`.
  - `npm run preview` serves the production renderer build (default `http://localhost:4173`).

## Coding Style & Naming Conventions
- Current content is Markdown; keep headings consistent and use code fences for examples.
- When code is added, prefer TypeScript + React conventions from `PRD.md`.
- Suggested defaults (update once tooling exists): `PascalCase` for React components, `camelCase` for variables/functions, `kebab-case` for file names, and `SCREAMING_SNAKE_CASE` for constants.

## Testing Guidelines
- Automated tests use Vitest with Testing Library.
- Test files live in `src/renderer/__tests__` and use the `*.test.tsx` naming pattern.
- Run tests with `npm run test`.
- For now, use the manual verification flows in `PRD.md` (Bible reading, notes, sermons, plans) as acceptance checks alongside automated tests.

## Commit & Pull Request Guidelines
- This directory is not currently a git repository, so no commit conventions exist.
- If git is initialized, use clear, scoped commits (recommended: Conventional Commits like `feat: add note editor`).
- PRs should include a short summary, testing notes, and screenshots for UI changes.

## Security & Configuration Tips
- The product is intended to be offline-first; avoid introducing cloud dependencies without explicit approval.
- Do not commit API keys; keep secrets in a local `.env` and document required variables in `README.md` once it exists.

## Agent-Specific Instructions
- Treat `PRD.md` as the authoritative design/feature reference.
- Keep this file updated whenever structure, tooling, or conventions change.
