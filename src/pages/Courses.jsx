import React from "react";
import { Link } from "react-router-dom";
import "./Courses.css";

function Courses() {
  const courses = [
    {
      icon: "📘",
      title: "7th to 10th",
      board: "State Board",
      description:
        "Complete academic coaching for Maharashtra State Board students from 7th to 10th standard with strong concept building and examination preparation.",
      features: [
        "All Major Subjects",
        "Regular Tests",
        "Study Material",
        "Doubt Solving",
        "Board Exam Preparation",
      ],
    },

    {
      icon: "📚",
      title: "5th to 10th",
      board: "CBSE",
      description:
        "Concept-based CBSE coaching with special focus on NCERT curriculum, problem solving and preparation for school examinations.",
      features: [
        "NCERT Based Learning",
        "All Major Subjects",
        "Regular Assessments",
        "Practice Worksheets",
        "Exam Preparation",
      ],
    },

    {
      icon: "🔬",
      title: "11th & 12th",
      board: "Science",
      description:
        "Comprehensive coaching for 11th and 12th Science students with expert guidance, regular tests and competitive exam preparation.",
      features: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology",
        "Regular Test Series",
      ],
    },

    {
      icon: "🏆",
      title: "Scholarship",
      board: "Scholarship / NMMS",
      description:
        "Special coaching for Scholarship and NMMS examinations with practice tests, reasoning, mathematics and previous question papers.",
      features: [
        "NMMS Preparation",
        "Scholarship Exam",
        "Reasoning Practice",
        "Mathematics Practice",
        "Mock Tests",
      ],
    },
  ];

  return (
    <div className="courses-page">

      {/* Hero Section */}
      <section className="courses-hero">

        <div className="courses-hero-content">

          <span className="small-heading">
            KAIZEN COACHING CLASS
          </span>

          <h1>Our Courses</h1>

          <p>
            Quality Education • Strong Concepts • Better Results
          </p>

        </div>

      </section>


      {/* Introduction */}
      <section className="courses-introduction">

        <h2>Courses We Offer</h2>

        <p>
          Kaizen Coaching Class provides quality education and academic
          guidance for students from 5th to 12th standard. Our courses are
          designed according to the requirements of State Board, CBSE,
          Science and Scholarship/NMMS students.
        </p>

      </section>


      {/* Course Cards */}
      <section className="courses-section">

        <div className="course-container">

          {courses.map((course, index) => (

            <div className="course-card" key={index}>

              <div className="course-icon">
                {course.icon}
              </div>

              <span className="course-board">
                {course.board}
              </span>

              <h3>{course.title}</h3>

              <p className="course-description">
                {course.description}
              </p>


              <div className="course-features">

                {course.features.map((feature, i) => (

                  <div className="feature" key={i}>
                    <span>✓</span>
                    {feature}
                  </div>

                ))}

              </div>


              <Link
                to="/registration"
                className="course-button"
              >
                Enroll Now →
              </Link>

            </div>

          ))}

        </div>

      </section>


      {/* Why Choose Us */}
      <section className="why-kaizen">

        <h2>Why Choose Kaizen?</h2>

        <p className="why-subtitle">
          We focus on overall academic development of every student.
        </p>


        <div className="benefits">

          <div className="benefit-card">
            <div>👨‍🏫</div>
            <h3>Experienced Faculty</h3>
            <p>
              Learn from experienced and dedicated teachers.
            </p>
          </div>


          <div className="benefit-card">
            <div>📝</div>
            <h3>Regular Tests</h3>
            <p>
              Regular tests and assessments to track student progress.
            </p>
          </div>


          <div className="benefit-card">
            <div>📖</div>
            <h3>Study Material</h3>
            <p>
              Quality study material and practice worksheets.
            </p>
          </div>


          <div className="benefit-card">
            <div>🎯</div>
            <h3>Personal Guidance</h3>
            <p>
              Individual attention and doubt-solving support.
            </p>
          </div>

        </div>

      </section>


      {/* CTA */}
      <section className="course-cta">

        <h2>Start Your Learning Journey Today!</h2>

        <p>
          Join Kaizen Coaching Class and take the first step towards
          academic success.
        </p>

        <Link to="/registration">
          Register Now
        </Link>

      </section>

    </div>
  );
}

export default Courses;