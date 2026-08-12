import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">

      {/* ================= HERO SECTION ================= */}

      <section className="hero">

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
            Quality education, expert guidance and personal attention
            to help every student achieve their goals.
          </p>

          <div className="hero-buttons">
            <Link to="/courses" className="primary-btn">
              Explore Courses →
            </Link>

            <Link to="/registration" className="secondary-btn">
              Join Now
            </Link>
          </div>

        </div>


        {/* HERO COURSE BOX */}

        <div className="hero-course-box">

          <div className="course-box-title">
            <span>📚</span>
            Courses We Offer
          </div>

          <div className="hero-course-list">

            <div className="hero-course-item">
              <span className="number">01</span>
              <div>
                <strong>7th to 10th</strong>
                <small>State Board</small>
              </div>
            </div>

            <div className="hero-course-item">
              <span className="number">02</span>
              <div>
                <strong>5th to 10th</strong>
                <small>CBSE</small>
              </div>
            </div>

            <div className="hero-course-item">
              <span className="number">03</span>
              <div>
                <strong>11th & 12th</strong>
                <small>Science</small>
              </div>
            </div>

            <div className="hero-course-item">
              <span className="number">04</span>
              <div>
                <strong>Scholarship</strong>
                <small>NMMS Preparation</small>
              </div>
            </div>

          </div>

        </div>

      </section>


      {/* ================= COURSE SECTION ================= */}

      <section className="courses-section">

        <div className="section-heading">
          <p>WHAT WE OFFER</p>

          <h2>
            Education For Every
            <span> Bright Mind</span>
          </h2>

          <div className="heading-line"></div>
        </div>


        <div className="course-cards">

          {/* CARD 1 */}

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


          {/* CARD 2 */}

          <div className="course-card featured">

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


          {/* CARD 3 */}

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


          {/* CARD 4 */}

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


      {/* ================= WHY KAIZEN ================= */}

      <section className="why-section">

        <div className="why-content">

          <div className="why-text">

            <p className="small-title">
              WHY CHOOSE KAIZEN?
            </p>

            <h2>
              More Than Just
              <span> Classroom Learning</span>
            </h2>

            <p>
              At Kaizen Coaching Class, we believe every student
              has the potential to achieve something great.
              Our teaching approach focuses on concepts,
              practice and continuous improvement.
            </p>

            <div className="features">

              <div className="feature">
                <span>✓</span>
                <div>
                  <h4>Expert Guidance</h4>
                  <p>Learn from experienced teachers.</p>
                </div>
              </div>

              <div className="feature">
                <span>✓</span>
                <div>
                  <h4>Personal Attention</h4>
                  <p>Individual attention for every student.</p>
                </div>
              </div>

              <div className="feature">
                <span>✓</span>
                <div>
                  <h4>Regular Practice</h4>
                  <p>Tests and practice to improve performance.</p>
                </div>
              </div>

              <div className="feature">
                <span>✓</span>
                <div>
                  <h4>Student Success</h4>
                  <p>Focused learning for better results.</p>
                </div>
              </div>

            </div>

          </div>


          <div className="success-box">

            <div className="success-circle">
              🎓
            </div>

            <h3>
              Learn
            </h3>

            <span>↓</span>

            <h3>
              Practice
            </h3>

            <span>↓</span>

            <h3>
              Succeed
            </h3>

          </div>

        </div>

      </section>


      {/* ================= STATS ================= */}

      <section className="stats-section">

        <div className="stat">
          <strong>4+</strong>
          <span>Programs</span>
        </div>

        <div className="stat">
          <strong>7th–12th</strong>
          <span>Classes</span>
        </div>

        <div className="stat">
          <strong>100%</strong>
          <span>Dedication</span>
        </div>

        <div className="stat">
          <strong>1</strong>
          <span>Goal — Success</span>
        </div>

      </section>


      {/* ================= CTA ================= */}

      <section className="cta-section">

        <div>

          <p>READY TO START?</p>

          <h2>
            Give Your Child The
            <span> Right Direction.</span>
          </h2>

          <p>
            Join Kaizen Coaching Class and take the next step
            towards a brighter academic future.
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