const Journal = () => {
  return (
    <section className="journal-panel">
      <header className="journal-panel__header">
        <h3>Journal</h3>
        <p>Reflect on scripture, prayers, and study moments.</p>
      </header>
      <div className="journal-panel__body">
        <div className="journal-panel__input">
          <label htmlFor="journal-entry">New Entry</label>
          <textarea
            id="journal-entry"
            className="journal-panel__textarea"
            placeholder="Write a reflection or prayer..."
            rows={6}
          />
          <div className="journal-panel__meta">
            <input
              type="text"
              placeholder="Link passage or sermon (optional)"
            />
            <button type="button">Save Entry</button>
          </div>
        </div>
        <div className="journal-panel__recent">
          <h4>Recent Entries</h4>
          <div className="journal-panel__entry">
            <div className="journal-panel__entry-meta">
              <span>Apr 7, 2026</span>
              <span>Psalm 23</span>
            </div>
            <p>
              The shepherd imagery reminds me to slow down and trust in provision
              even when the path feels unclear.
            </p>
          </div>
          <div className="journal-panel__entry">
            <div className="journal-panel__entry-meta">
              <span>Apr 5, 2026</span>
              <span>John 15:5</span>
            </div>
            <p>
              Stay connected to the vine today by keeping short prayers in the
              pauses between tasks.
            </p>
          </div>
        </div>
        <div className="journal-panel__empty">
          <span>No journal entries saved yet.</span>
        </div>
      </div>
    </section>
  );
};

export default Journal;
