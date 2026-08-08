import React from "react";
import "./Home.css";

function Home() {
  return (
    <>

      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content">

          <h1>Welcome to Kaizen Coaching Class</h1>

          <p>
            Learn from experienced teachers and build your future with
            quality education.
          </p>

          <button>Explore Courses</button>

        </div>

      </section>



      {/* About */}

      <section className="about">

        <div className="container">

          <div className="about-text">

            <h2>About Us</h2>

            <p>

              Kizen Coaching Class provides high-quality education with
              experienced faculty, modern classrooms, study materials,
              assignments, online attendance, and examination facilities.

            </p>

          </div>

          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
            alt=""
          />

        </div>

      </section>



      {/* Features */}

      <section className="features">

        <h2>Our Features</h2>

        <div className="feature-box">

          <div className="card">
            <h3>📚 Study Material</h3>
            <p>Access notes, PDFs and recorded lectures.</p>
          </div>

          <div className="card">
            <h3>👨‍🏫 Expert Faculty</h3>
            <p>Learn from highly qualified teachers.</p>
          </div>

          <div className="card">
            <h3>📝 Online Exams</h3>
            <p>Practice and improve with online tests.</p>
          </div>

          <div className="card">
            <h3>📈 Progress Report</h3>
            <p>Track attendance and academic performance.</p>
          </div>

        </div>

      </section>



      {/* Courses */}

      <section className="courses">

        <h2>Popular Courses</h2>

        <div className="course-box">

          <div className="course-card">
            <h3>Python</h3>
            <p>Beginner to Advanced</p>
          </div>

          <div className="course-card">
            <h3>Java</h3>
            <p>Core & Advanced Java</p>
          </div>

          <div className="course-card">
            <h3>Web Development</h3>
            <p>HTML CSS JavaScript React Django</p>
          </div>

          <div className="course-card">
            <h3>Database</h3>
            <p>SQL & MySQL</p>
          </div>

        </div>

      </section>



      {/* Statistics */}

      <section className="stats">

        <div>

          <h1>1000+</h1>

          <p>Students</p>

        </div>

        <div>

          <h1>25+</h1>

          <p>Courses</p>

        </div>

        <div>

          <h1>20+</h1>

          <p>Faculty</p>

        </div>

        <div>

          <h1>98%</h1>

          <p>Success Rate</p>

        </div>

      </section>



      {/* Why Choose */}

      <section className="choose">

        <h2>Why Choose Kizen?</h2>

        <div className="choose-grid">

          <div>
            ✅ Experienced Teachers
          </div>

          <div>
            ✅ Modern Learning Environment
          </div>

          <div>
            ✅ Affordable Fees
          </div>

          <div>
            ✅ Online Study Material
          </div>

          <div>
            ✅ Career Guidance
          </div>

          <div>
            ✅ Placement Assistance
          </div>

        </div>

      </section>



      {/* Footer */}

      <footer>

        <h3>Kaizen Coaching Class</h3>

        <p>
          Empowering Students Through Quality Education
        </p>

        <p>
          © 2026 All Rights Reserved
        </p>

      </footer>

    </>
  );
}

export default Home;