import React from "react";
import { Link } from "react-router-dom";
import "./StudentDashboard.css";

function StudentDashboard() {
  return (
    <div className="student-dashboard">

      <div className="dashboard-header">
        <div>
          <h1>Welcome, Student! 👋</h1>
          <p>Welcome to your Kaizen Coaching Class dashboard.</p>
        </div>
      </div>

      <div className="dashboard-cards">

        <Link to="/student-courses" className="dashboard-card">
          <span>📚</span>
          <h3>My Courses</h3>
          <p>View your enrolled courses.</p>
        </Link>

        <Link to="/student-attendance" className="dashboard-card">
          <span>📅</span>
          <h3>Attendance</h3>
          <p>Check your attendance.</p>
        </Link>

        <Link to="/student-material" className="dashboard-card">
          <span>📖</span>
          <h3>Study Material</h3>
          <p>Access learning materials.</p>
        </Link>

        <Link to="/student-assignments" className="dashboard-card">
          <span>📝</span>
          <h3>Assignments</h3>
          <p>View and submit assignments.</p>
        </Link>

        <Link to="/student-exams" className="dashboard-card">
          <span>💻</span>
          <h3>Online Exams</h3>
          <p>Attempt online examinations.</p>
        </Link>

        <Link to="/student-results" className="dashboard-card">
          <span>🏆</span>
          <h3>Results</h3>
          <p>Check your examination results.</p>
        </Link>

        <Link to="/student-fees" className="dashboard-card">
          <span>💳</span>
          <h3>Fees</h3>
          <p>View your fee information.</p>
        </Link>

        <Link to="/student-profile" className="dashboard-card">
          <span>👤</span>
          <h3>My Profile</h3>
          <p>View and update your profile.</p>
        </Link>

      </div>

    </div>
  );
}

export default StudentDashboard;