import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import cartIcon from "../assets/icons/cart.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Dark is default — only add "light" class when toggled
    document.body.classList.toggle("light", !isDark);
  }, [isDark]);

  const handleLogout = () => {
    logout();
    navigate("/Signin");
  };

  return (
    <header>
      <nav className="navbar">
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
                <Link to="/Cart">
                  <img
                    className="carticon"
                    src={cartIcon}
                    alt="Cart"
                    style={{ width: 22, opacity: 0.7 }}
                  />
                </Link>
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
            <button
              className="theme-toggle"
              onClick={() => setIsDark(!isDark)}
              title="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
