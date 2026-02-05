import { useEffect, useMemo, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { dataMock } from "./mock/dataMock";
import Board from "./components/Board";
import TaskPage from "./pages/TaskPage";
import "./index.css";
import Topbar from "./components/Topbar";

const STORAGE_KEY = "kanban-data";

export default function App() {
  const [columns, setColumns] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : dataMock;
  });


  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(columns));
  }, [columns]);

 
  const activeCount =
    columns.find((c) => c.id === "backlog")?.issues.length ?? 0;

  const finishedCount =
    columns.find((c) => c.id === "finished")?.issues.length ?? 0;

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target)) {
        setIsUserMenuOpen(false);
      }
    };

  document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);
  

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="page">
            <header className="topbar">
              <div className="topbar__title">Awesome Kanban Board</div>
              <div className="topbar__right" ref={userMenuRef}>
                  <button
                    className="userBtn"
                    type="button"
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                  >
                    <span className="avatarCircle">👤</span>
                    <span className={isUserMenuOpen ? "chevron up" : "chevron down"} />
                  </button>

                  {isUserMenuOpen && (
                    <div className="userMenu">
                      <button className="userMenuItem" type="button">Profile</button>
                      <button className="userMenuItem" type="button">Log Out</button>
                    </div>
                  )}
                </div>
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
