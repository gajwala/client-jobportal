import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../common/Loader";
import { FaUser } from "react-icons/fa";

export default function ApplicantProfile() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
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

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen p-4">
      {loading && <Loader />}
      {userInfo && (
        <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">User Profile</h1>
          <button
            onClick={() => navigate("/employer-jobs")}
            className="mb-4 text-blue-500 hover:underline"
          >
            Back to Jobs
          </button>
          <div className="m-8 p-8">
            <h2
              className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white flex"
              style={{ alignItems: "center" }}
            >
              <FaUser fontSize={"3rem"} style={{ marginRight: "1rem" }} />{" "}
              {userInfo.name}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
              <strong>Designation:</strong> {userInfo.designation}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
              <strong>About Me:</strong> {userInfo.aboutMe}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
              <strong>Contact Info:</strong> {userInfo.contactInfo}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
              <strong>Email:</strong> {userInfo.email}
            </p>

            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
              <strong>Role:</strong> {userInfo.role}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
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
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
              <strong>Skills:</strong> {userInfo.skills.join(", ")}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg">
              <strong>Created At:</strong>{" "}
              {new Date(userInfo.createdAt).toLocaleDateString()}
              <strong className="ml-4"> Updated At:</strong>{" "}
              {new Date(userInfo.updatedAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-lg"></p>
          </div>
        </div>
      )}
    </div>
  );
}
