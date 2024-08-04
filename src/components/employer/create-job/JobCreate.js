import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

const JobCreateStepper = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    companyName: "",
    contactInfo: "",
    experience: "",
    location: "",
    skills: "",
  });
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
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleTagClick = (skill) => {
    setSelectedSkills((prevSkills) =>
      prevSkills.includes(skill)
        ? prevSkills.filter((s) => s !== skill)
        : [...prevSkills, skill]
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/api/jobs", formData, config);
      dispatch({ type: "CREATE_JOB_SUCCESS", payload: response.data });
      setFormData({
        title: "",
        description: "",
        companyName: "",
        contactInfo: "",
        experience: "",
        location: "",
        skills: "",
      });
      setCurrentStep(1); // Reset to first step after submission
    } catch (error) {
      console.error("Error creating job:", error);
      dispatch({ type: "CREATE_JOB_FAILURE", payload: error.response.data });
    }
  };

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 16384) {
      // 16KB = 16384 bytes
      setError("File size exceeds 16KB limit.");
      setFile(null);
    } else {
      setFile(selectedFile);
      setError("");
    }
  };

  const handleFileUpload = () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => setMessage("File uploaded successfully!"))
      .catch((err) => setMessage("Failed to upload file."));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Create Job - Enter a strong title and description
            </h1>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            <label className="block text-gray-700 dark:text-gray-300 mt-4 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            <label className="block text-gray-700 dark:text-gray-300 mt-4 mb-2">
              Upload File (up to 16KB)
            </label>
            <div className="mb-4 flex">
              <input
                type="file"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 dark:text-white file:py-2 file:px-4 file:mr-4 file:rounded-md file:border file:border-gray-300 dark:file:border-gray-600 file:bg-gray-50 dark:file:bg-gray-700 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:file:text-blue-300 dark:hover:file:bg-blue-600"
              />

              <button
                onClick={handleFileUpload}
                className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
              >
                Upload
              </button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
            {message && (
              <p className="mt-4 text-center text-green-500 dark:text-green-300">
                {message}
              </p>
            )}
          </div>
        );
      case 2:
        return (
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Create Job - Enter job requirements
            </h1>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Job Requirements
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full h-64 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
          </div>
        );
      case 3:
        return (
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Create Job - Enter suitable tags / skills
            </h1>
            <div className="flex">
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                onEnter={(e) => handleTagClick(e.target.value)}
                placeholder="Enter Skill"
                className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 mb-4"
              />
              <button
                type="button"
                onClick={() => handleTagClick(formData.skills)}
                className="py-2 px-4 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500 mb-4"
              >
                +
              </button>
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Selected Skills:
              </h3>
              {selectedSkills.length ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium mb-4"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="mb-4">Please select the tags</p>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Select Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <button
                  key={index}
                  onClick={() => handleTagClick(skill)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedSkills.includes(skill)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  } hover:bg-blue-400 dark:hover:bg-gray-600`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        );
      case 4:
        return (
          <>
            <div className="mb-4">
              <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Create Job - Enter Company Details
              </h1>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
            </div>
            <label className="block text-gray-700 dark:text-gray-300 mt-2 mb-2">
              Address
            </label>
            <textarea
              name="address"
              value={formData.description}
              onChange={handleChange}
              className="w-full h-12 p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Company Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2">
                Contact Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.contactInfo}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 ml-24 mr-24">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full "
      >
        <div className="">
          {renderStep()}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Previous
            </button>
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobCreateStepper;
