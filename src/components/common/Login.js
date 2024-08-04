import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/authActions";
import "../../styles/login.css"; // Make sure this CSS file is updated
import useForm from "../../Hooks/useForm";

const Login = () => {
  const [formData, handleChange] = useForm({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      await dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
      navigate("/dashboard");
    } catch (err) {
      setIsSubmitting(false);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container bg-cover bg-center">
      <div className="login-overlay"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Login</h1>
        {error && <div className="error-message">{error}</div>}
        <label htmlFor="email" className="login-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="login-input"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="login-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="login-input"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="login-button" disabled={isSubmitting}>
          Login
        </button>
        <div className="signup-link-container">
          <div className="border-t flex-grow"></div>
          <span className="signup-link-text">
            Don't have a FreeJob.com account?
          </span>
          <div className="border-t flex-grow"></div>
        </div>
        <button
          type="button"
          className="signup-button"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Login;
