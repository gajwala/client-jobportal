import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../../styles/signup.css";
import useForm from "../../Hooks/useForm";
import { registerUser } from "../../redux/actions/userActions";
import Loader from "./Loader";
import { EMPLOYER_ROLE, FREELANCER } from "../../utils/constant";

const Signup = () => {
  const [formData, handleChange] = useForm({
    email: "",
    password: "",
    role: FREELANCER,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(registerUser(formData));
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-container bg-cover bg-center">
      {loading && <Loader />}
      <div className="signup-overlay"></div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1 className="signup-title">Signup</h1>
        {error && <div className="error-message">{error}</div>}
        <label htmlFor="email" className="signup-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="signup-input"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="password" className="signup-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="signup-input"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="role" className="signup-label">
          Role
        </label>
        <select
          id="role"
          className="signup-input"
          value={formData.role}
          onChange={handleChange}
          required
        >
          <option value={FREELANCER}>Freelancer</option>
          <option value={EMPLOYER_ROLE}>Employer</option>
        </select>
        <button type="submit" className="signup-button">
          Signup
        </button>
        <div className="login-link-container">
          <div className="border-t flex-grow"></div>
          <span className="login-link-text">
            Already have a FreeJob.com account?
          </span>
          <div className="border-t flex-grow"></div>
        </div>
        <button
          type="button"
          className="login-button"
          onClick={() => navigate("/")}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Signup;
