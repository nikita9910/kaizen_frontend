import React from "react";

function StudyMaterial() {

  const materials = [
    "Mathematics - Algebra Notes",
    "Science - Physics Notes",
    "English Grammar Notes",
    "Chemistry Important Questions",
    "Previous Year Question Papers"
  ];

  return (
    <div className="student-page">

      <h1>📖 Study Material</h1>

      <p className="page-subtitle">
        Download and access your study materials.
      </p>

      <div className="material-list">

        {materials.map((item, index) => (
          <div className="material-item" key={index}>

            <div>
              <span>📄</span>
              <b>{item}</b>
            </div>

            <button className="primary-btn">
              Download
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default StudyMaterial;