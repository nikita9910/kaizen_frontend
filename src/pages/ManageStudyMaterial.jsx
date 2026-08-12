import React from "react";
import "../student-pages.css";

function ManageStudyMaterial() {

  return (
    <div className="student-page">

      <h1>📖 Manage Study Material</h1>

      <button className="primary-btn">
        + Upload Material
      </button>

      <br /><br />

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>Material</th>
              <th>Subject</th>
              <th>Course</th>
              <th>Type</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Algebra Notes</td>
              <td>Mathematics</td>
              <td>10th</td>
              <td>PDF</td>
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

export default ManageStudyMaterial;