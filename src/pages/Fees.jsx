import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import "../student-pages.css";

function Fees() {
  const navigate = useNavigate();

  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user?.id) {
      navigate("/student-login");
      return;
    }

    const fetchFees = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get("fees/");
        const data = response.data;
        const allFees = Array.isArray(data) ? data : data.results || [];

        const studentFees = allFees.filter((fee) => {
          const studentId =
            typeof fee.student === "object"
              ? fee.student?.id
              : fee.student;

          return Number(studentId) === Number(user.id);
        });

        setFees(studentFees);
      } catch (err) {
        console.error("Fees loading error:", err.response?.data || err.message);
        setError("Unable to load fee details. Please check the backend API.");
      } finally {
        setLoading(false);
      }
    };

    fetchFees();
  }, [navigate, user?.id]);

  const getRelatedName = (value, fieldName) => {
    if (value && typeof value === "object") {
      return value[fieldName] || value.name || "—";
    }
    return "—";
  };

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(`${value}T00:00:00`);
    return Number.isNaN(date.getTime())
      ? value
      : date.toLocaleDateString();
  };

  const formatMoney = (value) => {
    const amount = Number(value);
    return Number.isNaN(amount) ? value ?? "—" : `₹${amount.toFixed(2)}`;
  };

  return (
    <div className="student-page">
      <h1>💳 My Fees</h1>
      <p className="page-subtitle">
        View your course fees, payments, and remaining balance.
      </p>

      {loading && <p>Loading fee details...</p>}
      {!loading && error && <p role="alert">{error}</p>}

      {!loading && !error && fees.length === 0 && (
        <div className="info-card">
          <h2>No fee records found</h2>
          <p>Your fee details will appear here when they are added.</p>
        </div>
      )}

      {!loading && !error && fees.length > 0 && (
        <div className="table-box">
          <table>
            <thead>
              <tr>
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
                  <td>{getRelatedName(fee.course, "course_name")}</td>
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

export default Fees;