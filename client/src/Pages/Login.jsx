import React, { useState } from "react";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

import API from "../api";


const Login = () => {
  const { setAuthData } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     const response = await API.post("/auth/login", {

        email,
        password,
      });

      const { token, user } = response.data;

      // Save token to localStorage (optional but common)
      localStorage.setItem("authToken", token);

      // Update auth context
      setAuthData({ token, user });

      // Redirect to homepage
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Login to Continue</h2>
      <form onSubmit={handleLogin} style={{ maxWidth: "300px", margin: "auto" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.8rem 2rem", width: "100%" }}>
          Login
        </button>
        {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
