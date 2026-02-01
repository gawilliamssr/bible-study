# Bible Study App (Scaffold)

This repository contains the early scaffold for an offline-first Bible study desktop app. It currently includes placeholder Electron and React files, UI stubs, and a mock Bible JSON resource.

## Status

- Renderer wired to a Vite dev server.
- UI stubs live under `src/renderer`.

## Project Structure

- `src/main/` Electron main process placeholders.
- `src/renderer/` React UI placeholders.
- `src/styles/` global styles.
- `resources/` mock Bible JSON.

## Development Commands

```bash
npm run dev
```

Starts the Vite dev server for the renderer at `http://localhost:5173`.

```bash
npm run build
```

Builds the renderer bundle to `dist/renderer`.

```bash
npm run preview
```

Serves the production renderer build at `http://localhost:4173`.

## Next Steps

- Wire a bundler for the renderer and Electron main process.
- Replace mock data with real Bible translation files.
- Implement persistence with SQLite per the PRD.

## References

See `PRD.md` for the product requirements and planned architecture.
