import React, { useState } from "react";
import { motion } from "framer-motion";
import "./ContactForm.scss";
import axios from "../../lib/axios";
import toast from "react-hot-toast";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { name, email, message, phone } = formData;
    try {
      await axios.post("/send-email", { name, email, message, phone });
      toast.success("Message Sent Successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",  
      })
      setLoading(false);
    } catch (error) {
      toast.error("Internal Server Error, Try Again!");
      setLoading(false);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="contact-form">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="form-container"
      >
        <h2>Seek Help</h2>
        <p>We're here to support you. Please fill out the form below.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              aria-required="false"
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">How can we help?</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              aria-required="true"
              rows="4"
            ></textarea>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
          >
            {loading ? "Submitting..." : "Submit Request"}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
};

export default ContactForm;
