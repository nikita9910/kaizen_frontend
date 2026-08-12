import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <span className="hero-tag">ABOUT KAIZEN</span>

          <h1>About Us</h1>

          <h2>Learn Today, Lead Tomorrow</h2>

          <p>
            Kaizen Coaching Class is dedicated to providing quality education,
            expert guidance and the right support to help students achieve
            their academic goals and build a successful future.
          </p>
        </div>

        <div className="hero-logo">
          <img
            src="/kaizen-logo.png"
            alt="Kaizen Coaching Class Logo"
          />
        </div>
      </section>


      {/* Who We Are */}
      <section className="about-introduction">

        {/* LOGO - Replaced 🎓 */}
        <div className="about-logo-box">
          <img
            src="/kaizen-logo.png"
            alt="Kaizen Coaching and Study Center"
            className="about-logo"
          />
        </div>


        <div className="about-text">

          <span className="section-title">WHO WE ARE</span>

          <h2>Welcome to Kaizen Coaching Class</h2>

          <p>
            Kaizen Coaching Class is a student-focused educational institute
            committed to providing quality coaching for school students,
            competitive examinations and scholarship examinations.
          </p>

          <p>
            Our experienced faculty, structured courses, regular assessments
            and student-friendly environment ensure better learning, strong
            concepts and improved academic performance.
          </p>

          <p>
            We believe in continuous improvement and provide personalized
            guidance to help every student achieve their full potential.
          </p>

        </div>


        {/* Features */}
        <div className="about-features">

          <div className="feature">
            <div className="feature-icon">👨‍🏫</div>
            <div>
              <h3>Experienced Faculty</h3>
              <p>
                Learn from qualified and dedicated teachers with strong
                subject knowledge.
              </p>
            </div>
          </div>


          <div className="feature">
            <div className="feature-icon">📚</div>
            <div>
              <h3>Quality Education</h3>
              <p>
                Well-structured courses and study materials for effective
                learning.
              </p>
            </div>
          </div>


          <div className="feature">
            <div className="feature-icon">🎯</div>
            <div>
              <h3>Personalized Guidance</h3>
              <p>
                Individual attention helps students improve their academic
                performance.
              </p>
            </div>
          </div>


          <div className="feature">
            <div className="feature-icon">📊</div>
            <div>
              <h3>Result Oriented</h3>
              <p>
                Our goal is to deliver excellent academic results and build
                a successful future.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* Mission & Vision */}
      <section className="mission-vision">

        <div className="mission">
          <div className="mv-icon">🎯</div>

          <div>
            <h2>Our Mission</h2>

            <p>
              To provide quality education and personalized guidance that
              helps every student develop knowledge, confidence and the skills
              required to succeed in academics and future careers.
            </p>
          </div>
        </div>


        <div className="vision">
          <div className="mv-icon">👁️</div>

          <div>
            <h2>Our Vision</h2>

            <p>
              To become a trusted coaching institute that inspires students
              to learn continuously, achieve excellence and build a successful
              future.
            </p>
          </div>
        </div>

      </section>


      {/* Why Choose Us */}
      <section className="why-section">

        <span className="section-title">WHY CHOOSE US</span>

        <h2>Why Kaizen Coaching Class?</h2>

        <div className="why-grid">

          <div className="why-card">
            <div className="why-icon">👨‍🏫</div>
            <h3>Expert Faculty</h3>
            <p>
              Learn from experienced and supportive teachers.
            </p>
          </div>


          <div className="why-card">
            <div className="why-icon">📚</div>
            <h3>Study Material</h3>
            <p>
              Well-organized study materials for better understanding.
            </p>
          </div>


          <div className="why-card">
            <div className="why-icon">📝</div>
            <h3>Regular Tests</h3>
            <p>
              Regular tests and assessments to track your progress.
            </p>
          </div>


          <div className="why-card">
            <div className="why-icon">💻</div>
            <h3>Online Support</h3>
            <p>
              Access learning materials and support online.
            </p>
          </div>


          <div className="why-card">
            <div className="why-icon">👥</div>
            <h3>Small Batches</h3>
            <p>
              Small batch sizes provide better personal attention.
            </p>
          </div>


          <div className="why-card">
            <div className="why-icon">🏆</div>
            <h3>Better Results</h3>
            <p>
              Focused learning for better academic results.
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}

export default About;