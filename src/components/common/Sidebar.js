import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import sidebarRoutes from "../../utils/sidebarRoutes"; // Import the routes configuration
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const [activeTab, setActiveTab] = useState("");

  const routes = sidebarRoutes(user?.role);

  const navigateTo = (route) => {
    setActiveTab(route.path);
    navigate(route.path);
  };

  return (
    <div
      className={`bg-gray-100 text-gray-900 h-screen px-4 fixed w-16 md:w-64 border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white transition-all duration-300 ${
        isCollapsed ? "md:w-16" : "md:w-64"
      }`}
    >
      <h1 className="text-xl font-bold hidden md:block mt-4 text-start italic">
        <div className="flex justify-between items-center">
          {!isCollapsed && (
            <div className="text-lg font-mono tracking-wider">FREEJOB.COM</div>
          )}
          <div>
            <BiMenu
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="text-2xl cursor-pointer"
            />
          </div>
        </div>
      </h1>
      <ul className="flex flex-col mt-5 text-xl">
        {routes.map((route, index) => (
          <li
            key={index}
            className={`flex items-center py-3 px-2 space-x-4 hover:rounded hover:cursor-pointer transition duration-300 ${
              route.action === "logout"
                ? "hover:bg-red-600 hover:text-white"
                : "hover:bg-blue-600 hover:text-white"
            } ${
              activeTab === route.path ? "bg-blue-600 text-white shadow-lg" : ""
            } `}
            onClick={() => navigateTo(route)}
          >
            <span
              className={`text-xl md:text-2xl ${
                route.action === "logout" ? "text-red-600" : ""
              }`}
            >
              {route.icon}
            </span>
            <span
              className={`flex-1 ${isCollapsed ? "hidden" : "block"} font-sans`}
            >
              <span className="hidden md:inline">{route.label}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
