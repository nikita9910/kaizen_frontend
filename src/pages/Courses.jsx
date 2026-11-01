import React, { useEffect, useState } from "react";
import API from "../api";
import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get("courses/");

        // Supports either a normal list or Django REST Framework pagination.
        const data = response.data;
        setCourses(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError("Unable to load courses. Please try again later.");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <p className="courses-message">Loading courses...</p>;
  }

  if (error) {
    return <p className="courses-message courses-error">{error}</p>;
  }

  return (
    <main className="courses-page">
      <section className="courses-hero">
        <h1>Our Courses</h1>
        <p>Learn, practice, and improve with Kaizen Coaching Class.</p>
      </section>

      <section className="courses-container">
        {courses.length === 0 ? (
          <p className="courses-message">No courses are available yet.</p>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => (
              <article className="course-card" key={course.id}>
                <h2>{course.course_name}</h2>

                <p className="course-description">
                  {course.description || "Course details will be available soon."}
                </p>

                <div className="course-details">
                  <p>
                    <strong>Duration:</strong>{" "}
                    {course.duration || "Not specified"}
                  </p>
                  <p>
                    <strong>Fees:</strong>{" "}
                    {course.fees != null ? `₹${course.fees}` : "Contact us"}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Courses;