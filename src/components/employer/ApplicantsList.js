import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ApplicantsList = ({ job, onBack }) => {
  const [applicants, setApplicants] = useState([]);
  const navigate = useNavigate();

  const viewProfilehandler = () => {
    navigate("/profile");
  };
  useEffect(() => {
    axiosInstance
      .get(`/applications/${job._id}`) // Fetch applicants for the selected job
      .then((response) => setApplicants(response.data))
      .catch((err) => console.error(err));
  }, [job._id]);

  return (
    <div>
      <button onClick={onBack} className="mb-4 text-blue-500 hover:underline">
        Back to Jobs
      </button>
      <h2 className="text-xl font-bold mb-4">Applicants for {job.title}</h2>
      <div>
        {applicants.length > 0 ? (
          applicants.map((applicant) => (
            <div
              key={applicant._id}
              className="p-4 bg-white dark:bg-gray-800 relative rounded-lg shadow-md mb-4 flex"
              style={{ alignItems: "center" }}
            >
              <FaUser
                style={{ fontSize: "3rem" }}
                className="flex align-middle mr-4"
              />
              <div>
                <h3 className="text-lg font-semibold">
                  {applicant.userId.role} - {applicant.userId.name || "sara"}
                </h3>
                <p>
                  {applicant.userId.email} |{" "}
                  {applicant.userId.phone || "876876687"}
                </p>
                {applicant.userId.skills.length > 0 && (
                  <p>Skills: {applicant.userId.skills.join(", ")}</p>
                )}
              </div>
              <button
                type="button"
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 absolute right-8"
                onClick={viewProfilehandler}
              >
                View Profile
              </button>
            </div>
          ))
        ) : (
          <p>No applicants found.</p>
        )}
      </div>
    </div>
  );
};

export default ApplicantsList;
