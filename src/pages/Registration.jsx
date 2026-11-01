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

  // Fetch courses from Django
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await API.get("courses/");
        const data = response.data;
        setCourses(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error("Course error:", error.response?.data || error);
      } finally {
        setLoadingCourses(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch batches from Django
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const response = await API.get("batches/");
        const data = response.data;
        setBatches(Array.isArray(data) ? data : data.results || []);
      } catch (error) {
        console.error("Batch error:", error.response?.data || error);
      } finally {
        setLoadingBatches(false);
      }
    };

    fetchBatches();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      alert("Password and Confirm Password do not match.");
      return;
    }

    try {
      setLoading(true);

      await API.post("students/", formData);

      alert("Registration successful! Welcome to Kaizen Coaching Class.");

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

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error);

      alert(
        "Registration failed: " +
          JSON.stringify(error.response?.data || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="registration-container">
        <div className="registration-header">
          <div className="registration-icon">🎓</div>

          <h1>Join Kaizen Coaching Class</h1>

          <p>
            Create your student account and start your learning journey.
          </p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          {/* First Name and Last Name */}
          <div className="registration-row">
            <div className="auth-form-group">
              <label>First Name</label>
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
              <label>Last Name</label>
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

          {/* Email and Mobile */}
          <div className="registration-row">
            <div className="auth-form-group">
              <label>Email Address</label>
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
              <label>Mobile Number</label>
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

          {/* Course and Batch */}
          <div className="registration-row">
            <div className="auth-form-group">
              <label>Select Course</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >
                <option value="">
                  {loadingCourses ? "Loading Courses..." : "Select a course"}
                </option>

                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_name || course.name || course.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="auth-form-group">
              <label>Select Batch</label>
              <select
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                required
              >
                <option value="">
                  {loadingBatches ? "Loading Batches..." : "Select a batch"}
                </option>

                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.batch_name || batch.name || batch.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date of Birth and Admission Date */}
          <div className="registration-row">
            <div className="auth-form-group">
              <label>Date of Birth</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-form-group">
              <label>Admission Date</label>
              <input
                type="date"
                name="admission_date"
                value={formData.admission_date}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Gender and City */}
          <div className="registration-row">
            <div className="auth-form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="auth-form-group">
              <label>City</label>
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

          {/* Address */}
          <div className="auth-form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password and Confirm Password */}
          <div className="registration-row">
            <div className="auth-form-group">
              <label>Password</label>
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
              <label>Confirm Password</label>
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

          {/* Terms */}
          <div className="terms-row">
            <input type="checkbox" required />
            <span>
              I agree to the Terms &amp; Conditions and Privacy Policy.
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="auth-btn registration-btn"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Login Link */}
          <p className="auth-bottom-text">
            Already have an account? <Link to="/student-login">Login Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Registration;