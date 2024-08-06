import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Loader from "./Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  updateProfile,
  fetchUserProfile,
} from "../../redux/actions/userActions";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [newSkill, setNewSkill] = useState(""); // State for new skill input

  const skills = [
    "React",
    "Node.js",
    "JavaScript",
    "Python",
    "CSS",
    "HTML",
    "Ruby",
    "PHP",
  ]; // Example skills

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    name: Yup.string(),
    contactInfo: Yup.string(),
    skills: Yup.array().of(Yup.string()).required("Required"),
    githubProfile: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      email: user?.email || "",
      name: user?.name || "",
      contactInfo: user?.contactInfo || "",
      skills: user?.skills || [],
      githubProfile: user?.githubProfile || "",
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await dispatch(
          updateProfile(
            {
              ...values,
              skills: values.skills, // Already an array
            },
            userId
          )
        );
        setLoading(false);
        toast.success("Profile saved successfully!");
      } catch (error) {
        setLoading(false);
        toast.error("Failed to save profile. Please try again.");
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

  const handleAddSkill = () => {
    if (newSkill && !formik.values.skills.includes(newSkill)) {
      formik.setFieldValue("skills", [...formik.values.skills, newSkill]);
      setNewSkill(""); // Clear input field
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
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
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
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500 text-sm">{formik.errors.name}</div>
              ) : null}
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
              {formik.touched.contactInfo && formik.errors.contactInfo ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.contactInfo}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="githubProfile"
                className="block mb-2 text-sm font-medium"
              >
                GitHub Profile
              </label>
              <input
                type="text"
                id="githubProfile"
                name="githubProfile"
                value={formik.values.githubProfile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              {formik.touched.githubProfile && formik.errors.githubProfile ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.githubProfile}
                </div>
              ) : null}
              <button
                type="button"
                onClick={handleFetchRepos}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
              >
                Fetch Repositories
              </button>
            </div>
            <div>
              <label
                htmlFor="skills"
                className="block mb-2 text-sm font-medium"
              >
                Skills
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {formik.values.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium mb-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <input
                type="text"
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
                className="w-full p-3 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white mb-2"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
              >
                Add Skill
              </button>
              <label className="block mt-4">Select Your Skills</label>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      if (!formik.values.skills.includes(skill)) {
                        formik.setFieldValue("skills", [
                          ...formik.values.skills,
                          skill,
                        ]);
                      }
                    }}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                      formik.values.skills.includes(skill)
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    } hover:bg-blue-400 dark:hover:bg-gray-600`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>
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
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
