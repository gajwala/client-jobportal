import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeCotext } from "../../context/ThemeContext";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeCotext);
  const { user } = useSelector((state) => state.user);
  return (
    <div className="bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1>Welcome {user?.name}</h1>
      <button className="text-2xl" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
    </div>
  );
};

export default Navbar;
