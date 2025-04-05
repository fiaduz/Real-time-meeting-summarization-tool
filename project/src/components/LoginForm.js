import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function LoginForm({ setIsAuthenticated, setIsSignUp }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [message, setMessage] = useState("");  // Fixed typo
    const navigate = useNavigate();

    const url = window.location.hostname === "localhost" 
        ? "http://localhost:8000/api/login/" 
        : "http://10.1.1.100:8000/api/login/";

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url, formData);
            console.log("Login response: ", response.data);
            
            if (response.data.access && response.data.refresh) {
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);
                
                if (typeof setIsAuthenticated === "function") {
                    setIsAuthenticated(true);
                }

                setMessage("Login Successful!");
                setTimeout(() => navigate("/home"), 1000);
            } else {
                setMessage("Invalid credentials");
            }
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            setMessage("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="hero">
            <h2>Login</h2>
            {message && <p style={{ color: message.includes("failed") ? "red" : "green" }}>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <button className="btn btn-success" type="submit">Login</button>
                <p className="mt-2">
                    Don't have an account?{" "}
                    {typeof setIsSignUp === "function" && (
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
                            onClick={() => setIsSignUp(true)}
                        >
                            Sign Up
                        </button>
                    )}
                </p>
            </form>
        </div>
    );
}

export default LoginForm;
