import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";


function Login() {

  const navigate = useNavigate();


  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });


  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

    setError("");

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);


    try {

      const response = await fetch(

        "http://127.0.0.1:8000/api/login/",

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"

          },

          body: JSON.stringify({

            email: formData.email,

            password: formData.password

          })

        }

      );


      const data = await response.json();


      if (response.ok && data.success) {


        // =========================================
        // SAVE LOGIN INFORMATION
        // =========================================

        localStorage.setItem(

          "userType",

          data.user_type

        );


        localStorage.setItem(

          "user",

          JSON.stringify(data.user)

        );


        // =========================================
        // AUTOMATIC ROLE CHECK
        // =========================================

        if (data.user_type === "admin") {

          navigate("/admin-dashboard");

        }

        else if (
          data.user_type === "student"
        ) {

          navigate("/student-dashboard");

        }


      }

      else {

        setError(

          data.message ||
          "Invalid email or password."

        );

      }


    }

    catch (error) {

      console.error(error);

      setError(

        "Cannot connect to Django server. Please start the backend."

      );

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="auth-page">


      <div className="login-container">


        {/* LEFT SECTION */}

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


        {/* RIGHT SECTION */}

        <div className="login-form-container">


          <h2>
            Login
          </h2>


          <p className="login-subtitle">

            Login to your Kaizen account

          </p>


          <form onSubmit={handleSubmit}>


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


            {error && (

              <div className="login-error">

                {error}

              </div>

            )}


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


          <p className="auth-bottom-text">

            Don't have a student account?

            {" "}

            <Link to="/registration">

              Register Now

            </Link>

          </p>


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