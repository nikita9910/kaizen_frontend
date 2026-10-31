import React, { useEffect, useState } from "react";
import API from "../api";
import "../student-pages.css";

function ManageNotices() {
  const [notices, setNotices] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch all notices from Django
  const fetchNotices = async () => {
    try {
      setError("");
      const response = await API.get("notices/");
      const data = response.data;

      // Supports a plain list or DRF pagination
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

  useEffect(() => {
    fetchNotices();
  }, []);

  // Add a notice; Django automatically sets publish_date
  const handleAddNotice = async (event) => {
    event.preventDefault();

    if (!title.trim() || !description.trim()) {
      setError("Please enter both a title and description.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await API.post("notices/", {
        title: title.trim(),
        description: description.trim(),
      });

      setTitle("");
      setDescription("");
      setShowForm(false);
      await fetchNotices();
    } catch (err) {
      console.error(
        "Notice save error:",
        err.response?.data || err.message
      );
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Unable to save the notice. Check the Django API."
      );
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (value) => {
    if (!value) return "Date not available";

    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString();
  };

  return (
    <div className="student-page">
      <h1>📢 Manage Notices</h1>
      <p className="page-subtitle">
        Add and view announcements for students.
      </p>

      <button
        className="primary-btn"
        type="button"
        onClick={() => {
          setShowForm((current) => !current);
          setError("");
        }}
      >
        {showForm ? "Cancel" : "+ Add Notice"}
      </button>

      {showForm && (
        <form className="notice-form" onSubmit={handleAddNotice}>
          <input
            type="text"
            placeholder="Notice title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={200}
            required
          />

          <textarea
            placeholder="Notice description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={5}
            required
          />

          <button
            className="primary-btn"
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Notice"}
          </button>
        </form>
      )}

      {error && <p role="alert">{error}</p>}
      {loading && <p>Loading notices...</p>}

      {!loading && !error && notices.length === 0 && (
        <div className="info-card">
          <h2>No notices available</h2>
          <p>Add a notice to display it here.</p>
        </div>
      )}

      {!loading && notices.length > 0 && (
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

export default ManageNotices;