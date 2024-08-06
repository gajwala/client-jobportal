import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AuthenticatedLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col grow ml-16 md:ml-64 min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white transition-all duration-300">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default AuthenticatedLayout;
