import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {

  const navigate = useNavigate();

  // Get logged-in student information
  const user = JSON.parse(
    localStorage.getItem("user")
  );


  // ============================
  // LOGOUT
  // ============================

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("userType");

    navigate("/student-login");

  };


  return (

    <div className="student-dashboard">


      {/* =========================
          DASHBOARD HEADER
          ========================= */}

      <div className="dashboard-header">

        <div>

          <h1>
            Welcome,{" "}
            {user?.first_name || "Student"}! 👋
          </h1>

          <p>
            Welcome to your Kaizen Coaching Class dashboard.
          </p>

        </div>


        {/* LOGOUT BUTTON */}

        <button
          className="dashboard-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>



      {/* =========================
          STUDENT INFORMATION
          ========================= */}

      <div className="student-info">

        <div className="student-profile-icon">
          👤
        </div>


        <div className="student-details">

          <h2>
            {user?.first_name}{" "}
            {user?.last_name}
          </h2>

          <p>
            📧 {user?.email}
          </p>

          <p>
            📱 {user?.mobile}
          </p>

        </div>

      </div>



      {/* =========================
          DASHBOARD CARDS
          ========================= */}

      <div className="dashboard-cards">


        {/* MY COURSES */}

        <Link
          to="/student-courses"
          className="dashboard-card"
        >

          <span>📚</span>

          <h3>
            My Courses
          </h3>

          <p>
            View your enrolled courses.
          </p>

        </Link>



        {/* ATTENDANCE */}

        <Link
          to="/student-attendance"
          className="dashboard-card"
        >

          <span>📅</span>

          <h3>
            Attendance
          </h3>

          <p>
            Check your attendance.
          </p>

        </Link>



        {/* STUDY MATERIAL */}

        <Link
          to="/student-material"
          className="dashboard-card"
        >

          <span>📖</span>

          <h3>
            Study Material
          </h3>

          <p>
            Access learning materials.
          </p>

        </Link>



        {/* ASSIGNMENTS */}

        <Link
          to="/student-assignments"
          className="dashboard-card"
        >

          <span>📝</span>

          <h3>
            Assignments
          </h3>

          <p>
            View and submit assignments.
          </p>

        </Link>



        {/* ONLINE EXAMS */}

        <Link
          to="/student-exams"
          className="dashboard-card"
        >

          <span>💻</span>

          <h3>
            Online Exams
          </h3>

          <p>
            Attempt online examinations.
          </p>

        </Link>



        {/* RESULTS */}

        <Link
          to="/student-results"
          className="dashboard-card"
        >

          <span>🏆</span>

          <h3>
            Results
          </h3>

          <p>
            Check your examination results.
          </p>

        </Link>



        {/* FEES */}

        <Link
          to="/student-fees"
          className="dashboard-card"
        >

          <span>💳</span>

          <h3>
            Fees
          </h3>

          <p>
            View your fee information.
          </p>

        </Link>



        {/* PROFILE */}

        <Link
          to="/student-profile"
          className="dashboard-card"
        >

          <span>👤</span>

          <h3>
            My Profile
          </h3>

          <p>
            View and update your profile.
          </p>

        </Link>


      </div>


    </div>

  );
}


export default StudentDashboard;