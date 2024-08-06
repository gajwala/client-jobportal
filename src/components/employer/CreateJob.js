import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const CreateJob = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [addSkill, setAddSkill] = useState("");

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

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      companyName: "",
      contactInfo: "",
      experience: "",
      location: "",
      skills: [],
      address: "",
      email: "",
      phone: "",
      file: null,
      requirements: "",
      salaryRateForHour: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Job title is required"),
      description: Yup.string().required("Description is required"),
      companyName: Yup.string().required("Company name is required"),
      contactInfo: Yup.string().required("Contact information is required"),
      experience: Yup.string().required("Experience is required"),
      location: Yup.string().required("Location is required"),
      address: Yup.string().required("Address is required"),
      salaryRateForHour: Yup.string().required("SalaryRateForHour is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      requirements: Yup.string().required("Requirements are required"),
    }),
    onSubmit: async (values) => {
      const { file, ...rest } = values;
      const data = new FormData();
      Object.keys(rest).forEach((key) => data.append(key, rest[key]));
      if (file) data.append("descriptionFile", file);

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        };
        const response = await axios.post(
          "https://job-portal-five-orcin.vercel.app/api/v1/jobs",
          data,
          config
        );
        dispatch({ type: "CREATE_JOB_SUCCESS", payload: response.data });
        formik.resetForm();
        setSelectedSkills([]);
        setCurrentStep(1); // Reset to first step after submission
        toast.success("Job created successfully!");
      } catch (error) {
        dispatch({ type: "CREATE_JOB_FAILURE", payload: error.response.data });
        toast.error("An error occurred while creating the job.");
      }
    },
  });

  const handleTagClick = (skill) => {
    const updatedSkills = selectedSkills.includes(skill)
      ? selectedSkills.filter((s) => s !== skill)
      : [...selectedSkills, skill];
    setSelectedSkills(updatedSkills);
    formik.setFieldValue("skills", updatedSkills); // Append selected skills as comma-separated string
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 16384) {
      toast.error("File size exceeds 16KB limit.");
      formik.setFieldValue("file", null);
    } else {
      formik.setFieldValue("file", selectedFile);
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      setTimeout(() => {
        setCurrentStep((prevStep) => prevStep + 1);
      });
    } else {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSkillChange = (e) => {
    setAddSkill(e.target.value);
  };

  const addSkillHandler = () => {
    setSelectedSkills((prev) => [...prev, addSkill]);
    formik.setFieldValue("skills", [...formik.values.skills, addSkill]);
    setAddSkill("");
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
              value={formik.values.title}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            {formik.errors.title && (
              <p className="text-red-500 mt-2">{formik.errors.title}</p>
            )}

            <label className="block text-gray-700 dark:text-gray-300 mt-4 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            {formik.errors.description && (
              <p className="text-red-500 mt-2">{formik.errors.description}</p>
            )}
            <label className="block text-gray-700 dark:text-gray-300 mt-4 mb-2">
              Upload File (up to 16KB)
            </label>
            <div className="mb-4 flex">
              <input
                type="file"
                name="descriptionFile"
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-900 dark:text-white file:py-2 file:px-4 file:mr-4 file:rounded-md file:border file:border-gray-300 dark:file:border-gray-600 file:bg-gray-50 dark:file:bg-gray-700 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 dark:file:text-blue-300 dark:hover:file:bg-blue-600"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Create Job - Enter job requirements and Salary
            </h1>
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Job Requirements
            </label>
            <textarea
              name="requirements"
              value={formik.values.requirements}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            {formik.errors.requirements && (
              <p className="text-red-500 mt-2">{formik.errors.requirements}</p>
            )}
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              SalaryRateForHour
            </label>
            <input
              type="text"
              name="salaryRateForHour"
              value={formik.values.salaryRateForHour}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            {formik.errors.salaryRateForHour && (
              <p className="text-red-500 mt-2">
                {formik.errors.salaryRateForHour}
              </p>
            )}
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
                value={addSkill}
                onChange={handleSkillChange}
                placeholder="Enter Skill"
                className="w-full p-2 border border-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 mb-4"
              />
              <button
                type="button"
                onClick={addSkillHandler}
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
                  type="button"
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
              value={formik.values.companyName}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            {formik.errors.companyName && (
              <p className="text-red-500 mt-2">{formik.errors.companyName}</p>
            )}
            <label className="block text-gray-700 dark:text-gray-300 mt-4 mb-2">
              Contact Information
            </label>
            <input
              type="text"
              name="contactInfo"
              value={formik.values.contactInfo}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            {formik.errors.contactInfo && (
              <p className="text-red-500 mt-2">{formik.errors.contactInfo}</p>
            )}
            <label className="block text-gray-700 dark:text-gray-300 mt-4 mb-2">
              Experience Required
            </label>
            <input
              type="text"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            {formik.errors.experience && (
              <p className="text-red-500 mt-2">{formik.errors.experience}</p>
            )}
            <label className="block text-gray-700 dark:text-gray-300 mt-4 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formik.values.location}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            {formik.errors.location && (
              <p className="text-red-500 mt-2">{formik.errors.location}</p>
            )}
            <label className="block text-gray-700 dark:text-gray-300 mt-4 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            {formik.errors.address && (
              <p className="text-red-500 mt-2">{formik.errors.address}</p>
            )}
            <label className="block text-gray-700 dark:text-gray-300 mt-4 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            {formik.errors.email && (
              <p className="text-red-500 mt-2">{formik.errors.email}</p>
            )}
            <label className="block text-gray-700 dark:text-gray-300 mt-4 mb-2">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
            />
            {formik.errors.phone && (
              <p className="text-red-500 mt-2">{formik.errors.phone}</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-4xl mx-auto border border-gray-300 rounded-lg p-6 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md"
      >
        {renderStep()}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500"
            >
              Previous
            </button>
          )}
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-400 dark:hover:bg-blue-300"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-300"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateJob;
