import React from "react";
import moment from "moment";

function JobCard({
  title,
  companyName,
  experience,
  location,
  skills,
  updatedAt,
  applications,
  onClick,
}) {
  const userRole = JSON.parse(localStorage.getItem("user"))?.role;

  return (
    <div className="mb-6 sm:mb-4">
      {" "}
      {/* Added responsive margin-bottom */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-6 py-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out">
        <div className="flex flex-col items-start gap-3 w-full md:w-auto">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {title} - {companyName}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            {experience} &#x2022; {location}
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {skills.map((skill, i) => (
              <p
                key={i}
                className="text-gray-500 dark:text-gray-300 py-1 px-2 rounded-md border border-gray-300 dark:border-gray-600"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <p className="text-gray-500 dark:text-gray-400">
            Posted {moment(updatedAt).fromNow()} <br />
            {applications?.length > 0
              ? `${applications.length} applicant(s)`
              : "No applicants"}
          </p>
          <button
            onClick={onClick}
            className="text-blue-500 dark:text-blue-300 border border-blue-500 dark:border-blue-300 px-10 py-2 rounded-md hover:bg-blue-500 hover:text-white dark:hover:bg-blue-300 dark:hover:text-gray-900"
          >
            {userRole === "employer" ? "Check Applicants" : "Apply"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
