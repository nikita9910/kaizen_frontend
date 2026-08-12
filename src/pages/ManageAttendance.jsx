import React from "react";
import "../student-pages.css";

function ManageAttendance() {
  return (
    <div className="student-page">

      <h1>📅 Manage Attendance</h1>

      <p className="page-subtitle">
        Record and manage student attendance.
      </p>

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Student One</td>
              <td>10th</td>
              <td>11 Aug 2026</td>
              <td>Present</td>
            </tr>

            <tr>
              <td>Student Two</td>
              <td>12th Science</td>
              <td>11 Aug 2026</td>
              <td>Absent</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageAttendance;