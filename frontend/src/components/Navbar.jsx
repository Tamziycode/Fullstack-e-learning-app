import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDark, setIsDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("light", !isDark);
  }, [isDark]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate("/Signin");
  };

  return (
    <header>
      <nav className="navbar">
        {/* ── Desktop nav ── */}
        <ul>
          <li>
            <Link to="/" className="logo">
              Learnova
            </Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/Courses">Courses</Link>
              </li>
              <li>
                <Link to="/Dashboard">Dashboard</Link>
              </li>
              <li>
                <button className="nav-logout" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/Signup">Signup</Link>
              </li>
              <li>
                <Link to="/Signin">Signin</Link>
              </li>
            </>
          )}
          <li>
            <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
              {isDark ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>

        {/* ── Mobile top bar ── */}
        <div
          style={{
            display: "none",
            alignItems: "center",
            justifyContent: "space-between",
            height: "64px",
          }}
          className="mobile-topbar"
        >
          <Link to="/" className="logo">
            Learnova
          </Link>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <button className="theme-toggle" onClick={() => setIsDark(!isDark)}>
              {isDark ? "☀️" : "🌙"}
            </button>
            <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/About">About</Link>
          {user ? (
            <>
              <Link to="/Courses">Courses</Link>
              <Link to="/Dashboard">Dashboard</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/Signup">Signup</Link>
              <Link to="/Signin">Signin</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
