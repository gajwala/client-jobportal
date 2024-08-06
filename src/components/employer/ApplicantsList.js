import React from "react";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ApplicantsList = () => {
  const { applicants } = useSelector((state) => state.jobs);
  const navigate = useNavigate();

  const viewProfilehandler = (id) => {
    navigate(`/profile/${id}`);
  };

  const backRouteHandler = () => {
    navigate("/employer-jobs");
  };

  return (
    <div className="flex-grow flex items-center justify-center p-4">
      <div className="w-full max-w-4xl p-4">
        <button
          onClick={backRouteHandler}
          className="mb-4 text-blue-500 hover:underline"
        >
          Back to Jobs
        </button>
        {/* <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Applicants for {job.title}
        </h2> */}
        <div>
          {applicants?.length > 0 ? (
            applicants.map((applicant) => (
              <div
                key={applicant._id}
                className="p-6 bg-white dark:bg-gray-800 relative rounded-lg shadow-lg mb-6 flex items-center transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <FaUser className="text-4xl text-gray-500 dark:text-gray-300 mr-4" />
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {applicant.userId.role} - {applicant.userId.name}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {applicant.userId.email} | {applicant.userId.contactInfo}
                  </p>
                  {applicant.userId.skills.length > 0 && (
                    <p className="text-gray-600 dark:text-gray-400">
                      Skills: {applicant.userId.skills.join(", ")}
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 absolute right-8"
                  onClick={() => viewProfilehandler(applicant?.userId?._id)}
                >
                  View Profile
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700 dark:text-gray-300">
              No applicants found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicantsList;
