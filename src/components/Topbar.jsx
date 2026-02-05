import { useEffect, useRef, useState } from "react";

export default function Topbar() {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(e.target)) setIsUserMenuOpen(false);
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="topbar">
      <div className="topbar__title">Awesome Kanban Board</div>

      <div className="topbar__right" ref={userMenuRef}>
        <button
          className="userBtn"
          type="button"
          onClick={() => setIsUserMenuOpen((v) => !v)}
          aria-expanded={isUserMenuOpen}
          aria-haspopup="menu"
        >
          <span className="avatarCircle">👤</span>
          <span className={isUserMenuOpen ? "chevron up" : "chevron down"} />
        </button>

        {isUserMenuOpen && (
          <div className="userMenu" role="menu">
            <button className="userMenuItem" type="button" role="menuitem">
              Profile
            </button>
            <button className="userMenuItem" type="button" role="menuitem">
              Log Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
