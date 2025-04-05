import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Signup = ({ setIsSignUp }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const backendURL = window.location.hostname === "localhost"
    ? "http://localhost:8000/api/register/"
    : "http://10.1.1.100:8000/api/register/";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(backendURL, formData);
      setMessage("Signup successful! Redirecting to login...");
      setTimeout(() => setIsSignUp(false), 1500);
    } catch (error) {
      setMessage("Signup failed. Please try again.");
    }
  };

  return (
    <div className="hero-sup">
      <h2>Signup</h2>
      {message && <p style={{ color: message.includes("failed") ? "red" : "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button className="btn btn-primary" type="submit">Signup</button>
        <p className="mt-2">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-500"
            style={{
              textDecoration: "underline",
              background: "none",
              border: "none",
              color: "blue",
              cursor: "pointer",
              fontSize: "inherit",
            }}
            onClick={() => setIsSignUp(false)}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Signup;
