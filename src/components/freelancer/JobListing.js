import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../common/JobCard";
import Loader from "../common/Loader";
import {
  fetchJobs,
  fetchAppliedJobs,
  applyToJob,
} from "../../redux/actions/jobActions";
import { FREELANCER } from "../../utils/constant";
import useFilteredJobs from "../../Hooks/useFilteredJobs";
import { toast } from "react-toastify";

const JobListing = () => {
  const skillRef = useRef("");
  const minRateRef = useRef("");
  const maxRateRef = useRef("");
  const observer = useRef();

  const { user } = useSelector((state) => state.user);
  const { jobs, appliedJobs, loading, page, hasMore } = useSelector(
    (state) => state.jobs
  );
  const userRole = user?.role;
  const dispatch = useDispatch();

  const [, setFilterTrigger] = useState(0);

  useEffect(() => {
    dispatch(fetchJobs());
    if (userRole === FREELANCER) {
      dispatch(fetchAppliedJobs(user._id));
    }
  }, [dispatch, userRole, user?._id]);

  const handleFilterChange = () => {
    // Trigger re-render when filters change
    setFilterTrigger((prev) => prev + 1);
  };

  const handleClearFilters = () => {
    skillRef.current.value = "";
    minRateRef.current.value = "";
    maxRateRef.current.value = "";
    handleFilterChange();
  };

  const handleJobClick = (job) => {
    if (userRole === FREELANCER && !job.applied) {
      dispatch(applyToJob(job._id, user._id));
      toast.success("Job Applied successfully!");
    }
  };

  const filteredJobs = useFilteredJobs(jobs, {
    minRateRef,
    maxRateRef,
    skillRef,
  });

  const loadMoreJobs = useCallback(() => {
    if (hasMore && !loading) {
      dispatch(fetchJobs(page + 1));
    }
  }, [dispatch, hasMore, loading, page]);

  const lastJobElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !maxRateRef.current.value &&
          !minRateRef.current.value &&
          !skillRef.current.value
        ) {
          loadMoreJobs();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, loadMoreJobs, hasMore]
  );

  return (
    <div className="flex-grow p-4">
      {loading && <Loader />}
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            name="skill"
            ref={skillRef}
            placeholder="Filter by skill"
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <input
            type="number"
            name="minRate"
            ref={minRateRef}
            placeholder="Min rate"
            onChange={handleFilterChange}
            className="p-2 w-16 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <input
            type="number"
            name="maxRate"
            ref={maxRateRef}
            placeholder="Max rate"
            onChange={handleFilterChange}
            className="p-2 w-16 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <button
            onClick={handleClearFilters}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-700 transition"
          >
            Clear Filters
          </button>
        </div>
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredJobs.map((job, index) => {
              if (filteredJobs.length === index + 1) {
                return (
                  <div ref={lastJobElementRef} key={job._id}>
                    <JobCard
                      {...job}
                      onClick={() => handleJobClick(job)}
                      appliedJobs={appliedJobs}
                    />
                  </div>
                );
              } else {
                return (
                  <div key={job._id}>
                    <JobCard
                      {...job}
                      onClick={() => handleJobClick(job)}
                      appliedJobs={appliedJobs}
                    />
                  </div>
                );
              }
            })}
          </div>
        ) : (
          <p>No jobs found.</p>
        )}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default JobListing;
