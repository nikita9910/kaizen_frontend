
import React, { useEffect, useState } from "react";
import "./Faculty.css";
import API from "../api";

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch faculty from Django database
  const fetchFaculty = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("faculty/");

      setFaculty(
        Array.isArray(response.data)
          ? response.data
          : response.data.results || []
      );
    } catch (err) {
      console.error("Faculty error:", err);
      setError("Unable to load faculty. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  return (
    <div className="faculty-page">

      {/* HERO SECTION */}
      <section className="faculty-hero">
        <div className="faculty-hero-content">
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
          At Kaizen Coaching Class, our faculty members
          are experienced, knowledgeable and passionate
          about teaching. They provide personalized
          guidance to help students succeed.
        </p>
      </section>

      {/* FACULTY CARDS */}
      <section className="faculty-container">
        <div className="faculty-grid">

          {loading && (
            <div className="faculty-message">
              <h3>Loading Faculty...</h3>
              <p>Please wait while we load faculty details.</p>
            </div>
          )}

          {!loading && error && (
            <div className="faculty-message">
              <h3>Unable to Load Faculty</h3>
              <p>{error}</p>

              <button
                className="faculty-btn"
                onClick={fetchFaculty}
              >
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && faculty.length === 0 && (
            <div className="faculty-message">
              <h3>No Faculty Available</h3>
              <p>Faculty information will be available soon.</p>
            </div>
          )}

          {!loading && !error && faculty.map((teacher) => (
            <div className="faculty-card" key={teacher.id}>

              <div className="faculty-icon">
                👨‍🏫
              </div>

              <h3>{teacher.name}</h3>

              <h4>Faculty</h4>

              <p>
                <strong>Specialization:</strong>
                <br />
                {teacher.specialization}
              </p>

              <p>
                <strong>Mobile No.:</strong>
                <br />
                {teacher.mobile}
              </p>

              <button
                className="faculty-btn"
                onClick={() => {
                  window.location.href =
                    `tel:${teacher.mobile}`;
                }}
              >
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
            <p>Highly qualified teachers with strong subject knowledge.</p>
          </div>

          <div className="faculty-feature">
            <span>💡</span>
            <h3>Easy Explanation</h3>
            <p>Complex concepts are explained using simple methods.</p>
          </div>

          <div className="faculty-feature">
            <span>🎯</span>
            <h3>Personal Attention</h3>
            <p>Individual guidance to improve every student's performance.</p>
          </div>

          <div className="faculty-feature">
            <span>🏆</span>
            <h3>Result Oriented</h3>
            <p>Focus on academic growth and better examination results.</p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default Faculty;
