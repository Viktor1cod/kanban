import { useState } from "react";
import Card from "./Card";

export default function Column({ column, setColumns }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const submit = () => {
    const t = title.trim();
    if (!t) return; // условие: название введено

    setColumns((prev) =>
      prev.map((col) =>
        col.id === column.id
          ? {
              ...col,
              issues: [
                ...col.issues,
                { id: crypto.randomUUID(), name: t, description: "" },
              ],
            }
          : col
      )
    );

    setTitle("");
    setIsAdding(false);
  };

  const cancel = () => {
    setTitle("");
    setIsAdding(false);
  };

  return (
    <section className="column">
      <div className="column__title">{column.title}</div>

      <div className="column__list">
        {column.issues.map((issue) => (
          <Card key={issue.id} issue={issue} />
        ))}
      </div>

      <div className="column__footer">
        {!isAdding ? (
          <button
            className="addCardBtn"
            onClick={() => setIsAdding(true)}
            type="button"
          >
            + Add card
          </button>
        ) : (
          <div className="addCardForm">
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="New task title..."
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
                if (e.key === "Escape") cancel();
              }}
            />
            <div className="addCardActions">
              <button className="btn" onClick={submit} type="button">
                Submit
              </button>
              <button className="btn ghost" onClick={cancel} type="button">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
