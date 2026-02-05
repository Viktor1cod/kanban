import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Topbar from "../components/Topbar";

export default function TaskPage({ columns, setColumns }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = useMemo(() => {
    for (const col of columns) {
      const found = col.issues.find((i) => i.id === id);
      if (found) return { ...found, columnId: col.id };
    }
    return null;
  }, [columns, id]);

  const [desc, setDesc] = useState(task?.description ?? "");

  // если задача не найдена
  if (!task) {
    return (
      <div className="page">
        <Topbar />
          <div className="topbar__title">Awesome Kanban Board</div>
        <main className="boardWrap">
          <div className="taskModal">
            <div className="taskModal__header">
              <div className="taskModal__title">Task not found</div>
              <button className="iconBtn" onClick={() => navigate("/")} type="button">
                ✕
              </button>
            </div>
            <div className="taskModal__body">No task with id: {id}</div>
          </div>
        </main>
      </div>
    );
  }

  const save = () => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === task.columnId
          ? {
              ...col,
              issues: col.issues.map((i) =>
                i.id === task.id ? { ...i, description: desc } : i
              ),
            }
          : col
      )
    );
  };

  return (
    <div className="page">
        <Topbar />
            <main className="boardWrap">
                <div className="taskModal">
                    <div className="taskModal__header">
                        <div className="taskModal__title">{task.name}</div>
                            <button className="iconBtn" onClick={() => navigate("/")} type="button">
                                ✕
                        </button>
                    </div>

          <div className="taskModal__body">
            <textarea
              className="textarea"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Task description..."
            />
          </div>

          <div className="taskModal__footer">
            <button className="btn" type="button" onClick={save}>
              Save
            </button>
            <button className="btn ghost" type="button" onClick={() => navigate("/")}>
              Back
            </button>
          </div>
        </div>
      </main>

      <footer className="footer">
        <div />
        <div />
        <div className="footer__right">/tasks/{task.id}</div>
      </footer>
    </div>
  );
}
