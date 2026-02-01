import { useState } from "react";
import BibleReader from "./components/BibleReader";
import NoteEditor from "./components/NoteEditor";
import SermonPlayer from "./components/SermonPlayer";
import ReadingPlan from "./components/ReadingPlan";
import Journal from "./components/Journal";
import KnowledgeGraph from "./components/KnowledgeGraph";
import Sidebar, { NavView } from "./components/Sidebar";

const App = () => {
  const [activeView, setActiveView] = useState<NavView>("bible");

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

    if (activeView === "journal") {
      return <Journal />;
    }

    if (activeView === "graph") {
      return <KnowledgeGraph />;
    }

    return <BibleReader />;
  };

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onSelectView={setActiveView} />
      <main className="app-main">
        <header className="app-header">
          <h2>
            {activeView === "bible" && "Reading"}
            {activeView === "notes" && "Notes"}
            {activeView === "sermons" && "Sermons"}
            {activeView === "plans" && "Plans"}
            {activeView === "journal" && "Journal"}
            {activeView === "graph" && "Knowledge Graph"}
          </h2>
        </header>
        <section className="app-content">{renderContent()}</section>
      </main>
    </div>
  );
};

export default App;
