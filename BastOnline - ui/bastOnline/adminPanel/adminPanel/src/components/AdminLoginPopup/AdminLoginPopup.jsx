
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AdminLoginPopup.css'; 

const AdminLoginPopup = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        usernameOrEmail: formData.email,
        password: formData.password
      });

      const user = res.data.user;
      const token = res.data.token || res.data.accessToken;

      if (user.role !== "ROLE_ADMIN") {
        toast.error("Access denied. Not an admin.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Admin login successful!");
      onSuccess(); 

    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="login-popup">
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>Admin Login</h2>
        </div>

        <div className="login-popup-input">
          <input
            type="email"
            name="email"
            placeholder="Admin email"
            required
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default AdminLoginPopup;
