import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/actions/authActions"; // Make sure this action exists
import "../styles/login.css"; // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password }));
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="relative inline-block text-left w-full">
          <label
            for="options"
            className="block text-sm font-medium text-gray-700"
            htmlFor="options"
          >
            Select Login As
          </label>
          <select
            id="options"
            name="options"
            className="mt-1 block w-full pr-10 py-2 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option disabled>Select login as</option>
            <option>Freelancer</option>
            <option>Employer</option>
          </select>
        </div>
        <button type="submit">Login</button>
        <div className="flex items-center justify-center my-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <span className="mx-4 text-gray-500 dark:text-gray-400">
            Don't have FreeJob.com account ?
          </span>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>
        <button type="submit" onClick={() => navigate("/signup")}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Login;
