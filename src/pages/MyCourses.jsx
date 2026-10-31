import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function MyCourses() {

  const navigate = useNavigate();

  // ==============================
  // STATES
  // ==============================

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // GET LOGGED-IN STUDENT
  // ==============================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ==============================
  // FETCH STUDENT + COURSE
  // ==============================

  useEffect(() => {

    // If student is not logged in
    if (!user || !user.id) {
      navigate("/student-login");
      return;
    }

    const fetchMyCourse = async () => {

      try {

        setLoading(true);
        setError("");

        // --------------------------------
        // STEP 1: Get logged-in student
        // --------------------------------

        const studentResponse = await API.get(
          `students/${user.id}/`
        );

        const student = studentResponse.data;

        console.log(
          "Student Data:",
          student
        );

        // --------------------------------
        // STEP 2: Check course
        // --------------------------------

        if (!student.course) {

          setError(
            "No course has been assigned to you yet."
          );

          setLoading(false);

          return;
        }

        // --------------------------------
        // STEP 3: Get course details
        // --------------------------------

        const courseResponse = await API.get(
          `courses/${student.course}/`
        );

        console.log(
          "Course Data:",
          courseResponse.data
        );

        setCourse(courseResponse.data);

      } catch (err) {

        console.error(
          "Course loading error:",
          err
        );

        setError(
          "Unable to load your course information."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchMyCourse();

  }, [navigate, user?.id]);


  // ==============================
  // LOGOUT
  // ==============================

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("userType");

    navigate("/student-login");

  };


  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (
      <div className="student-page">

        <h1>📚 My Courses</h1>

        <p className="page-subtitle">
          Loading your course...
        </p>

      </div>
    );

  }


  // ==============================
  // ERROR
  // ==============================

  if (error) {

    return (
      <div className="student-page">

        <h1>📚 My Courses</h1>

        <p className="page-subtitle">
          {error}
        </p>

        <button
          className="primary-btn"
          onClick={() => navigate("/student-dashboard")}
        >
          Back to Dashboard
        </button>

      </div>
    );

  }


  // ==============================
  // COURSE PAGE
  // ==============================

  return (

    <div className="student-page">

      {/* ==========================
          PAGE HEADER
          ========================== */}

      <h1>📚 My Courses</h1>

      <p className="page-subtitle">
        Courses currently assigned to you.
      </p>


      {/* ==========================
          COURSE CARD
          ========================== */}

      <div className="data-cards">

        {course && (

          <div className="info-card">

            {/* COURSE NAME */}

            <h2>
              {course.course_name}
            </h2>


            {/* DURATION */}

            <p>
              <b>Duration:</b>{" "}
              {course.duration || "Not available"}
            </p>


            {/* FEES */}

            <p>
              <b>Course Fees:</b>{" "}
              ₹{course.fees || "0"}
            </p>


            {/* DESCRIPTION */}

            <p>
              <b>Description:</b>{" "}
              {course.description ||
                "No description available."}
            </p>


            {/* PROGRESS */}

            <div className="progress-bar">

              <div
                className="progress"
                style={{ width: "0%" }}
              >
                0%
              </div>

            </div>


            {/* VIEW COURSE */}

            <button
              className="primary-btn"
              onClick={() =>
                alert(
                  `Course: ${course.course_name}`
                )
              }
            >
              View Course
            </button>

          </div>

        )}

      </div>

    </div>

  );
}

export default MyCourses;

