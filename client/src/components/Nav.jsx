import React from "react";
import './Nav.css';
import { useAuth } from "../context/Authcontext"; // make sure path is correct
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears token and state
    navigate("/"); // redirect to login page
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-title">Himalayan Nuts</div>
        <div className="navbar-links">
          {isAuthenticated && (
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
