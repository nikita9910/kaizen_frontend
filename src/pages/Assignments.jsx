import React from "react";

function Assignments() {

  return (
    <div className="student-page">

      <h1>📝 Assignments</h1>

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>Assignment</th>
              <th>Subject</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Algebra Assignment</td>
              <td>Mathematics</td>
              <td>20 Aug 2026</td>
              <td>Pending</td>
              <td>
                <button className="primary-btn">
                  Submit
                </button>
              </td>
            </tr>

            <tr>
              <td>Motion Assignment</td>
              <td>Science</td>
              <td>22 Aug 2026</td>
              <td>Submitted</td>
              <td>✓ Completed</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Assignments;