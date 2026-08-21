import React, { useEffect, useState } from "react";
import "./Faculty.css";
import API from "../api";

function Faculty() {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch faculty from Django backend
  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("faculty/");

      console.log("Faculty data:", response.data);

      setFaculty(response.data);
    } catch (err) {
      console.error("Error fetching faculty:", err);

      setError(
        "Unable to load faculty. Please make sure Django server is running."
      );
    } finally {
      setLoading(false);
    }
  };

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

          {/* LOADING */}
          {loading && (
            <div className="faculty-message">
              <h3>Loading Faculty...</h3>

              <p>
                Please wait while we load our faculty members.
              </p>
            </div>
          )}


          {/* ERROR */}
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


          {/* NO FACULTY */}
          {!loading &&
            !error &&
            faculty.length === 0 && (

              <div className="faculty-message">

                <h3>No Faculty Available</h3>

                <p>
                  Faculty information will be available soon.
                </p>

              </div>
            )}


          {/* FACULTY CARDS */}
          {!loading &&
            !error &&
            faculty.map((teacher, index) => (

              <div
                className="faculty-card"
                key={teacher.id || index}
              >

                {/* Faculty Icon */}
                <div className="faculty-icon">
                  {teacher.icon || "👨‍🏫"}
                </div>


                {/* Faculty Name */}
                <h3>
                  {teacher.name ||
                    `${teacher.first_name || ""} ${teacher.last_name || ""}`}
                </h3>


                {/* Subject */}
                <h4>
                  {teacher.subject || "Faculty"}
                </h4>


                {/* Specialization */}
                <p>
                  <strong>Specialization:</strong>
                  <br />

                  {teacher.specialization ||
                    teacher.qualification ||
                    "Not Available"}
                </p>


                {/* Mobile Number */}
                <p>
                  <strong>Mobile No.:</strong>
                  <br />

                  {teacher.mobile ||
                    teacher.phone ||
                    "Not Available"}
                </p>


                {/* View Profile */}
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