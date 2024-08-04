import React, { useState, useEffect } from "react";

import ApplicantsList from "./ApplicantsList";
import JobCard from "../common/JobCard";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../common/Loader";

const EmployerJobs = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  console.log(jobs);
  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/jobs/postedBy/${JSON.parse(localStorage.getItem("user"))?._id}`) // Fetch jobs posted by the employer
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
  };

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen p-4 w-full">
      {loading && <Loader />}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          My Posted Jobs {selectedJob ? "- Applicants" : ""}
        </h1>
        {selectedJob ? (
          <ApplicantsList
            job={selectedJob}
            onBack={() => setSelectedJob(null)}
          />
        ) : (
          <div>
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  key={job?.["_id"]}
                  {...job}
                  onClick={() => handleJobClick(job)}
                />
              ))
            ) : (
              <p>No jobs posted.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployerJobs;
