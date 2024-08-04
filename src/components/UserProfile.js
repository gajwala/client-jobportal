import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import Loader from "./Loader";
import ViewProfile from "./ViewProfile";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    email: "",
    password: "",
    role: "freelancer",
    skills: "",
    githubProfile: "",
    projects: [],
    contactInfo: "",
    name: "",
  });
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUserProfile] = useState(true);

  useEffect(() => {
    // Fetch user profile from backend on component mount
    axiosInstance
      .get("/users/profile")
      .then((response) => setProfile(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleFetchRepos = () => {
    setLoading(true);
    if (!profile.githubProfile) {
      setLoading(false);
      setError("Please enter a GitHub username");
      return;
    }

    axios
      .get(`https://api.github.com/users/${profile.githubProfile}/repos`)
      .then((response) => {
        setRepos(response.data);
        setError("");
        const projects = response.data.map((repo) => repo.name);
        setProfile({
          ...profile,
          projects,
        });
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch repositories. Please check the username.");
        setRepos([]);
        setLoading(false);
      });
  };

  const handleSaveProfile = () => {
    axiosInstance
      .post("/user/profile", profile)
      .then((response) => console.log("Profile saved successfully"))
      .catch((error) => console.error("Failed to save profile", error));
  };

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen p-6 sm:p-12">
      {loading && <Loader />}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 sm:p-12">
        {showUserProfile ? (
          <ViewProfile id={profile._id} />
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-6">User Profile</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Contact Info
                </label>
                <input
                  type="text"
                  name="contactInfo"
                  value={profile.contactInfo}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">Skills</label>
                <input
                  type="text"
                  name="skills"
                  value={profile.skills}
                  onChange={handleInputChange}
                  placeholder="Enter your skills separated by commas"
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium">
                GitHub Username
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="githubProfile"
                  value={profile.githubProfile}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <button
                  onClick={handleFetchRepos}
                  className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
                >
                  Fetch Repos
                </button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <button
              onClick={handleSaveProfile}
              className="w-full p-3 bg-green-500 text-white rounded hover:bg-green-700 transition"
            >
              Save Profile
            </button>
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">Repositories</h2>
              {repos.length > 0 ? (
                <ul className="space-y-2">
                  {repos.map((repo) => (
                    <li
                      key={repo.id}
                      className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 dark:text-blue-300 hover:underline"
                      >
                        {repo.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No repositories found.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
