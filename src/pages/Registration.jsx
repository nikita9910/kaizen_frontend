import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Registration() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Registration successful!");

    navigate("/student-login");
  };

  return (
    <div className="auth-page">

      <div className="registration-container">

        {/* HEADER */}

        <div className="registration-header">

          <div className="registration-icon">
            🎓
          </div>

          <h1>Join Kaizen Coaching Class</h1>

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

          <div className="registration-row">

            <div className="auth-form-group">

              <label>Full Name</label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />

            </div>


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

          </div>


          <div className="registration-row">

            <div className="auth-form-group">

              <label>Mobile Number</label>

              <input
                type="tel"
                name="phone"
                placeholder="Enter mobile number"
                value={formData.phone}
                onChange={handleChange}
                required
              />

            </div>


            <div className="auth-form-group">

              <label>Select Course</label>

              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select a course
                </option>

                <option value="school">
                  School / Academic Coaching
                </option>

                <option value="competitive">
                  Competitive Exam Preparation
                </option>

                <option value="computer">
                  Computer Courses
                </option>

                <option value="spoken-english">
                  Spoken English
                </option>

              </select>

            </div>

          </div>


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
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

            </div>

          </div>


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


          <button
            type="submit"
            className="auth-btn registration-btn"
          >
            Create Account
          </button>


          <p className="auth-bottom-text">

            Already have an account?

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