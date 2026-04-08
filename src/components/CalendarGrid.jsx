import { useState } from "react";

export default function CalendarGrid({ setSelected, notes, month }) {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const days = ["M", "T", "W", "T", "F", "S", "S"];

  const getDaysInMonth = (month) => {
    return new Date(2026, month + 1, 0).getDate();
  };

  const getFirstDay = (month) => {
    const day = new Date(2026, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const daysInMonth = getDaysInMonth(month);
  const firstDay = getFirstDay(month);

  const dates = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // ✅ CLEAN CLICK LOGIC
  const handleClick = (day) => {
    if (!day) return;

    setSelected(day);

    if (start === null) {
      setStart(day);
      setEnd(null);
    } else if (end === null) {
      if (day === start) return;
      setEnd(day);
    } else {
      // RESET
      setStart(day);
      setEnd(null);
    }
  };

  // ✅ RANGE LOGIC
  const isInRange = (day) => {
    if (!day || start === null || end === null) return false;

    return day > Math.min(start, end) && day < Math.max(start, end);
  };

  return (
    <div className="calendar">
      <div className="days">
        {days.map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>

      <div className="grid">
        {dates.map((d, index) => {
          let classNames = "day";

          if (d !== null) {
            if (start !== null && d === start) {
              classNames += " start";
            }

            if (end !== null && d === end) {
              classNames += " end";
            }

            if (isInRange(d)) {
              classNames += " range";
            }
          }

          return (
            <div
              key={index}
              className={classNames}
              onClick={() => handleClick(d)}
            >
              {d}
              {d && notes[d] && <span className="dot"></span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}