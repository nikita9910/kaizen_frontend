import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function StudentLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Temporary frontend login
    // Later connect this with Django API

    if (formData.email && formData.password) {
      navigate("/student-dashboard");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* LEFT SIDE */}

        <div className="auth-welcome">

          <div className="welcome-icon">🎓</div>

          <h1>Welcome Back!</h1>

          <h2>Kaizen Coaching Class</h2>

          <p>
            Login to access your courses, attendance,
            study materials, examinations and results.
          </p>

          <div className="welcome-features">
            <span>📚 Courses</span>
            <span>📊 Attendance</span>
            <span>📝 Exams</span>
            <span>🏆 Results</span>
          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="auth-form-container">

          <h2>Student Login</h2>

          <p className="auth-subtitle">
            Login to your student account
          </p>

          <form onSubmit={handleSubmit}>

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

              <label>Password</label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>


            <div className="remember-row">

              <label>
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#forgot">
                Forgot Password?
              </a>

            </div>


            <button
              type="submit"
              className="auth-btn"
            >
              Login
            </button>

          </form>


          <p className="auth-bottom-text">

            Don't have an account?

            <Link to="/registration">
              Register Now
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default StudentLogin;