import React, { useEffect, useState } from "react";
import API from "../api";
import "../student-pages.css";

function ManageResults() {
  const [results, setResults] = useState([]);
  const [students, setStudents] = useState([]);
  const [exams, setExams] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [examId, setExamId] = useState("");
  const [obtainedMarks, setObtainedMarks] = useState("");
  const [percentage, setPercentage] = useState("");
  const [grade, setGrade] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Supports a normal array or Django REST Framework pagination.
  const getList = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.results)) return data.results;
    return [];
  };

  // Fetch results, students, and exams from Django.
  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const [resultsResponse, studentsResponse, examsResponse] =
        await Promise.all([
          API.get("results/"),
          API.get("students/"),
          API.get("exams/"),
        ]);

      setResults(getList(resultsResponse.data));
      setStudents(getList(studentsResponse.data));
      setExams(getList(examsResponse.data));
    } catch (err) {
      console.error(
        "ManageResults loading error:",
        err.response?.data || err.message
      );
      setError(
        `Unable to fetch data. Check the API endpoints and Django server. ${
          err.response?.status ? `Status: ${err.response.status}` : ""
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getStudentName = (value) => {
    const id = typeof value === "object" ? value?.id : value;
    const student = students.find(
      (item) => Number(item.id) === Number(id)
    );

    if (student) {
      return (
        `${student.first_name || ""} ${student.last_name || ""}`.trim() ||
        student.name ||
        `Student ${id}`
      );
    }

    if (value && typeof value === "object") {
      return (
        `${value.first_name || ""} ${value.last_name || ""}`.trim() ||
        value.name ||
        `Student ${id ?? ""}`
      );
    }

    return `Student ${id ?? ""}`;
  };

  const getExamName = (value) => {
    const id = typeof value === "object" ? value?.id : value;
    const exam = exams.find(
      (item) => Number(item.id) === Number(id)
    );

    if (exam) return exam.exam_name || `Exam ${id}`;

    if (value && typeof value === "object") {
      return value.exam_name || `Exam ${id ?? ""}`;
    }

    return `Exam ${id ?? ""}`;
  };

  const handleAddResult = async (event) => {
    event.preventDefault();
    setError("");

    if (
      !studentId ||
      !examId ||
      obtainedMarks === "" ||
      percentage === "" ||
      !grade.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setSaving(true);

      await API.post("results/", {
        student: Number(studentId),
        exam: Number(examId),
        obtained_marks: Number(obtainedMarks),
        percentage: Number(percentage),
        grade: grade.trim(),
      });

      setStudentId("");
      setExamId("");
      setObtainedMarks("");
      setPercentage("");
      setGrade("");
      setShowForm(false);

      await fetchData();
    } catch (err) {
      console.error(
        "Saving result error:",
        err.response?.data || err.message
      );
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Unable to save the result. Check the Django API."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="student-page">
      <h1>📊 Manage Results</h1>
      <p className="page-subtitle">
        View examination results and add marks for students.
      </p>

      <button
        className="primary-btn"
        type="button"
        onClick={() => {
          setShowForm((current) => !current);
          setError("");
        }}
      >
        {showForm ? "Cancel" : "+ Add Result"}
      </button>

      {showForm && (
        <form className="notice-form" onSubmit={handleAddResult}>
          <label htmlFor="result-student">Student</label>
          <select
            id="result-student"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
            required
          >
            <option value="">Select student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {getStudentName(student)}
              </option>
            ))}
          </select>

          <label htmlFor="result-exam">Exam</label>
          <select
            id="result-exam"
            value={examId}
            onChange={(event) => setExamId(event.target.value)}
            required
          >
            <option value="">Select exam</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.exam_name || `Exam ${exam.id}`}
              </option>
            ))}
          </select>

          <label htmlFor="obtained-marks">Obtained marks</label>
          <input
            id="obtained-marks"
            type="number"
            min="0"
            value={obtainedMarks}
            onChange={(event) => setObtainedMarks(event.target.value)}
            required
          />

          <label htmlFor="result-percentage">Percentage</label>
          <input
            id="result-percentage"
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={percentage}
            onChange={(event) => setPercentage(event.target.value)}
            required
          />

          <label htmlFor="result-grade">Grade</label>
          <input
            id="result-grade"
            type="text"
            maxLength={5}
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
            required
          />

          <button className="primary-btn" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Result"}
          </button>
        </form>
      )}

      {error && <p role="alert">{error}</p>}
      {loading && <p>Loading results...</p>}

      {!loading && !error && results.length === 0 && (
        <div className="info-card">
          <h2>No results found</h2>
          <p>Added examination results will appear here.</p>
        </div>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Exam</th>
                <th>Obtained Marks</th>
                <th>Percentage</th>
                <th>Grade</th>
              </tr>
            </thead>

            <tbody>
              {results.map((result) => (
                <tr key={result.id}>
                  <td>{getStudentName(result.student)}</td>
                  <td>{getExamName(result.exam)}</td>
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

export default ManageResults;