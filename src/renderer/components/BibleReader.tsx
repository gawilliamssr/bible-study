import { useEffect, useState } from "react";

type BibleBook = {
  name: string;
  abbrev?: string;
  chapters: string[][];
};

type BibleData = {
  translation: string;
  books: BibleBook[];
};

type BiblePayload = BibleData | BibleBook[];

const normalizeBibleData = (payload: BiblePayload): BibleData => {
  if (Array.isArray(payload)) {
    return {
      translation: "KJV",
      books: payload
    };
  }

  return {
    translation: payload.translation ?? "KJV",
    books: payload.books ?? []
  };
};

const BibleReader = () => {
  const [bible, setBible] = useState<BibleData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedBookIndex, setSelectedBookIndex] = useState(0);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);
  const [selectedVerse, setSelectedVerse] = useState(1);

  useEffect(() => {
    const loadChapter = async () => {
      try {
        const response = await fetch("/bible-kjv.json");
        if (!response.ok) {
          throw new Error("Unable to load Bible data.");
        }
        const payload = (await response.json()) as BiblePayload;
        const data = normalizeBibleData(payload);
        if (!data.books?.length) {
          throw new Error("Bible dataset is missing book content.");
        }
        setBible(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    loadChapter();
  }, []);

  const currentBook = bible?.books[selectedBookIndex];
  const chapterCount = currentBook?.chapters.length ?? 0;
  const currentChapter = currentBook?.chapters[selectedChapterIndex] ?? [];
  const verseCount = currentChapter.length;
  const translationLabel = bible?.translation ?? "KJV";

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
          return (
            <p
              key={`verse-${selectedChapterIndex}-${verseNumber}`}
              id={`verse-${verseNumber}`}
              className={`bible-reader__verse${
                isActive ? " bible-reader__verse--active" : ""
              }`}
            >
              <span className="bible-reader__verse-number">{verseNumber}</span>
              {text}
            </p>
          );
        })}
      </div>
    </article>
  );
};

export default BibleReader;
