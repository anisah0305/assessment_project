import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function SignIn() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in email and password.");
      return;
    }

    alert("Sign in successful!");
    navigate("/dashboard");
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      alert("Google sign in successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Google sign in error:", error);
      alert("Google sign in failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="overlay"></div>

      <div className="auth-box">
        <div className="box-glow"></div>

        <h2 className="welcome-text">Welcome Back ✨</h2>
        <h1>Sign In</h1>
        <p className="subtitle">Enter your account details</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="signin-email">Email</label>
          <input
            id="signin-email"
            type="email"
            name="email"
            placeholder="Enter your university email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="signin-password">Password</label>
          <input
            id="signin-password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <div className="auth-options">
            <label className="remember-me">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              <span>Remember me</span>
            </label>

            <button type="button" className="text-btn">
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="main-btn">
            Sign In
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
            Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignIn;