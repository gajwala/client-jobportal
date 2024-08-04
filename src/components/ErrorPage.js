import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
        <FaExclamationTriangle className="text-red-500 text-6xl mb-4 mx-auto" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Oops! Something Went Wrong
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          We encountered an unexpected error. Please try again later.
        </p>
        <Link
          to="/"
          className="text-blue-500 dark:text-blue-300 hover:underline"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
