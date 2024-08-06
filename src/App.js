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
  CreateJob,
  AuthenticatedLayout,
  ApplicantsList,
  EmployerJobs,
  ErrorBoundary,
  ApplicantProfile,
} from "./components";
import { useSelector } from "react-redux";
import {
  EMPLOYER_ROLE,
  FREELANCER,
  LOGIN_PATH,
  LOGIN_PATH_ALT,
  SIGNUP_PATH,
  DASHBOARD_PATH,
  PROFILE_PATH,
  PROFILE_WITH_ID_PATH,
  JOB_LISTING_PATH,
  EMPLOYER_JOBS_PATH,
  CREATE_JOB_PATH,
  APPLICANTS_LIST_PATH,
  DEFAULT_REDIRECT_PATH,
} from "./utils/constant";

const App = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* Public Routes */}
          <Route path={LOGIN_PATH} element={<Login />} />
          <Route path={LOGIN_PATH_ALT} element={<Login />} />
          <Route path={SIGNUP_PATH} element={<Signup />} />

          {/* Protected Routes */}
          {isAuthenticated ? (
            <Route element={<AuthenticatedLayout />}>
              <Route path={DASHBOARD_PATH} element={<Dashboard />} />
              <Route path={PROFILE_PATH} element={<UserProfile />} />
              <Route
                path={PROFILE_WITH_ID_PATH}
                element={<ApplicantProfile />}
              />

              {user.role === FREELANCER && (
                <Route path={JOB_LISTING_PATH} element={<JobListing />} />
              )}

              {user.role === EMPLOYER_ROLE && (
                <>
                  <Route path={EMPLOYER_JOBS_PATH} element={<EmployerJobs />} />
                  <Route path={CREATE_JOB_PATH} element={<CreateJob />} />
                  <Route
                    path={APPLICANTS_LIST_PATH}
                    element={<ApplicantsList />}
                  />
                </>
              )}

              {/* Default Redirect for Unmatched Routes */}
              {/* <Route path="*" element={<Navigate to={DASHBOARD_PATH} />} /> */}
            </Route>
          ) : (
            <Route path="*" element={<Navigate to={DEFAULT_REDIRECT_PATH} />} />
          )}
        </Routes>
      </ErrorBoundary>
    </Router>
  );
};

export default App;
