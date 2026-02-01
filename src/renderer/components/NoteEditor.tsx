const NoteEditor = () => {
  return (
    <section className="notes-panel">
      <header className="notes-panel__header">
        <h3>Notes</h3>
        <p>Capture insights tied to passages or sermons.</p>
      </header>
      <div className="notes-panel__body">
        <textarea
          className="notes-panel__input"
          placeholder="Start a new note..."
          rows={8}
        />
        <button type="button" className="notes-panel__export">
          Export Notes
        </button>
        <div className="notes-panel__recent">
          <h4>Recent Notes</h4>
          <ul>
            <li>John 3:16 · "Loved the world" reflection</li>
            <li>Romans 8:28 · Promise of purpose</li>
          </ul>
        </div>
        <div className="notes-panel__empty">
          <span>No saved notes yet.</span>
        </div>
      </div>
    </section>
  );
};

export default NoteEditor;
