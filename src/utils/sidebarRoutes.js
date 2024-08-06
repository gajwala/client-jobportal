import React from "react";
import { BiHome, BiListUl, BiBriefcase, BiEdit } from "react-icons/bi";
import {
  CREATE_JOB_PATH,
  DASHBOARD_PATH,
  EMPLOYER_JOBS_PATH,
  EMPLOYER_ROLE,
  FREELANCER,
  JOB_LISTING_PATH,
  PROFILE_PATH,
} from "./constant";

const sidebarRoutes = (role) => {
  const commonRoutes = [
    { path: DASHBOARD_PATH, label: "Dashboard", icon: <BiHome /> },
  ];

  const freelancerRoutes = [
    { path: JOB_LISTING_PATH, label: "Job Listing", icon: <BiListUl /> },
    { path: PROFILE_PATH, label: "Update Profile", icon: <BiEdit /> },
  ];

  const employerRoutes = [
    { path: EMPLOYER_JOBS_PATH, label: "My Jobs", icon: <BiBriefcase /> },
    { path: CREATE_JOB_PATH, label: "Create Job", icon: <BiEdit /> },
  ];

  return role === FREELANCER
    ? [...commonRoutes, ...freelancerRoutes]
    : role === EMPLOYER_ROLE
    ? [...commonRoutes, ...employerRoutes]
    : commonRoutes;
};

export default sidebarRoutes;
