import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../student-pages.css";

function OnlineExam() {
  const navigate = useNavigate();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user?.id) {
      navigate("/student-login");
      return;
    }

    const fetchExams = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch the logged-in student's course
        const studentResponse = await API.get(`students/${user.id}/`);
        const student = studentResponse.data;

        // Student course may be an ID or a nested object
        const studentCourseId =
          typeof student.course === "object"
            ? student.course.id
            : student.course;

        if (!studentCourseId) {
          setExams([]);
          setError("No course has been assigned to you.");
          return;
        }

        // Fetch exams from Django
        const response = await API.get("exams/");
        const data = response.data;
        const allExams = Array.isArray(data) ? data : data.results || [];

        // Show exams for the student's course
        const courseExams = allExams.filter((exam) => {
          const examCourseId =
            typeof exam.course === "object"
              ? exam.course.id
              : exam.course;

          return Number(examCourseId) === Number(studentCourseId);
        });

        setExams(courseExams);
      } catch (err) {
        console.error(
          "Exam loading error:",
          err.response?.data || err.message
        );
        setError("Unable to load exams. Please check the backend API.");
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, [navigate, user?.id]);

  const handleStartExam = (exam) => {
    // This route should be created for the exam-taking page.
    navigate(`/online-exam/${exam.id}`);
  };

  const formatDate = (value) => {
    if (!value) return "Date not available";

    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="student-page">
        <h1>💻 Examination</h1>
        <p>Loading exams...</p>
      </div>
    );
  }

  return (
    <div className="student-page">
      <h1>💻 Examination</h1>

      <p className="page-subtitle">
        View your course examinations and their scheduled dates.
      </p>

      {error && <p role="alert">{error}</p>}

      {!error && exams.length === 0 && (
        <p>No exams are currently available for your course.</p>
      )}

      {!error && exams.length > 0 && (
        <div className="data-cards">
          {exams.map((exam) => (
            <div className="exam-card" key={exam.id}>
              <span>📝</span>

              <h2>{exam.exam_name}</h2>

              <p>
                <strong>Exam Date:</strong> {formatDate(exam.exam_date)}
              </p>

              <p>
                <strong>Total Marks:</strong> {exam.total_marks}
              </p>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OnlineExam;