import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../student-pages.css";

function Results() {
  const navigate = useNavigate();

  const [results, setResults] = useState([]);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user?.id) {
      navigate("/student-login");
      return;
    }

    const fetchResults = async () => {
      try {
        setLoading(true);
        setError("");

        const [resultsResponse, examsResponse] = await Promise.all([
          API.get("results/"),
          API.get("exams/"),
        ]);

        const resultsData = resultsResponse.data;
        const examsData = examsResponse.data;

        const allResults = Array.isArray(resultsData)
          ? resultsData
          : resultsData.results || [];

        const allExams = Array.isArray(examsData)
          ? examsData
          : examsData.results || [];

        const studentResults = allResults.filter((result) => {
          const studentId =
            typeof result.student === "object"
              ? result.student?.id
              : result.student;

          return Number(studentId) === Number(user.id);
        });

        setResults(studentResults);
        setExams(allExams);
      } catch (err) {
        console.error(
          "Results loading error:",
          err.response?.data || err.message
        );
        setError("Unable to load results. Please check the backend API.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [navigate, user?.id]);

  const getExamName = (exam) => {
    // Exam is already returned as an object
    if (exam && typeof exam === "object") {
      return exam.exam_name || exam.name || "Exam";
    }

    // Exam is returned as an ID: find its name in the exams list
    const matchedExam = exams.find(
      (item) => Number(item.id) === Number(exam)
    );

    return matchedExam?.exam_name || matchedExam?.name || "Exam";
  };

  const getExamDate = (exam) => {
    if (exam && typeof exam === "object") {
      return exam.exam_date;
    }

    const matchedExam = exams.find(
      (item) => Number(item.id) === Number(exam)
    );

    return matchedExam?.exam_date;
  };

  const formatDate = (value) => {
    if (!value) return "";

    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString();
  };

  return (
    <div className="student-page">
      <h1>📊 My Results</h1>
      <p className="page-subtitle">
        View your examination marks, percentage, and grade.
      </p>

      {loading && <p>Loading results...</p>}
      {!loading && error && <p role="alert">{error}</p>}

      {!loading && !error && results.length === 0 && (
        <div className="info-card">
          <h2>No results available</h2>
          <p>Your exam results will appear here when they are published.</p>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Exam</th>
                <th>Obtained Marks</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>
                    {getExamName(result.exam)}
                    {getExamDate(result.exam) && (
                      <small className="result-date">
                        {formatDate(getExamDate(result.exam))}
                      </small>
                    )}
                  </td>
                  <td>{result.obtained_marks}</td>
                  <td>{Number(result.percentage).toFixed(2)}%</td>
                  <td>{result.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Results;