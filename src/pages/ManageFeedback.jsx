import React, { useEffect, useState } from "react";
import API from "../api";
import "../student-pages.css";

function ManageFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError("");

      const [feedbackResponse, studentsResponse] = await Promise.all([
        API.get("feedback/"),
        API.get("students/"),
      ]);

      const feedbackData = feedbackResponse.data;
      const studentsData = studentsResponse.data;

      setFeedbackList(
        Array.isArray(feedbackData)
          ? feedbackData
          : feedbackData.results || []
      );

      setStudents(
        Array.isArray(studentsData)
          ? studentsData
          : studentsData.results || []
      );
    } catch (err) {
      console.error(
        "Feedback loading error:",
        err.response?.data || err.message
      );
      setError("Unable to load feedback. Please check the backend API.");
    } finally {
      setLoading(false);
    }
  };

  const getStudentName = (student) => {
    if (student && typeof student === "object") {
      return (
        student.first_name ||
        student.name ||
        student.email ||
        "Student"
      );
    }

    const matchedStudent = students.find(
      (item) => Number(item.id) === Number(student)
    );

    if (!matchedStudent) return "Student";

    return (
      `${matchedStudent.first_name || ""} ${
        matchedStudent.last_name || ""
      }`.trim() ||
      matchedStudent.name ||
      matchedStudent.email ||
      "Student"
    );
  };

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString();
  };

  return (
    <div className="student-page">
      <h1>💬 Manage Feedback</h1>
      <p className="page-subtitle">
        View feedback submitted by students.
      </p>

      {loading && <p>Loading feedback...</p>}
      {!loading && error && <p role="alert">{error}</p>}

      {!loading && !error && feedbackList.length === 0 && (
        <div className="info-card">
          <h2>No feedback found</h2>
          <p>Student feedback will appear here when submitted.</p>
        </div>
      )}

      {!loading && !error && feedbackList.length > 0 && (
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Message</th>
                <th>Feedback Date</th>
              </tr>
            </thead>

            <tbody>
              {feedbackList.map((item) => (
                <tr key={item.id}>
                  <td>{getStudentName(item.student)}</td>
                  <td>{item.message}</td>
                  <td>{formatDate(item.feedback_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageFeedback;