import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerJobs } from "../../redux/actions/jobActions";
import ApplicantsList from "./ApplicantsList";
import JobCard from "../common/JobCard";
import Loader from "../common/Loader";

const EmployerJobs = () => {
  const dispatch = useDispatch();
  const { employerJobs, loading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.user);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEmployerJobs(user._id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {employerJobs?.length > 0 ? (
              employerJobs.map((job) => (
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
