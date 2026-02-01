import { useState } from "react";
import BibleReader from "./components/BibleReader";
import NoteEditor from "./components/NoteEditor";
import SermonPlayer from "./components/SermonPlayer";
import ReadingPlan from "./components/ReadingPlan";

const App = () => {
  const [activeView, setActiveView] = useState<
    "bible" | "notes" | "sermons" | "plans"
  >("bible");

  const renderContent = () => {
    if (activeView === "notes") {
      return <NoteEditor />;
    }

    if (activeView === "sermons") {
      return <SermonPlayer />;
    }

    if (activeView === "plans") {
      return <ReadingPlan />;
    }

    return <BibleReader />;
  };

  return (
    <div className="app-shell">
      <aside className="app-sidebar">
        <h1 className="app-title">Bible Study</h1>
        <nav className="app-nav">
          <button
            type="button"
            className={activeView === "bible" ? "is-active" : ""}
            onClick={() => setActiveView("bible")}
          >
            Bible
          </button>
          <button
            type="button"
            className={activeView === "notes" ? "is-active" : ""}
            onClick={() => setActiveView("notes")}
          >
            Notes
          </button>
          <button
            type="button"
            className={activeView === "sermons" ? "is-active" : ""}
            onClick={() => setActiveView("sermons")}
          >
            Sermons
          </button>
          <button
            type="button"
            className={activeView === "plans" ? "is-active" : ""}
            onClick={() => setActiveView("plans")}
          >
            Plans
          </button>
        </nav>
      </aside>
      <main className="app-main">
        <header className="app-header">
          <h2>
            {activeView === "bible" && "Reading"}
            {activeView === "notes" && "Notes"}
            {activeView === "sermons" && "Sermons"}
            {activeView === "plans" && "Plans"}
          </h2>
        </header>
        <section className="app-content">{renderContent()}</section>
      </main>
    </div>
  );
};

export default App;
