import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    role: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.role ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please complete all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Password and confirm password do not match.");
      return;
    }

    alert(`Sign up successful as ${formData.role}!`);
    navigate("/");
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      alert("Google sign up successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign up error:", error);
      alert("Google sign up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="overlay"></div>

      <div className="auth-box">
        <div className="box-glow"></div>

        <h2 className="welcome-text">Welcome ✨</h2>
        <h1>Sign Up</h1>
        <p className="subtitle">Create your account</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="signup-name">Full Name</label>
          <input
            id="signup-name"
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="">Select your role</option>
            <option value="student">Student</option>
            <option value="lecturer">Lecturer</option>
          </select>

          <label htmlFor="signup-email">Email</label>
          <input
            id="signup-email"
            type="email"
            name="email"
            placeholder="Enter your university email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="signup-password">Password</label>
          <input
            id="signup-password"
            type="password"
            name="password"
            placeholder="Create your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="signup-confirm-password">Confirm Password</label>
          <input
            id="signup-confirm-password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          <button type="submit" className="main-btn">
            Sign Up
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Continue with Google"}
          </button>

          <p className="switch-text">
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;