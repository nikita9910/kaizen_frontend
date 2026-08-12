import React from "react";

function Attendance() {
  return (
    <div className="student-page">

      <h1>📅 Attendance</h1>

      <div className="attendance-summary">

        <div>
          <h2>82%</h2>
          <p>Overall Attendance</p>
        </div>

        <div>
          <h2>45</h2>
          <p>Present Days</p>
        </div>

        <div>
          <h2>10</h2>
          <p>Absent Days</p>
        </div>

      </div>

      <div className="table-box">

        <h2>Attendance Details</h2>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Subject</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>10 Aug 2026</td>
              <td>Mathematics</td>
              <td className="present">Present</td>
            </tr>

            <tr>
              <td>09 Aug 2026</td>
              <td>Science</td>
              <td className="present">Present</td>
            </tr>

            <tr>
              <td>08 Aug 2026</td>
              <td>English</td>
              <td className="absent">Absent</td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Attendance;