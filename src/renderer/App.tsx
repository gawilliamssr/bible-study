import { useMemo, useState } from "react";
import BibleReader from "./components/BibleReader";
import NoteEditor from "./components/NoteEditor";
import SermonPlayer from "./components/SermonPlayer";
import ReadingPlan from "./components/ReadingPlan";
import Journal from "./components/Journal";
import Sidebar, { NavView } from "./components/Sidebar";
import StudyCollection from "./components/StudyCollection";

type PinnedVerse = {
  id: string;
  reference: string;
  text: string;
};

const App = () => {
  const [activeView, setActiveView] = useState<NavView>("bible");
  const [studyFocus, setStudyFocus] = useState("");
  const [pinnedVerses, setPinnedVerses] = useState<PinnedVerse[]>([]);

  const pinnedVerseIds = useMemo(
    () => new Set(pinnedVerses.map((verse) => verse.id)),
    [pinnedVerses]
  );

  const handlePinVerse = (verse: PinnedVerse) => {
    setPinnedVerses((prev) => {
      if (prev.find((item) => item.id === verse.id)) {
        return prev;
      }
      return [...prev, verse];
    });
  };

  const handleRemoveVerse = (id: string) => {
    setPinnedVerses((prev) => prev.filter((verse) => verse.id !== id));
  };

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

    if (activeView === "study") {
      return (
        <StudyCollection
          focus={studyFocus}
          onFocusChange={setStudyFocus}
          pinnedVerses={pinnedVerses}
          onRemoveVerse={handleRemoveVerse}
        />
      );
    }

    return (
      <BibleReader
        focusLabel={studyFocus}
        onPinVerse={handlePinVerse}
        pinnedVerseIds={pinnedVerseIds}
      />
    );
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
            {activeView === "study" && "Study"}
          </h2>
        </header>
        <section className="app-content">{renderContent()}</section>
      </main>
    </div>
  );
};

export default App;
