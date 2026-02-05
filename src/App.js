import { useMemo, useState } from "react";
import { dataMock } from "./mock/dataMock";
import Board from "./components/Board";
import "./index.css";

export default function App() {
  const [columns, setColumns] = useState(dataMock);

  const { activeCount, finishedCount } = useMemo(() => {
    let active = 0;
    let done = 0;
    for (const col of columns) {
      for (const card of col.issues) {
        if (col.id === "finished") done += 1;
        else active += 1;
      }
    }
    return { activeCount: active, finishedCount: done };
  }, [columns]);

  return (
    <div className="page">
      <header className="topbar">
        <div className="topbar__title">Awesome Kanban Board</div>

        <div className="topbar__right">
          <button className="avatarBtn" type="button" title="Profile">
            <span className="avatarIcon">👤</span>
          </button>
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
  );
}
