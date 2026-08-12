import React from "react";
import "../student-pages.css";

function ManageExams() {
  return (
    <div className="student-page">

      <h1>📝 Manage Examinations</h1>

      <button className="primary-btn">
        + Create Exam
      </button>

      <br /><br />

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>Exam</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Marks</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Monthly Test</td>
              <td>Mathematics</td>
              <td>20 Aug 2026</td>
              <td>100</td>
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

export default ManageExams;