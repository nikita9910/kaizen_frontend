import React from "react";
import "../student-pages.css";

function ManageBatches() {
  return (
    <div className="student-page">

      <h1>🏫 Manage Batches</h1>

      <button className="primary-btn">
        + Add Batch
      </button>

      <br /><br />

      <div className="table-box">

        <table>
          <thead>
            <tr>
              <th>Batch</th>
              <th>Course</th>
              <th>Time</th>
              <th>Faculty</th>
              <th>Students</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>Morning Batch</td>
              <td>10th</td>
              <td>7:00 AM</td>
              <td>Rahul Patil</td>
              <td>35</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default ManageBatches;