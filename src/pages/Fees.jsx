import React from "react";

function Fees() {

  return (
    <div className="student-page">

      <h1>💳 Fee Details</h1>

      <div className="fee-cards">

        <div>
          <h3>Total Fees</h3>
          <h2>₹30,000</h2>
        </div>

        <div>
          <h3>Paid</h3>
          <h2>₹20,000</h2>
        </div>

        <div>
          <h3>Remaining</h3>
          <h2>₹10,000</h2>
        </div>

      </div>

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>Receipt No.</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>KZ1001</td>
              <td>01 July 2026</td>
              <td>₹10,000</td>
              <td>Paid</td>
            </tr>

            <tr>
              <td>KZ1025</td>
              <td>01 Aug 2026</td>
              <td>₹10,000</td>
              <td>Paid</td>
            </tr>
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Fees;