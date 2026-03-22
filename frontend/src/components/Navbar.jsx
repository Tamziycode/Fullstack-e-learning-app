import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import cartIcon from "../assets/icons/cart.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/Signin");
  };

  return (
    <header>
      <nav className="navbar">
        <ul
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            listStyleType: "none",
          }}
        >
          <li>
            <Link to="/">Home</Link>
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
                  <img className="carticon" src={cartIcon} alt="CartIcon" />
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    color: "inherit",
                    fontSize: "inherit",
                  }}
                >
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
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
