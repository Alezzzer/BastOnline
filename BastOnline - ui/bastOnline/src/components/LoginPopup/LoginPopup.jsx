import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin, onLoginSuccess }) => {
  const [currState, setCurrState] = useState("Log in");
  const { login } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    address: '',
    city: '',
    phone: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let accessToken, user;

      if (currState === "Log in") {
        const response = await axios.post("http://localhost:8080/api/auth/login", {
          usernameOrEmail: formData.email,
          password: formData.password
        });

        accessToken = response.data.accessToken || response.data.token;
        user = response.data.user;
        toast.success("Login successful");
      } else {
        await axios.post("http://localhost:8080/api/auth/register", formData);

        const loginResponse = await axios.post("http://localhost:8080/api/auth/login", {
          usernameOrEmail: formData.email,
          password: formData.password
        });

        accessToken = loginResponse.data.accessToken || loginResponse.data.token;
        user = loginResponse.data.user;
        toast.success("Registration and login successful");
      }

      login(user, accessToken);
      setTimeout(() => {
        setShowLogin(false);
        onLoginSuccess();
      }, 300);

    } catch (err) {
      toast.error("Something went wrong");
      console.error("Auth error:", err);
    }
  };

  return (
    <div className='login-popup'>
      <form className="login-popup-container" onSubmit={handleSubmit}>
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt='close' />
        </div>

        <div className="login-popup-input">
          <input
            type="email"
            name="email"
            placeholder="Your email"
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

          {currState === "Sign up" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Your address"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="Your city"
                required
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Your phone"
                required
                onChange={handleChange}
              />
            </>
          )}
        </div>

        <button type="submit">
          {currState === "Sign up" ? "Create account" : "Log in"}
        </button>

        {currState === "Sign up" && (
  <div className="login-popup-condition">
    <input type="checkbox" required />
    <p>By continuing, I agree to the terms of use & privacy policy.</p>
  </div>
)}
        {currState === "Log in" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Log in")}>Log in here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
