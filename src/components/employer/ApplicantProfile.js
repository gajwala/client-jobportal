import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../common/Loader";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { EMPLOYER_ROLE } from "../../utils/constant";

export default function ApplicantProfile() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.user);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`/users/${id}`);
        setUserInfo(response.data);
      } catch (error) {
        setError("Failed to fetch user information.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [id]);

  const backRouteHandler = () => {
    navigate("/employer-jobs");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-6 md:p-8">
      {loading && <Loader />}
      {userInfo && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            User Profile
          </h1>
          {user?.role === EMPLOYER_ROLE && (
            <button
              onClick={backRouteHandler}
              className="mb-4 text-blue-500 hover:underline dark:text-blue-400"
            >
              Back to Jobs
            </button>
          )}

          <div className="flex flex-col md:flex-row items-start md:items-center mb-6">
            <div className="flex-shrink-0 p-4 border rounded-full bg-slate-300 dark:bg-gray-600">
              <FaUser className="text-3xl md:text-4xl lg:text-5xl" />
            </div>
            <div className="md:ml-6 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white">
                {userInfo.name}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                <strong>Designation:</strong> {userInfo.designation}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                <strong>About Me:</strong> {userInfo.aboutMe}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                <strong>Contact Info:</strong> {userInfo.contactInfo}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                <strong>Email:</strong> {userInfo.email}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                <strong>Role:</strong> {userInfo.role}
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                <strong>GitHub Profile:</strong>{" "}
                <a
                  href={userInfo.githubProfile}
                  className="text-blue-500 dark:text-blue-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {userInfo.githubProfile}
                </a>
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base">
                <strong>Skills:</strong> {userInfo.skills.join(", ")}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
