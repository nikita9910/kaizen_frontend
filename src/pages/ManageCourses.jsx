import React, { useEffect, useState } from "react";
import "../student-pages.css";
import API from "../api";

function ManageCourses() {

  // ==========================================
  // STATES
  // ==========================================

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingCourse, setEditingCourse] = useState(null);


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    course_name: "",
    duration: "",
    fees: "",
    description: ""

  });


  // ==========================================
  // GET COURSES
  // ==========================================

  const getCourses = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await API.get("courses/");

      console.log("COURSES:", response.data);


      // If normal DRF response

      if (Array.isArray(response.data)) {

        setCourses(response.data);

      }

      // If DRF pagination is enabled

      else if (response.data.results) {

        setCourses(response.data.results);

      }

      else {

        setCourses([]);

      }

    }

    catch (error) {

      console.error(
        "COURSE API ERROR:",
        error.response?.data || error
      );

      setError(
        "Unable to load courses from database."
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD COURSES WHEN PAGE OPENS
  // ==========================================

  useEffect(() => {

    getCourses();

  }, []);


  // ==========================================
  // HANDLE INPUT CHANGE
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

      course_name: "",
      duration: "",
      fees: "",
      description: ""

    });

  };


  // ==========================================
  // OPEN ADD FORM
  // ==========================================

  const handleAddCourse = () => {

    setEditingCourse(null);

    resetForm();

    setShowForm(true);

  };


  // ==========================================
  // EDIT COURSE
  // ==========================================

  const handleEdit = (course) => {

    setEditingCourse(course);

    setFormData({

      course_name:
        course.course_name || "",

      duration:
        course.duration || "",

      fees:
        course.fees || "",

      description:
        course.description || ""

    });

    setShowForm(true);

  };


  // ==========================================
  // ADD / UPDATE COURSE
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const data = {

        course_name:
          formData.course_name,

        duration:
          formData.duration,

        fees:
          formData.fees,

        description:
          formData.description

      };


      // ======================================
      // UPDATE COURSE
      // ======================================

      if (editingCourse) {

        await API.put(

          `courses/${editingCourse.id}/`,

          data

        );

        alert(
          "Course updated successfully!"
        );

      }


      // ======================================
      // ADD COURSE
      // ======================================

      else {

        await API.post(

          "courses/",

          data

        );

        alert(
          "Course added successfully!"
        );

      }


      // Close form

      setShowForm(false);

      setEditingCourse(null);

      resetForm();


      // Refresh table

      getCourses();

    }

    catch (error) {

      console.error(
        "SAVE COURSE ERROR:",
        error.response?.data || error
      );


      alert(

        JSON.stringify(

          error.response?.data ||

          "Unable to save course."

        )

      );

    }

  };


  // ==========================================
  // DELETE COURSE
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this course?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      await API.delete(

        `courses/${id}/`

      );


      alert(
        "Course deleted successfully!"
      );


      getCourses();

    }

    catch (error) {

      console.error(
        "DELETE COURSE ERROR:",
        error.response?.data || error
      );


      alert(
        "Unable to delete course."
      );

    }

  };


  // ==========================================
  // CANCEL FORM
  // ==========================================

  const handleCancel = () => {

    setShowForm(false);

    setEditingCourse(null);

    resetForm();

  };


  // ==========================================
  // RETURN UI
  // ==========================================

  return (

    <div className="student-page">


      {/* ======================================
          PAGE HEADER
          ====================================== */}

      <h1>
        📚 Manage Courses
      </h1>


      <p className="page-subtitle">

        Add, update and manage coaching
        class courses.

      </p>


      {/* ======================================
          BUTTONS
          ====================================== */}

      <button

        className="primary-btn"

        onClick={handleAddCourse}

      >

        + Add Course

      </button>


      <button

        className="primary-btn"

        onClick={getCourses}

        style={{
          marginLeft: "10px"
        }}

      >

        🔄 Refresh

      </button>


      {/* ======================================
          ADD / EDIT FORM
          ====================================== */}

      {showForm && (

        <div
          className="table-box"
          style={{
            marginTop: "25px"
          }}
        >

          <h2>

            {editingCourse

              ? "✏️ Edit Course"

              : "➕ Add New Course"

            }

          </h2>


          <form
            onSubmit={handleSubmit}
          >


            {/* COURSE NAME */}

            <div>

              <label>
                Course Name
              </label>

              <input

                type="text"

                name="course_name"

                value={
                  formData.course_name
                }

                onChange={
                  handleChange
                }

                placeholder="Enter course name"

                required

              />

            </div>


            <br />


            {/* DURATION */}

            <div>

              <label>
                Duration
              </label>

              <input

                type="text"

                name="duration"

                value={
                  formData.duration
                }

                onChange={
                  handleChange
                }

                placeholder="Example: 6 Months"

                required

              />

            </div>


            <br />


            {/* FEES */}

            <div>

              <label>
                Fees
              </label>

              <input

                type="number"

                name="fees"

                value={
                  formData.fees
                }

                onChange={
                  handleChange
                }

                placeholder="Enter course fees"

                min="0"

                step="0.01"

                required

              />

            </div>


            <br />


            {/* DESCRIPTION */}

            <div>

              <label>
                Description
              </label>

              <textarea

                name="description"

                value={
                  formData.description
                }

                onChange={
                  handleChange
                }

                placeholder="Enter course description"

                rows="5"

                required

              ></textarea>

            </div>


            <br />


            {/* SAVE BUTTON */}

            <button

              type="submit"

              className="primary-btn"

            >

              {editingCourse

                ? "Update Course"

                : "Add Course"

              }

            </button>


            {/* CANCEL BUTTON */}

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
          COURSE TABLE
          ====================================== */}

      <div
        className="table-box"
        style={{
          marginTop: "25px"
        }}
      >

        <h2>
          Course Records
        </h2>


        {loading ? (

          <p>
            Loading courses...
          </p>

        ) : (

          <table>

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Course Name
                </th>

                <th>
                  Duration
                </th>

                <th>
                  Fees
                </th>

                <th>
                  Description
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>


              {courses.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center"
                    }}
                  >

                    No courses found.

                  </td>

                </tr>

              ) : (

                courses.map(
                  (course) => (

                    <tr
                      key={
                        course.id
                      }
                    >

                      {/* ID */}

                      <td>

                        {course.id}

                      </td>


                      {/* COURSE NAME */}

                      <td>

                        {course.course_name}

                      </td>


                      {/* DURATION */}

                      <td>

                        {course.duration}

                      </td>


                      {/* FEES */}

                      <td>

                        ₹{" "}

                        {course.fees}

                      </td>


                      {/* DESCRIPTION */}

                      <td>

                        {course.description}

                      </td>


                      {/* ACTION */}

                      <td>


                        <button

                          className="primary-btn"

                          onClick={() =>
                            handleEdit(
                              course
                            )
                          }

                        >

                          ✏️ Edit

                        </button>


                        <button

                          className="primary-btn"

                          onClick={() =>
                            handleDelete(
                              course.id
                            )
                          }

                          style={{
                            marginLeft:
                              "8px",

                            background:
                              "#dc3545"
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


export default ManageCourses;