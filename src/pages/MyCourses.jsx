import React from "react";

function MyCourses() {
  const courses = [
    {
      name: "Mathematics",
      teacher: "Prof. Rahul Patil",
      progress: "75%"
    },
    {
      name: "Science",
      teacher: "Prof. Sneha Joshi",
      progress: "65%"
    },
    {
      name: "English",
      teacher: "Prof. Priya Shinde",
      progress: "80%"
    }
  ];

  return (
    <div className="student-page">

      <h1>📚 My Courses</h1>
      <p className="page-subtitle">
        Courses currently assigned to you.
      </p>

      <div className="data-cards">

        {courses.map((course, index) => (
          <div className="info-card" key={index}>

            <h2>{course.name}</h2>

            <p>
              <b>Faculty:</b> {course.teacher}
            </p>

            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: course.progress }}
              >
                {course.progress}
              </div>
            </div>

            <button className="primary-btn">
              View Course
            </button>

          </div>
        ))}

      </div>

    </div>
  );
}

export default MyCourses;