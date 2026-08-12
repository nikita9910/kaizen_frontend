import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
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

    if (formData.username && formData.password) {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div className="auth-page">

      <div className="admin-login-container">

        <div className="admin-icon">
          🔐
        </div>

        <h1>Admin Login</h1>

        <h3>Kaizen Coaching Class</h3>

        <p>
          Login to manage the coaching center.
        </p>


        <form onSubmit={handleSubmit}>

          <div className="auth-form-group">

            <label>Admin Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter admin username"
              value={formData.username}
              onChange={handleChange}
              required
            />

          </div>


          <div className="auth-form-group">

            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleChange}
              required
            />

          </div>


          <button
            type="submit"
            className="admin-login-btn"
          >
            🔐 Login as Admin
          </button>

        </form>


        <Link
          to="/"
          className="back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </div>
  );
}

export default AdminLogin;