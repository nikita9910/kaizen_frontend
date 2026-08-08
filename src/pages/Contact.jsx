import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Thank you for contacting Kaizen Coaching Class!");

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page">

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-content">
          <span>KAIZEN COACHING CLASS</span>
          <h1>Contact Us</h1>
          <p>
            We are here to help you with your learning journey.
          </p>
        </div>
      </section>


      {/* Contact Information */}
      <section className="contact-section">

        <div className="contact-container">

          {/* Left Side */}
          <div className="contact-info">

            <h2>Get In Touch</h2>

            <p className="contact-description">
              Have questions about our courses, admission, batches or
              fees? Feel free to contact Kaizen Coaching Class.
              Our team will be happy to assist you.
            </p>


            <div className="contact-item">

              <div className="contact-icon">
                📍
              </div>

              <div>
                <h3>Our Address</h3>
                <p>
                  Kaizen Coaching Class,<br />
                  Satara, Maharashtra, India
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
                  +91 XXXXX XXXXX
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
                  kaizencoaching@gmail.com
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
                  Monday - Saturday<br />
                  8:00 AM - 8:00 PM
                </p>
              </div>

            </div>

          </div>


          {/* Right Side - Contact Form */}
          <div className="contact-form-box">

            <h2>Send Us a Message</h2>

            <form onSubmit={handleSubmit}>

              <div className="form-row">

                <div className="form-group">
                  <label>Full Name</label>

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


              <div className="form-row">

                <div className="form-group">
                  <label>Phone Number</label>

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
                  <label>Subject</label>

                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select Subject
                    </option>

                    <option value="admission">
                      Admission Enquiry
                    </option>

                    <option value="courses">
                      Course Enquiry
                    </option>

                    <option value="fees">
                      Fees Enquiry
                    </option>

                    <option value="batch">
                      Batch Enquiry
                    </option>

                    <option value="other">
                      Other
                    </option>

                  </select>

                </div>

              </div>


              <div className="form-group">

                <label>Message</label>

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
                className="send-button"
              >
                Send Message →
              </button>

            </form>

          </div>

        </div>

      </section>


      {/* Why Contact */}
      <section className="contact-bottom">

        <h2>Have Questions?</h2>

        <p>
          Contact us today to know more about courses, admission,
          batches, fees and scholarship/NMMS preparation.
        </p>

      </section>

    </div>
  );
}

export default Contact;