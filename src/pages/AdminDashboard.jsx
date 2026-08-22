import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  // Get logged-in admin information
  const user = JSON.parse(localStorage.getItem("user"));

  // ============================
  // LOGOUT
  // ============================

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userType");

    navigate("/admin-login");
  };

  return (
    <div className="admin-dashboard">

      {/* =========================
          DASHBOARD HEADER
          ========================= */}

      <div className="admin-heading">

        <div>
          <h1>
            Welcome,{" "}
            {user?.first_name || "Admin"}! 👋
          </h1>

          <p>
            Welcome to your Kaizen Coaching Class admin dashboard.
          </p>
        </div>

        {/* LOGOUT BUTTON */}

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>


      {/* =========================
          ADMIN INFORMATION
          ========================= */}

      <div className="admin-info">

        <div className="admin-profile-icon">
          ⚙️
        </div>

        <div className="admin-details">

          <h2>
            {user?.first_name || "Admin"}{" "}
            {user?.last_name || ""}
          </h2>

          <p>
            📧 {user?.email || "admin@kaizen.com"}
          </p>

          <p>
            📱 {user?.mobile || "Admin Account"}
          </p>

        </div>

      </div>


      {/* =========================
          ADMIN STATISTICS
          ========================= */}

      <div className="admin-statistics">

        <div className="admin-stat-card">
          <span>👨‍🎓</span>
          <h2>250</h2>
          <p>Total Students</p>
        </div>

        <div className="admin-stat-card">
          <span>👨‍🏫</span>
          <h2>15</h2>
          <p>Total Faculty</p>
        </div>

        <div className="admin-stat-card">
          <span>📚</span>
          <h2>12</h2>
          <p>Total Courses</p>
        </div>

        <div className="admin-stat-card">
          <span>💰</span>
          <h2>₹4.5L</h2>
          <p>Fee Collection</p>
        </div>

      </div>


      {/* =========================
          ADMIN MANAGEMENT CARDS
          ========================= */}

      <div className="admin-management">

        <Link
          to="/managestudents"
          className="admin-management-card"
        >
          <span>👨‍🎓</span>
          <h3>Manage Students</h3>
          <p>Add, update and manage students.</p>
        </Link>


        <Link
          to="/managefaculty"
          className="admin-management-card"
        >
          <span>👨‍🏫</span>
          <h3>Manage Faculty</h3>
          <p>Manage teachers and faculty members.</p>
        </Link>


        <Link
          to="/managecourses"
          className="admin-management-card"
        >
          <span>📚</span>
          <h3>Manage Courses</h3>
          <p>Create and manage coaching courses.</p>
        </Link>


        <Link
          to="/managebatches"
          className="admin-management-card"
        >
          <span>🏫</span>
          <h3>Manage Batches</h3>
          <p>Manage student batches and schedules.</p>
        </Link>


        <Link
          to="/manageattendance"
          className="admin-management-card"
        >
          <span>📅</span>
          <h3>Attendance</h3>
          <p>Manage student attendance records.</p>
        </Link>


        <Link
          to="/admin-fees"
          className="admin-management-card"
        >
          <span>💳</span>
          <h3>Fees</h3>
          <p>Manage student fee payments.</p>
        </Link>


        <Link
          to="/admin-exams"
          className="admin-management-card"
        >
          <span>💻</span>
          <h3>Examinations</h3>
          <p>Create and manage online examinations.</p>
        </Link>


        <Link
          to="/admin-material"
          className="admin-management-card"
        >
          <span>📖</span>
          <h3>Study Material</h3>
          <p>Upload and manage study materials.</p>
        </Link>


        <Link
          to="/admin-assignments"
          className="admin-management-card"
        >
          <span>📝</span>
          <h3>Assignments</h3>
          <p>Create and manage student assignments.</p>
        </Link>


        <Link
          to="/admin-notices"
          className="admin-management-card"
        >
          <span>📢</span>
          <h3>Notices</h3>
          <p>Publish important class notices.</p>
        </Link>


        <Link
          to="/admin-feedback"
          className="admin-management-card"
        >
          <span>💬</span>
          <h3>Feedback</h3>
          <p>View student feedback and queries.</p>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;