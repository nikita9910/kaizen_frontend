import React from "react";
import "./Courses.css";


function Courses() {
  return (
    <div className="courses-page">

      {/* Header */}
      <section className="courses-header">
        <h1>Our Courses</h1>
        <p>
          Quality Education for a Bright and Successful Future
        </p>
      </section>

      {/* Courses */}
      <section className="courses-section">

        <div className="courses-container">

          {/* State Board */}
          <div className="course-card">
            <div className="course-icon">📚</div>

            <h2>7th to 10th</h2>

            <h3>State Board</h3>

            <p>
              Complete academic coaching for Maharashtra State Board
              students from 7th to 10th standard.
            </p>

            <ul>
              <li>✔ Mathematics</li>
              <li>✔ Science</li>
              <li>✔ English</li>
              <li>✔ Social Science</li>
              <li>✔ Regular Tests</li>
            </ul>

            <a href="/registration" className="course-btn">
              Enroll Now
            </a>
          </div>


          {/* CBSE */}
          <div className="course-card">
            <div className="course-icon">🎓</div>

            <h2>5th to 10th</h2>

            <h3>CBSE Board</h3>

            <p>
              Concept-based coaching and personalized guidance for
              CBSE students from 5th to 10th standard.
            </p>

            <ul>
              <li>✔ Mathematics</li>
              <li>✔ Science</li>
              <li>✔ English</li>
              <li>✔ Concept Building</li>
              <li>✔ Practice Tests</li>
            </ul>

            <a href="/registration" className="course-btn">
              Enroll Now
            </a>
          </div>


          {/* Science */}
          <div className="course-card">
            <div className="course-icon">🔬</div>

            <h2>11th & 12th</h2>

            <h3>Science</h3>

            <p>
              Comprehensive preparation for 11th and 12th Science
              students with experienced faculty and regular assessments.
            </p>

            <ul>
              <li>✔ Physics</li>
              <li>✔ Chemistry</li>
              <li>✔ Mathematics</li>
              <li>✔ Biology</li>
              <li>✔ Board Exam Preparation</li>
            </ul>

            <a href="/registration" className="course-btn">
              Enroll Now
            </a>
          </div>


          {/* Scholarship */}
          <div className="course-card scholarship-card">
            <div className="course-icon">🏆</div>

            <h2>Scholarship</h2>

            <h3>NMMS Preparation</h3>

            <p>
              Special preparation program for students appearing for
              Scholarship and NMMS examinations.
            </p>

            <ul>
              <li>✔ Mental Ability Test</li>
              <li>✔ Scholastic Aptitude</li>
              <li>✔ Practice Papers</li>
              <li>✔ Mock Tests</li>
              <li>✔ Expert Guidance</li>
            </ul>

            <a href="/registration" className="course-btn">
              Enroll Now
            </a>
          </div>

        </div>

      </section>


      {/* Why Choose Us */}
      <section className="why-section">

        <h2>Why Choose Kaizen Coaching Class?</h2>

        <div className="why-container">

          <div className="why-box">
            <span>👨‍🏫</span>
            <h3>Experienced Faculty</h3>
            <p>
              Learn from experienced and dedicated teachers.
            </p>
          </div>

          <div className="why-box">
            <span>📝</span>
            <h3>Regular Tests</h3>
            <p>
              Regular tests and assessments to track your progress.
            </p>
          </div>

          <div className="why-box">
            <span>🎯</span>
            <h3>Personal Attention</h3>
            <p>
              Individual guidance to improve student performance.
            </p>
          </div>

          <div className="why-box">
            <span>🏆</span>
            <h3>Better Results</h3>
            <p>
              Focused preparation to help students achieve their goals.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default Courses;