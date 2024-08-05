import React from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchApplicants } from "../../redux/actions/jobActions";

function JobCard({
  _id,
  title,
  companyName,
  experience,
  location,
  skills,
  updatedAt,
  applications,
  onClick,
  descriptionFile,
  appliedJobs = [],
  isApplied = false,
}) {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userRole = user?.role;

  if (userRole !== "employer") {
    isApplied = appliedJobs.some((appliedJob) => appliedJob._id === _id);
  }

  const getApplicantsLength = () => {
    if (applications?.length) {
      return `${applications.length} applicant(s)`;
    }
    return null;
  };

  const checkApplicantHandler = (jobId) => {
    dispatch(fetchApplicants(jobId));
    navigate(`/employer/job/${jobId}/applicants`);
  };

  return (
    <div className="mb-6 lg:mb-8 w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105 lg:p-6">
        <div className="flex flex-col gap-3 w-full md:w-3/5">
          <h1 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {title} - {companyName}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base lg:text-lg">
            {experience} &#x2022; {location}
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <p
                key={i}
                className="text-gray-500 dark:text-gray-300 py-1 px-2 text-sm md:text-base lg:text-base rounded-md border border-gray-300 dark:border-gray-600"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0 w-full md:w-2/5">
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base lg:text-base w-full md:w-auto">
            Posted {moment(updatedAt).fromNow()} <br />
            {userRole === "employer" && getApplicantsLength()}
          </p>
          <div className="flex flex-col items-center w-full md:w-auto">
            {userRole === "employer" && (
              <button
                onClick={() => checkApplicantHandler(_id)}
                className="text-blue-500 dark:text-blue-300 border border-blue-500 dark:border-blue-300 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white dark:hover:bg-blue-300 dark:hover:text-gray-900 transition-colors duration-300 lg:px-6 lg:py-3 lg:text-base w-full md:w-auto"
              >
                Check Applicants
              </button>
            )}
            {userRole !== "employer" && (
              <button
                onClick={onClick}
                className="text-blue-500 dark:text-blue-300 border border-blue-500 dark:border-blue-300 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white dark:hover:bg-blue-300 dark:hover:text-gray-900 transition-colors duration-300 lg:px-6 lg:py-3 lg:text-base w-full md:w-auto"
                disabled={isApplied}
              >
                {isApplied ? "APPLIED" : "Apply"}
              </button>
            )}

            {descriptionFile && (
              <a
                href={descriptionFile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300 mt-2 text-sm md:text-base lg:text-base"
              >
                Download
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
