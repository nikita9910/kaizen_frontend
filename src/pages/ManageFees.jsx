import React, { useEffect, useState } from "react";
import API from "../api";
import "../student-pages.css";

function ManageFees() {
  const [fees, setFees] = useState([]);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    student: "",
    course: "",
    total_fee: "",
    paid_fee: "",
    remaining_fee: "",
    payment_date: "",
    payment_status: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const getList = (data) => {
    if (Array.isArray(data)) return data;
    return data?.results || [];
  };

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [feesResponse, studentsResponse, coursesResponse] =
        await Promise.all([
          API.get("fees/"),
          API.get("students/"),
          API.get("courses/"),
        ]);

      setFees(getList(feesResponse.data));
      setStudents(getList(studentsResponse.data));
      setCourses(getList(coursesResponse.data));
    } catch (err) {
      console.error("Manage fees loading error:", err.response?.data || err.message);
      setError("Unable to load fees, students, or courses. Check the API endpoints.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => {
      const updated = { ...previous, [name]: value };

      if (name === "total_fee" || name === "paid_fee") {
        const total = Number(name === "total_fee" ? value : updated.total_fee);
        const paid = Number(name === "paid_fee" ? value : updated.paid_fee);

        if (updated.total_fee !== "" && updated.paid_fee !== "") {
          updated.remaining_fee = Math.max(total - paid, 0).toFixed(2);
        }
      }

      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const total = Number(formData.total_fee);
    const paid = Number(formData.paid_fee);

    if (paid > total) {
      setError("Paid fee cannot be greater than total fee.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const payload = {
        student: Number(formData.student),
        course: Number(formData.course),
        total_fee: total,
        paid_fee: paid,
        remaining_fee: Number(formData.remaining_fee),
        payment_date: formData.payment_date,
        payment_status: formData.payment_status.trim(),
      };

      await API.post("fees/", payload);

      setFormData({
        student: "",
        course: "",
        total_fee: "",
        paid_fee: "",
        remaining_fee: "",
        payment_date: "",
        payment_status: "",
      });

      setSuccess("Fee record added successfully.");
      await loadData();
    } catch (err) {
      console.error("Fee submission error:", err.response?.data || err.message);
      const detail = err.response?.data;
      setError(
        detail ? JSON.stringify(detail) : "Unable to save fee record. Check the backend API."
      );
    } finally {
      setSaving(false);
    }
  };

  const getStudentName = (student) => {
    if (student && typeof student === "object") {
      return (
        `${student.first_name || ""} ${student.last_name || ""}`.trim() ||
        student.name ||
        student.email ||
        "Student"
      );
    }

    const matched = students.find((item) => Number(item.id) === Number(student));

    return matched
      ? `${matched.first_name || ""} ${matched.last_name || ""}`.trim() ||
          matched.name ||
          matched.email ||
          "Student"
      : "Student";
  };

  const getCourseName = (course) => {
    if (course && typeof course === "object") {
      return course.course_name || course.name || "Course";
    }

    const matched = courses.find((item) => Number(item.id) === Number(course));
    return matched?.course_name || matched?.name || "Course";
  };

  const formatMoney = (value) => {
    const amount = Number(value);
    return Number.isNaN(amount) ? value ?? "—" : `₹${amount.toFixed(2)}`;
  };

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString();
  };

  return (
     <div className="student-page manage-fees-page">
      <h1>💳 Manage Fees</h1>
      <p className="page-subtitle">Add and view student fee records.</p>

      <div className="info-card">
        <h2>Add Fee Record</h2>

        <form onSubmit={handleSubmit} className="manage-fees-form">
          <label htmlFor="fee-student">Student</label>
          <select
            id="fee-student"
            name="student"
            value={formData.student}
            onChange={handleChange}
            required
          >
            <option value="">Select student</option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {getStudentName(student)}
              </option>
            ))}
          </select>

          <label htmlFor="fee-course">Course</label>
          <select
            id="fee-course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_name || course.name}
              </option>
            ))}
          </select>

          <label htmlFor="fee-total">Total Fee (₹)</label>
          <input
            id="fee-total"
            type="number"
            name="total_fee"
            min="0"
            step="0.01"
            value={formData.total_fee}
            onChange={handleChange}
            required
          />

          <label htmlFor="fee-paid">Paid Fee (₹)</label>
          <input
            id="fee-paid"
            type="number"
            name="paid_fee"
            min="0"
            step="0.01"
            value={formData.paid_fee}
            onChange={handleChange}
            required
          />

          <label htmlFor="fee-remaining">Remaining Fee (₹)</label>
          <input
            id="fee-remaining"
            type="number"
            name="remaining_fee"
            min="0"
            step="0.01"
            value={formData.remaining_fee}
            onChange={handleChange}
            required
          />

          <label htmlFor="fee-date">Payment Date</label>
          <input
            id="fee-date"
            type="date"
            name="payment_date"
            value={formData.payment_date}
            onChange={handleChange}
            required
          />

          <label htmlFor="fee-status">Payment Status</label>
          <input
            id="fee-status"
            type="text"
            name="payment_status"
            value={formData.payment_status}
            onChange={handleChange}
            placeholder="e.g. Paid, Partial, Pending"
            maxLength="20"
            required
          />

          <button className="primary-btn" type="submit" disabled={saving}>
            {saving ? "Saving..." : "Add Fee"}
          </button>
        </form>

        {error && <p role="alert">{error}</p>}
        {success && <p>{success}</p>}
      </div>

      <h2>Fee Records</h2>

      {loading && <p>Loading fee records...</p>}

      {!loading && !error && fees.length === 0 && (
        <div className="info-card">
          <p>No fee records found.</p>
        </div>
      )}

      {!loading && fees.length > 0 && (
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Total Fee</th>
                <th>Paid Fee</th>
                <th>Remaining Fee</th>
                <th>Payment Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {fees.map((fee) => (
                <tr key={fee.id}>
                  <td>{getStudentName(fee.student)}</td>
                  <td>{getCourseName(fee.course)}</td>
                  <td>{formatMoney(fee.total_fee)}</td>
                  <td>{formatMoney(fee.paid_fee)}</td>
                  <td>{formatMoney(fee.remaining_fee)}</td>
                  <td>{formatDate(fee.payment_date)}</td>
                  <td>{fee.payment_status || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageFees;