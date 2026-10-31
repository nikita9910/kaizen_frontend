import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../student-pages.css";

function Feedback() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user?.id) {
      navigate("/student-login");
      return;
    }

    fetchFeedback();
  }, [navigate, user?.id]);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("feedback/");
      const data = response.data;
      const allFeedback = Array.isArray(data) ? data : data.results || [];

      const myFeedback = allFeedback.filter((item) => {
        const studentId =
          typeof item.student === "object"
            ? item.student?.id
            : item.student;

        return Number(studentId) === Number(user.id);
      });

      setFeedbackList(myFeedback);
    } catch (err) {
      console.error("Feedback load error:", err.response?.data || err.message);
      setError("Unable to load feedback. Check the feedback API.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Please enter your feedback.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await API.post("feedback/", {
        student: Number(user.id),
        message: message.trim(),
      });

      setMessage("");
      setSuccess("Feedback submitted successfully.");
      await fetchFeedback();
    } catch (err) {
      console.error("Feedback submit error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });

      const detail = err.response?.data;
      setError(
        typeof detail === "string"
          ? detail
          : detail
          ? JSON.stringify(detail)
          : "Could not reach Django. Check that the server is running and the API URL is correct."
      );
    } finally {
      setSaving(false);
    }
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
      <h1>💬 My Feedback</h1>
      <p className="page-subtitle">
        Share your feedback with Kaizen Coaching Class.
      </p>

      <div className="info-card">
        <h2>Submit Feedback</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="feedback-message">Your message</label>
          <textarea
            id="feedback-message"
            className="feedback-textarea"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your feedback here..."
            required
          />

          <button className="primary-btn" type="submit" disabled={saving}>
            {saving ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>

        {error && <p role="alert">{error}</p>}
        {success && <p>{success}</p>}
      </div>

      <h2>Previous Feedback</h2>

      {loading && <p>Loading feedback...</p>}

      {!loading && !error && feedbackList.length === 0 && (
        <p>You have not submitted any feedback yet.</p>
      )}

      {!loading && feedbackList.length > 0 && (
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Message</th>
                <th>Feedback Date</th>
              </tr>
            </thead>
            <tbody>
              {feedbackList.map((item) => (
                <tr key={item.id}>
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

export default Feedback;