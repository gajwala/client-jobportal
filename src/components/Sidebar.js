import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import sidebarRoutes from "../utils/sidebarRoutes"; // Import the routes configuration

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Get the user role from localStorage

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const routes = sidebarRoutes(user?.role);

  return (
    <div className="bg-gray-100 text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className="text-xl font-bold hidden md:block mt-4 text-start italic">
        <div className="flex justify-between">
          {!isCollapsed && <div>FREEJOB.COM</div>}
          <div>
            <BiMenu onClick={() => setIsCollapsed(!isCollapsed)} />
          </div>
        </div>
      </h1>
      <ul className="flex flex-col mt-5 text-xl">
        {routes.map((route, index) => (
          <li
            key={index}
            className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer 
            hover:${
              route.action === "logout"
                ? "bg-red-600 text-white"
                : "bg-blue-600 text-white"
            } ${route.action === "logout" ? "absolute bottom-1" : ""}`}
            onClick={route.action === "logout" ? handleLogout : undefined}
          >
            {route.icon}
            <Link to={route.path} className="flex-1">
              {!isCollapsed && (
                <span className="hidden md:inline">{route.label}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
