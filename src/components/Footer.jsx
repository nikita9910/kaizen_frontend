import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      {/* Main Footer */}
      <div className="footer-container">

        {/* About */}
        <div className="footer-column footer-about">

          <div className="footer-logo">
            <span className="footer-logo-icon">🎓</span>
            <span>Kaizen Coaching Class</span>
          </div>

          <p>
            Empowering students with quality education, expert guidance
            and personalized learning for a brighter future.
          </p>

          <div className="social-links">

            <a href="#" aria-label="Facebook">
              f
            </a>

            <a href="#" aria-label="Instagram">
              ◎
            </a>

            <a href="#" aria-label="YouTube">
              ▶
            </a>

            <a href="#" aria-label="WhatsApp">
              ☎
            </a>

          </div>

        </div>


        {/* Quick Links */}
        <div className="footer-column">

          <h3>Quick Links</h3>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About Us</Link>
            </li>

            <li>
              <Link to="/courses">Courses</Link>
            </li>

            <li>
              <Link to="/faculty">Our Faculty</Link>
            </li>

            <li>
              <Link to="/contact">Contact Us</Link>
            </li>

            <li>
              <Link to="/login">Student Login</Link>
            </li>
          </ul>

        </div>


        {/* Courses */}
        <div className="footer-column">

          <h3>Our Courses</h3>

          <ul>

            <li>
              <Link to="/courses">
                7th - 10th State Board
              </Link>
            </li>

            <li>
              <Link to="/courses">
                5th - 10th CBSE
              </Link>
            </li>

            <li>
              <Link to="/courses">
                11th & 12th Science
              </Link>
            </li>

            <li>
              <Link to="/courses">
                Scholarship Preparation
              </Link>
            </li>

            <li>
              <Link to="/courses">
                NMMS Preparation
              </Link>
            </li>

          </ul>

        </div>


        {/* Contact */}
        <div className="footer-column">

          <h3>Contact Us</h3>

          <div className="footer-contact">

            <p>
              📍
              <span>
                Kaizen Coaching Class,<br />
                Satara, Maharashtra, India
              </span>
            </p>

            <p>
              📞
              <span>
                +91 XXXXX XXXXX
              </span>
            </p>

            <p>
              ✉️
              <span>
                kaizencoaching@gmail.com
              </span>
            </p>

            <p>
              🕐
              <span>
                Mon - Sat: 8:00 AM - 8:00 PM
              </span>
            </p>

          </div>

        </div>

      </div>


      
      {/* Bottom Footer */}
      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Kaizen Coaching Class.
          All Rights Reserved.
        </p>

        <div className="footer-bottom-links">

          <Link to="/privacy">
            Privacy Policy
          </Link>

          <span>|</span>

          <Link to="/terms">
            Terms & Conditions
          </Link>

        </div>

      </div>

    </footer>
  );
}

export default Footer;