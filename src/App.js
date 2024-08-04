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

const App = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const isAuthenticated = !!user;

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Navigate to="/" />} />
          {isAuthenticated && (
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
            </Route>
          )}
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
