import React, { useEffect, useState } from "react";
import "../student-pages.css";
import API from "../api";

function ManageFaculty() {

  // ==========================================
  // STATES
  // ==========================================

  const [faculty, setFaculty] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingFaculty, setEditingFaculty] = useState(null);


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    mobile: "",
    specialization: ""

  });


  // ==========================================
  // GET FACULTY
  // ==========================================

  const getFaculty = async () => {

    try {

      setLoading(true);

      setError("");

      const response = await API.get("faculty/");

      console.log("FACULTY API:", response.data);


      // Normal DRF response

      if (Array.isArray(response.data)) {

        setFaculty(response.data);

      }

      // DRF pagination response

      else if (response.data.results) {

        setFaculty(response.data.results);

      }

      else {

        setFaculty([]);

      }

    }

    catch (error) {

      console.error(
        "FACULTY API ERROR:",
        error.response?.data || error
      );

      setError(
        "Unable to load faculty from database."
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================
  // LOAD FACULTY
  // ==========================================

  useEffect(() => {

    getFaculty();

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

      name: "",
      email: "",
      mobile: "",
      specialization: ""

    });

  };


  // ==========================================
  // ADD FACULTY
  // ==========================================

  const handleAddFaculty = () => {

    setEditingFaculty(null);

    resetForm();

    setShowForm(true);

  };


  // ==========================================
  // EDIT FACULTY
  // ==========================================

  const handleEdit = (teacher) => {

    setEditingFaculty(teacher);

    setFormData({

      name: teacher.name || "",

      email: teacher.email || "",

      mobile: teacher.mobile || "",

      specialization:
        teacher.specialization || ""

    });

    setShowForm(true);

  };


  // ==========================================
  // ADD / UPDATE FACULTY
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      const data = {

        name: formData.name,

        email: formData.email,

        mobile: formData.mobile,

        specialization:
          formData.specialization

      };


      // ======================================
      // UPDATE
      // ======================================

      if (editingFaculty) {

        await API.put(

          `faculty/${editingFaculty.id}/`,

          data

        );

        alert(
          "Faculty updated successfully!"
        );

      }


      // ======================================
      // ADD
      // ======================================

      else {

        await API.post(

          "faculty/",

          data

        );

        alert(
          "Faculty added successfully!"
        );

      }


      // Close form

      setShowForm(false);

      setEditingFaculty(null);

      resetForm();


      // Refresh data

      getFaculty();

    }

    catch (error) {

      console.error(
        "SAVE FACULTY ERROR:",
        error.response?.data || error
      );


      alert(

        JSON.stringify(

          error.response?.data ||

          "Unable to save faculty."

        )

      );

    }

  };


  // ==========================================
  // DELETE FACULTY
  // ==========================================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this faculty?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      await API.delete(

        `faculty/${id}/`

      );


      alert(
        "Faculty deleted successfully!"
      );


      getFaculty();

    }

    catch (error) {

      console.error(
        "DELETE FACULTY ERROR:",
        error.response?.data || error
      );


      alert(
        "Unable to delete faculty."
      );

    }

  };


  // ==========================================
  // CANCEL FORM
  // ==========================================

  const handleCancel = () => {

    setShowForm(false);

    setEditingFaculty(null);

    resetForm();

  };


  // ==========================================
  // RETURN
  // ==========================================

  return (

    <div className="student-page">


      {/* ======================================
          PAGE HEADER
          ====================================== */}

      <h1>
        👨‍🏫 Manage Faculty
      </h1>


      <p className="page-subtitle">

        Add, update and manage faculty
        records.

      </p>


      {/* ======================================
          BUTTONS
          ====================================== */}

      <button

        className="primary-btn"

        onClick={handleAddFaculty}

      >

        + Add Faculty

      </button>


      <button

        className="primary-btn"

        onClick={getFaculty}

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

            {editingFaculty

              ? "✏️ Edit Faculty"

              : "➕ Add New Faculty"

            }

          </h2>


          <form
            onSubmit={handleSubmit}
          >


            {/* NAME */}

            <div>

              <label>
                Faculty Name
              </label>

              <input

                type="text"

                name="name"

                value={
                  formData.name
                }

                onChange={
                  handleChange
                }

                placeholder="Enter faculty name"

                required

              />

            </div>


            <br />


            {/* EMAIL */}

            <div>

              <label>
                Email Address
              </label>

              <input

                type="email"

                name="email"

                value={
                  formData.email
                }

                onChange={
                  handleChange
                }

                placeholder="Enter email address"

                required

              />

            </div>


            <br />


            {/* MOBILE */}

            <div>

              <label>
                Mobile Number
              </label>

              <input

                type="tel"

                name="mobile"

                value={
                  formData.mobile
                }

                onChange={
                  handleChange
                }

                placeholder="Enter mobile number"

                maxLength="15"

                required

              />

            </div>


            <br />


            {/* SPECIALIZATION */}

            <div>

              <label>
                Specialization
              </label>

              <input

                type="text"

                name="specialization"

                value={
                  formData.specialization
                }

                onChange={
                  handleChange
                }

                placeholder="Example: Mathematics"

                required

              />

            </div>


            <br />


            {/* SAVE */}

            <button

              type="submit"

              className="primary-btn"

            >

              {editingFaculty

                ? "Update Faculty"

                : "Add Faculty"

              }

            </button>


            {/* CANCEL */}

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
          FACULTY TABLE
          ====================================== */}

      <div
        className="table-box"
        style={{
          marginTop: "25px"
        }}
      >

        <h2>
          Faculty Records
        </h2>


        {loading ? (

          <p>
            Loading faculty...
          </p>

        ) : (

          <table>

            <thead>

              <tr>

                <th>
                  ID
                </th>

                <th>
                  Name
                </th>

                <th>
                  Email
                </th>

                <th>
                  Mobile
                </th>

                <th>
                  Specialization
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>


              {faculty.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center"
                    }}
                  >

                    No faculty records found.

                  </td>

                </tr>

              ) : (

                faculty.map(
                  (teacher) => (

                    <tr
                      key={
                        teacher.id
                      }
                    >


                      {/* ID */}

                      <td>

                        {teacher.id}

                      </td>


                      {/* NAME */}

                      <td>

                        {teacher.name}

                      </td>


                      {/* EMAIL */}

                      <td>

                        {teacher.email}

                      </td>


                      {/* MOBILE */}

                      <td>

                        {teacher.mobile}

                      </td>


                      {/* SPECIALIZATION */}

                      <td>

                        {teacher.specialization}

                      </td>


                      {/* ACTION */}

                      <td>


                        <button

                          className="primary-btn"

                          onClick={() =>
                            handleEdit(
                              teacher
                            )
                          }

                        >

                          ✏️ Edit

                        </button>


                        <button

                          className="primary-btn"

                          onClick={() =>
                            handleDelete(
                              teacher.id
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

export default ManageFaculty;