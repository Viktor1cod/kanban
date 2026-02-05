import { useMemo, useState } from "react";
import Card from "./Card";

export default function Column({ column, columns, setColumns }) {
  // Add card
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  // Select: выбранная задача для перемещения В ЭТУ колонку
  const [pickedId, setPickedId] = useState("");

  const submit = () => {
    const t = title.trim();
    if (!t) return;

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

  // Опции для select: задачи из ДРУГИХ колонок
  const movableOptions = useMemo(() => {
    const opts = [];
    for (const col of columns) {
      if (col.id === column.id) continue;
      for (const issue of col.issues) {
        opts.push({ id: issue.id, name: issue.name });
      }
    }
    return opts;
  }, [columns, column.id]);

  // Перенос выбранной задачи в текущую колонку
  const moveHere = (issueId) => {
    if (!issueId) return;

    setColumns((prev) => {
      let found = null;
      let fromColumnId = null;

      // найдём задачу и колонку-источник
      for (const col of prev) {
        const idx = col.issues.findIndex((i) => i.id === issueId);
        if (idx !== -1) {
          found = col.issues[idx];
          fromColumnId = col.id;
          break;
        }
      }

      if (!found || !fromColumnId) return prev;
      if (fromColumnId === column.id) return prev;

      return prev.map((col) => {
        if (col.id === fromColumnId) {
          // удалить из старой
          return { ...col, issues: col.issues.filter((i) => i.id !== issueId) };
        }
        if (col.id === column.id) {
          // добавить в новую (в конец списка)
          return { ...col, issues: [...col.issues, found] };
        }
        return col;
      });
    });

    setPickedId("");
  };

  return (
    <section className="column">
      <div className="column__title">{column.title}</div>

      <div className="column__list">
        {column.issues.map((issue) => (
          <Card key={issue.id} issue={issue} />
        ))}
      </div>

      {/* SELECT как на второй картинке */}
      <div className="moveBox">
        <select
          className="moveSelect"
          value={pickedId}
          onChange={(e) => {
            const id = e.target.value;
            setPickedId(id);
            moveHere(id);
          }}
        >
          <option value=""> </option>
          {movableOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>

      {/* Add card как на первой картинке */}
      <div className="column__footer">
        {!isAdding ? (
          <button className="addCardBtn" onClick={() => setIsAdding(true)} type="button">
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
