import React, { useEffect, useState } from "react";
import API from "../api";
import "../student-pages.css";

function ManageStudyMaterial() {
  const [materials, setMaterials] = useState([]);
  const [courses, setCourses] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Fetch study materials and courses from Django
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const [materialResponse, courseResponse] = await Promise.all([
        API.get("study-material/"),
        API.get("courses/"),
      ]);

      const materialData = materialResponse.data;
      const courseData = courseResponse.data;

      setMaterials(
        Array.isArray(materialData)
          ? materialData
          : materialData.results || []
      );

      setCourses(
        Array.isArray(courseData)
          ? courseData
          : courseData.results || []
      );
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Unable to load study materials. Check your Django backend and API URLs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Open the upload form
  const handleAdd = () => {
    setEditingId(null);
    setTitle("");
    setCourse("");
    setFile(null);
    setMessage("");
    setError("");
    setShowForm(true);
  };

  // Load selected material into the form for editing
  const handleEdit = (material) => {
    setEditingId(material.id);
    setTitle(material.title || "");
    setCourse(String(material.course?.id ?? material.course ?? ""));
    setFile(null);
    setMessage("");
    setError("");
    setShowForm(true);
  };

  // Upload a new material or update an existing one
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!title.trim() || !course) {
      setError("Please enter the material title and select a course.");
      return;
    }

    if (!editingId && !file) {
      setError("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("course", course);

      if (file) {
        formData.append("file", file);
      }

      if (editingId) {
        // PATCH allows updating the title/course without replacing the file
        await API.patch(`study-material/${editingId}/`, formData);
        setMessage("Study material updated successfully.");
      } else {
        await API.post("study-material/", formData);
        setMessage("Study material uploaded successfully.");
      }

      setShowForm(false);
      setEditingId(null);
      setTitle("");
      setCourse("");
      setFile(null);

      await fetchData();
    } catch (err) {
      console.error("Error saving study material:", err);
      setError(
        err.response?.data
          ? JSON.stringify(err.response.data)
          : "Failed to save study material. Please check the backend."
      );
    }
  };

  // Delete material from the database
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this study material?")) {
      return;
    }

    try {
      setError("");
      setMessage("");

      await API.delete(`study-material/${id}/`);

      setMaterials((previous) =>
        previous.filter((material) => material.id !== id)
      );

      setMessage("Study material deleted successfully.");
    } catch (err) {
      console.error("Error deleting material:", err);
      setError("Failed to delete study material.");
    }
  };

  // Find course name from the course ID
  const getCourseName = (material) => {
    const courseId = material.course?.id ?? material.course;

    const selectedCourse = courses.find(
      (item) => Number(item.id) === Number(courseId)
    );

    return (
      selectedCourse?.course_name ||
      selectedCourse?.name ||
      selectedCourse?.title ||
      (courseId ? `Course ${courseId}` : "N/A")
    );
  };

  // Open/download the uploaded file
  const handleDownload = (material) => {
    if (!material.file) {
      setError("No file is available for this material.");
      return;
    }

    const fileUrl = material.file.startsWith("http")
      ? material.file
      : `http://127.0.0.1:8000${material.file.startsWith("/") ? "" : "/"}${material.file}`;

    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  // Determine file type from filename or URL
  const getFileType = (fileUrl) => {
    if (!fileUrl) return "N/A";

    const cleanUrl = fileUrl.split("?")[0];
    const extension = cleanUrl.split(".").pop();

    return extension ? extension.toUpperCase() : "FILE";
  };

  return (
    <div className="student-page">
      <h1>📖 Manage Study Material</h1>

      <button className="primary-btn" onClick={handleAdd}>
        + Upload Material
      </button>

      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {showForm && (
        <div className="table-box" style={{ marginTop: "20px", padding: "20px" }}>
          <h3>{editingId ? "Edit Study Material" : "Upload Study Material"}</h3>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "12px" }}>
              <label>Material Title</label>
              <br />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter material title"
                required
              />
            </div>

            <div style={{ marginBottom: "12px" }}>
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
                    {item.course_name || item.name || item.title || `Course ${item.id}`}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <label>Choose File {editingId ? "(optional)" : ""}</label>
              <br />
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png"
                required={!editingId}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>

            <button type="submit" className="primary-btn">
              {editingId ? "Update Material" : "Upload Material"}
            </button>

            <button
              type="button"
              className="primary-btn"
              style={{ marginLeft: "10px" }}
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
                setError("");
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <br />

      <div className="table-box">
        {loading ? (
          <p>Loading study materials...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Material</th>
                <th>Subject</th>
                <th>Course</th>
                <th>Type</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {materials.length === 0 ? (
                <tr>
                  <td colSpan="5">No study materials found.</td>
                </tr>
              ) : (
                materials.map((material) => (
                  <tr key={material.id}>
                    <td>{material.title}</td>

                    {/* Your current model has no separate Subject field */}
                    <td>{material.subject || "N/A"}</td>

                    <td>{getCourseName(material)}</td>

                    <td>{getFileType(material.file)}</td>

                    <td>
                      <button
                        className="primary-btn"
                        onClick={() => handleDownload(material)}
                      >
                        Download
                      </button>{" "}

                      <button
                        className="primary-btn"
                        onClick={() => handleEdit(material)}
                      >
                        Edit
                      </button>{" "}

                      <button
                        className="primary-btn"
                        onClick={() => handleDelete(material.id)}
                      >
                        Delete
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

export default ManageStudyMaterial;
