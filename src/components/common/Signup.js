import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { registerUser } from "../../redux/reducers/authReducer";
import "../../styles/signup.css"; // Import the CSS file
import useForm from "../../Hooks/useForm";
import { registerUser } from "../../redux/actions/authActions";

const Signup = () => {
  const [formData, handleChange] = useForm({
    email: "",
    password: "",
    role: "freelancer",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    try {
      await dispatch(registerUser(formData));
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-container bg-cover bg-center">
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
          <option value="freelancer">Freelancer</option>
          <option value="employer">Employer</option>
        </select>
        <button type="submit" className="signup-button" disabled={isSubmitting}>
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
