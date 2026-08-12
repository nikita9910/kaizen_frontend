import React from "react";
import "../student-pages.css";

function ManageFees() {
  return (
    <div className="student-page">

      <h1>💳 Manage Fees</h1>

      <button className="primary-btn">
        + Add Payment
      </button>

      <br /><br />

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>Student</th>
              <th>Total Fees</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Student One</td>
              <td>₹30,000</td>
              <td>₹20,000</td>
              <td>₹10,000</td>
              <td>Pending</td>
            </tr>

            <tr>
              <td>Student Two</td>
              <td>₹30,000</td>
              <td>₹30,000</td>
              <td>₹0</td>
              <td>Paid</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageFees;