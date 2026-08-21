import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import "./Courses.css";

function Courses() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch courses from Django backend
    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await API.get("courses/");

            console.log("Courses API response:", response.data);

            // Django REST Framework normally returns an array
            setCourses(response.data);
        } catch (err) {
            console.error("Error fetching courses:", err);

            setError(
                "Unable to load courses. Please make sure the Django server is running."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="courses-page">

            {/* Hero Section */}
            <section className="courses-hero">

                <div className="courses-hero-content">

                    <h1>Our Courses</h1>

                    <p>
                        Explore our courses and choose the right program
                        for your academic success.
                    </p>

                </div>

            </section>


            {/* Courses Section */}
            <section className="courses-section">

                <div className="courses-container">

                    <div className="section-heading">

                        <h2>Available Courses</h2>

                        <p>
                            Learn from experienced teachers and build a
                            strong foundation for your future.
                        </p>

                    </div>


                    {/* Loading */}
                    {loading && (
                        <div className="loading-message">
                            <h3>Loading courses...</h3>
                            <p>Please wait.</p>
                        </div>
                    )}


                    {/* Error */}
                    {!loading && error && (
                        <div className="error-message">

                            <h3>Something went wrong</h3>

                            <p>{error}</p>

                            <button
                                onClick={fetchCourses}
                                className="retry-btn"
                            >
                                Try Again
                            </button>

                        </div>
                    )}


                    {/* No Courses */}
                    {!loading &&
                        !error &&
                        courses.length === 0 && (
                            <div className="no-courses">

                                <h3>No Courses Available</h3>

                                <p>
                                    There are currently no courses
                                    available. Please check again later.
                                </p>

                            </div>
                        )}


                    {/* Courses */}
                    {!loading &&
                        !error &&
                        courses.length > 0 && (

                            <div className="courses-grid">

                                {courses.map((course) => (

                                    <div
                                        className="course-card"
                                        key={course.id}
                                    >

                                        {/* Icon */}
                                        <div className="course-icon">
                                            📚
                                        </div>


                                        {/* Course Name */}
                                        <h3>
                                            {course.course_name}
                                        </h3>


                                        {/* Duration */}
                                        {course.duration && (
                                            <p className="course-duration">
                                                <strong>
                                                    Duration:
                                                </strong>{" "}
                                                {course.duration}
                                            </p>
                                        )}


                                        {/* Description */}
                                        {course.description && (
                                            <p className="course-description">
                                                {course.description}
                                            </p>
                                        )}


                                        {/* Fees */}
                                        {course.fees && (
                                            <p className="course-fees">
                                                <strong>
                                                    Fees:
                                                </strong>{" "}
                                                ₹{course.fees}
                                            </p>
                                        )}


                                        {/* Enroll Button */}
                                        <Link
                                            to="/registration"
                                            className="course-btn"
                                        >
                                            Enroll Now
                                        </Link>

                                    </div>

                                ))}

                            </div>

                        )}

                </div>

            </section>

        </div>
    );
}

export default Courses;