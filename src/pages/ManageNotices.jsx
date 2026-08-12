import React from "react";
import "../student-pages.css";

function ManageNotices() {

  return (
    <div className="student-page">

      <h1>📢 Manage Notices</h1>

      <button className="primary-btn">
        + Add Notice
      </button>

      <br /><br />

      <div className="data-cards">

        <div className="info-card">
          <h2>Holiday Notice</h2>

          <p>
            Coaching class will remain closed
            on Independence Day.
          </p>

          <small>
            10 Aug 2026
          </small>
        </div>

        <div className="info-card">
          <h2>Monthly Test</h2>

          <p>
            Monthly examination will be conducted
            next week.
          </p>

          <small>
            08 Aug 2026
          </small>
        </div>

      </div>

    </div>
  );
}

export default ManageNotices;