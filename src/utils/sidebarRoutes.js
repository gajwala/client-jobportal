import React from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaBriefcase,
  FaPlus,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

const sidebarRoutes = (role) => [
  { path: "/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/profile", label: "Profile", icon: <FaUser /> },
  ...(role === "freelancer"
    ? [{ path: "/jobListing", label: "Job Listings", icon: <FaBriefcase /> }]
    : []),
  ...(role === "employer"
    ? [
        { path: "/employer-jobs", label: "My Jobs", icon: <FaBriefcase /> },
        { path: "/create-job", label: "Post Job", icon: <FaPlus /> },
        {
          path: "/employer/job/:jobId/applicants",
          label: "Applicants",
          icon: <FaUsers />,
        },
      ]
    : []),
  {
    path: "/logout",
    label: "Logout",
    icon: <FaSignOutAlt />,
    action: "logout",
  },
];

export default sidebarRoutes;
