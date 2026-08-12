import React from "react";
import "../student-pages.css";

function ManageFaculty() {
  return (
    <div className="student-page">

      <h1>👨‍🏫 Manage Faculty</h1>

      <button className="primary-btn">
        + Add Faculty
      </button>

      <br /><br />

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Subject</th>
              <th>Experience</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>Rahul Patil</td>
              <td>Mathematics</td>
              <td>8 Years</td>
              <td>
                <button className="primary-btn">Edit</button>
              </td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageFaculty;