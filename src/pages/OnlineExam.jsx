import React from "react";

function OnlineExam() {

  return (
    <div className="student-page">

      <h1>💻 Online Examination</h1>

      <div className="exam-card">

        <span>📝</span>

        <h2>Science Weekly Test</h2>

        <p>
          Total Questions: 30
        </p>

        <p>
          Duration: 30 Minutes
        </p>

        <p>
          Maximum Marks: 30
        </p>

        <button className="primary-btn">
          Start Exam
        </button>

      </div>

    </div>
  );
}

export default OnlineExam;