import React from "react";
import {
  BiHome,
  BiLogOut,
  BiListUl,
  BiBriefcase,
  BiEdit,
} from "react-icons/bi";

const sidebarRoutes = (role) => {
  const commonRoutes = [
    { path: "/dashboard", label: "Dashboard", icon: <BiHome /> },
    { path: "/profile", label: "Update Profile", icon: <BiEdit /> },
    { action: "logout", label: "Logout", icon: <BiLogOut /> },
  ];

  const freelancerRoutes = [
    { path: "/jobListing", label: "Job Listing", icon: <BiListUl /> },
  ];

  const employerRoutes = [
    { path: "/employer-jobs", label: "My Jobs", icon: <BiBriefcase /> },
    { path: "/create-job", label: "Create Job", icon: <BiEdit /> },
  ];

  return role === "freelancer"
    ? [...commonRoutes, ...freelancerRoutes]
    : role === "employer"
    ? [...commonRoutes, ...employerRoutes]
    : commonRoutes;
};

export default sidebarRoutes;
