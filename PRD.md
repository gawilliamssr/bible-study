# Product Requirements Document: Advanced Personal Bible Study App

## Executive Summary

A desktop application for personal Bible study that combines traditional Bible reading with modern sermon integration capabilities. The app enables users to study Scripture with multiple translations, take notes, optionally organize sermons from YouTube, and create personalized study plans—all stored locally without requiring cloud accounts.

---

## Product Vision

Create an advanced, offline-first Bible study application that bridges the gap between traditional Bible study methods and modern digital sermon content, providing a unified workspace for deep Scripture engagement. Sermon integration should be optional so users can keep a purely offline, text-focused workflow.

---

## User Personas

### Primary User: Dedicated Bible Student
- Studies the Bible regularly (3-5 times per week)
- Watches sermons and teaching videos on YouTube (optional)
- Takes extensive notes during study and sermon viewing
- Values privacy and offline access
- Wants to organize study materials systematically
- Cross-references sermons with specific Bible passages

---

## Core Features

### 1. Bible Reading & Study
**Priority: P0 (Must Have)**

#### 1.1 Multiple Bible Translations
- Support for major translations (KJV, NIV, ESV, NKJV, NLT, NASB, etc.)
- Quick translation switcher for parallel reading
- Side-by-side comparison view for 2+ translations
- Download translations for offline use
- Search within specific translations

#### 1.2 Reading Interface
- Clean, distraction-free reading mode
- Verse-by-verse navigation
- Chapter/book navigation with quick jumper
- Reading history to return to recent passages
- Adjustable font size, typeface, and color themes (light/dark)
- Cross-reference links (clickable verse references)

#### 1.3 Search & Concordance
- Full-text search across all downloaded translations
- Advanced search with filters:
  - By book, chapter, verse range
  - By Testament (Old/New)
  - By keyword with Boolean operators (AND, OR, NOT)
- Strong's concordance integration (optional, future enhancement)
- Search results with context preview
- Save frequent searches

### 2. Notes & Annotations
**Priority: P0 (Must Have)**

#### 2.1 Personal Notes
- Create notes attached to specific verses or passages
- Rich text formatting (bold, italic, lists, headings)
- Tag notes with categories/topics
- Full-text search across all notes
- Link notes to related verses
- Export notes to PDF or Markdown

#### 2.2 Highlights & Bookmarks
- Highlight verses with color coding (e.g., yellow for promises, blue for commands)
- Custom highlight colors with labels
- Bookmark important passages with descriptions
- Collections/folders for organizing bookmarks
- Quick access to bookmarked verses

#### 2.3 Journaling
- Date-stamped journal entries
- Associate journal entries with Bible passages or sermons
- Reflective writing space for insights and prayers
- Search journal by date, verse reference, or keyword

### 3. YouTube Sermon Integration (Optional)
**Priority: P0 (Must Have)**

**Optional module**: Users can disable or skip sermon features entirely and still have a complete Bible reading + notes experience. When disabled, sermon UI, data, and API calls are suppressed.

#### 3.1 Sermon Library Management
- Add YouTube videos by URL or video ID
- Automatic metadata extraction (title, channel, duration, thumbnail)
- Organize sermons into:
  - Custom collections (e.g., "Romans Series", "Sunday Sermons")
  - By speaker/pastor
  - By topic/theme
  - By date added
- Search sermon library by title, speaker, or notes
- Tag sermons with custom labels

#### 3.2 Verse-to-Sermon Linking
- Link sermons to specific Bible passages
- View all sermons associated with a verse or chapter
- Bi-directional navigation:
  - From Bible passage → see related sermons
  - From sermon → jump to referenced verses
- Batch link sermons to multiple passages

#### 3.3 Timestamped Notes & Study
- Embedded YouTube player within the app
- Take notes at specific video timestamps
- Click timestamp to jump to that moment in the video
- Link timestamp notes to specific Bible verses
- Create "study moments" that combine:
  - Video timestamp
  - Bible verse reference
  - Personal notes
- Export sermon notes with timestamps

#### 3.4 Sermon Playback Features
- Built-in video player with standard controls
- Playback speed adjustment (0.5x - 2x)
- Create video bookmarks for key moments
- Repeat sections for deeper study
- Picture-in-picture mode while browsing Bible passages

### 4. Study Plans & Devotionals
**Priority: P1 (Should Have)**

#### 4.1 Reading Plans
- Pre-built reading plans:
  - Bible in a Year
  - Chronological Bible
  - New Testament in 90 Days
  - Topical studies (Love, Faith, Prayer, etc.)
- Custom reading plan builder
- Track progress with completion checkmarks
- Daily reminders and notifications (desktop notifications)
- Missed days tracking with catch-up mode

#### 4.2 Topical Studies
- Create custom topical studies (e.g., "What the Bible says about Grace")
- Collect relevant verses across the Bible
- Add sermons and notes to topical studies
- Share topical studies as export files
- Templates for common study topics

### 5. Knowledge Graph Visualization
**Priority: P2 (Nice to Have)**

#### 5.1 Interactive Graph View
- Visual, interactive web of connections between different data types
- Force-directed graph visualization showing nodes and edges
- Nodes represent: Verses, Tags, Notes, Sermons, and People/Authors
- Edges represent: References, Links, Shared Tags, Authorship

#### 5.2 Exploration & Discovery
- Click a node (e.g., tag "Grace") to reveal all connected items
- Filter graph by node type (e.g., "Show only Verses and Sermons")
- Zoom and pan capabilities for large datasets
- "Focus mode" to center on a specific node and its immediate neighbors
- Quick navigation: double-click a node to open it in the main reader/editor

---

## Technical Architecture

### Platform & Technology Stack

#### Desktop Framework
- **Electron** (recommended): Cross-platform desktop apps using web technologies
  - Pros: Web technologies (React, Vue, etc.), large ecosystem, active development
  - Cons: Larger app size, higher memory usage
- **Alternative**: Tauri (Rust-based, smaller footprint) or Qt (C++)

#### Frontend
- **React** with TypeScript for UI components
- **Tailwind CSS** for styling
- **Shadcn/ui** or similar for component library

#### Data Storage (Local)
- **SQLite**: Structured data (notes, bookmarks, reading plans, sermon metadata)
- **IndexedDB**: Browser storage for larger datasets (alternative)
- **File System**: Bible translation files (JSON), exported notes

#### Bible Data Source
- **API.Bible** (free tier available)
- **Bolls Life API** (open source)
- **Bible.org NET API**
- **Offline option**: Download JSON/XML Bible files and bundle with app

#### YouTube Integration (Optional)
- **YouTube IFrame Player API**: Embed and control video playback (only when sermon features are enabled)
- **YouTube Data API v3**: Fetch video metadata (title, thumbnail, channel) on-demand
- **No authentication required** for public video playback
- **Optional**: App must remain fully functional without any YouTube usage

### Data Models

#### Bible Passage
```typescript
{
  id: string,
  book: string,
  chapter: number,
  verse: number,
  translation: string,
  text: string
}
```

#### Note
```typescript
{
  id: string,
  passage_ref: string, // e.g., "John 3:16"
  content: string,
  tags: string[],
  created_at: timestamp,
  updated_at: timestamp,
  related_sermons: string[] // sermon IDs
}
```

#### Sermon
```typescript
{
  id: string,
  youtube_id: string,
  title: string,
  channel: string,
  thumbnail_url: string,
  duration: number,
  collections: string[],
  tags: string[],
  linked_passages: string[], // e.g., ["Romans 8:28", "Philippians 4:13"]
  added_at: timestamp,
  notes: TimestampNote[]
}
```

#### Timestamp Note
```typescript
{
  id: string,
  sermon_id: string,
  timestamp: number, // seconds
  content: string,
  linked_verse: string | null,
  created_at: timestamp
}
```

#### Highlight
```typescript
{
  id: string,
  passage_ref: string,
  color: string,
  label: string,
  created_at: timestamp
}
```

#### Reading Plan
```typescript
{
  id: string,
  name: string,
  description: string,
  schedule: {
    day: number,
    passages: string[]
  }[],
  progress: number[], // completed day numbers
  started_at: timestamp
}
```

---

## User Interface Design

### Main Layout

```
┌─────────────────────────────────────────────────────────────┐
│  [Menu Bar: File | Edit | View | Study | Help]              │
├────────────┬────────────────────────────────────────────────┤
│            │  Bible Reader                                   │
│  Sidebar   │  ┌─────────────────────────────────────────┐   │
│            │  │ [Translation Picker] [Search] [Settings]│   │
│  • Bible   │  ├─────────────────────────────────────────┤   │
│  • Notes   │  │                                         │   │
│  • Sermons │  │  John 3:16 (NIV)                        │   │
│  • Plans   │  │  For God so loved the world that he...  │   │
│  • Journal │  │                                         │   │
│            │  │  [Highlight] [Note] [Bookmark]          │   │
│  Recent    │  └─────────────────────────────────────────┘   │
│  ────────  │                                                 │
│  John 3    │  Notes Panel (collapsible)                      │
│  Romans 8  │  ┌─────────────────────────────────────────┐   │
│  Psalm 23  │  │ Your notes on John 3:16...              │   │
│            │  │ • Linked sermon: "Amazing Grace"        │   │
│            │  └─────────────────────────────────────────┘   │
└────────────┴────────────────────────────────────────────────┘
```

### Sermon Integration View

```
┌─────────────────────────────────────────────────────────────┐
│  Sermon: "Understanding Grace" - Pastor John Smith          │
├──────────────────────────┬──────────────────────────────────┤
│                          │  Linked Passages:                │
│  [YouTube Video Player]  │  • Romans 3:23-24 [Go]           │
│                          │  • Ephesians 2:8-9 [Go]          │
│  ──────────────────────  │  • Titus 3:5 [Go]                │
│  [Play] [Pause] 15:32    │                                  │
│  ──────────────────────  │  Timestamped Notes:              │
│                          │  ──────────────────────          │
│  Collections:            │  [03:45] Key point about faith   │
│  • Grace Series          │         → Romans 3:23            │
│  • Sunday Sermons        │                                  │
│                          │  [12:30] Example of unmerited... │
│  Tags: #grace #salvation │                                  │
│                          │  [+] Add note at current time    │
└──────────────────────────┴──────────────────────────────────┘
```

### Key UI Components

1. **Bible Reader**: Clean, readable text with verse numbers
2. **Side Panel**: Navigation for different sections (Bible, Notes, Sermons, Plans)
3. **Quick Verse Jumper**: Type-ahead search for instant navigation (e.g., "John 3:16")
4. **Sermon Browser**: Grid/list view of saved sermons with thumbnails
5. **Note Editor**: Rich text editor with verse linking
6. **Study Plan Dashboard**: Progress tracking and daily reading checklist

---

## User Workflows

### Workflow 1: Studying a Bible Passage with Sermons

1. User opens app and navigates to Romans 8
2. Reads passage in ESV translation
3. Switches to side-by-side view to compare with NIV
4. Highlights verse 28 in yellow ("Promises")
5. Clicks "Related Sermons" button
6. Sees 3 sermons linked to Romans 8:28
7. Clicks on sermon thumbnail to open sermon view
8. Watches sermon, takes timestamped notes
9. Links a timestamp note back to Romans 8:28
10. Returns to Bible reader to continue studying

### Workflow 2: Adding a New Sermon

1. User finds an interesting sermon on YouTube
2. Copies the YouTube URL
3. Opens Sermons section in app
4. Clicks "Add Sermon" button
5. Pastes URL, app fetches metadata automatically
6. User adds sermon to "Discipleship" collection
7. Tags sermon with #spiritual-growth #obedience
8. Links sermon to Matthew 28:18-20 (Great Commission)
9. Sermon is saved and now appears in library

### Workflow 3: Following a Reading Plan

1. User selects "Bible in a Year" plan from Plans section
2. App shows today's reading: Genesis 1-3
3. User clicks "Start Today's Reading"
4. App opens Genesis 1 in reading mode
5. User reads and takes notes on creation account
6. Marks day as complete
7. App updates progress tracker (1/365 days complete)
8. App sends desktop notification reminder for tomorrow's reading

---

## Implementation Plan

### Phase 1: Foundation (Weeks 1-3)
**Goal**: Set up project infrastructure and basic Bible reading functionality

**Tasks**:
1. Initialize Electron + React + TypeScript project
2. Set up SQLite database with schema
3. Integrate Bible API or download offline Bible data
4. Build basic Bible reader UI:
   - Book/chapter/verse navigation
   - Single translation display
   - Search functionality
5. Implement data persistence (save/load from SQLite)

**Deliverables**:
- Functional Bible reader
- Search across Scripture
- Navigation between books/chapters
- Basic desktop app shell

### Phase 2: Notes & Annotations (Weeks 4-5)
**Goal**: Enable personal study through notes and highlights

**Tasks**:
1. Build note editor with rich text support
2. Implement verse-to-note linking
3. Create highlight system with color picker
4. Add bookmark functionality
5. Build notes browser/search interface
6. Implement tags for organization

**Deliverables**:
- Full note-taking capability
- Verse highlighting with colors
- Searchable notes database
- Bookmark management

### Phase 3: YouTube Sermon Integration (Weeks 6-8)
**Goal**: Integrate sermon viewing and organization

**Tasks**:
1. Integrate YouTube IFrame Player API
2. Build sermon library UI (grid/list view)
3. Implement "Add Sermon" flow with URL input
4. Fetch YouTube metadata via API
5. Create sermon-to-verse linking interface
6. Build timestamped note system
7. Implement sermon collections/tagging
8. Create sermon player with note-taking sidebar

**Deliverables**:
- Embedded YouTube player
- Sermon library with search
- Verse-to-sermon bidirectional links
- Timestamped notes with playback

### Phase 4: Study Plans & Polish (Weeks 9-10)
**Goal**: Add structured study features and refine UX

**Tasks**:
1. Build reading plan engine
2. Create pre-built plans (Bible in a Year, etc.)
3. Implement progress tracking
4. Add desktop notifications for daily readings
5. Create export functionality (notes to PDF/Markdown)
6. Build settings/preferences panel
7. Add keyboard shortcuts
8. Implement dark/light themes
9. Performance optimization and bug fixes

**Deliverables**:
- Working reading plans with progress
- Daily reading reminders
- Export capabilities
- Polished UI with themes
- Keyboard navigation

### Phase 5: Testing & Launch (Week 11)
**Goal**: Ensure quality and prepare for release

**Tasks**:
1. End-to-end testing of all features
2. Cross-platform testing (Windows, macOS, Linux)
3. Create user documentation
4. Build installer packages for each OS
5. Performance profiling and optimization
6. Final bug fixes

**Deliverables**:
- Installers for Windows (.exe), macOS (.dmg), Linux (.AppImage)
- User guide/documentation
- Production-ready v1.0 release

---

## Critical Files to Create

### Project Structure
```
bible-study/
├── package.json                 # Project dependencies and scripts
├── electron.config.js           # Electron configuration
├── tsconfig.json                # TypeScript configuration
├── src/
│   ├── main/                    # Electron main process
│   │   ├── main.ts              # App entry point
│   │   ├── database.ts          # SQLite database setup
│   │   └── ipc-handlers.ts      # Inter-process communication
│   ├── renderer/                # React frontend
│   │   ├── App.tsx              # Root component
│   │   ├── components/
│   │   │   ├── BibleReader.tsx
│   │   │   ├── SermonPlayer.tsx
│   │   │   ├── NoteEditor.tsx
│   │   │   ├── ReadingPlan.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── hooks/
│   │   │   ├── useBible.ts
│   │   │   ├── useSermons.ts
│   │   │   └── useNotes.ts
│   │   ├── store/               # State management
│   │   │   └── index.ts
│   │   └── utils/
│   │       ├── bible-api.ts
│   │       └── youtube-api.ts
│   ├── types/
│   │   └── index.d.ts           # TypeScript type definitions
│   └── styles/
│       └── globals.css          # Global styles
├── resources/                   # App icons, splash screens
├── dist/                        # Built app (generated)
└── README.md                    # Setup and usage instructions
```

### Key Configuration Files

**package.json** - Dependencies to include:
- `electron`, `electron-builder` (desktop app framework)
- `react`, `react-dom` (UI framework)
- `typescript` (type safety)
- `better-sqlite3` (local database)
- `tailwindcss` (styling)
- `lucide-react` or `react-icons` (icons)

**Database Schema** (SQLite):
- `verses` table
- `notes` table
- `highlights` table
- `bookmarks` table
- `sermons` table
- `sermon_notes` table (timestamped)
- `sermon_passages` table (linking)
- `reading_plans` table
- `reading_progress` table
- `collections` table
- `tags` table

---

## Testing Strategy

### End-to-End Verification

1. **Bible Reading Flow**:
   - Open app → Navigate to John 3 → Read verses → Search for "love" → Verify results
   - Switch translations → Verify text changes correctly
   - Use side-by-side view → Verify parallel display

2. **Note-Taking Flow**:
   - Highlight John 3:16 in yellow → Add note → Add tags → Search notes → Verify note appears
   - Edit note → Verify changes persist after restart
   - Export notes to PDF → Verify formatting

3. **Sermon Integration Flow (Optional)**:
   - Enable sermon features in settings (if disabled by default)
   - Add YouTube sermon URL → Verify metadata loads
   - Link sermon to Romans 8:28 → Play sermon → Take timestamped note
   - Click timestamp → Verify video jumps to correct time
   - View Romans 8:28 → Verify linked sermon appears
   - Organize into collection → Tag sermon → Search sermon library

4. **Reading Plan Flow**:
   - Start "Bible in a Year" plan → Complete Day 1 reading → Mark complete
   - Verify progress updates to 1/365
   - Check reminder notification (next day)
   - Skip a day → Verify catch-up mode suggests missed reading

5. **Data Persistence**:
   - Create notes, highlights, sermons (if enabled) → Close app → Reopen
   - Verify all data persists correctly
   - Test on fresh install with data migration

6. **Cross-Platform**:
   - Test on Windows 10/11, macOS (Intel + Apple Silicon), Ubuntu Linux
   - Verify UI renders correctly, database works, YouTube playback functions
   - Check performance (startup time, search speed, video playback)

---

## Future Enhancements (Post-MVP)

### V2.0 Features
- **Strong's Concordance**: Greek/Hebrew word studies
- **Commentaries**: Integrate public domain commentaries (Matthew Henry, etc.)
- **Audio Bible**: Built-in audio Bible playback
- **Study Groups**: Export/import study materials to share with others
- **Advanced Analytics**: Track study habits, most-read books, growth over time
- **Mobile Companion App**: Sync-free mobile version for on-the-go study

### V3.0+ Features
- **Original Language Tools**: Interlinear Bible view
- **Map Integration**: Biblical geography and historical context
- **AI Study Assistant**: Generate study questions, summaries (optional)
- **Podcast Integration**: Similar to YouTube, but for podcast sermons
- **Cross-Device Sync** (optional): Cloud backup for users who want it

---

## Success Metrics

- **User can navigate to any Bible verse within 3 clicks**
- **Sermon integration setup takes < 30 seconds** (paste URL → linked to verses)
- **App startup time < 2 seconds** on modern hardware
- **Zero data loss** - all notes, highlights, and sermons persist reliably
- **Offline functionality** - 100% of features work without internet (after initial setup)

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| YouTube API rate limits | High | Cache video metadata locally, minimize API calls |
| Bible API dependency | Medium | Bundle offline Bible data as fallback |
| Large app size (Electron) | Low | Use code splitting, optimize assets |
| Cross-platform bugs | Medium | Test on all OS platforms regularly |
| User data corruption | High | Implement database backups, export functionality |

---

## Conclusion

This PRD outlines a comprehensive desktop Bible study application that combines traditional Scripture study with modern sermon integration. By focusing on local storage, offline functionality, and a clean user experience, the app will serve as a powerful tool for personal spiritual growth without the complexity of cloud accounts or subscriptions.

The phased implementation approach ensures a solid foundation before adding advanced features, with clear testing criteria to validate each component. The result will be a desktop application that truly enhances personal Bible study through thoughtful integration of digital resources.
