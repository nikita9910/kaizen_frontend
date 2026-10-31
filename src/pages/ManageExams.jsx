import React, { useEffect, useState } from "react";
import API from "../api";
import "../student-pages.css";

function ManageExams() {
  const [exams, setExams] = useState([]);
  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const [formData, setFormData] = useState({
    course: "",
    exam_name: "",
    exam_date: "",
    total_marks: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch exams and courses from Django
  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const [examResponse, courseResponse] = await Promise.all([
        API.get("exams/"),
        API.get("courses/"),
      ]);

      const examData = examResponse.data;
      const courseData = courseResponse.data;

      setExams(
        Array.isArray(examData)
          ? examData
          : Array.isArray(examData.results)
          ? examData.results
          : []
      );

      setCourses(
        Array.isArray(courseData)
          ? courseData
          : Array.isArray(courseData.results)
          ? courseData.results
          : []
      );
    } catch (err) {
      console.error("Error fetching exam data:", err);

      if (err.response) {
        setError(
          `API Error ${err.response.status}: ${JSON.stringify(
            err.response.data
          )}`
        );
      } else {
        setError(
          "Unable to connect to Django. Check whether the backend server is running."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Open form for adding an exam
  const handleAddExam = () => {
    setFormData({
      course: "",
      exam_name: "",
      exam_date: "",
      total_marks: "",
    });

    setSelectedExam(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  // Save exam to Django database
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formData.course ||
      !formData.exam_name.trim() ||
      !formData.exam_date ||
      formData.total_marks === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (Number(formData.total_marks) <= 0) {
      setError("Total marks must be greater than zero.");
      return;
    }

    const examData = {
      course: Number(formData.course),
      exam_name: formData.exam_name.trim(),
      exam_date: formData.exam_date,
      total_marks: Number(formData.total_marks),
    };

    try {
      if (selectedExam) {
        await API.patch(`exams/${selectedExam.id}/`, examData);
        setSuccess("Exam updated successfully!");
      } else {
        await API.post("exams/", examData);
        setSuccess("Exam added successfully!");
      }

      setShowForm(false);
      setSelectedExam(null);

      await fetchData();
    } catch (err) {
      console.error("Error saving exam:", err);

      setError(
        err.response
          ? `Unable to save exam: ${JSON.stringify(err.response.data)}`
          : "Cannot connect to the Django backend."
      );
    }
  };

  // Edit exam
  const handleEdit = (exam) => {
    setFormData({
      course: String(exam.course ?? ""),
      exam_name: exam.exam_name ?? "",
      exam_date: exam.exam_date ?? "",
      total_marks: String(exam.total_marks ?? ""),
    });

    setSelectedExam(exam);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  // Delete exam
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this exam?")) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      await API.delete(`exams/${id}/`);
      setSuccess("Exam deleted successfully!");
      await fetchData();
    } catch (err) {
      console.error("Error deleting exam:", err);

      setError(
        err.response
          ? `Unable to delete exam: ${JSON.stringify(err.response.data)}`
          : "Cannot connect to the Django backend."
      );
    }
  };

  // Display course name when API returns a course ID
  const getCourseName = (courseValue) => {
    if (courseValue && typeof courseValue === "object") {
      return (
        courseValue.course_name ||
        courseValue.name ||
        courseValue.title ||
        `Course ${courseValue.id}`
      );
    }

    const course = courses.find(
      (item) => String(item.id) === String(courseValue)
    );

    return course
      ? course.course_name || course.name || course.title || `Course ${course.id}`
      : courseValue ?? "N/A";
  };

  return (
    <div className="student-page">
      <div className="page-header">
        <h2>Manage Exams</h2>

        <button className="btn btn-primary" onClick={handleAddExam}>
          + Add Exam
        </button>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {success && (
        <div className="alert alert-success" role="alert">
          {success}
        </div>
      )}

      {showForm && (
        <div className="form-container">
          <h3>{selectedExam ? "Edit Exam" : "Add New Exam"}</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="course">Course</label>

              <select
                id="course"
                name="course"
                className="form-control"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">Select Course</option>

                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_name ||
                      course.name ||
                      course.title ||
                      `Course ${course.id}`}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="exam_name">Exam Name</label>

              <input
                id="exam_name"
                type="text"
                name="exam_name"
                className="form-control"
                placeholder="Enter exam name"
                value={formData.exam_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="exam_date">Exam Date</label>

              <input
                id="exam_date"
                type="date"
                name="exam_date"
                className="form-control"
                value={formData.exam_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="total_marks">Total Marks</label>

              <input
                id="total_marks"
                type="number"
                name="total_marks"
                className="form-control"
                placeholder="Enter total marks"
                min="1"
                value={formData.total_marks}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success">
              {selectedExam ? "Update Exam" : "Save Exam"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowForm(false);
                setSelectedExam(null);
                setError("");
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        <h3>Exam List</h3>

        {loading ? (
          <p>Loading exams...</p>
        ) : exams.length === 0 ? (
          <p>No exams found. Click "Add Exam" to create one.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Course</th>
                  <th>Exam Name</th>
                  <th>Exam Date</th>
                  <th>Total Marks</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {exams.map((exam) => (
                  <tr key={exam.id}>
                    <td>{exam.id}</td>
                    <td>{getCourseName(exam.course)}</td>
                    <td>{exam.exam_name}</td>
                    <td>{exam.exam_date}</td>
                    <td>{exam.total_marks}</td>

                    <td>
                      <button
                        className="btn btn-info btn-sm"
                        onClick={() => setSelectedExam(exam)}
                      >
                        View
                      </button>{" "}

                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => handleEdit(exam)}
                      >
                        Edit
                      </button>{" "}

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(exam.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedExam && !showForm && (
        <div className="details-container">
          <h3>Exam Details</h3>

          <p>
            <strong>Exam Name:</strong> {selectedExam.exam_name}
          </p>

          <p>
            <strong>Course:</strong>{" "}
            {getCourseName(selectedExam.course)}
          </p>

          <p>
            <strong>Exam Date:</strong> {selectedExam.exam_date}
          </p>

          <p>
            <strong>Total Marks:</strong> {selectedExam.total_marks}
          </p>

          <button
            className="btn btn-secondary"
            onClick={() => setSelectedExam(null)}
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
}

export default ManageExams;