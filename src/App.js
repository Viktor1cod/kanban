import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { dataMock } from "./mock/dataMock";
import Board from "./components/Board";
import TaskPage from "./pages/TaskPage";
import "./index.css";

const STORAGE_KEY = "kanban-data";

export default function App() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : dataMock;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

  const { activeCount, finishedCount } = useMemo(() => {
    let active = 0;
    let finished = 0;
    for (const col of columns) {
      for (const issue of col.issues) {
        if (col.id === "finished") finished++;
        else active++;
      }
    }
    return { activeCount: active, finishedCount: finished };
  }, [columns]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="page">
            <header className="topbar">
              <div className="topbar__title">Awesome Kanban Board</div>
              <button className="avatarBtn" type="button" title="Profile">
                <span className="avatarIcon">👤</span>
              </button>
            </header>

            <main className="boardWrap">
              <Board columns={columns} setColumns={setColumns} />
            </main>

            <footer className="footer">
              <div>Active tasks: &lt;{activeCount}&gt;</div>
              <div>Finished tasks: &lt;{finishedCount}&gt;</div>
              <div className="footer__right">Kanban board by &lt;NAME&gt;, &lt;YEAR&gt;</div>
            </footer>
          </div>
        }
      />

      <Route
        path="/tasks/:id"
        element={<TaskPage columns={columns} setColumns={setColumns} />}
      />
    </Routes>
  );
}
