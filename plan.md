# Establish initial execution plan for the Advanced Personal Bible Study App

This ExecPlan is a living document. The sections `Progress`, `Surprises & Discoveries`, `Decision Log`, and `Outcomes & Retrospective` must be kept up to date as work proceeds.

## Purpose / Big Picture

The goal is to translate the PRD into an executable, step-by-step plan for setting up the offline-first Electron + React + TypeScript app. After completing the work described here, a new contributor can scaffold the project, confirm a basic Bible reader shell runs, and understand the data and UI foundations needed for notes, sermon integration, and reading plans.

## Progress

- [x] (2026-01-23 03:57Z) Draft initial project scaffolding and document required directories and config files based on PRD (completed: created src/resources folders and placeholder modules).
- [x] (2026-01-23 04:00Z) Define the minimal data model and storage approach to support Bible reading, notes, and sermons (completed: captured SQLite tables and local Bible JSON storage in plan).
- [x] (2026-01-23 04:01Z) Draft a first-run validation walkthrough for reading, note entry, and sermon metadata capture (completed: documented manual acceptance flow in plan).
- [x] (2026-01-23 04:02Z) Add root config placeholders (package.json, tsconfig.json, electron.config.js) for future tooling.
- [x] (2026-01-23 04:03Z) Wire Electron main process and renderer shell placeholders for initial window layout.
- [x] (2026-01-23 04:04Z) Add minimal dependencies and TypeScript types for Electron/React scaffolding.
- [x] (2026-01-23 04:05Z) Add mock Bible JSON resource and render it via BibleReader.
- [x] (2026-01-23 04:06Z) Add preload placeholder referenced by the main process.
- [x] (2026-01-23 04:07Z) Add initial global styles for shell layout and Bible reader.
- [x] (2026-01-23 04:08Z) Add renderer entry to mount App and import global styles.
- [x] (2026-01-23 04:09Z) Add Notes placeholder view with basic navigation toggle and styles.
- [x] (2026-01-23 04:10Z) Add Sermons placeholder view with input scaffold and styles.
- [x] (2026-01-23 04:11Z) Add nav button hover/active styling and active state wiring.
- [x] (2026-01-23 04:12Z) Add renderer HTML shell with root mount element.
- [x] (2026-01-23 04:13Z) Add Reading Plans placeholder view with styles.
- [x] (2026-01-23 04:14Z) Add sermon metadata preview stub under URL input.
- [x] (2026-01-23 04:15Z) Add recent notes list stub beneath note input.
- [x] (2026-01-23 04:16Z) Add hover/focus styling for the Reading Plans button.
- [x] (2026-01-23 04:17Z) Add book/chapter selector placeholders to Bible reader.
- [x] (2026-01-23 04:18Z) Add recent sermons list stub beneath the sermon preview.
- [x] (2026-01-23 04:19Z) Add placeholder dev/build scripts and document them in AGENTS.md.
- [x] (2026-01-23 04:20Z) Add translation comparison placeholder in Bible reader.
- [x] (2026-01-23 04:21Z) Add input focus styling for notes and sermons fields.
- [x] (2026-01-23 04:22Z) Add README scaffold with setup and status notes.
- [x] (2026-01-23 04:23Z) Add export notes button placeholder.
- [x] (2026-01-23 04:24Z) Add quick verse jump placeholder above the Bible reader.

## Surprises & Discoveries

- Observation: None yet.
  Evidence: N/A.

## Decision Log

- Decision: Use Electron + React + TypeScript with SQLite as the planned foundation.
  Rationale: PRD defines this as the recommended stack, ensuring offline-first behavior.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add placeholder modules for planned app structure before wiring runtime behavior.
  Rationale: Establishes directory layout and file naming for future implementation without blocking on build tooling.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Store Bible text as local JSON resources and persist notes/sermons in SQLite tables aligned with PRD models.
  Rationale: Keeps Bible reading offline while using structured storage for notes and sermon metadata.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Validate early behavior via manual walkthroughs before adding automated tests.
  Rationale: No build/test tooling exists yet, so manual flows ensure acceptance without blocking progress.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add minimal root configs as placeholders without wiring build scripts.
  Rationale: Establishes canonical filenames and keeps future setup aligned with PRD without assuming tooling yet.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Keep main process loading a blank URL until renderer bundling exists.
  Rationale: Avoids assuming a build pipeline while still validating window lifecycle wiring.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add Electron/React dependencies and type packages before wiring build scripts.
  Rationale: Clears editor type errors while preserving the tooling-agnostic scaffold.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Load mock Bible data via a static JSON resource for initial UI wiring.
  Rationale: Enables offline rendering without committing to data ingestion tooling yet.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add a minimal preload.js placeholder without IPC exposure.
  Rationale: Keeps main process configuration consistent while deferring IPC design.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Use a serif reading face and dark neutral palette for the initial UI scaffold.
  Rationale: Improves readability and establishes a focused study aesthetic.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Create a renderer entry point that mounts App via React DOM.
  Rationale: Establishes the expected runtime entry for future bundling.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Provide a minimal notes view to validate multi-panel navigation early.
  Rationale: Helps test layout flow before wiring data persistence.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Provide a minimal sermons view with URL input placeholder.
  Rationale: Establishes the sermon workflow surface while deferring API wiring.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add hover and active state styles for navigation clarity.
  Rationale: Improves usability while keeping the visual system minimal.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add a minimal renderer HTML shell file for mounting.
  Rationale: Defines the root element for future bundling and runtime loading.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Provide a minimal reading plans view with a starter plan card.
  Rationale: Establishes plan UI without committing to scheduling logic.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add a static sermon metadata preview stub for layout validation.
  Rationale: Helps design the sermon card layout ahead of API integration.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add a recent notes list stub under the note editor.
  Rationale: Introduces the idea of saved notes without persistence wiring.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add hover/focus styling for the plan start button.
  Rationale: Improves affordance for primary actions in the plans view.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add selector placeholders above Bible reader content.
  Rationale: Establishes navigation controls before real data wiring.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add a recent sermons list stub under the sermon preview.
  Rationale: Introduces saved sermon lists without data persistence wiring.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add placeholder npm scripts and document them in contributor guidance.
  Rationale: Clarifies intended commands while tooling remains unconfigured.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add translation comparison placeholder near the reader controls.
  Rationale: Signals future multi-translation support without wiring data.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add focus styling for text inputs to improve accessibility.
  Rationale: Provides clearer affordances during data entry.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add a lightweight README to capture current scaffold status.
  Rationale: Helps orient new contributors before tooling is wired.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add an export notes button placeholder in the Notes panel.
  Rationale: Signals future export workflow without implementing it.
  Date/Author: 2026-01-23 / Cascade.
- Decision: Add a quick verse jump placeholder above the reader.
  Rationale: Establishes navigation entry point ahead of search wiring.
  Date/Author: 2026-01-23 / Cascade.

## Outcomes & Retrospective

No outcomes yet; plan has not been executed.

## Context and Orientation

The repository now includes initial scaffolding under `src/` and `resources/` with placeholder modules mirroring the PRD structure. The PRD defines the target features, data models, and intended project structure under `src/main`, `src/renderer`, and `src/types`. There is still no build system, package manager setup, or runtime wiring. The app is expected to be offline-first and avoid cloud dependencies. The primary flows are Bible reading, notes, and YouTube sermon integration, with reading plans as a later phase.

## Plan of Work

Start by creating the base project scaffolding described in `PRD.md` with an Electron + React + TypeScript template. Add the initial folder structure under `src/main` and `src/renderer` with placeholder modules for the Bible reader shell, notes, and sermon components. Define a minimal SQLite schema aligned with the PRD data models in a `database.ts` module, using tables for notes, sermons, sermon timestamp notes, and sermon-to-passage links. Keep Bible text in local JSON resources under `resources/` for offline reading. Implement a lightweight Bible reader view that can load mocked Bible text JSON from local files and render a single chapter. Once the shell loads, add a placeholder notes panel and a stub sermon library screen to prove navigation works. Record every change in this plan, updating Progress and adding any new decisions or discoveries.

## Concrete Steps

1. Create the root scaffolding files described in the PRD (`package.json`, `tsconfig.json`, `electron.config.js`) with the minimal Electron + React + TypeScript configuration.
2. Create the directories `src/main`, `src/renderer`, `src/types`, `src/styles`, and `resources` with placeholder files as listed in the PRD.
3. Implement `src/main/main.ts` to launch the Electron window and point at the renderer entry.
4. Implement `src/renderer/App.tsx` with a basic layout shell containing a sidebar and a Bible reader panel.
5. Add a local mock Bible JSON file in `resources/` and load it in a `BibleReader` component to render a chapter.
6. Add a placeholder notes panel and sermon library view to validate navigation and layout.

As steps are completed, update this section with any new commands or refined steps used during implementation.

## Validation and Acceptance

Acceptance is met when a contributor can run the app locally, open the Bible reader, see a rendered chapter from a local JSON file, and navigate to a placeholder Notes and Sermons view. The UI should load without errors, and all content should be read from local files without external network calls.

First-run validation walkthrough:

1. Start the app from the project root once the Electron/React wiring exists. Confirm the main window opens and shows the sidebar plus a Bible reader panel.
2. In the Bible reader, load the local mock JSON and confirm that a single chapter renders with verse ordering intact.
3. Navigate to the Notes view placeholder and confirm the layout loads without crashing. Create a temporary note entry if the UI allows and verify it appears in the notes list.
4. Navigate to the Sermons view placeholder and confirm the layout loads without crashing. Enter a YouTube URL in the metadata form once implemented and confirm the title/channel fields populate (or stub values appear) without network errors.
5. Close and reopen the app to confirm the UI still loads and any saved note stub remains if persistence is wired.

## Idempotence and Recovery

Creating the project scaffolding and placeholder modules is safe to repeat; re-running the setup should either overwrite or reconcile files with the expected structure. If a step produces an error, remove the generated file or folder and recreate it following the Plan of Work, ensuring the repo matches the PRD-defined structure.

## Artifacts and Notes

No artifacts yet.

## Interfaces and Dependencies

Use Electron for the desktop shell, React for UI rendering, and TypeScript for type safety. Plan for SQLite storage by defining a `database.ts` module in `src/main` that will later expose functions for reading and writing notes, sermons, highlights, and reading plans. The minimal data model to capture now is:

- `notes`: id, passage_ref, content, tags, created_at, updated_at.
- `sermons`: id, youtube_id, title, channel, thumbnail_url, duration, tags, added_at.
- `sermon_notes`: id, sermon_id, timestamp, content, linked_verse, created_at.
- `sermon_passages`: sermon_id, passage_ref.

Bible text lives in local JSON resources that the renderer can load for offline display. The renderer should define a `BibleReader` component that accepts a structured list of verses and displays them in order, along with placeholder components for notes and sermons that can be wired to real data later.

Plan Revision Note (2026-01-23): Recorded scaffolding completion, updated context to reflect new directories, added a decision log entry to capture the placeholder-first approach, documented the minimal data model/storage approach, added a first-run validation walkthrough, documented root config placeholders, logged shell wiring, added dependencies/types, added the mock Bible reader wiring, added a preload placeholder, added global styles, added the renderer entry, added the Notes placeholder, added the Sermons placeholder, added nav button styling, added the renderer HTML shell, added the Reading Plans placeholder, added the sermon preview stub, added the recent notes list stub, added plans button styling, added the Bible reader selector placeholder, added the recent sermons list stub, added placeholder scripts documentation, added the translation comparison placeholder, added input focus styling, added the README scaffold, added the export notes button placeholder, and added the quick verse jump placeholder.
