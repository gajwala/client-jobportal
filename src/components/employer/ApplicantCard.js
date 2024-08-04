import React from "react";

const ApplicantCard = ({ applicant }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 shadow-lg">
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {applicant.name}
          </h1>
          <p className="text-gray-700 dark:text-gray-300">{applicant.email}</p>
          <div className="flex items-center gap-2">
            {applicant?.skills.map((skill, i) => (
              <p
                key={i}
                className="text-gray-500 dark:text-gray-400 py-1 px-2 rounded-md border border-gray-300 dark:border-gray-600"
              >
                {skill}
              </p>
            ))}
          </div>
        </div>
        <a href={applicant.resume} target="_blank" rel="noopener noreferrer">
          <button className="text-blue-500 dark:text-blue-400 border border-blue-500 dark:border-blue-400 px-4 py-2 rounded-md">
            View Resume
          </button>
        </a>
      </div>
    </div>
  );
};

export default ApplicantCard;
