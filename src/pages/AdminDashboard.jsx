
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Selected month for monthly examination report
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userType");
    navigate("/");
  };

  // Download existing PDF reports
  const downloadReport = async (reportName) => {
    try {
      const response = await API.get(`admin-reports/${reportName}/`, {
        responseType: "blob",
      });

      const pdfUrl = URL.createObjectURL(response.data);
      const link = document.createElement("a");

      link.href = pdfUrl;
      link.download = `kaizen-${reportName}-report.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error("PDF download failed:", error);
      alert(`Could not download the ${reportName} report.`);
    }
  };

  // Download monthly examination report
  const downloadMonthlyExamReport = async () => {
    try {
      const response = await API.get("monthly-exam-report/", {
        params: {
          month: selectedMonth,
        },
        responseType: "blob",
      });

      const pdfUrl = URL.createObjectURL(response.data);
      const link = document.createElement("a");

      link.href = pdfUrl;
      link.download = `monthly-exam-report-${selectedMonth}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error("Monthly exam report download failed:", error);
      alert("Unable to download monthly examination report.");
    }
  };

  const [attendanceMonth, setAttendanceMonth] = useState(
  new Date().toISOString().slice(0, 7)
);

const downloadMonthlyAttendanceReport = async () => {
  if (!attendanceMonth) {
    alert("Please select a month");
    return;
  }

  try {
    const response = await API.get("monthly-attendance-report/", {
      params: {
        month: attendanceMonth,
      },
      responseType: "blob",
    });

    const fileURL = window.URL.createObjectURL(
      new Blob([response.data], {
        type: "application/pdf",
      })
    );

    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `monthly-attendance-report-${attendanceMonth}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(fileURL);

  } catch (error) {
    console.error("Attendance report error:", error);
    alert("Unable to download attendance report.");
  }
};

const [feeMonth, setFeeMonth] = useState(
  new Date().toISOString().slice(0, 7)
);

const downloadMonthlyFeeReport = async () => {
  try {
    const response = await API.get("monthly-fee-report/", {
      params: { month: feeMonth },
      responseType: "blob",
    });

    const fileURL = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `monthly-fee-report-${feeMonth}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(fileURL);

  } catch (error) {
    console.error("Fee report error:", error);
    alert("Unable to download fee report.");
  }
};

const [resultMonth, setResultMonth] = useState(
  new Date().toISOString().slice(0, 7)
);

const downloadMonthlyResultReport = async () => {
  try {
    const response = await API.get("monthly-result-report/", {
      params: { month: resultMonth },
      responseType: "blob",
    });

    const fileURL = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    );

    const link = document.createElement("a");
    link.href = fileURL;
    link.download = `monthly-result-report-${resultMonth}.pdf`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(fileURL);

  } catch (error) {
    console.error("Result report error:", error);
    alert("Unable to download monthly result report.");
  }
};
  return (
    <div className="admin-dashboard">

      {/* Admin Heading */}
      <div className="admin-heading">
        <div>
          <h1>Welcome, {user?.first_name || "Admin"}! 👋</h1>
          <p>
            Welcome to your Kaizen Coaching Class admin dashboard.
          </p>
        </div>

        <button className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Admin Information */}
      <div className="admin-info">
        <div className="admin-profile-icon">⚙️</div>

        <div className="admin-details">
          <h2>
            {user?.first_name || "Admin"} {user?.last_name || ""}
          </h2>
          <p>📧 {user?.email || "admin@kaizen.com"}</p>
          <p>📱 {user?.mobile || "Admin Account"}</p>
        </div>
      </div>

      {/* Management Cards */}
      <div className="admin-management">

        <Link to="/managestudents" className="admin-management-card">
          <span>👨‍🎓</span>
          <h3>Manage Students</h3>
          <p>Add, update and manage students.</p>
        </Link>

        <Link to="/managefaculty" className="admin-management-card">
          <span>👨‍🏫</span>
          <h3>Manage Faculty</h3>
          <p>Manage teachers and faculty members.</p>
        </Link>

        <Link to="/managecourses" className="admin-management-card">
          <span>📚</span>
          <h3>Manage Courses</h3>
          <p>Create and manage coaching courses.</p>
        </Link>

        <Link to="/managebatches" className="admin-management-card">
          <span>🏫</span>
          <h3>Manage Batches</h3>
          <p>Manage student batches and schedules.</p>
        </Link>

        <Link to="/manageattendance" className="admin-management-card">
          <span>📅</span>
          <h3>Attendance</h3>
          <p>Manage student attendance records.</p>
        </Link>

        <Link to="/managefees" className="admin-management-card">
          <span>💳</span>
          <h3>Fees</h3>
          <p>Manage student fee payments.</p>
        </Link>

        <Link to="/manageexams" className="admin-management-card">
          <span>💻</span>
          <h3>Examinations</h3>
          <p>Create and manage online examinations.</p>
        </Link>

        <Link to="/manageresults" className="admin-management-card">
          <span>🏆</span>
          <h3>Results</h3>
          <p>Fill examination results.</p>
        </Link>

        <Link to="/managestudymaterial" className="admin-management-card">
          <span>📖</span>
          <h3>Study Material</h3>
          <p>Upload and manage study materials.</p>
        </Link>

        <Link to="/manageassignments" className="admin-management-card">
          <span>📝</span>
          <h3>Assignments</h3>
          <p>Create and manage student assignments.</p>
        </Link>

        <Link to="/managenotices" className="admin-management-card">
          <span>📢</span>
          <h3>Notices</h3>
          <p>Publish important class notices.</p>
        </Link>

        <Link to="/managecontactquery" className="admin-management-card">
          <span>📞</span>
          <h3>Contact Query</h3>
          <p>View contact queries.</p>
        </Link>

        <Link to="/managefeedback" className="admin-management-card">
          <span>💬</span>
          <h3>Feedback</h3>
          <p>View student feedback and queries.</p>
        </Link>

      </div>

      {/* Existing PDF Reports */}
      <section className="admin-reports">
        <h2>Download PDF Reports</h2>

        <div className="report-buttons">

          <button onClick={() => downloadReport("students")}>
            Students PDF
          </button>

          <button onClick={() => downloadReport("faculty")}>
            Faculty PDF
          </button>

          <button onClick={() => downloadReport("courses")}>
            Courses PDF
          </button>

          <button onClick={() => downloadReport("batches")}>
            Batches PDF
          </button>

          <button onClick={() => downloadReport("attendance")}>
            Attendance PDF
          </button>

          <button onClick={() => downloadReport("fees")}>
            Fees PDF
          </button>

          <button onClick={() => downloadReport("exams")}>
            Exams PDF
          </button>

          <button onClick={() => downloadReport("results")}>
            Results PDF
          </button>

          <button onClick={() => downloadReport("study-material")}>
            Study Material PDF
          </button>

          <button onClick={() => downloadReport("assignments")}>
            Assignments PDF
          </button>

          <button onClick={() => downloadReport("notices")}>
            Notices PDF
          </button>

          <button onClick={() => downloadReport("contact-query")}>
            Contact Queries PDF
          </button>

          <button onClick={() => downloadReport("feedback")}>
            Feedback PDF
          </button>

        </div>
      </section>

      {/* Monthly Examination Report */}
      <section className="monthly-exam-report">

        <h2>📊 Monthly Examination Report</h2>

        <p>
          Select a month to download the examination report
          containing student details, marks and topper name.
        </p>

        <div className="monthly-report-controls">

          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />

          <button
            type="button"
            onClick={downloadMonthlyExamReport}
            disabled={!selectedMonth}
          >
            📥 Download Monthly Exam PDF
          </button>

        </div>

      </section>

      <div className="monthly-report-section">
  <h2>Monthly Attendance Report</h2>

  <label>Select Month:</label>

  <input
    type="month"
    value={attendanceMonth}
    onChange={(e) => setAttendanceMonth(e.target.value)}
  />

  <button onClick={downloadMonthlyAttendanceReport}>
    Download Attendance Report PDF
  </button>
</div>

<div className="monthly-report-section">
  <h2>Monthly Course-wise Fee Report</h2>

  <label>Select Month:</label>

  <input
    type="month"
    value={feeMonth}
    onChange={(e) => setFeeMonth(e.target.value)}
  />

  <button onClick={downloadMonthlyFeeReport}>
    Download Fee Report PDF
  </button>
</div>

<div className="monthly-report-section">
  <h2>Monthly Course-wise Result Report</h2>

  <label>Select Month:</label>

  <input
    type="month"
    value={resultMonth}
    onChange={(e) => setResultMonth(e.target.value)}
  />

  <button onClick={downloadMonthlyResultReport}>
    Download Result PDF
  </button>
</div>

    </div>
  );
}

export default AdminDashboard;
