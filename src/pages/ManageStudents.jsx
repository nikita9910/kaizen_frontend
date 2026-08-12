import React from "react";
import "../student-pages.css";

function ManageStudents() {

  return (
    <div className="student-page">

      <h1>👨‍🎓 Manage Students</h1>

      <p className="page-subtitle">
        Add, update and manage student records.
      </p>

      <button className="primary-btn">
        + Add Student
      </button>

      <br />
      <br />

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Student Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>1</td>
              <td>Student One</td>
              <td>student1@gmail.com</td>
              <td>10th</td>
              <td>Morning</td>
              <td>
                <button className="primary-btn">
                  Edit
                </button>
              </td>
            </tr>

            <tr>
              <td>2</td>
              <td>Student Two</td>
              <td>student2@gmail.com</td>
              <td>12th Science</td>
              <td>Evening</td>
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

export default ManageStudents;