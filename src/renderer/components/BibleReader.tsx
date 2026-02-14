import { useEffect, useState } from "react";
import { BibleData } from "../lib/bible-utils";

type PinnedVerse = {
  id: string;
  reference: string;
  text: string;
};

type BibleReaderProps = {
  focusLabel: string;
  onPinVerse: (verse: PinnedVerse) => void;
  pinnedVerseIds: Set<string>;
};

const BibleReader = ({
  focusLabel,
  onPinVerse,
  pinnedVerseIds
}: BibleReaderProps) => {
  const [bible, setBible] = useState<BibleData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState(1);

  useEffect(() => {
    const worker = new Worker(
      new URL("../workers/bible.worker.ts", import.meta.url),
      { type: "module" }
    );

    worker.postMessage("load");

    worker.onmessage = (event) => {
      const { type, data, error } = event.data;
      if (type === "success") {
        setBible(data as BibleData);
      } else if (type === "error") {
        setError(error);
      }
    };

    worker.onerror = (err) => {
      setError("Worker error: " + err.message);
    };

    return () => {
      worker.terminate();
    };
  }, []);

  const currentBook = bible?.books[selectedBookIndex];
  const chapterCount = currentBook?.chapters.length ?? 0;
  const currentChapter = currentBook?.chapters[selectedChapterIndex] ?? [];
  const verseCount = currentChapter.length;
  const translationLabel = bible?.translation ?? "KJV";
  const hasFocus = focusLabel.trim().length > 0;

  useEffect(() => {
    setSelectedChapterIndex(0);
    setSelectedVerse(1);
  }, [selectedBookIndex]);

  useEffect(() => {
    setSelectedVerse(1);
  }, [selectedChapterIndex]);

  useEffect(() => {
    if (verseCount > 0 && selectedVerse > verseCount) {
      setSelectedVerse(verseCount);
    }
  }, [selectedVerse, verseCount]);

  useEffect(() => {
    if (!bible || !verseCount) {
      return;
    }
    const verseElement = document.getElementById(`verse-${selectedVerse}`);
    verseElement?.scrollIntoView?.({ block: "center", behavior: "smooth" });
  }, [bible, selectedVerse, selectedChapterIndex, selectedBookIndex, verseCount]);

  if (error) {
    return <p className="bible-reader__error">{error}</p>;
  }

  if (!bible) {
    return <p className="bible-reader__loading">Loading passage…</p>;
  }

  return (
    <article className="bible-reader">
      <div className="bible-reader__study">
        <div>
          <span>Study Focus</span>
          <p>
            {hasFocus ? focusLabel : "Set a focus in the Study view to pin."}
          </p>
        </div>
        <button type="button" disabled={!hasFocus}>
          {hasFocus ? "Ready to Pin" : "Focus Required"}
        </button>
      </div>
      <div className="bible-reader__jump">
        <label htmlFor="quick-jump">Quick Jump</label>
        <input
          id="quick-jump"
          type="text"
          placeholder="e.g. John 3:16"
        />
      </div>
      <div className="bible-reader__selector">
        <div className="bible-reader__select">
          <label htmlFor="book-select">Book</label>
          <select
            id="book-select"
            value={selectedBookIndex}
            onChange={(event) =>
              setSelectedBookIndex(Number(event.target.value))
            }
          >
            {bible.books.map((book, index) => (
              <option key={book.name} value={index}>
                {book.name}
              </option>
            ))}
          </select>
        </div>
        <div className="bible-reader__select">
          <label htmlFor="chapter-select">Chapter</label>
          <select
            id="chapter-select"
            value={selectedChapterIndex}
            onChange={(event) =>
              setSelectedChapterIndex(Number(event.target.value))
            }
            disabled={!chapterCount}
          >
            {Array.from({ length: chapterCount }, (_, index) => (
              <option key={`chapter-${index + 1}`} value={index}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="bible-reader__select">
          <label htmlFor="verse-select">Verse</label>
          <select
            id="verse-select"
            value={selectedVerse}
            onChange={(event) => setSelectedVerse(Number(event.target.value))}
            disabled={!verseCount}
          >
            {Array.from({ length: verseCount }, (_, index) => (
              <option key={`verse-${index + 1}`} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
        <div className="bible-reader__select">
          <label htmlFor="translation-select">Translation</label>
          <select id="translation-select" value={translationLabel} disabled>
            <option value={translationLabel}>{translationLabel}</option>
          </select>
        </div>
      </div>
      <div className="bible-reader__compare">
        <div>
          <span>Comparison</span>
          <p>ESV · KJV (placeholder)</p>
        </div>
        <button type="button">Add Translation</button>
      </div>
      <header className="bible-reader__header">
        <h3>
          {currentBook?.name} {selectedChapterIndex + 1} ({translationLabel})
        </h3>
      </header>
      <div className="bible-reader__verses">
        {currentChapter.map((text, index) => {
          const verseNumber = index + 1;
          const isActive = verseNumber === selectedVerse;
          const reference = `${currentBook?.name} ${
            selectedChapterIndex + 1
          }:${verseNumber}`;
          const id = `${selectedBookIndex}-${selectedChapterIndex}-${verseNumber}`;
          const isPinned = pinnedVerseIds.has(id);
          return (
            <div
              key={`verse-${selectedChapterIndex}-${verseNumber}`}
              id={`verse-${verseNumber}`}
              className={`bible-reader__verse-row${
                isActive ? " bible-reader__verse--active" : ""
              }`}
            >
              <p className="bible-reader__verse">
                <span className="bible-reader__verse-number">{verseNumber}</span>
                {text}
              </p>
              <button
                type="button"
                className="bible-reader__pin"
                disabled={!hasFocus || isPinned}
                onClick={() =>
                  onPinVerse({
                    id,
                    reference,
                    text
                  })
                }
              >
                {isPinned ? "Pinned" : "Pin"}
              </button>
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default BibleReader;
