import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROLES = [
  { value: "student", label: "Student", desc: "I want to learn" },
  { value: "instructor", label: "Instructor", desc: "I want to teach" },
];

const GENDERS = ["Male", "Female", "Prefer not to say"];

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    cPassword: "",
    gender: "",
    role: "student",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const validateStep1 = () => {
    if (!formData.role) return "Please select a role.";
    if (!formData.username || formData.username.length < 5)
      return "Username must be at least 5 characters.";
    if (!formData.email) return "Email is required.";
    return null;
  };

  const handleNext = () => {
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.cPassword) {
      setError("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      login(response.data.user, response.data.token);
      navigate("/Dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual signup-visual">
        <div className="auth-visual-content">
          <div className="auth-brand-mark">L</div>
          <h2 className="auth-tagline">
            Start learning.
            <br />
            Start growing.
          </h2>
          <div className="auth-step-indicator">
            <div className={`auth-step-dot ${step >= 1 ? "active" : ""}`} />
            <div className="auth-step-line" />
            <div className={`auth-step-dot ${step >= 2 ? "active" : ""}`} />
          </div>
          <p className="auth-step-label">Step {step} of 2</p>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <p className="auth-label">
              {step === 1 ? "New here?" : "Almost done"}
            </p>
            <h1 className="auth-title">
              {step === 1 ? "Create account" : "Set your password"}
            </h1>
          </div>

          {error && (
            <div className="auth-error">
              <span className="auth-error-icon">!</span>
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="auth-form">
              <div className="auth-field">
                <label className="auth-field-label">I want to</label>
                <div className="auth-role-grid">
                  {ROLES.map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      className={`auth-role-card ${
                        formData.role === r.value ? "selected" : ""
                      }`}
                      onClick={() =>
                        setFormData({ ...formData, role: r.value })
                      }
                    >
                      <span className="auth-role-label">{r.label}</span>
                      <span className="auth-role-desc">{r.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-field-label">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="At least 5 characters"
                  autoComplete="username"
                />
              </div>

              <div className="auth-field">
                <label className="auth-field-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>

              <div className="auth-field">
                <label className="auth-field-label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="auth-input auth-select"
                >
                  <option value="">Select gender</option>
                  {GENDERS.map((g) => (
                    <option key={g} value={g.toLowerCase().replace(/ /g, "_")}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="auth-submit"
                onClick={handleNext}
              >
                Continue
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-field">
                <label className="auth-field-label">Password</label>
                <div className="auth-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="auth-input"
                    placeholder="Min 8 chars, upper, lower, number, symbol"
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="auth-toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="auth-field">
                <label className="auth-field-label">Confirm password</label>
                <input
                  type="password"
                  name="cPassword"
                  value={formData.cPassword}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="Repeat your password"
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="auth-step-actions">
                <button
                  type="button"
                  className="auth-back"
                  onClick={() => {
                    setStep(1);
                    setError("");
                  }}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="auth-submit auth-submit-sm"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="auth-btn-loading">
                      <span className="auth-btn-spinner" /> Creating...
                    </span>
                  ) : (
                    "Create account"
                  )}
                </button>
              </div>
            </form>
          )}

          <p className="auth-switch">
            Already have an account?{" "}
            <Link to="/Signin" className="auth-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
