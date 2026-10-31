import React, { useEffect, useState } from "react";
import API from "../api";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Get assignments from Django database
  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("assignments/");
      const data = response.data;

      setAssignments(
        Array.isArray(data) ? data : data.results || []
      );
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setError("Unable to load assignments. Please check your backend API.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  // Open assignment submission form
  const handleOpenSubmit = (assignment) => {
    setSelectedAssignment(assignment);
    setSubmissionFile(null);
    setError("");
    setSuccess("");
  };

  // Submit assignment file to Django
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!submissionFile) {
      setError("Please select a file before submitting.");
      return;
    }

    if (!selectedAssignment) {
      setError("Please select an assignment.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      const user = JSON.parse(localStorage.getItem("user") || "null");

      if (!user?.id) {
        setError("Please log in again before submitting your assignment.");
        return;
      }

      const formData = new FormData();
      formData.append("assignment", selectedAssignment.id);
      formData.append("student", user.id);
      formData.append("file", submissionFile);

      // This endpoint must exist in your Django backend.
      // Change it if your backend uses a different URL.
      await API.post("assignment-submissions/", formData);

      setSuccess("Assignment submitted successfully!");
      setSelectedAssignment(null);
      setSubmissionFile(null);

      // Reload assignments if your API returns submission status
      await fetchAssignments();
    } catch (err) {
      console.error("Error submitting assignment:", err);
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Assignment submission failed. Check your backend API."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Format the due date
  const formatDate = (date) => {
    if (!date) return "Not specified";

    const parsedDate = new Date(`${date}T00:00:00`);

    return Number.isNaN(parsedDate.getTime())
      ? date
      : parsedDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  // Resolve common possible field names from the API
  const getSubject = (assignment) =>
    assignment.subject_name ||
    assignment.subject?.name ||
    assignment.subject ||
    assignment.course_name ||
    assignment.course?.name ||
    assignment.course ||
    "N/A";

  const getStatus = (assignment) =>
    assignment.status ||
    (assignment.submitted ? "Submitted" : "Pending");

  return (
    <div className="student-page">
      <h1>📝 Assignments</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {selectedAssignment && (
        <div className="table-box" style={{ padding: "20px", marginBottom: "20px" }}>
          <h3>Submit: {selectedAssignment.title || selectedAssignment.name}</h3>

          <form onSubmit={handleSubmit}>
            <label>Select Assignment File</label>
            <br />

            <input
              type="file"
              accept=".pdf,.doc,.docx,.zip"
              onChange={(e) =>
                setSubmissionFile(e.target.files?.[0] || null)
              }
              required
            />

            <br /><br />

            <button
              type="submit"
              className="primary-btn"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Assignment"}
            </button>

            <button
              type="button"
              className="primary-btn"
              style={{ marginLeft: "10px" }}
              onClick={() => setSelectedAssignment(null)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="table-box">
        {loading ? (
          <p>Loading assignments...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Subject</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {assignments.length === 0 ? (
                <tr>
                  <td colSpan="5">No assignments available.</td>
                </tr>
              ) : (
                assignments.map((assignment) => {
                  const status = getStatus(assignment);
                  const isSubmitted =
                    String(status).toLowerCase() === "submitted" ||
                    String(status).toLowerCase() === "completed";

                  return (
                    <tr key={assignment.id}>
                      <td>
                        {assignment.title ||
                          assignment.name ||
                          "Untitled Assignment"}
                      </td>

                      <td>{getSubject(assignment)}</td>

                      <td>
                        {formatDate(
                          assignment.due_date || assignment.dueDate
                        )}
                      </td>

                      <td>{status}</td>

                      <td>
                        {isSubmitted ? (
                          "✓ Completed"
                        ) : (
                          <button
                            className="primary-btn"
                            onClick={() => handleOpenSubmit(assignment)}
                          >
                            Submit
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Assignments;
