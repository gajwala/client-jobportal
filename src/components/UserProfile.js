import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "./common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateProfile, fetchUserProfile } from "../redux/actions/userActions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    name: Yup.string(),
    contactInfo: Yup.string(),
    skills: Yup.string(),
    githubProfile: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      email: user?.email || "",
      name: user?.name || "",
      contactInfo: user?.contactInfo || "",
      skills: user?.skills.join(", ") || "",
      githubProfile: user?.githubProfile || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        // Convert skills to array and trim any extra spaces
        const skillsArray = values.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter((skill) => skill !== "");
        await dispatch(
          updateProfile(
            {
              ...values,
              skills: skillsArray,
            },
            userId
          )
        );
        setLoading(false);
        console.log("Profile saved successfully");
      } catch (error) {
        setLoading(false);
        console.error("Failed to save profile", error);
      }
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId) {
        setLoading(true);
        await dispatch(fetchUserProfile(userId));
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch, userId]);

  const handleFetchRepos = async () => {
    setLoading(true);
    if (!formik.values.githubProfile) {
      setLoading(false);
      setError("Please enter a GitHub username");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.github.com/users/${formik.values.githubProfile}/repos`
      );
      setRepos(response.data);
      setError("");
      const projects = response.data.map((repo) => repo.name);
      formik.setFieldValue("projects", projects);
    } catch (error) {
      setError("Failed to fetch repositories. Please check the username.");
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen p-6 sm:p-12 w-full">
      {loading && <Loader />}
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 sm:p-12">
        <h1 className="text-3xl font-bold mb-6">User Profile</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500">{formik.errors.name}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500">{formik.errors.email}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="contactInfo"
                className="block mb-2 text-sm font-medium"
              >
                Contact Info
              </label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formik.values.contactInfo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {formik.touched.contactInfo && formik.errors.contactInfo && (
                <p className="text-red-500">{formik.errors.contactInfo}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="skills"
                className="block mb-2 text-sm font-medium"
              >
                Skills
              </label>
              <input
                type="text"
                id="skills"
                name="skills"
                value={formik.values.skills}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your skills separated by commas"
                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="githubProfile"
              className="block mb-2 text-sm font-medium"
            >
              GitHub Username
            </label>
            <div className="flex flex-col sm:flex-row items-start sm:items-center">
              <input
                type="text"
                id="githubProfile"
                name="githubProfile"
                value={formik.values.githubProfile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full sm:w-3/4 p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                onClick={handleFetchRepos}
                className="mt-2 sm:mt-0 sm:ml-4 w-full sm:w-1/4 p-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
              >
                Fetch Repos
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-4 bg-green-500 text-white rounded hover:bg-green-700 transition"
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
                    className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg"
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
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
