import React from "react";
import { Link } from "react-router-dom";

import "./PublicNavbar.css";


function PublicNavbar() {

  return (

    <nav className="public-navbar">

      {/* Logo */}

      <Link to="/" className="public-logo">

        <span className="logo-icon">
          🎓
        </span>

        <span>
          Kaizen Coaching Class
        </span>

      </Link>


      {/* Navigation */}

      <ul className="public-nav-links">

        <li>
          <Link to="/">
            Home
          </Link>
        </li>
 
        <li>
          <Link to="/about">
            About
          </Link>
        </li>

        <li>
          <Link to="/courses">
            Courses
          </Link>
        </li>

        <li>
          <Link to="/faculty">
            Faculty
          </Link>
        </li>

        <li>
          <Link to="/gallery">
            Gallery
          </Link>
        </li>

        <li>
          <Link to="/contact">
            Contact
          </Link>
        </li> 

      </ul>


      {/* Buttons */}

      <div className="public-buttons">

        <Link
          to="/student-login"
          className="student-login-btn"
        >
          Student Login
        </Link>


        <Link
          to="/admin-login"
          className="admin-login-btn"
        >
          Admin Login
        </Link>

      </div>

    </nav>

  );
}


export default PublicNavbar;