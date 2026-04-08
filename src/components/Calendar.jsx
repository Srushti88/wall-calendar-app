import { useState, useEffect } from "react";
import HeroSection from "./HeroSection";
import NotesPanel from "./NotesPanel";
import CalendarGrid from "./CalendarGrid";

export default function Calendar() {
  const [notes, setNotes] = useState({});
  const [selected, setSelected] = useState(null);
  const [month, setMonth] = useState(0);
  const [dark, setDark] = useState(false);

  const months = [
    "JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE",
    "JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"
  ];

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className={dark ? "container dark" : "container"}>
      <HeroSection month={months[month]} />

      {/* DARK MODE BUTTON */}
      <div className="top-bar">
        <button onClick={() => setDark(!dark)}>
          {dark ? "Light" : "Dark"}
        </button>
      </div>

      {/* MONTH NAV */}
      <div className="month-nav">
        <button onClick={() => setMonth((month - 1 + 12) % 12)}>←</button>
        <span>{months[month]}</span>
        <button onClick={() => setMonth((month + 1) % 12)}>→</button>
      </div>

      <div className="bottom">
        <NotesPanel
          notes={notes}
          setNotes={setNotes}
          selected={selected}
        />

        <CalendarGrid
          setSelected={setSelected}
          notes={notes}
          month={month}
        />
      </div>
    </div>
  );
}