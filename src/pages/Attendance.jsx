import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Attendance() {

  const navigate = useNavigate();

  // ==============================
  // STATES
  // ==============================

  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==============================
  // GET LOGGED-IN STUDENT
  // ==============================

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // ==============================
  // FETCH ATTENDANCE
  // ==============================

  useEffect(() => {

    if (!user || !user.id) {
      navigate("/student-login");
      return;
    }

    const fetchAttendance = async () => {

      try {

        setLoading(true);
        setError("");

        // Get all attendance records
        const response = await API.get(
          "attendance/"
        );

        console.log(
          "Attendance API Response:",
          response.data
        );

        // ============================
        // HANDLE PAGINATED RESPONSE
        // ============================

        const attendanceData =
          response.data.results ||
          response.data;

        // ============================
        // ONLY LOGGED-IN STUDENT
        // ============================

        const studentAttendance =
          attendanceData.filter(
            (record) =>
              Number(record.student) ===
              Number(user.id)
          );

        console.log(
          "My Attendance:",
          studentAttendance
        );

        setAttendance(studentAttendance);

      } catch (err) {

        console.error(
          "Attendance error:",
          err
        );

        setError(
          "Unable to load attendance information."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchAttendance();

  }, [navigate, user?.id]);


  // ==============================
  // CALCULATE SUMMARY
  // ==============================

  const totalDays = attendance.length;

  const presentDays = attendance.filter(
    (record) =>
      record.status === "P" ||
      record.status === "Present"
  ).length;

  const absentDays = attendance.filter(
    (record) =>
      record.status === "A" ||
      record.status === "Absent"
  ).length;

  const attendancePercentage =
    totalDays > 0
      ? Math.round(
          (presentDays / totalDays) * 100
        )
      : 0;


  // ==============================
  // FORMAT DATE
  // ==============================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    const formattedDate = new Date(date);

    return formattedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }
    );

  };


  // ==============================
  // STATUS TEXT
  // ==============================

  const getStatusText = (status) => {

    if (
      status === "P" ||
      status === "Present"
    ) {
      return "Present";
    }

    if (
      status === "A" ||
      status === "Absent"
    ) {
      return "Absent";
    }

    return status || "-";

  };


  // ==============================
  // LOADING
  // ==============================

  if (loading) {

    return (
      <div className="student-page">

        <h1>📅 Attendance</h1>

        <p className="page-subtitle">
          Loading attendance...
        </p>

      </div>
    );

  }


  // ==============================
  // ERROR
  // ==============================

  if (error) {

    return (
      <div className="student-page">

        <h1>📅 Attendance</h1>

        <p className="page-subtitle">
          {error}
        </p>

        <button
          className="primary-btn"
          onClick={() =>
            navigate("/student-dashboard")
          }
        >
          Back to Dashboard
        </button>

      </div>
    );

  }


  // ==============================
  // PAGE
  // ==============================

  return (

    <div className="student-page">

      <h1>📅 Attendance</h1>

      <p className="page-subtitle">
        View your attendance records.
      </p>


      {/* ==========================
          ATTENDANCE SUMMARY
          ========================== */}

      <div className="attendance-summary">

        {/* OVERALL */}

        <div>

          <h2>
            {attendancePercentage}%
          </h2>

          <p>
            Overall Attendance
          </p>

        </div>


        {/* PRESENT */}

        <div>

          <h2>
            {presentDays}
          </h2>

          <p>
            Present Days
          </p>

        </div>


        {/* ABSENT */}

        <div>

          <h2>
            {absentDays}
          </h2>

          <p>
            Absent Days
          </p>

        </div>

      </div>


      {/* ==========================
          ATTENDANCE TABLE
          ========================== */}

      <div className="table-box">

        <h2>
          Attendance Details
        </h2>


        {attendance.length === 0 ? (

          <p className="page-subtitle">
            No attendance records found.
          </p>

        ) : (

          <table>

            <thead>

              <tr>

                <th>
                  Date
                </th>

                <th>
                  Batch
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>


            <tbody>

              {attendance.map(
                (record) => {

                  const isPresent =
                    record.status === "P" ||
                    record.status === "Present";

                  return (

                    <tr
                      key={record.id}
                    >

                      {/* DATE */}

                      <td>
                        {formatDate(
                          record.attendance_date
                        )}
                      </td>


                      {/* BATCH */}

                      <td>
                        {record.batch || "-"}
                      </td>


                      {/* STATUS */}

                      <td
                        className={
                          isPresent
                            ? "present"
                            : "absent"
                        }
                      >

                        {getStatusText(
                          record.status
                        )}

                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

}

export default Attendance;
