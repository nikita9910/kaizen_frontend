import React from "react";
import "../student-pages.css";

function ManageFeedback() {

  return (
    <div className="student-page">

      <h1>💬 Student Feedback</h1>

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>Student</th>
              <th>Subject</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Student One</td>
              <td>Mathematics</td>
              <td>⭐⭐⭐⭐⭐</td>
              <td>Excellent teaching.</td>
              <td>10 Aug 2026</td>
            </tr>

            <tr>
              <td>Student Two</td>
              <td>Science</td>
              <td>⭐⭐⭐⭐</td>
              <td>Very helpful study material.</td>
              <td>09 Aug 2026</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageFeedback;