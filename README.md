# Bible Study App

An offline-first Bible study desktop app built with Electron, React, TypeScript, and Vite.

## Features

- **Bible Reader** — Browse and read KJV scripture with fast, Web Worker-powered loading
- **Study Notes** — Create, edit, and persist personal notes tied to passages via the `useNotes` hook
- **Sermon Player** — Audio/media sermon playback with empty-state handling
- **Knowledge Graph** *(in progress)* — Visual POC for mapping connections between verses, topics, and sermons

## Tech Stack

| Layer | Technology |
|---|---|
| Desktop shell | Electron |
| UI framework | React + TypeScript |
| Bundler | Vite |
| Styling | CSS Modules / global styles |
| Testing | Vitest + Playwright |
| State / data | React hooks + local persistence |

## Project Structure

```
src/
  main/           Electron main process
  renderer/
    __tests__/    Unit tests (Vitest)
    components/   React UI components
    hooks/        Custom hooks (useNotes, useBible, ...)
    store/        App state
    test/         Benchmark & integration scripts
    utils/        Shared utilities
    workers/      Web Workers (bible.worker.ts)
  styles/         Global CSS
  types/          Shared TypeScript types
resources/        Bible JSON data & config
verification/     Playwright e2e & screenshot tests
```

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Starts the Vite dev server for the renderer at `http://localhost:5173`.

### Build

```bash
npm run build
```

Builds the renderer bundle to `dist/renderer`.

### Preview

```bash
npm run preview
```

Serves the production renderer build at `http://localhost:4173`.

### Tests

```bash
npm test
```

## Open PRs / In Progress

- **#9** — Optimize Bible loading with Web Worker *(has merge conflicts — needs rebase)*
- **#4** — Knowledge Graph Visualization POC *(has merge conflicts — needs rebase)*

## References

See [`PRD.md`](./PRD.md) for full product requirements and planned architecture.
See [`AGENTS.md`](./AGENTS.md) for AI agent contribution guidelines.
