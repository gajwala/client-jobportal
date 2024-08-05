import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../common/JobCard";
import Loader from "../common/Loader";
import { fetchEmployerJobs } from "../../redux/actions/jobActions";

const EmployerJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { employerJobs, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEmployerJobs(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="flex-grow p-4">
      {loading && <Loader />}
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Job Postings</h1>
        {employerJobs.length > 0 ? (
          employerJobs.map((job) => <JobCard key={job._id} {...job} />)
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerJobs;
