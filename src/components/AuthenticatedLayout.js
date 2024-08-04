// src/components/AuthenticatedLayout.js

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AuthenticatedLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="grow ml-16 md:ml-64 h-full bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        <Navbar />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
