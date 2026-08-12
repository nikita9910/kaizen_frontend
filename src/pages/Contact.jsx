import React, { useState } from "react";
import "./Contact.css";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you! Your message has been submitted.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };

  return (
    <div className="contact-page">

      {/* =========================
          HERO SECTION
          ========================= */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <h1>Contact Us</h1>

          <p>
            Have questions about our courses?
            We are here to help you.
          </p>

        </div>

      </section>


      {/* =========================
          CONTACT INFORMATION
          ========================= */}

      <section className="contact-section">

        <div className="contact-container">

          {/* LEFT SIDE */}

          <div className="contact-info">

            <h2>Get In Touch</h2>

            <p className="contact-description">
              Contact Kaizen Coaching Class for course
              information, admission details, fees and
              other enquiries.
            </p>


            <div className="contact-item">

              <div className="contact-icon">
                📍
              </div>

              <div>
                <h3>Our Address</h3>

                <p>
                  Kaizen Coaching Class,<br />
                  Satara, Maharashtra,<br />
                  India
                </p>
              </div>

            </div>


            <div className="contact-item">

              <div className="contact-icon">
                📞
              </div>

              <div>
                <h3>Phone Number</h3>

                <p>
                  +91 98765 43210
                </p>

                <p>
                  +91 91234 56789
                </p>
              </div>

            </div>


            <div className="contact-item">

              <div className="contact-icon">
                ✉️
              </div>

              <div>
                <h3>Email Address</h3>

                <p>
                  info@kaizencoaching.com
                </p>

              </div>

            </div>


            <div className="contact-item">

              <div className="contact-icon">
                🕐
              </div>

              <div>
                <h3>Working Hours</h3>

                <p>
                  Monday - Saturday
                </p>

                <p>
                  8:00 AM - 8:00 PM
                </p>

              </div>

            </div>

          </div>


          {/* RIGHT SIDE - FORM */}

          <div className="contact-form-box">

            <h2>Send Us a Message</h2>

            <p>
              Fill out the form and our team will
              get back to you soon.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="form-row">

                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

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

              </div>


              <div className="form-row">

                <div className="form-group">

                  <label>
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>


              <div className="form-group">

                <label>
                  Message
                </label>

                <textarea
                  name="message"
                  rows="6"
                  placeholder="Write your message..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>

              </div>


              <button
                type="submit"
                className="send-btn"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* =========================
          WHY CONTACT US
          ========================= */}

      <section className="contact-features">

        <h2>How Can We Help You?</h2>

        <div className="contact-feature-grid">

          <div className="contact-feature-card">

            <div>📚</div>

            <h3>Course Information</h3>

            <p>
              Get complete information about
              our courses and batches.
            </p>

          </div>


          <div className="contact-feature-card">

            <div>💰</div>

            <h3>Fee Enquiry</h3>

            <p>
              Contact us to know about course
              fees and payment options.
            </p>

          </div>


          <div className="contact-feature-card">

            <div>📝</div>

            <h3>Admission</h3>

            <p>
              Get assistance with registration
              and admission procedures.
            </p>

          </div>


          <div className="contact-feature-card">

            <div>💬</div>

            <h3>General Enquiry</h3>

            <p>
              We are happy to answer all your
              questions and queries.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          MAP
          ========================= */}

      <section className="map-section">

        <h2>Find Us On Map</h2>

        <p>
          Visit Kaizen Coaching Class
        </p>

        <div className="map-container">

          <iframe
            title="Kaizen Coaching Class Location"
            src="https://www.google.com/maps?q=Satara,Maharashtra,India&output=embed"
            loading="lazy"
            allowFullScreen
          ></iframe>

        </div>

      </section>

    </div>
  );
}

export default Contact;