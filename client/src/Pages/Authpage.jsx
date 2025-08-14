import React, { useState } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validateForm = () => {
    const { name, email, password, contact } = formData;

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }

    if (!isLoginMode) {
      if (!name.trim()) {
        setError("Name is required.");
        return false;
      }
      if (!/^\d{10}$/.test(contact)) {
        setError("Contact must be a 10-digit number.");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isLoginMode) {
        // Login mode
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password,
          }
        );

        const { token, user } = response.data;

        // Store token and user info in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        login(token, user); // Update context
        navigate("/");
      } else {
        // Signup mode
        const response = await axios.post(
          "http://localhost:5000/api/auth/signup",
          formData
        );

        const { token, user } = response.data;

        // Store token and user info in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        login(token, user); // Update context
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLoginMode ? "Sign In" : "Sign Up"}</h2>

        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleAuth}>
          {!isLoginMode && (
            <>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="contact">Contact Number</label>
              <input
                type="text"
                id="contact"
                name="contact"
                placeholder="10-digit Contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button type="submit">
            {isLoginMode ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <p>
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            className="auth-toggle"
            onClick={() => setIsLoginMode(!isLoginMode)}
          >
            {isLoginMode ? "Sign Up" : "Sign In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
