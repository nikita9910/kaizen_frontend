import React, { useEffect, useState } from "react";
import "../student-pages.css";
import API from "../api";

function ManageAttendance() {

  // ==========================================
  // STATES
  // ==========================================

  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [selectedDate, setSelectedDate] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ==========================================
  // ATTENDANCE STATUS
  // ==========================================

  const [statusData, setStatusData] = useState({});


  // ==========================================
  // GET STUDENTS
  // ==========================================

  const getStudents = async () => {

    try {

      const response = await API.get("students/");

      if (Array.isArray(response.data)) {

        setStudents(response.data);

      }

      else if (response.data.results) {

        setStudents(response.data.results);

      }

    }

    catch (error) {

      console.error(
        "STUDENT ERROR:",
        error.response?.data || error
      );

      setError("Unable to load students.");

    }

  };


  // ==========================================
  // GET BATCHES
  // ==========================================

  const getBatches = async () => {

    try {

      const response = await API.get("batches/");

      if (Array.isArray(response.data)) {

        setBatches(response.data);

      }

      else if (response.data.results) {

        setBatches(response.data.results);

      }

    }

    catch (error) {

      console.error(
        "BATCH ERROR:",
        error.response?.data || error
      );

      setError("Unable to load batches.");

    }

  };


  // ==========================================
  // GET ATTENDANCE
  // ==========================================

  const getAttendance = async () => {

    try {

      const response =
        await API.get("attendance/");

      console.log(
        "ATTENDANCE:",
        response.data
      );


      if (Array.isArray(response.data)) {

        setAttendance(response.data);

      }

      else if (response.data.results) {

        setAttendance(
          response.data.results
        );

      }

    }

    catch (error) {

      console.error(
        "ATTENDANCE ERROR:",
        error.response?.data || error
      );

    }

  };


  // ==========================================
  // LOAD DATABASE DATA
  // ==========================================

  useEffect(() => {

    getStudents();

    getBatches();

    getAttendance();

  }, []);


  // ==========================================
  // GET STUDENT ID
  // ==========================================

  const getStudentId = (student) => {

    if (
      typeof student === "object"
    ) {

      return student?.id;

    }

    return student;

  };


  // ==========================================
  // GET BATCH ID
  // ==========================================

  const getBatchId = (batch) => {

    if (
      typeof batch === "object"
    ) {

      return batch?.id;

    }

    return batch;

  };


  // ==========================================
  // GET STUDENT NAME
  // ==========================================

  const getStudentName = (studentId) => {

    if (
      typeof studentId === "object"
    ) {

      return (

        studentId?.first_name +
        " " +
        studentId?.last_name

      );

    }


    const student =
      students.find(
        (item) =>
          item.id ===
          Number(studentId)
      );


    if (!student) {

      return "Unknown Student";

    }


    return (

      student.first_name +
      " " +
      student.last_name

    );

  };


  // ==========================================
  // GET BATCH NAME
  // ==========================================

  const getBatchName = (batchId) => {

    if (
      typeof batchId === "object"
    ) {

      return (
        batchId?.batch_name ||
        "-"
      );

    }


    const batch =
      batches.find(
        (item) =>
          item.id ===
          Number(batchId)
      );


    return (
      batch?.batch_name ||
      "-"
    );

  };


  // ==========================================
  // CHANGE STATUS
  // ==========================================

  const handleStatusChange = (
    studentId,
    batchId,
    value
  ) => {

    const key =
      `${studentId}-${batchId}`;


    setStatusData({

      ...statusData,

      [key]: value

    });

  };


  // ==========================================
  // FIND EXISTING ATTENDANCE
  // ==========================================

  const findAttendance = (
    studentId,
    batchId
  ) => {

    return attendance.find(
      (record) => {

        const recordStudent =
          getStudentId(
            record.student
          );

        const recordBatch =
          getBatchId(
            record.batch
          );


        return (

          Number(recordStudent) ===
          Number(studentId)

          &&

          Number(recordBatch) ===
          Number(batchId)

          &&

          (
            !selectedDate ||
            record.attendance_date ===
            selectedDate
          )

        );

      }
    );

  };


  // ==========================================
  // SAVE ATTENDANCE
  // ==========================================

  const saveAttendance = async (
    studentId,
    batchId
  ) => {

    if (!selectedDate) {

      alert(
        "Please select attendance date first."
      );

      return;

    }


    const key =
      `${studentId}-${batchId}`;


    const selectedStatus =
      statusData[key];


    if (!selectedStatus) {

      alert(
        "Please select P or A."
      );

      return;

    }


    try {

      const existingRecord =
        findAttendance(
          studentId,
          batchId
        );


      const attendanceData = {

        student:
          Number(studentId),

        batch:
          Number(batchId),

        attendance_date:
          selectedDate,

        status:
          selectedStatus

      };


      // ======================================
      // UPDATE EXISTING
      // ======================================

      if (existingRecord) {

        await API.put(

          `attendance/${existingRecord.id}/`,

          attendanceData

        );


        alert(
          "Attendance updated successfully!"
        );

      }


      // ======================================
      // CREATE NEW
      // ======================================

      else {

        await API.post(

          "attendance/",

          attendanceData

        );


        alert(
          "Attendance saved successfully!"
        );

      }


      await getAttendance();

    }

    catch (error) {

      console.error(
        "SAVE ATTENDANCE ERROR:",
        error.response?.data || error
      );


      alert(
        "Unable to save attendance."
      );

    }

  };


  // ==========================================
  // DELETE ATTENDANCE
  // ==========================================

  const deleteAttendance = async (
    record
  ) => {

    const confirmDelete =
      window.confirm(
        "Delete this attendance record?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      await API.delete(

        `attendance/${record.id}/`

      );


      alert(
        "Attendance deleted successfully!"
      );


      await getAttendance();

    }

    catch (error) {

      console.error(
        "DELETE ERROR:",
        error.response?.data || error
      );


      alert(
        "Unable to delete attendance."
      );

    }

  };


  // ==========================================
  // GET CURRENT STATUS
  // ==========================================

  const getCurrentStatus = (
    studentId,
    batchId
  ) => {

    const key =
      `${studentId}-${batchId}`;


    // If admin changed dropdown

    if (
      statusData[key]
    ) {

      return statusData[key];

    }


    // Check database

    const record =
      findAttendance(
        studentId,
        batchId
      );


    if (record) {

      return record.status;

    }


    return "";

  };


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="student-page">


      {/* ======================================
          HEADER
          ====================================== */}

      <h1>
        📅 Manage Attendance
      </h1>


      <p className="page-subtitle">

        Select the date and mark student
        attendance as Present (P) or
        Absent (A).

      </p>


      {/* ======================================
          DATE SELECTOR
          ====================================== */}

      <div
        className="table-box"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          padding: "20px"
        }}
      >

        <label
          style={{
            fontWeight: "bold",
            marginRight: "15px"
          }}
        >

          Attendance Date:

        </label>


        <input

          type="date"

          value={
            selectedDate
          }

          onChange={(e) => {

            setSelectedDate(
              e.target.value
            );

            setStatusData({});

          }}

          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc"
          }}

        />

      </div>


      {/* ======================================
          ERROR
          ====================================== */}

      {error && (

        <div
          style={{
            background: "#ffe6e6",
            color: "#d00000",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "6px"
          }}
        >

          {error}

        </div>

      )}


      {/* ======================================
          ATTENDANCE TABLE
          ====================================== */}

      <div className="table-box">

        <table>

          <thead>

            <tr>

              <th>
                ID
              </th>

              <th>
                Student
              </th>

              <th>
                Batch
              </th>

              <th>
                Date
              </th>

              <th>
                Status
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>


          <tbody>


            {students.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign: "center"
                  }}
                >

                  No students found.

                </td>

              </tr>

            ) : (

              students.map(
                (student) => {

                  const studentId =
                    student.id;


                  /*
                   * Get student's batch.
                   *
                   * If your Student API returns
                   * batch ID, this will use it.
                   */

                  const studentBatch =
                    typeof student.batch ===
                    "object"

                      ? student.batch?.id

                      : student.batch;


                  /*
                   * Find student's batch
                   */

                  const studentBatchData =
                    batches.find(
                      (batch) =>
                        batch.id ===
                        Number(
                          studentBatch
                        )
                    );


                  /*
                   * If student has a batch,
                   * show that batch.
                   */

                  const batchId =
                    studentBatchData?.id ||
                    studentBatch;


                  const currentStatus =
                    getCurrentStatus(
                      studentId,
                      batchId
                    );


                  return (

                    <tr
                      key={
                        student.id
                      }
                    >


                      {/* ID */}

                      <td>

                        {student.id}

                      </td>


                      {/* STUDENT */}

                      <td>

                        <strong>

                          {student.first_name}{" "}
                          {student.last_name}

                        </strong>

                      </td>


                      {/* BATCH */}

                      <td>

                        {batchId

                          ? getBatchName(
                              batchId
                            )

                          : "No Batch"

                        }

                      </td>


                      {/* DATE */}

                      <td>

                        {selectedDate
                          ? selectedDate
                          : "-"}

                      </td>


                      {/* STATUS DROPDOWN */}

                      <td>

                        <select

                          value={
                            currentStatus
                          }

                          onChange={(e) => {

                            handleStatusChange(

                              studentId,

                              batchId,

                              e.target.value

                            );

                          }}

                          disabled={
                            !selectedDate ||
                            !batchId
                          }

                          style={{
                            padding: "8px",
                            minWidth: "80px",
                            borderRadius: "5px",
                            border:
                              "1px solid #ccc"
                          }}

                        >

                          <option value="">
                            Select
                          </option>

                          <option value="P">
                            P - Present
                          </option>

                          <option value="A">
                            A - Absent
                          </option>

                        </select>

                      </td>


                      {/* ACTION */}

                      <td>

                        <button

                          type="button"

                          className="primary-btn"

                          disabled={
                            !selectedDate ||
                            !batchId ||
                            !currentStatus
                          }

                          onClick={() =>

                            saveAttendance(

                              studentId,

                              batchId

                            )

                          }

                        >

                          💾 Save

                        </button>


                        {/* DELETE */}

                        {findAttendance(
                          studentId,
                          batchId
                        ) && (

                          <button

                            type="button"

                            className="primary-btn"

                            onClick={() =>

                              deleteAttendance(

                                findAttendance(
                                  studentId,
                                  batchId
                                )

                              )

                            }

                            style={{
                              marginLeft: "8px",
                              background:
                                "#dc3545"
                            }}

                          >

                            🗑️ Delete

                          </button>

                        )}

                      </td>


                    </tr>

                  );

                }

              )

            )}


          </tbody>

        </table>

      </div>


      {/* ======================================
          INFORMATION
          ====================================== */}

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#f5f5f5",
          borderRadius: "6px"
        }}
      >

        <strong>
          Attendance:
        </strong>

        {" "}

        <span>
          P = Present
        </span>

        {" | "}

        <span>
          A = Absent
        </span>

      </div>


    </div>

  );

}

export default ManageAttendance;