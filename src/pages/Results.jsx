import React from "react";

function Results() {

  return (
    <div className="student-page">

      <h1>🏆 Examination Results</h1>

      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>Exam</th>
              <th>Subject</th>
              <th>Marks</th>
              <th>Total</th>
              <th>Grade</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Monthly Test</td>
              <td>Mathematics</td>
              <td>85</td>
              <td>100</td>
              <td>A</td>
            </tr>

            <tr>
              <td>Monthly Test</td>
              <td>Science</td>
              <td>78</td>
              <td>100</td>
              <td>B+</td>
            </tr>

            <tr>
              <td>Monthly Test</td>
              <td>English</td>
              <td>88</td>
              <td>100</td>
              <td>A</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Results;