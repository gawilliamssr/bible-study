import { useEffect, useState } from "react";

type Verse = {
  verse: number;
  text: string;
};

type Chapter = {
  book: string;
  chapter: number;
  translation: string;
  verses: Verse[];
};

const BibleReader = () => {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadChapter = async () => {
      try {
        const response = await fetch("/mock-bible.json");
        if (!response.ok) {
          throw new Error("Unable to load mock Bible data.");
        }
        const data = (await response.json()) as Chapter;
        setChapter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      }
    };

    loadChapter();
  }, []);

  if (error) {
    return <p className="bible-reader__error">{error}</p>;
  }

  if (!chapter) {
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
          <span>Book</span>
          <button type="button">{chapter.book}</button>
        </div>
        <div className="bible-reader__select">
          <span>Chapter</span>
          <button type="button">{chapter.chapter}</button>
        </div>
        <div className="bible-reader__select">
          <span>Translation</span>
          <button type="button">{chapter.translation}</button>
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
          {chapter.book} {chapter.chapter} ({chapter.translation})
        </h3>
      </header>
      <div className="bible-reader__verses">
        {chapter.verses.map((verse) => (
          <p key={verse.verse} className="bible-reader__verse">
            <span className="bible-reader__verse-number">{verse.verse}</span>
            {verse.text}
          </p>
        ))}
      </div>
    </article>
  );
};

export default BibleReader;
