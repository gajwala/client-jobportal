import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions/userActions";
import "../../styles/login.css"; // Make sure this CSS file is updated
import useForm from "../../Hooks/useForm";
import Loader from "./Loader";

const Login = () => {
  const [formData, handleChange] = useForm({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);

    e.preventDefault();
    try {
      await dispatch(
        loginUser({ email: formData.email, password: formData.password })
      );
      setLoading(false);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container bg-cover bg-center">
      {loading && <Loader />}
      <div className="login-overlay"></div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className="login-title">Login</h1>
        {error && <div className="text-red-700 mb-3">{error}</div>}
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
        <button type="submit" className="login-button">
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
