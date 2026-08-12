import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {

  return (
    <div className="admin-dashboard">

      <div className="admin-heading">

        <div>
          <h1>Admin Dashboard ⚙️</h1>
          <p>
            Manage Kaizen Coaching Class operations.
          </p>
        </div>

      </div>


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


      <div className="admin-management">

        <Link to="/admin-students">
          👨‍🎓
          <h3>Manage Students</h3>
        </Link>

        <Link to="/admin-faculty">
          👨‍🏫
          <h3>Manage Faculty</h3>
        </Link>

        <Link to="/admin-courses">
          📚
          <h3>Manage Courses</h3>
        </Link>

        <Link to="/admin-batches">
          🏫
          <h3>Manage Batches</h3>
        </Link>

        <Link to="/admin-attendance">
          📅
          <h3>Attendance</h3>
        </Link>

        <Link to="/admin-fees">
          💳
          <h3>Fees</h3>
        </Link>

        <Link to="/admin-exams">
          📝
          <h3>Examinations</h3>
        </Link>

        <Link to="/admin-material">
          📖
          <h3>Study Material</h3>
        </Link>

        <Link to="/admin-assignments">
          📄
          <h3>Assignments</h3>
        </Link>

        <Link to="/admin-notices">
          📢
          <h3>Notices</h3>
        </Link>

        <Link to="/admin-feedback">
          💬
          <h3>Feedback</h3>
        </Link>

      </div>

    </div>
  );
}

export default AdminDashboard;