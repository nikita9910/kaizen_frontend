import React, { useEffect, useState } from "react";
import API from "../api";
import "../student-pages.css";

function ManageAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch assignments and courses from Django
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [assignmentResponse, courseResponse] = await Promise.all([
        API.get("assignments/"),
        API.get("courses/"),
      ]);

      const assignmentData = assignmentResponse.data;
      const courseData = courseResponse.data;

      setAssignments(
        Array.isArray(assignmentData)
          ? assignmentData
          : assignmentData.results || []
      );

      setCourses(
        Array.isArray(courseData)
          ? courseData
          : courseData.results || []
      );
    } catch (err) {
      console.error("Error loading assignments:", err);
      setError(
        "Unable to load assignments. Please check your Django backend and API URLs."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open create assignment form
  const handleCreate = () => {
    setTitle("");
    setSubject("");
    setCourse("");
    setDueDate("");
    setDescription("");
    setFile(null);
    setSelectedAssignment(null);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Create assignment in database
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!title.trim() || !course || !dueDate) {
      setError("Please enter the assignment title, course, and due date.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title.trim());
      formData.append("subject", subject);
      formData.append("course", course);
      formData.append("due_date", dueDate);
      formData.append("description", description);

      if (file) {
        formData.append("file", file);
      }

      // This endpoint must accept these fields in Django
      await API.post("assignments/", formData);

      setSuccess("Assignment created successfully!");
      setShowForm(false);

      await fetchData();
    } catch (err) {
      console.error("Error creating assignment:", err);
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Failed to create assignment. Check your Django API."
      );
    }
  };

  // View assignment details
  const handleView = (assignment) => {
    setSelectedAssignment(assignment);
    setShowForm(false);
    setError("");
    setSuccess("");
  };

  // Delete assignment
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this assignment?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      await API.delete(`assignments/${id}/`);

      setAssignments((previous) =>
        previous.filter((assignment) => assignment.id !== id)
      );

      setSuccess("Assignment deleted successfully.");
      setSelectedAssignment(null);
    } catch (err) {
      console.error("Error deleting assignment:", err);
      setError("Failed to delete assignment. Check your backend API.");
    }
  };

  // Display course name using the course ID
  const getCourseName = (assignment) => {
    const courseId = assignment.course?.id ?? assignment.course;

    const foundCourse = courses.find(
      (item) => Number(item.id) === Number(courseId)
    );

    return (
      foundCourse?.course_name ||
      foundCourse?.name ||
      foundCourse?.title ||
      assignment.course_name ||
      (courseId ? `Course ${courseId}` : "N/A")
    );
  };

  // Format due date
  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(`${date}T00:00:00`);

    return Number.isNaN(parsedDate.getTime())
      ? date
      : parsedDate.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
  };

  return (
    <div className="student-page">
      <h1>📄 Manage Assignments</h1>

      <button className="primary-btn" onClick={handleCreate}>
        + Create Assignment
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

      {/* Create Assignment Form */}
      {showForm && (
        <div
          className="table-box"
          style={{ padding: "20px", marginTop: "20px" }}
        >
          <h2>Create Assignment</h2>

          <form onSubmit={handleSubmit}>
            <div>
              <label>Assignment Title</label>
              <br />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter assignment title"
                required
              />
            </div>

            <br />

            <div>
              <label>Subject</label>
              <br />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
              />
            </div>

            <br />

            <div>
              <label>Course</label>
              <br />
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              >
                <option value="">Select Course</option>

                {courses.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.course_name ||
                      item.name ||
                      item.title ||
                      `Course ${item.id}`}
                  </option>
                ))}
              </select>
            </div>

            <br />

            <div>
              <label>Due Date</label>
              <br />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>

            <br />

            <div>
              <label>Description</label>
              <br />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter assignment instructions"
                rows="4"
              />
            </div>

            <br />

            <div>
              <label>Attachment (optional)</label>
              <br />
              <input
                type="file"
                onChange={(e) =>
                  setFile(e.target.files?.[0] || null)
                }
              />
            </div>

            <br />

            <button type="submit" className="primary-btn">
              Save Assignment
            </button>

            <button
              type="button"
              className="primary-btn"
              style={{ marginLeft: "10px" }}
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Assignment Details */}
      {selectedAssignment && (
        <div
          className="table-box"
          style={{ padding: "20px", marginTop: "20px" }}
        >
          <h2>
            {selectedAssignment.title ||
              selectedAssignment.name ||
              "Assignment Details"}
          </h2>

          <p>
            <strong>Subject:</strong>{" "}
            {selectedAssignment.subject || "N/A"}
          </p>

          <p>
            <strong>Course:</strong>{" "}
            {getCourseName(selectedAssignment)}
          </p>

          <p>
            <strong>Due Date:</strong>{" "}
            {formatDate(
              selectedAssignment.due_date ||
                selectedAssignment.dueDate
            )}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {selectedAssignment.description || "No description available."}
          </p>

          {selectedAssignment.file && (
            <p>
              <a
                href={
                  selectedAssignment.file.startsWith("http")
                    ? selectedAssignment.file
                    : `http://127.0.0.1:8000${selectedAssignment.file}`
                }
                target="_blank"
                rel="noreferrer"
              >
                View Attachment
              </a>
            </p>
          )}

          <button
            className="primary-btn"
            onClick={() => handleDelete(selectedAssignment.id)}
          >
            Delete Assignment
          </button>

          <button
            className="primary-btn"
            style={{ marginLeft: "10px" }}
            onClick={() => setSelectedAssignment(null)}
          >
            Close
          </button>
        </div>
      )}

      <br />

      {/* Assignments Table */}
      <div className="table-box">
        {loading ? (
          <p>Loading assignments...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Assignment</th>
                <th>Subject</th>
                <th>Course</th>
                <th>Due Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {assignments.length === 0 ? (
                <tr>
                  <td colSpan="5">No assignments found.</td>
                </tr>
              ) : (
                assignments.map((assignment) => (
                  <tr key={assignment.id}>
                    <td>
                      {assignment.title ||
                        assignment.name ||
                        "Untitled Assignment"}
                    </td>

                    <td>{assignment.subject || "N/A"}</td>

                    <td>{getCourseName(assignment)}</td>

                    <td>
                      {formatDate(
                        assignment.due_date || assignment.dueDate
                      )}
                    </td>

                    <td>
                      <button
                        className="primary-btn"
                        onClick={() => handleView(assignment)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default ManageAssignments;
