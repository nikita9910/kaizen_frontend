import React from "react";
import { Link } from "react-router-dom";

import "./StudentNavbar.css";


function StudentNavbar() {

  return (

    <nav className="student-navbar">

      {/* Logo */}

      <Link
        to="/student-dashboard"
        className="student-logo"
      >

        🎓 Kaizen Student

      </Link>


      {/* Links */}

      <ul className="student-nav-links">

        <li>
          <Link to="/student-dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/student-courses">
            My Courses
          </Link>
        </li>

        <li>
          <Link to="/student-attendance">
            Attendance
          </Link>
        </li>

        <li>
          <Link to="/student-material">
            Study Material
          </Link>
        </li>

        <li>
          <Link to="/student-exams">
            Exams
          </Link>
        </li>

        <li>
          <Link to="/student-results">
            Results
          </Link>
        </li>

      </ul>


      {/* Profile */}

      <div className="student-profile">

        <Link to="/student-profile">
          👤 Profile
        </Link>

        <Link
          to="/"
          className="student-logout"
        >
          Logout
        </Link>

      </div>

    </nav>

  );
}


export default StudentNavbar;