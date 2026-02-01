import { useMemo, useState } from "react";

type PinnedPassage = {
  id: string;
  reference: string;
  note: string;
  addedOn: string;
};

const SUGGESTED_PASSAGES = [
  "John 3:16",
  "Romans 5:8",
  "Ephesians 2:8-9",
  "Titus 3:5",
  "Acts 4:12"
];

const SermonPlayer = () => {
  const [referenceInput, setReferenceInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [pinnedPassages, setPinnedPassages] = useState<PinnedPassage[]>([
    {
      id: "pinned-1",
      reference: "Romans 3:23-24",
      note: "Gospel summary and justification.",
      addedOn: "Saved today"
    },
    {
      id: "pinned-2",
      reference: "Ephesians 2:8-9",
      note: "Grace-based salvation anchor.",
      addedOn: "Saved today"
    }
  ]);

  const compiledReferences = useMemo(
    () =>
      pinnedPassages
        .map((passage) => passage.reference)
        .join(" · "),
    [pinnedPassages]
  );

  const handlePinPassage = () => {
    const trimmedReference = referenceInput.trim();
    if (!trimmedReference) {
      return;
    }

    const newPinned: PinnedPassage = {
      id: `pinned-${Date.now()}`,
      reference: trimmedReference,
      note: noteInput.trim(),
      addedOn: "Just now"
    };

    setPinnedPassages((prev) => [newPinned, ...prev]);
    setReferenceInput("");
    setNoteInput("");
  };

  const handleRemovePassage = (id: string) => {
    setPinnedPassages((prev) => prev.filter((passage) => passage.id !== id));
  };

  const handleSuggestionClick = (reference: string) => {
    setReferenceInput(reference);
  };

  return (
    <section className="sermons-panel">
      <header className="sermons-panel__header">
        <h3>Sermons</h3>
        <p>Organize teaching videos and link them to passages.</p>
      </header>
      <div className="sermons-panel__body">
        <div className="sermons-panel__input">
          <label htmlFor="sermon-url">YouTube URL</label>
          <input
            id="sermon-url"
            type="text"
            placeholder="https://youtu.be/..."
          />
        </div>
        <div className="sermons-panel__preview">
          <div className="sermons-panel__thumb" aria-hidden="true" />
          <div className="sermons-panel__meta">
            <h4>Preview title</h4>
            <p>Channel name · 42 min</p>
          </div>
        </div>
        <section className="sermons-panel__pin-board" aria-label="Pinned scriptures">
          <header className="sermons-panel__pin-header">
            <div>
              <h4>Pinned Scriptures</h4>
              <p>Tag passages to build a sermon reference list.</p>
            </div>
            <div className="sermons-panel__pin-actions">
              <button type="button">Add from reading</button>
            </div>
          </header>
          <div className="sermons-panel__pin-form">
            <div className="sermons-panel__pin-input">
              <label htmlFor="pin-reference">Reference</label>
              <input
                id="pin-reference"
                type="text"
                placeholder="Book Chapter:Verse"
                value={referenceInput}
                onChange={(event) => setReferenceInput(event.target.value)}
              />
            </div>
            <div className="sermons-panel__pin-input">
              <label htmlFor="pin-note">Why this passage?</label>
              <input
                id="pin-note"
                type="text"
                placeholder="Add a quick note or theme"
                value={noteInput}
                onChange={(event) => setNoteInput(event.target.value)}
              />
            </div>
            <button type="button" onClick={handlePinPassage}>
              Pin scripture
            </button>
          </div>
          <div className="sermons-panel__pin-suggestions">
            <span>Quick tags:</span>
            <div>
              {SUGGESTED_PASSAGES.map((reference) => (
                <button
                  type="button"
                  key={reference}
                  onClick={() => handleSuggestionClick(reference)}
                >
                  {reference}
                </button>
              ))}
            </div>
          </div>
          <div className="sermons-panel__pin-list">
            {pinnedPassages.length === 0 ? (
              <p className="sermons-panel__pin-empty">
                No scriptures pinned yet. Tag verses as you study.
              </p>
            ) : (
              pinnedPassages.map((passage) => (
                <article key={passage.id} className="sermons-panel__pin-card">
                  <div>
                    <h5>{passage.reference}</h5>
                    <p>{passage.note || "No note added yet."}</p>
                  </div>
                  <div className="sermons-panel__pin-meta">
                    <span>{passage.addedOn}</span>
                    <button
                      type="button"
                      onClick={() => handleRemovePassage(passage.id)}
                    >
                      Remove
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
          <div className="sermons-panel__pin-compiled">
            <span>Compiled references</span>
            <p>{compiledReferences || "Start pinning passages to compile a list."}</p>
          </div>
        </section>
        <div className="sermons-panel__recent">
          <h4>Recent Sermons</h4>
          <ul>
            <li>Romans 8:28 · “Purpose in Suffering”</li>
            <li>John 3 · “Born Again”</li>
          </ul>
        </div>
        <div className="sermons-panel__empty">
          <span>No sermons saved yet.</span>
        </div>
      </div>
    </section>
  );
};

export default SermonPlayer;
