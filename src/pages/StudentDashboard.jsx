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
          to="/mycourses"
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
          to="/attendance"
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
          to="/studymaterial"
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
          to="/assignments"
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
          to="/onlineexams"
          className="dashboard-card"
        >

          <span>💻</span>

          <h3>
             Exams
          </h3>

          <p>
            Attempt online examinations.
          </p>

        </Link>



        {/* RESULTS */}

        <Link
          to="/results"
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
          to="/fees"
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

        <Link
          to="/notices"
          className="dashboard-card"
        >

          <span>📢</span>

          <h3>
            Notices
          </h3>

          <p>
            View important class notices.
          </p>

        </Link>

        {/* FEEDBACK */}


        <Link
          to="/feedback"
          className="dashboard-card">
          <span>💬</span>
          <h3>
            Feedback
          </h3>
          <p>
            feedback and queries.
          </p>
        </Link>

      </div>


    </div>

  );
}


export default StudentDashboard;