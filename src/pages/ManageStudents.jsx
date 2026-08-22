import React, { useEffect, useState } from "react";
import "../student-pages.css";
import API from "../api";

function ManageStudents() {

  const [students, setStudents] = useState([]);

  const [courses, setCourses] = useState([]);

  const [batches, setBatches] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingStudent, setEditingStudent] = useState(null);


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    first_name: "",
    last_name: "",
    gender: "",
    dob: "",
    email: "",
    mobile: "",
    address: "",
    course: "",
    batch: "",
    admission_date: "",
    password: ""

  });


  // ==========================================
  // GET STUDENTS
  // ==========================================

  const getStudents = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await API.get("students/");

      console.log("STUDENT API:", response.data);

      if (Array.isArray(response.data)) {

        setStudents(response.data);

      } else {

        setStudents(
          response.data.results || []
        );

      }

    } catch (error) {

      console.error(
        "Student API Error:",
        error.response?.data || error
      );

      setError(
        "Students could not be loaded from database."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================
  // GET COURSES
  // ==========================================

  const getCourses = async () => {

    try {

      const response = await API.get("courses/");

      console.log("COURSE API:", response.data);

      if (Array.isArray(response.data)) {

        setCourses(response.data);

      } else {

        setCourses(
          response.data.results || []
        );

      }

    } catch (error) {

      console.error(
        "Course API Error:",
        error.response?.data || error
      );

    }

  };


  // ==========================================
  // GET BATCHES
  // ==========================================

  const getBatches = async () => {

    try {

      const response = await API.get("batches/");

      console.log("BATCH API:", response.data);

      if (Array.isArray(response.data)) {

        setBatches(response.data);

      } else {

        setBatches(
          response.data.results || []
        );

      }

    } catch (error) {

      console.error(
        "Batch API Error:",
        error.response?.data || error
      );

    }

  };


  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {

    getStudents();
    getCourses();
    getBatches();

  }, []);


  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  // ==========================================
  // RESET FORM
  // ==========================================

  const resetForm = () => {

    setFormData({

      first_name: "",
      last_name: "",
      gender: "",
      dob: "",
      email: "",
      mobile: "",
      address: "",
      course: "",
      batch: "",
      admission_date: "",
      password: ""

    });

  };


  // ==========================================
  // ADD STUDENT
  // ==========================================

  const handleAddStudent = () => {

    setEditingStudent(null);

    resetForm();

    setShowForm(true);

  };


  // ==========================================
  // EDIT STUDENT
  // ==========================================

  const handleEdit = (student) => {

    setEditingStudent(student);

    setFormData({

      first_name:
        student.first_name || "",

      last_name:
        student.last_name || "",

      gender:
        student.gender || "",

      dob:
        student.dob || "",

      email:
        student.email || "",

      mobile:
        student.mobile || "",

      address:
        student.address || "",

      course:
        typeof student.course === "object"
          ? student.course.id
          : student.course || "",

      batch:
        typeof student.batch === "object"
          ? student.batch.id
          : student.batch || "",

      admission_date:
        student.admission_date || "",

      password: ""

    });

    setShowForm(true);

  };


  // ==========================================
  // SAVE STUDENT
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      let data = {
        ...formData,

        course: Number(formData.course),
        batch: Number(formData.batch)

      };


      // ======================================
      // UPDATE
      // ======================================

      if (editingStudent) {

        if (!data.password) {

          delete data.password;

        }

        await API.put(

          `students/${editingStudent.id}/`,

          data

        );

        alert(
          "Student updated successfully!"
        );

      }

      // ======================================
      // ADD
      // ======================================

      else {

        await API.post(
          "students/",
          data
        );

        alert(
          "Student added successfully!"
        );

      }


      setShowForm(false);

      setEditingStudent(null);

      resetForm();

      getStudents();

    } catch (error) {

      console.error(
        "SAVE ERROR:",
        error.response?.data || error
      );

      alert(
        JSON.stringify(
          error.response?.data ||
          "Unable to save student"
        )
      );

    }

  };


  // ==========================================
  // DELETE STUDENT
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      await API.delete(
        `students/${id}/`
      );

      alert(
        "Student deleted successfully!"
      );

      getStudents();

    } catch (error) {

      console.error(
        "DELETE ERROR:",
        error.response?.data || error
      );

      alert(
        "Unable to delete student."
      );

    }

  };


  // ==========================================
  // COURSE NAME
  // ==========================================

  const getCourseName = (student) => {

    if (!student.course) {
      return "-";
    }


    if (
      typeof student.course === "object"
    ) {

      return (
        student.course.name ||
        student.course.course_name ||
        `Course ${student.course.id}`
      );

    }


    const course = courses.find(
      (item) =>
        Number(item.id) ===
        Number(student.course)
    );


    if (course) {

      return (
        course.name ||
        course.course_name ||
        `Course ${course.id}`
      );

    }


    return `Course ${student.course}`;

  };


  // ==========================================
  // BATCH NAME
  // ==========================================

  const getBatchName = (student) => {

    if (!student.batch) {
      return "-";
    }


    if (
      typeof student.batch === "object"
    ) {

      return (
        student.batch.name ||
        student.batch.batch_name ||
        `Batch ${student.batch.id}`
      );

    }


    const batch = batches.find(
      (item) =>
        Number(item.id) ===
        Number(student.batch)
    );


    if (batch) {

      return (
        batch.name ||
        batch.batch_name ||
        `Batch ${batch.id}`
      );

    }


    return `Batch ${student.batch}`;

  };


  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {

    setShowForm(false);

    setEditingStudent(null);

    resetForm();

  };


  return (

    <div className="student-page">


      {/* ======================================
          HEADER
          ====================================== */}

      <h1>
        👨‍🎓 Manage Students
      </h1>

      <p className="page-subtitle">
        Add, update and manage student records.
      </p>


      {/* ======================================
          BUTTONS
          ====================================== */}

      <button
        className="primary-btn"
        onClick={handleAddStudent}
      >
        + Add Student
      </button>


      <button
        className="primary-btn"
        onClick={getStudents}
        style={{
          marginLeft: "10px"
        }}
      >
        🔄 Refresh
      </button>


      {/* ======================================
          FORM
          ====================================== */}

      {showForm && (

        <div className="table-box">

          <h2>

            {editingStudent
              ? "✏️ Edit Student"
              : "➕ Add Student"
            }

          </h2>


          <form onSubmit={handleSubmit}>


            {/* FIRST NAME */}

            <label>
              First Name
            </label>

            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Enter first name"
              required
            />


            <br />
            <br />


            {/* LAST NAME */}

            <label>
              Last Name
            </label>

            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Enter last name"
              required
            />


            <br />
            <br />


            {/* GENDER */}

            <label>
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Gender
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

            </select>


            <br />
            <br />


            {/* DOB */}

            <label>
              Date of Birth
            </label>

            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />


            <br />
            <br />


            {/* EMAIL */}

            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
            />


            <br />
            <br />


            {/* MOBILE */}

            <label>
              Mobile Number
            </label>

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              required
            />


            <br />
            <br />


            {/* ADDRESS */}

            <label>
              Address
            </label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter address"
              rows="4"
              required
            />


            <br />
            <br />


            {/* COURSE */}

            <label>
              Course
            </label>

            <select
              name="course"
              value={formData.course}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Course
              </option>

              {courses.map((course) => (

                <option
                  key={course.id}
                  value={course.id}
                >

                  {course.name ||
                    course.course_name ||
                    `Course ${course.id}`}

                </option>

              ))}

            </select>


            <br />
            <br />


            {/* BATCH */}

            <label>
              Batch
            </label>

            <select
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Batch
              </option>

              {batches.map((batch) => (

                <option
                  key={batch.id}
                  value={batch.id}
                >

                  {batch.name ||
                    batch.batch_name ||
                    `Batch ${batch.id}`}

                </option>

              ))}

            </select>


            <br />
            <br />


            {/* ADMISSION DATE */}

            <label>
              Admission Date
            </label>

            <input
              type="date"
              name="admission_date"
              value={formData.admission_date}
              onChange={handleChange}
              required
            />


            <br />
            <br />


            {/* PASSWORD */}

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={
                editingStudent
                  ? "Leave blank to keep current password"
                  : "Enter password"
              }
              required={!editingStudent}
            />


            <br />
            <br />


            {/* SUBMIT */}

            <button
              type="submit"
              className="primary-btn"
            >

              {editingStudent
                ? "Update Student"
                : "Add Student"
              }

            </button>


            {/* CANCEL */}

            <button
              type="button"
              className="primary-btn"
              onClick={handleCancel}
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
          ERROR
          ====================================== */}

      {error && (

        <p
          style={{
            color: "red",
            marginTop: "20px"
          }}
        >
          {error}
        </p>

      )}


      {/* ======================================
          STUDENT TABLE
          ====================================== */}

      <div className="table-box">

        <h2>
          Student Records
        </h2>


        {loading ? (

          <p>
            Loading students...
          </p>

        ) : (

          <table>

            <thead>

              <tr>

                <th>ID</th>

                <th>Name</th>

                <th>Gender</th>

                <th>DOB</th>

                <th>Email</th>

                <th>Mobile</th>

                <th>Address</th>

                <th>Course</th>

                <th>Batch</th>

                <th>Admission Date</th>

                <th>Action</th>

              </tr>

            </thead>


            <tbody>

              {students.length === 0 ? (

                <tr>

                  <td
                    colSpan="11"
                    style={{
                      textAlign: "center"
                    }}
                  >

                    No students found.

                  </td>

                </tr>

              ) : (

                students.map((student) => (

                  <tr key={student.id}>

                    <td>
                      {student.id}
                    </td>

                    <td>

                      {student.first_name}
                      {" "}
                      {student.last_name}

                    </td>

                    <td>
                      {student.gender}
                    </td>

                    <td>
                      {student.dob}
                    </td>

                    <td>
                      {student.email}
                    </td>

                    <td>
                      {student.mobile}
                    </td>

                    <td>
                      {student.address}
                    </td>

                    <td>
                      {getCourseName(student)}
                    </td>

                    <td>
                      {getBatchName(student)}
                    </td>

                    <td>
                      {student.admission_date}
                    </td>

                    <td>

                      <button
                        className="primary-btn"
                        onClick={() =>
                          handleEdit(student)
                        }
                      >
                        ✏️ Edit
                      </button>


                      <button
                        className="primary-btn"
                        onClick={() =>
                          handleDelete(student.id)
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

                ))

              )}

            </tbody>

          </table>

        )}

      </div>

    </div>

  );

}

export default ManageStudents;