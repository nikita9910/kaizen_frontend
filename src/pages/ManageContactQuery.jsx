import React, { useEffect, useState } from "react";
import API from "../api";
import "./ManageContactQuery.css";

function ManageContactQuery() {
  const [queries, setQueries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchQueries = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await API.get("contact-query/");
      const data = response.data;

      // Supports a normal list or Django REST Framework pagination.
      setQueries(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Error fetching contact queries:", err);
      setError("Unable to load contact queries. Check the API endpoint and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  return (
    <main className="manage-contact-query">
      <div className="contact-query-heading">
        <div>
          <h1>Contact Queries</h1>
          <p>View messages submitted through the contact form.</p>
        </div>

        <button
          type="button"
          className="contact-query-refresh"
          onClick={fetchQueries}
          disabled={loading}
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {error && <p className="contact-query-error">{error}</p>}

      {loading ? (
        <p className="contact-query-message">Loading contact queries...</p>
      ) : queries.length === 0 ? (
        <p className="contact-query-message">No contact queries found.</p>
      ) : (
        <div className="contact-query-table-wrapper">
          <table className="contact-query-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Query Date</th>
              </tr>
            </thead>

            <tbody>
              {queries.map((query) => (
                <tr key={query.id}>
                  <td>{query.name}</td>
                  <td>
                    <a href={`mailto:${query.email}`}>{query.email}</a>
                  </td>
                  <td>{query.subject}</td>
                  <td className="contact-query-message-cell">
                    {query.message}
                  </td>
                  <td>{query.query_date || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default ManageContactQuery;