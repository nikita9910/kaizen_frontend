import React, { useEffect, useState } from "react";
import API from "../api";
import "../student-pages.css";

function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await API.get("notices/");
        const data = response.data;

        // Supports a plain list or Django REST Framework pagination
        const noticeList = Array.isArray(data) ? data : data.results;

        if (!Array.isArray(noticeList)) {
          throw new Error("The API did not return a notice list.");
        }

        setNotices(noticeList);
      } catch (err) {
        console.error(
          "Notice fetch error:",
          err.response?.data || err.message
        );
        setError("Unable to load notices. Please check the Django API.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const formatDate = (value) => {
    if (!value) return "Date not available";

    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString();
  };

  return (
    <div className="student-page">
      <h1>📢 Notices</h1>
      <p className="page-subtitle">
        Latest announcements from Kaizen Coaching Class.
      </p>

      {loading && <p>Loading notices...</p>}

      {!loading && error && <p role="alert">{error}</p>}

      {!loading && !error && notices.length === 0 && (
        <div className="info-card">
          <h2>No notices available</h2>
          <p>New announcements will appear here.</p>
        </div>
      )}

      {!loading && !error && notices.length > 0 && (
        <div className="data-cards">
          {notices.map((notice) => (
            <article className="info-card" key={notice.id}>
              <h2>{notice.title}</h2>
              <p>{notice.description}</p>
              <small>
                Published: {formatDate(notice.publish_date)}
              </small>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notices;