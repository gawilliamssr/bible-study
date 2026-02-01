const SermonPlayer = () => {
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
