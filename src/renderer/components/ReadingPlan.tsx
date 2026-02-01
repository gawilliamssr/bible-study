const ReadingPlan = () => {
  return (
    <section className="plans-panel">
      <header className="plans-panel__header">
        <h3>Reading Plans</h3>
        <p>Stay on track with structured daily readings.</p>
      </header>
      <div className="plans-panel__body">
        <div className="plans-panel__card">
          <h4>Bible in a Year</h4>
          <p>365-day journey through the full canon.</p>
          <button type="button">Start Plan</button>
        </div>
        <div className="plans-panel__card plans-panel__card--ghost">
          <span>No active plan yet.</span>
        </div>
      </div>
    </section>
  );
};

export default ReadingPlan;
