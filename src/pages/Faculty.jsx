import React from "react";
import "./Faculty.css";

function Faculty() {
  const faculty = [
    {
      name: "Prof. Rahul Patil",
      subject: "Mathematics",
      qualification: "M.Sc. Mathematics",
      experience: "8+ Years Experience",
      icon: "👨‍🏫",
    },
    {
      name: "Prof. Priya Sharma",
      subject: "Science",
      qualification: "M.Sc. Physics",
      experience: "7+ Years Experience",
      icon: "👩‍🏫",
    },
    {
      name: "Prof. Amit Deshmukh",
      subject: "English",
      qualification: "M.A. English",
      experience: "6+ Years Experience",
      icon: "👨‍🏫",
    },
    {
      name: "Prof. Sneha Jadhav",
      subject: "Computer Science",
      qualification: "MCA",
      experience: "5+ Years Experience",
      icon: "👩‍💻",
    },
    {
      name: "Prof. Akshay More",
      subject: "Chemistry",
      qualification: "M.Sc. Chemistry",
      experience: "8+ Years Experience",
      icon: "👨‍🔬",
    },
    {
      name: "Prof. Neha Kulkarni",
      subject: "Biology",
      qualification: "M.Sc. Biology",
      experience: "6+ Years Experience",
      icon: "👩‍🔬",
    },
  ];

  return (
    <div className="faculty-page">

      {/* HERO SECTION */}
      <section className="faculty-hero">
        <div>
          <h1>Our Expert Faculty</h1>

          <p>
            Meet our experienced and dedicated teachers
            who guide students towards success.
          </p>
        </div>
      </section>


      {/* INTRODUCTION */}
      <section className="faculty-intro">

        <h2>Meet Our Faculty</h2>

        <p>
          At Kaizen Coaching Class, our faculty members are
          experienced, knowledgeable and passionate about
          teaching. They provide personalized guidance and
          help students understand concepts effectively.
        </p>

      </section>


      {/* FACULTY CARDS */}
      <section className="faculty-container">

        <div className="faculty-grid">

          {faculty.map((teacher, index) => (

            <div className="faculty-card" key={index}>

              <div className="faculty-icon">
                {teacher.icon}
              </div>

              <h3>{teacher.name}</h3>

              <h4>{teacher.subject}</h4>

              <p>
                <strong>Qualification:</strong>
                <br />
                {teacher.qualification}
              </p>

              <p>
                <strong>Experience:</strong>
                <br />
                {teacher.experience}
              </p>

              <button className="faculty-btn">
                View Profile
              </button>

            </div>

          ))}

        </div>

      </section>


      {/* WHY OUR FACULTY */}
      <section className="faculty-features">

        <h2>Why Learn From Our Faculty?</h2>

        <div className="faculty-feature-grid">

          <div className="faculty-feature">
            <span>🎓</span>
            <h3>Qualified Teachers</h3>
            <p>
              Highly qualified teachers with strong
              subject knowledge.
            </p>
          </div>

          <div className="faculty-feature">
            <span>💡</span>
            <h3>Easy Explanation</h3>
            <p>
              Complex concepts are explained using
              simple and practical methods.
            </p>
          </div>

          <div className="faculty-feature">
            <span>🎯</span>
            <h3>Personal Attention</h3>
            <p>
              Individual guidance to improve every
              student's performance.
            </p>
          </div>

          <div className="faculty-feature">
            <span>🏆</span>
            <h3>Result Oriented</h3>
            <p>
              Focus on academic growth and better
              examination results.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Faculty;