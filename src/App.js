import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import {
  Login,
  Signup,
  Dashboard,
  UserProfile,
  JobListing,
  CreateJobLayout,
  AuthenticatedLayout,
  ApplicantsList,
  EmployerJobs,
  ErrorBoundary,
} from "./components";

const App = () => {
  const user = JSON.parse(localStorage.getItem("user")); // Adjust based on your state structure
  const isAuthenticated = !!user; // Adjust based on your auth logic

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Authenticated Routes */}
          {isAuthenticated && (
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfile />} />

              {user.role === "freelancer" && (
                <Route path="/jobListing" element={<JobListing />} />
              )}

              {user.role === "employer" && (
                <>
                  <Route path="/employer-jobs" element={<EmployerJobs />} />
                  <Route path="/create-job" element={<CreateJobLayout />} />
                  <Route
                    path="/employer/job/:jobId/applicants"
                    element={<ApplicantsList />}
                  />
                </>
              )}

              {/* Wildcard Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Route>
          )}
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
