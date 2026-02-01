type PinnedVerse = {
  id: string;
  reference: string;
  text: string;
};

type StudyCollectionProps = {
  focus: string;
  onFocusChange: (value: string) => void;
  pinnedVerses: PinnedVerse[];
  onRemoveVerse: (id: string) => void;
};

const StudyCollection = ({
  focus,
  onFocusChange,
  pinnedVerses,
  onRemoveVerse
}: StudyCollectionProps) => {
  const hasPinnedVerses = pinnedVerses.length > 0;

  return (
    <section className="study-panel">
      <header className="study-panel__header">
        <h3>Study Collection</h3>
        <p>Set a focus and pin verses from the Bible to build your study.</p>
      </header>
      <div className="study-panel__body">
        <div className="study-panel__input">
          <label htmlFor="study-topic">Study focus</label>
          <input
            id="study-topic"
            type="text"
            value={focus}
            onChange={(event) => onFocusChange(event.target.value)}
            placeholder='e.g. "Grace in Romans"'
          />
        </div>
        <div className="study-panel__input">
          <label>Pin verses from the Bible view</label>
          <p className="study-panel__hint">
            Browse the Bible and click the pin button on any verse to save it
            here.
          </p>
        </div>
        <div className="study-panel__list">
          <h4>Pinned Scriptures</h4>
          {hasPinnedVerses ? (
            <ul>
              {pinnedVerses.map((verse) => (
                <li key={verse.id}>
                  <div className="study-panel__verse">
                    <span className="study-panel__verse-ref">
                      {verse.reference}
                    </span>
                    <span className="study-panel__verse-text">
                      {verse.text}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveVerse(verse.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="study-panel__empty">
              No pinned verses yet. Pick a focus, then pin verses from the Bible
              view.
            </p>
          )}
        </div>
        <div className="study-panel__summary">
          <h4>Study Notes</h4>
          <textarea
            className="study-panel__textarea"
            rows={6}
            placeholder="Capture observations or themes..."
          />
        </div>
        <div className="study-panel__footer">
          <button type="button">Save Study Collection</button>
        </div>
      </div>
    </section>
  );
};

export default StudyCollection;
