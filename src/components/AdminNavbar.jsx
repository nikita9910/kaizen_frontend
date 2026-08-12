import React from "react";
import { Link } from "react-router-dom";

import "./AdminNavbar.css";


function AdminNavbar() {

  return (

    <nav className="admin-navbar">

      {/* Logo */}

      <Link
        to="/admin-dashboard"
        className="admin-logo"
      >

        ⚙️ Kaizen Admin

      </Link>


      {/* Navigation */}

      <ul className="admin-nav-links">

        <li>
          <Link to="/admin-dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/admin-students">
            Students
          </Link>
        </li>

        <li>
          <Link to="/admin-faculty">
            Faculty
          </Link>
        </li>

        <li>
          <Link to="/admin-courses">
            Courses
          </Link>
        </li>

        <li>
          <Link to="/admin-batches">
            Batches
          </Link>
        </li>

        <li>
          <Link to="/admin-attendance">
            Attendance
          </Link>
        </li>

        <li>
          <Link to="/admin-fees">
            Fees
          </Link>
        </li>

        <li>
          <Link to="/admin-exams">
            Exams
          </Link>
        </li>

      </ul>


      {/* Logout */}

      <Link
        to="/"
        className="admin-logout"
      >
        Logout
      </Link>

    </nav>

  );
}


export default AdminNavbar;