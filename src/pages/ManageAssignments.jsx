import React from "react";
import "../student-pages.css";

function ManageAssignments() {

  return (
    <div className="student-page">

      <h1>📄 Manage Assignments</h1>

      <button className="primary-btn">
        + Create Assignment
      </button>

      <br /><br />

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>Assignment</th>
              <th>Subject</th>
              <th>Course</th>
              <th>Due Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Algebra Questions</td>
              <td>Mathematics</td>
              <td>10th</td>
              <td>20 Aug 2026</td>
              <td>
                <button className="primary-btn">
                  View
                </button>
              </td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageAssignments;