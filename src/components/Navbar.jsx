import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <span className="logo-icon">🎓</span>
        <h2>Kaizen Coaching Class</h2>
      </div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/courses">Courses</a></li>
        <li><a href="/faculty">Faculty</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>

      <div className="nav-buttons">
        <button className="login-btn">Login</button>
        <button className="register-btn">Register</button>
      </div>
    </nav>
  );
}

export default Navbar;