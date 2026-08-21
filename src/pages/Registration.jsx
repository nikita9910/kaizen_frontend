import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./Auth.css";

function Registration() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile: "",
    course: "",
    batch: "",
    dob: "",
    admission_date: "",
    password: "",
    confirm_password: "",
    address: "",
    city: "",
    gender: "",
  });

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);

  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingBatches, setLoadingBatches] = useState(true);
  const [loading, setLoading] = useState(false);


  // =========================
  // GET COURSES
  // =========================

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await API.get("courses/");

      console.log("Courses:", response.data);

      setCourses(response.data);

    } catch (error) {
      console.error(
        "Course error:",
        error.response?.data || error
      );
    } finally {
      setLoadingCourses(false);
    }
  };


  // =========================
  // GET BATCHES
  // =========================

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await API.get("batches/");

      console.log("Batches:", response.data);

      setBatches(response.data);

    } catch (error) {
      console.error(
        "Batch error:",
        error.response?.data || error
      );
    } finally {
      setLoadingBatches(false);
    }
  };


  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  // =========================
  // SUBMIT REGISTRATION
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirm_password) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    try {
      setLoading(true);

      // Send data to Django
      const response = await API.post(
        "students/",
        formData
      );

      console.log(
        "Registration successful:",
        response.data
      );

      alert("Registration successful! Welcome to Kaizen Coaching Class.");

      // Clear form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        mobile: "",
        course: "",
        batch: "",
        dob: "",
        admission_date: "",
        password: "",
        confirm_password: "",
        address: "",
        city: "",
        gender: "",
      });

      // =========================
      // REDIRECT TO HOME PAGE
      // =========================

      navigate("/");

    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error
      );

      alert(
        "Registration failed: " +
        JSON.stringify(error.response?.data || {})
      );

    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="auth-page">

      <div className="registration-container">

        {/* HEADER */}

        <div className="registration-header">

          <div className="registration-icon">
            🎓
          </div>

          <h1>
            Join Kaizen Coaching Class
          </h1>

          <p>
            Create your student account and start
            your learning journey.
          </p>

        </div>


        {/* REGISTRATION FORM */}

        <form
          className="registration-form"
          onSubmit={handleSubmit}
        >


          {/* FIRST NAME + LAST NAME */}

          <div className="registration-row">

            <div className="auth-form-group">

              <label>
                First Name
              </label>

              <input
                type="text"
                name="first_name"
                placeholder="Enter first name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />

            </div>


            <div className="auth-form-group">

              <label>
                Last Name
              </label>

              <input
                type="text"
                name="last_name"
                placeholder="Enter last name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* EMAIL + MOBILE */}

          <div className="registration-row">

            <div className="auth-form-group">

              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />

            </div>


            <div className="auth-form-group">

              <label>
                Mobile Number
              </label>

              <input
                type="tel"
                name="mobile"
                placeholder="Enter mobile number"
                value={formData.mobile}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* COURSE + BATCH */}

          <div className="registration-row">

            <div className="auth-form-group">

              <label>
                Select Course
              </label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >

                <option value="">
                  {loadingCourses
                    ? "Loading Courses..."
                    : "Select a course"}
                </option>

                {courses.map((course) => (

                  <option
                    key={course.id}
                    value={course.id}
                  >
                    {course.name ||
                      course.course_name ||
                      course.title}
                  </option>

                ))}

              </select>

            </div>


            <div className="auth-form-group">

              <label>
                Select Batch
              </label>

              <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                required
              >

                <option value="">
                  {loadingBatches
                    ? "Loading Batches..."
                    : "Select a batch"}
                </option>

                {batches.map((batch) => (

                  <option
                    key={batch.id}
                    value={batch.id}
                  >
                    {batch.name ||
                      batch.batch_name ||
                      batch.title}
                  </option>

                ))}

              </select>

            </div>

          </div>


          {/* DOB + ADMISSION DATE */}

          <div className="registration-row">

            <div className="auth-form-group">

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

            </div>


            <div className="auth-form-group">

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

            </div>

          </div>


          {/* GENDER + CITY */}

          <div className="registration-row">

            <div className="auth-form-group">

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

            </div>


            <div className="auth-form-group">

              <label>
                City
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* ADDRESS */}

          <div className="auth-form-group">

            <label>
              Address
            </label>

            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />

          </div>


          {/* PASSWORD + CONFIRM PASSWORD */}

          <div className="registration-row">

            <div className="auth-form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>


            <div className="auth-form-group">

              <label>
                Confirm Password
              </label>

              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />

            </div>

          </div>


          {/* TERMS */}

          <div className="terms-row">

            <input
              type="checkbox"
              required
            />

            <span>
              I agree to the Terms & Conditions
              and Privacy Policy.
            </span>

          </div>


          {/* SUBMIT BUTTON */}

          <button
            type="submit"
            className="auth-btn registration-btn"
            disabled={loading}
          >

            {loading
              ? "Creating Account..."
              : "Create Account"}

          </button>


          {/* LOGIN */}

          <p className="auth-bottom-text">

            Already have an account?

            {" "}

            <Link to="/student-login">
              Login Now
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Registration;