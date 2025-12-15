import React, { useState } from 'react';
import './Form.css';

function GoogleFormClone() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Connect Frontend → Backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        alert("Failed to submit form ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server not responding. Check if backend is running.");
    }
  };

  return (
    <div className="form-body">
      <div className="form-container slideIn">
        <h2>Google Form Style</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Message</label>
            <textarea
              name="message"
              rows="4"
              placeholder="Your message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit">Submit</button>

          {showSuccess && (
            <p className="success-message">Form Submitted Successfully ✅</p>
          )}
        </form>
      </div>
    </div>
  );
}

export default GoogleFormClone;
