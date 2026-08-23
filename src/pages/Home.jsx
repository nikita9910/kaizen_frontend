import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="hero">

        {/* LEFT CONTENT */}

        <div className="hero-content">

          <div className="hero-badge">
            🎓 KAIZEN COACHING CLASS
          </div>

          <h1>
            Build Your Future
            <span> With Kaizen</span>
          </h1>

          <p className="hero-subtitle">
            Learn • Practice • Improve • Succeed
          </p>

          <p className="hero-description">
            Quality education, expert guidance and personal
            attention to help every student achieve their
            academic goals.
          </p>

          <div className="hero-buttons">

            <Link
              to="/courses"
              className="primary-btn"
            >
              Explore Courses →
            </Link>

            <Link
              to="/registration"
              className="secondary-btn"
            >
              Join Now
            </Link>

          </div>

        </div>


        {/* =================================================
            KAIZEN LOGO
        ================================================= */}

        <div className="hero-logo-box">

          <div className="logo-circle">

            <img
              src="/kaizen-logo.png"
              alt="Kaizen Coaching Class Logo"
              className="hero-logo"
            />

          </div>

          <h3>
            Kaizen Coaching Class
          </h3>

          <p>
            Learn • Practice • Improve • Succeed
          </p>

          <div className="logo-line"></div>

          <span>
            Education For A Brighter Future
          </span>

        </div>

      </section>


      {/* =====================================================
          QUICK STATS
      ===================================================== */}

      <section className="quick-stats">

        <div className="quick-stat">

          <span>📚</span>

          <div>
            <strong>4+</strong>
            <p>Programs</p>
          </div>

        </div>


        <div className="quick-stat">

          <span>🎓</span>

          <div>
            <strong>7th–12th</strong>
            <p>Classes</p>
          </div>

        </div>


        <div className="quick-stat">

          <span>👨‍🏫</span>

          <div>
            <strong>Expert</strong>
            <p>Faculty</p>
          </div>

        </div>


        <div className="quick-stat">

          <span>🏆</span>

          <div>
            <strong>100%</strong>
            <p>Dedication</p>
          </div>

        </div>

      </section>


      {/* =====================================================
          COURSE SECTION
      ===================================================== */}

      <section className="courses-section">

        <div className="section-heading">

          <p>
            WHAT WE OFFER
          </p>

          <h2>
            Education For Every
            <span> Bright Mind</span>
          </h2>

          <div className="heading-line"></div>

          <small>
            Choose the right learning program for your
            academic journey.
          </small>

        </div>


        <div className="course-cards">


          {/* =================================================
              COURSE 1
          ================================================= */}

          <div className="course-card">

            <div className="card-icon">
              📘
            </div>

            <span className="card-tag">
              STATE BOARD
            </span>

            <h3>
              7th to 10th
            </h3>

            <p>
              Complete academic preparation with strong
              fundamentals and exam-focused learning.
            </p>

            <Link to="/courses">
              Learn More →
            </Link>

          </div>


          {/* =================================================
              COURSE 2
          ================================================= */}

          <div className="course-card">

            <div className="card-icon">
              🎓
            </div>

            <span className="card-tag">
              CBSE
            </span>

            <h3>
              5th to 10th
            </h3>

            <p>
              Concept-based learning designed to improve
              understanding, confidence and performance.
            </p>

            <Link to="/courses">
              Learn More →
            </Link>

          </div>


          {/* =================================================
              COURSE 3
          ================================================= */}

          <div className="course-card">

            <div className="card-icon">
              🔬
            </div>

            <span className="card-tag">
              SCIENCE
            </span>

            <h3>
              11th & 12th
            </h3>

            <p>
              Focused science coaching for board examinations
              and a strong academic foundation.
            </p>

            <Link to="/courses">
              Learn More →
            </Link>

          </div>


          {/* =================================================
              COURSE 4
          ================================================= */}

          <div className="course-card">

            <div className="card-icon">
              🏆
            </div>

            <span className="card-tag">
              SCHOLARSHIP
            </span>

            <h3>
              NMMS
            </h3>

            <p>
              Special preparation and guidance for scholarship
              examinations and competitive success.
            </p>

            <Link to="/courses">
              Learn More →
            </Link>

          </div>


        </div>

      </section>


      {/* =====================================================
          WHY KAIZEN
      ===================================================== */}

      <section className="why-section">

        <div className="why-content">


          {/* LEFT */}

          <div className="why-text">

            <p className="small-title">
              WHY CHOOSE KAIZEN?
            </p>

            <h2>
              More Than Just
              <span> Classroom Learning</span>
            </h2>

            <p className="why-description">
              At Kaizen Coaching Class, we believe every
              student has the potential to achieve something
              great. Our teaching approach focuses on
              concepts, practice and continuous improvement.
            </p>


            <div className="features">


              <div className="feature">

                <span className="feature-icon">
                  ✓
                </span>

                <div>

                  <h4>
                    Expert Guidance
                  </h4>

                  <p>
                    Learn from experienced teachers.
                  </p>

                </div>

              </div>


              <div className="feature">

                <span className="feature-icon">
                  ✓
                </span>

                <div>

                  <h4>
                    Personal Attention
                  </h4>

                  <p>
                    Individual attention for every student.
                  </p>

                </div>

              </div>


              <div className="feature">

                <span className="feature-icon">
                  ✓
                </span>

                <div>

                  <h4>
                    Regular Practice
                  </h4>

                  <p>
                    Tests and practice to improve performance.
                  </p>

                </div>

              </div>


              <div className="feature">

                <span className="feature-icon">
                  ✓
                </span>

                <div>

                  <h4>
                    Student Success
                  </h4>

                  <p>
                    Focused learning for better results.
                  </p>

                </div>

              </div>


            </div>

          </div>


          {/* RIGHT */}

          <div className="success-box">

            <div className="success-circle">
              🎓
            </div>

            <h3>
              Learn
            </h3>

            <span>
              ↓
            </span>

            <h3>
              Practice
            </h3>

            <span>
              ↓
            </span>

            <h3>
              Succeed
            </h3>

          </div>


        </div>

      </section>


      {/* =====================================================
          LEARNING PROCESS
      ===================================================== */}

      <section className="process-section">

        <div className="section-heading">

          <p>
            OUR APPROACH
          </p>

          <h2>
            Simple Steps To
            <span> Success</span>
          </h2>

          <div className="heading-line"></div>

        </div>


        <div className="process-grid">


          <div className="process-card">

            <div className="process-number">
              01
            </div>

            <div className="process-icon">
              📖
            </div>

            <h3>
              Learn
            </h3>

            <p>
              Understand concepts with simple and
              effective teaching methods.
            </p>

          </div>


          <div className="process-card">

            <div className="process-number">
              02
            </div>

            <div className="process-icon">
              ✍️
            </div>

            <h3>
              Practice
            </h3>

            <p>
              Practice regularly through tests,
              assignments and activities.
            </p>

          </div>


          <div className="process-card">

            <div className="process-number">
              03
            </div>

            <div className="process-icon">
              📊
            </div>

            <h3>
              Improve
            </h3>

            <p>
              Identify weaknesses and improve your
              academic performance.
            </p>

          </div>


          <div className="process-card">

            <div className="process-number">
              04
            </div>

            <div className="process-icon">
              🏆
            </div>

            <h3>
              Succeed
            </h3>

            <p>
              Achieve your academic goals with
              confidence.
            </p>

          </div>


        </div>

      </section>


      {/* =====================================================
          FINAL STATS
      ===================================================== */}

      <section className="stats-section">

        <div className="stat">

          <strong>
            4+
          </strong>

          <span>
            Programs
          </span>

        </div>


        <div className="stat">

          <strong>
            7th–12th
          </strong>

          <span>
            Classes
          </span>

        </div>


        <div className="stat">

          <strong>
            Expert
          </strong>

          <span>
            Faculty
          </span>

        </div>


        <div className="stat">

          <strong>
            100%
          </strong>

          <span>
            Dedication
          </span>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="cta-section">

        <div className="cta-content">

          <p>
            READY TO START?
          </p>

          <h2>
            Give Your Child The
            <span> Right Direction.</span>
          </h2>

          <p>
            Join Kaizen Coaching Class and take the next
            step towards a brighter academic future.
          </p>

        </div>


        <Link
          to="/registration"
          className="cta-button"
        >
          Register Now →
        </Link>

      </section>


    </div>
  );
}

export default Home;