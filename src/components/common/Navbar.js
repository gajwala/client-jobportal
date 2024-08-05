import React, { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { ThemeCotext } from "../../context/ThemeContext"; // Fixed the typo here
import { useDispatch, useSelector } from "react-redux";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeCotext);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="bg-gray-100 text-gray-900 border-b border-gray-300 p-4 flex justify-between items-center dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className="flex-1 text-lg md:text-xl lg:text-2xl font-semibold">
        Welcome {user?.name}
      </h1>
      <div className="flex items-center space-x-4">
        <button
          className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 transition-transform transform hover:scale-110"
          onClick={handleLogout}
        >
          <BiLogOut />
        </button>
        <button
          className="text-xl md:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 transition-transform transform hover:scale-110"
          onClick={toggleTheme}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
