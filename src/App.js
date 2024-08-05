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
  ApplicantProfile,
} from "./components";
import { useSelector } from "react-redux";

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          {isAuthenticated ? (
            <Route element={<AuthenticatedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/profile/:id" element={<ApplicantProfile />} />

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

              {/* Default Redirect for Unmatched Routes */}
              {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
            </Route>
          ) : (
            <Route path="*" element={<Navigate to="/" />} />
          )}
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
