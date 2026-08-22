import React, { useEffect, useState } from "react";
import "../student-pages.css";
import API from "../api";

function ManageBatches() {

  // ==========================================
  // STATES
  // ==========================================

  const [batches, setBatches] = useState([]);

  const [courses, setCourses] = useState([]);

  const [faculty, setFaculty] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingBatch, setEditingBatch] = useState(null);


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    batch_name: "",
    course: "",
    faculty: "",
    start_date: "",
    timing: ""

  });


  // ==========================================
  // GET BATCHES
  // ==========================================

  const getBatches = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await API.get("batches/");

      console.log(
        "BATCHES:",
        response.data
      );


      if (Array.isArray(response.data)) {

        setBatches(response.data);

      }

      else if (response.data.results) {

        setBatches(
          response.data.results
        );

      }

      else {

        setBatches([]);

      }

    }

    catch (error) {

      console.error(
        "GET BATCH ERROR:",
        error.response?.data || error
      );

      setError(
        "Unable to load batches from database."
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================
  // GET COURSES
  // ==========================================

  const getCourses = async () => {

    try {

      const response =
        await API.get("courses/");


      if (Array.isArray(response.data)) {

        setCourses(response.data);

      }

      else if (response.data.results) {

        setCourses(
          response.data.results
        );

      }

    }

    catch (error) {

      console.error(
        "GET COURSES ERROR:",
        error.response?.data || error
      );

    }

  };


  // ==========================================
  // GET FACULTY
  // ==========================================

  const getFaculty = async () => {

    try {

      const response =
        await API.get("faculty/");


      if (Array.isArray(response.data)) {

        setFaculty(response.data);

      }

      else if (response.data.results) {

        setFaculty(
          response.data.results
        );

      }

    }

    catch (error) {

      console.error(
        "GET FACULTY ERROR:",
        error.response?.data || error
      );

    }

  };


  // ==========================================
  // LOAD ALL DATA
  // ==========================================

  useEffect(() => {

    getBatches();

    getCourses();

    getFaculty();

  }, []);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };


  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {

    setFormData({

      batch_name: "",
      course: "",
      faculty: "",
      start_date: "",
      timing: ""

    });

  };


  // ==========================================
  // ADD BATCH BUTTON
  // ==========================================

  const handleAddBatch = () => {

    setEditingBatch(null);

    resetForm();

    setError("");

    setShowForm(true);

  };


  // ==========================================
  // EDIT BATCH
  // ==========================================

  const handleEdit = (batch) => {

    console.log(
      "EDIT BATCH:",
      batch
    );


    setEditingBatch(batch);


    /*
      DRF normally returns:

      course: 1
      faculty: 2

      or sometimes:

      course: {
        id: 1
      }

      faculty: {
        id: 2
      }
    */


    const courseId =
      typeof batch.course === "object"
        ? batch.course?.id
        : batch.course;


    const facultyId =
      typeof batch.faculty === "object"
        ? batch.faculty?.id
        : batch.faculty;


    setFormData({

      batch_name:
        batch.batch_name || "",

      course:
        courseId || "",

      faculty:
        facultyId || "",

      start_date:
        batch.start_date || "",

      timing:
        batch.timing || ""

    });


    setError("");

    setShowForm(true);

  };


  // ==========================================
  // ADD / UPDATE BATCH
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");


    // ========================================
    // VALIDATION
    // ========================================

    if (
      !formData.batch_name.trim()
    ) {

      setError(
        "Please enter batch name."
      );

      return;

    }


    if (!formData.course) {

      setError(
        "Please select a course."
      );

      return;

    }


    if (!formData.faculty) {

      setError(
        "Please select faculty."
      );

      return;

    }


    if (!formData.start_date) {

      setError(
        "Please select start date."
      );

      return;

    }


    if (!formData.timing.trim()) {

      setError(
        "Please enter batch timing."
      );

      return;

    }


    try {

      const batchData = {

        batch_name:
          formData.batch_name,

        course:
          Number(formData.course),

        faculty:
          Number(formData.faculty),

        start_date:
          formData.start_date,

        timing:
          formData.timing

      };


      console.log(
        "SENDING BATCH:",
        batchData
      );


      // ========================================
      // UPDATE
      // ========================================

      if (editingBatch) {

        await API.put(

          `batches/${editingBatch.id}/`,

          batchData

        );


        alert(
          "Batch updated successfully!"
        );

      }


      // ========================================
      // ADD
      // ========================================

      else {

        await API.post(

          "batches/",

          batchData

        );


        alert(
          "Batch added successfully!"
        );

      }


      // Close form

      setShowForm(false);

      setEditingBatch(null);

      resetForm();


      // Refresh

      await getBatches();

    }

    catch (error) {

      console.error(
        "SAVE BATCH ERROR:",
        error.response?.data || error
      );


      if (
        error.response?.data
      ) {

        setError(

          JSON.stringify(
            error.response.data
          )

        );

      }

      else {

        setError(
          "Unable to save batch. Check Django server."
        );

      }

    }

  };


  // ==========================================
  // DELETE BATCH
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this batch?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      await API.delete(
        `batches/${id}/`
      );


      alert(
        "Batch deleted successfully!"
      );


      await getBatches();

    }

    catch (error) {

      console.error(
        "DELETE BATCH ERROR:",
        error.response?.data || error
      );


      if (
        error.response?.data
      ) {

        setError(

          JSON.stringify(
            error.response.data
          )

        );

      }

      else {

        setError(
          "Unable to delete batch."
        );

      }

    }

  };


  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {

    setShowForm(false);

    setEditingBatch(null);

    resetForm();

    setError("");

  };


  // ==========================================
  // GET COURSE NAME
  // ==========================================

  const getCourseName = (courseId) => {

    if (
      typeof courseId === "object"
    ) {

      return (
        courseId?.course_name ||
        courseId?.name ||
        "-"
      );

    }


    const course =
      courses.find(
        (item) =>
          item.id ===
          Number(courseId)
      );


    return (
      course?.course_name ||
      "-"
    );

  };


  // ==========================================
  // GET FACULTY NAME
  // ==========================================

  const getFacultyName = (facultyId) => {

    if (
      typeof facultyId === "object"
    ) {

      return (
        facultyId?.name ||
        "-"
      );

    }


    const teacher =
      faculty.find(
        (item) =>
          item.id ===
          Number(facultyId)
      );


    return (
      teacher?.name ||
      "-"
    );

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
        🕐 Manage Batches
      </h1>


      <p className="page-subtitle">

        Add, update and manage coaching
        class batches.

      </p>


      {/* ======================================
          BUTTONS
          ====================================== */}

      <button

        type="button"

        className="primary-btn"

        onClick={handleAddBatch}

      >

        + Add Batch

      </button>


      <button

        type="button"

        className="primary-btn"

        onClick={getBatches}

        style={{
          marginLeft: "10px"
        }}

      >

        🔄 Refresh

      </button>


      {/* ======================================
          ERROR
          ====================================== */}

      {error && (

        <div
          style={{
            marginTop: "20px",
            padding: "12px",
            background: "#ffe6e6",
            color: "#d00000",
            borderRadius: "6px"
          }}
        >

          {error}

        </div>

      )}


      {/* ======================================
          ADD / EDIT FORM
          ====================================== */}

      {showForm && (

        <div
          className="table-box"
          style={{
            marginTop: "25px",
            padding: "25px"
          }}
        >

          <h2>

            {editingBatch

              ? "✏️ Edit Batch"

              : "➕ Add New Batch"

            }

          </h2>


          <form
            onSubmit={handleSubmit}
          >


            {/* ==============================
                BATCH NAME
                ============================== */}

            <div className="auth-form-group">

              <label>
                Batch Name
              </label>

              <input

                type="text"

                name="batch_name"

                placeholder="Example: Morning Batch"

                value={
                  formData.batch_name
                }

                onChange={
                  handleChange
                }

                required

              />

            </div>


            <br />


            {/* ==============================
                COURSE
                ============================== */}

            <div className="auth-form-group">

              <label>
                Select Course
              </label>

              <select

                name="course"

                value={
                  formData.course
                }

                onChange={
                  handleChange
                }

                required

              >

                <option value="">
                  -- Select Course --
                </option>


                {courses.map(
                  (course) => (

                    <option
                      key={course.id}
                      value={course.id}
                    >

                      {course.course_name}

                    </option>

                  )
                )}

              </select>

            </div>


            <br />


            {/* ==============================
                FACULTY
                ============================== */}

            <div className="auth-form-group">

              <label>
                Select Faculty
              </label>

              <select

                name="faculty"

                value={
                  formData.faculty
                }

                onChange={
                  handleChange
                }

                required

              >

                <option value="">
                  -- Select Faculty --
                </option>


                {faculty.map(
                  (teacher) => (

                    <option
                      key={teacher.id}
                      value={teacher.id}
                    >

                      {teacher.name}

                    </option>

                  )
                )}

              </select>

            </div>


            <br />


            {/* ==============================
                START DATE
                ============================== */}

            <div className="auth-form-group">

              <label>
                Start Date
              </label>

              <input

                type="date"

                name="start_date"

                value={
                  formData.start_date
                }

                onChange={
                  handleChange
                }

                required

              />

            </div>


            <br />


            {/* ==============================
                TIMING
                ============================== */}

            <div className="auth-form-group">

              <label>
                Batch Timing
              </label>

              <input

                type="text"

                name="timing"

                placeholder="Example: 8:00 AM - 10:00 AM"

                value={
                  formData.timing
                }

                onChange={
                  handleChange
                }

                required

              />

            </div>


            <br />


            {/* ==============================
                SAVE
                ============================== */}

            <button

              type="submit"

              className="primary-btn"

            >

              {editingBatch

                ? "Update Batch"

                : "Add Batch"

              }

            </button>


            {/* ==============================
                CANCEL
                ============================== */}

            <button

              type="button"

              className="primary-btn"

              onClick={
                handleCancel
              }

              style={{
                marginLeft: "10px"
              }}

            >

              Cancel

            </button>


          </form>

        </div>

      )}


      {/* ======================================
          TABLE
          ====================================== */}

      <div
        className="table-box"
        style={{
          marginTop: "25px"
        }}
      >

        <h2>
          Batch Records
        </h2>


        {loading ? (

          <p>
            Loading batches...
          </p>

        ) : (

          <table>

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Batch Name
                </th>

                <th>
                  Course
                </th>

                <th>
                  Faculty
                </th>

                <th>
                  Start Date
                </th>

                <th>
                  Timing
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>


              {batches.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    style={{
                      textAlign: "center"
                    }}
                  >

                    No batches found.

                  </td>

                </tr>

              ) : (

                batches.map(
                  (batch) => (

                    <tr
                      key={batch.id}
                    >


                      {/* ID */}

                      <td>
                        {batch.id}
                      </td>


                      {/* BATCH NAME */}

                      <td>
                        {batch.batch_name}
                      </td>


                      {/* COURSE */}

                      <td>

                        {getCourseName(
                          batch.course
                        )}

                      </td>


                      {/* FACULTY */}

                      <td>

                        {getFacultyName(
                          batch.faculty
                        )}

                      </td>


                      {/* DATE */}

                      <td>
                        {batch.start_date}
                      </td>


                      {/* TIMING */}

                      <td>
                        {batch.timing}
                      </td>


                      {/* ACTION */}

                      <td>

                        <button

                          type="button"

                          className="primary-btn"

                          onClick={() =>
                            handleEdit(
                              batch
                            )
                          }

                        >

                          ✏️ Edit

                        </button>


                        <button

                          type="button"

                          className="primary-btn"

                          onClick={() =>
                            handleDelete(
                              batch.id
                            )
                          }

                          style={{
                            marginLeft: "8px",
                            background: "#dc3545"
                          }}

                        >

                          🗑️ Delete

                        </button>

                      </td>


                    </tr>

                  )
                )

              )}


            </tbody>

          </table>

        )}

      </div>


    </div>

  );

}

export default ManageBatches;