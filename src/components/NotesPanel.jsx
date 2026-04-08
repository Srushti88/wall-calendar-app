import { useState } from "react";

export default function NotesPanel({ notes, setNotes, selected }) {
  const [text, setText] = useState("");

  const addNote = () => {
    if (!selected || !text) return;

    const existing = notes[selected] || [];

    setNotes({
      ...notes,
      [selected]: [...existing, text],
    });

    setText("");
  };

  const deleteNote = (index) => {
    const updated = [...notes[selected]];
    updated.splice(index, 1);

    setNotes({
      ...notes,
      [selected]: updated,
    });
  };

  return (
    <div className="notes">
      <h3>Notes</h3>

      <input
        placeholder="Write note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addNote}>Add</button>

      {/* SHOW MULTIPLE NOTES */}
      {selected && notes[selected] && notes[selected].map((note, i) => (
        <div key={i} className="note-box">
          <p>{note}</p>
          <button className="delete-btn" onClick={() => deleteNote(i)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}