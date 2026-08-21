import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


  // =================================
  // HANDLE INPUT
  // =================================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    setError("");
  };


  // =================================
  // LOGIN
  // =================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");
    setLoading(true);

    try {

      const response = await API.post(
        "login/",
        {
          email: formData.email,
          password: formData.password
        }
      );

      console.log("Login response:", response.data);

      const data = response.data;


      // =================================
      // LOGIN SUCCESS
      // =================================

      if (data.success) {

        // Save user type
        localStorage.setItem(
          "userType",
          data.user_type
        );


        // Save user information
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );


        // =================================
        // ADMIN
        // =================================

        if (data.user_type === "admin") {

          alert("Admin login successful!");

          navigate("/admin-dashboard");

          return;
        }


        // =================================
        // STUDENT
        // =================================

        if (data.user_type === "student") {

          alert("Student login successful!");

          navigate("/student-dashboard");

          return;
        }

      }


      // =================================
      // LOGIN FAILED
      // =================================

      setError(
        data.message ||
        "Invalid email or password."
      );

    }

    catch (error) {

      console.error(
        "Login error:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
        "Cannot connect to Django server."
      );

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-page">

      <div className="login-container">


        {/* =========================
            LEFT SECTION
            ========================= */}

        <div className="login-welcome">

          <div className="login-logo">
            🎓
          </div>

          <h1>
            Kaizen Coaching Class
          </h1>

          <h2>
            Welcome Back!
          </h2>

          <p>
            Login to access your account
            and continue your learning journey.
          </p>


          <div className="login-features">

            <div>
              📚
              <span>
                Courses
              </span>
            </div>

            <div>
              📊
              <span>
                Attendance
              </span>
            </div>

            <div>
              📝
              <span>
                Exams
              </span>
            </div>

            <div>
              🏆
              <span>
                Results
              </span>
            </div>

          </div>

        </div>



        {/* =========================
            RIGHT SECTION
            ========================= */}

        <div className="login-form-container">

          <h2>
            Login
          </h2>

          <p className="login-subtitle">
            Login to your Kaizen account
          </p>


          <form onSubmit={handleSubmit}>


            {/* EMAIL */}

            <div className="auth-form-group">

              <label>
                Email
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


            {/* PASSWORD */}

            <div className="auth-form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />

            </div>


            {/* ERROR MESSAGE */}

            {error && (

              <div className="login-error">

                {error}

              </div>

            )}


            {/* REMEMBER */}

            <div className="remember-row">

              <label>

                <input
                  type="checkbox"
                />

                Remember me

              </label>


              <a href="#forgot">
                Forgot Password?
              </a>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >

              {loading
                ? "Checking..."
                : "Login"
              }

            </button>

          </form>


          {/* REGISTER */}

          <p className="auth-bottom-text">

            Don't have a student account?

            {" "}

            <Link to="/registration">
              Register Now
            </Link>

          </p>


          {/* BACK HOME */}

          <Link
            to="/"
            className="back-home"
          >

            ← Back to Home

          </Link>

        </div>

      </div>

    </div>

  );
}

export default Login;