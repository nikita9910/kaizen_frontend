import React from "react";

function Profile() {

  return (
    <div className="student-page">

      <h1>👤 My Profile</h1>

      <div className="profile-card">

        <div className="profile-avatar">
          👤
        </div>

        <h2>Student Name</h2>

        <p>Student ID: KZ2026001</p>

        <div className="profile-details">

          <p>
            <b>Email:</b> student@example.com
          </p>

          <p>
            <b>Mobile:</b> 9876543210
          </p>

          <p>
            <b>Course:</b> 10th State Board
          </p>

          <p>
            <b>Batch:</b> Morning Batch
          </p>

        </div>

        <button className="primary-btn">
          Edit Profile
        </button>

      </div>

    </div>
  );
}

export default Profile;