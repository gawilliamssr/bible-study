import { useState } from "react";
import { useNotes, Note } from "../hooks/useNotes";

const NoteEditor = () => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState("");
  const [editorTitle, setEditorTitle] = useState("");

  const handleNoteSelect = (note: Note) => {
    setActiveNoteId(note.id);
    setEditorTitle(note.title);
    setEditorContent(note.content);
  };

  const handleNewNote = () => {
    setActiveNoteId(null);
    setEditorTitle("");
    setEditorContent("");
  };

  const handleSave = () => {
    if (!editorContent.trim() && !editorTitle.trim()) return;

    if (activeNoteId) {
      updateNote(activeNoteId, {
        title: editorTitle || "Untitled Note",
        content: editorContent,
      });
    } else {
      const newNote = addNote({
        title: editorTitle || "Untitled Note",
        content: editorContent,
      });
      setActiveNoteId(newNote.id);
    }
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteNote(id);
    if (activeNoteId === id) {
      handleNewNote();
    }
  };

  return (
    <section className="notes-panel">
      <header className="notes-panel__header">
        <h3>Notes</h3>
        <p>Capture insights tied to passages or sermons.</p>
      </header>
      <div className="notes-panel__body">
        <div className="notes-panel__editor">
          <input
            type="text"
            className="notes-panel__title-input"
            placeholder="Note Title"
            value={editorTitle}
            onChange={(e) => setEditorTitle(e.target.value)}
          />
          <textarea
            className="notes-panel__input"
            placeholder="Start a new note..."
            rows={8}
            value={editorContent}
            onChange={(e) => setEditorContent(e.target.value)}
          />
          <div className="notes-panel__actions">
            <button
              type="button"
              onClick={handleSave}
              className="notes-panel__save"
            >
              {activeNoteId ? "Update Note" : "Save Note"}
            </button>
            <button
              type="button"
              onClick={handleNewNote}
              className="notes-panel__new"
            >
              New Note
            </button>
          </div>
        </div>

        <div className="notes-panel__recent">
          <h4>Recent Notes</h4>
          {notes.length === 0 ? (
            <div className="notes-panel__empty">
              <span>No saved notes yet.</span>
            </div>
          ) : (
            <ul>
              {notes.map((note) => (
                <li
                  key={note.id}
                  onClick={() => handleNoteSelect(note)}
                  className={activeNoteId === note.id ? "active" : ""}
                  style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 'bold' }}>{note.title}</span>
                    <span style={{ fontSize: '0.8em', color: '#666' }}>
                      {new Date(note.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    onClick={(e) => handleDelete(e, note.id)}
                    style={{
                      marginLeft: '10px',
                      color: '#dc3545',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '5px'
                    }}
                    aria-label="Delete note"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default NoteEditor;
