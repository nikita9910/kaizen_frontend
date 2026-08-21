import React, { useState } from "react";
import "./Contact.css";
import API from "../api";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);


  // =========================
  // HANDLE INPUT CHANGE
  // =========================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  // =========================
  // SUBMIT CONTACT FORM
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // Send data to Django backend
      const response = await API.post(
        "contact-query/",
        formData
      );

      console.log(
        "Contact Query Response:",
        response.data
      );

      alert(
        "Thank you! Your message has been submitted successfully."
      );


      // Clear form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (error) {

      console.error(
        "Contact form error:",
        error.response?.data || error
      );

      alert(
        "Unable to submit your message. Please try again."
      );

    } finally {

      setLoading(false);

    }
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


          {/* =========================
              LEFT SIDE
              ========================= */}

          <div className="contact-info">

            <h2>Get In Touch</h2>

            <p className="contact-description">

              Contact Kaizen Coaching Class for course
              information, admission details, fees and
              other enquiries.

            </p>


            {/* ADDRESS */}

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



            {/* PHONE */}

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



            {/* EMAIL */}

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



            {/* WORKING HOURS */}

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



          {/* =========================
              RIGHT SIDE - CONTACT FORM
              ========================= */}

          <div className="contact-form-box">

            <h2>
              Send Us a Message
            </h2>

            <p>
              Fill out the form and our team will
              get back to you soon.
            </p>


            <form onSubmit={handleSubmit}>


              {/* =========================
                  NAME + EMAIL
                  ========================= */}

              <div className="form-row">


                {/* NAME */}

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



                {/* EMAIL */}

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



              {/* =========================
                  SUBJECT
                  ========================= */}

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



              {/* =========================
                  MESSAGE
                  ========================= */}

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



              {/* =========================
                  SEND BUTTON
                  ========================= */}

              <button
                type="submit"
                className="send-btn"
                disabled={loading}
              >

                {loading
                  ? "Sending..."
                  : "Send Message"}

              </button>

            </form>

          </div>

        </div>

      </section>



      {/* =========================
          WHY CONTACT US
          ========================= */}

      <section className="contact-features">

        <h2>
          How Can We Help You?
        </h2>


        <div className="contact-feature-grid">


          {/* COURSE INFORMATION */}

          <div className="contact-feature-card">

            <div>
              📚
            </div>

            <h3>
              Course Information
            </h3>

            <p>
              Get complete information about
              our courses and batches.
            </p>

          </div>



          {/* FEE ENQUIRY */}

          <div className="contact-feature-card">

            <div>
              💰
            </div>

            <h3>
              Fee Enquiry
            </h3>

            <p>
              Contact us to know about course
              fees and payment options.
            </p>

          </div>



          {/* ADMISSION */}

          <div className="contact-feature-card">

            <div>
              📝
            </div>

            <h3>
              Admission
            </h3>

            <p>
              Get assistance with registration
              and admission procedures.
            </p>

          </div>



          {/* GENERAL ENQUIRY */}

          <div className="contact-feature-card">

            <div>
              💬
            </div>

            <h3>
              General Enquiry
            </h3>

            <p>
              We are happy to answer all your
              questions and queries.
            </p>

          </div>

        </div>

      </section>



      {/* =========================
          MAP SECTION
          ========================= */}

      <section className="map-section">

        <h2>
          Find Us On Map
        </h2>

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