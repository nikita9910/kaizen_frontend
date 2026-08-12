import React from "react";
import "../student-pages.css";

function ManageCourses() {
  return (
    <div className="student-page">

      <h1>📚 Manage Courses</h1>

      <button className="primary-btn">
        + Add Course
      </button>

      <br /><br />

      <div className="table-box">

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Course</th>
              <th>Board</th>
              <th>Duration</th>
              <th>Fees</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>10th Standard</td>
              <td>State Board</td>
              <td>1 Year</td>
              <td>₹30,000</td>
              <td>
                <button className="primary-btn">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default ManageCourses;