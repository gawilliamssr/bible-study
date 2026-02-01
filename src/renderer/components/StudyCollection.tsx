import { jsPDF } from "jspdf";

type PinnedVerse = {
  id: string;
  reference: string;
  text: string;
};

type StudyCollectionProps = {
  focus: string;
  onFocusChange: (value: string) => void;
  notes: string;
  onNotesChange: (value: string) => void;
  pinnedVerses: PinnedVerse[];
  onRemoveVerse: (id: string) => void;
};

const StudyCollection = ({
  focus,
  onFocusChange,
  notes,
  onNotesChange,
  pinnedVerses,
  onRemoveVerse
}: StudyCollectionProps) => {
  const hasPinnedVerses = pinnedVerses.length > 0;

  const handleExportMarkdown = () => {
    let content = `# Study Collection: ${focus || "Untitled"}\n\n`;

    if (pinnedVerses.length > 0) {
      content += `## Pinned Scriptures\n\n`;
      pinnedVerses.forEach((verse) => {
        content += `### ${verse.reference}\n${verse.text}\n\n`;
      });
    }

    if (notes) {
      content += `## Study Notes\n\n${notes}\n`;
    }

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${focus || "study-collection"}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text(`Study Collection: ${focus || "Untitled"}`, 10, 10);

    let y = 20;

    if (pinnedVerses.length > 0) {
      doc.setFontSize(14);
      doc.text("Pinned Scriptures", 10, y);
      y += 10;

      doc.setFontSize(12);
      pinnedVerses.forEach((verse) => {
        const title = verse.reference;
        const text = verse.text;

        doc.setFont("helvetica", "bold");
        doc.text(title, 10, y);
        y += 5;

        doc.setFont("helvetica", "normal");
        const splitText = doc.splitTextToSize(text, 190);
        doc.text(splitText, 10, y);
        y += splitText.length * 5 + 5;

        if (y > 270) {
          doc.addPage();
          y = 10;
        }
      });
    }

    if (notes) {
      y += 10;
      if (y > 270) {
        doc.addPage();
        y = 10;
      }
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Study Notes", 10, y);
      y += 10;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      const splitNotes = doc.splitTextToSize(notes, 190);
      doc.text(splitNotes, 10, y);
    }

    doc.save(`${focus || "study-collection"}.pdf`);
  };

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
            value={notes}
            onChange={(event) => onNotesChange(event.target.value)}
            placeholder="Capture observations or themes..."
          />
        </div>
        <div className="study-panel__footer">
          <button type="button">Save Study Collection</button>
          <button type="button" onClick={handleExportMarkdown} style={{ marginLeft: "10px" }}>
            Export Markdown
          </button>
          <button type="button" onClick={handleExportPDF} style={{ marginLeft: "10px" }}>
            Export PDF
          </button>
        </div>
      </div>
    </section>
  );
};

export default StudyCollection;
