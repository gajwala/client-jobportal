import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../common/JobCard";
import Loader from "../common/Loader";
import {
  fetchJobs,
  fetchAppliedJobs,
  applyToJob,
} from "../../redux/actions/jobActions";

const JobListing = () => {
  const [filters, setFilters] = useState({ skill: "", location: "" });
  const observer = useRef();
  const { user } = useSelector((state) => state.user);
  const { jobs, appliedJobs, loading, page, hasMore } = useSelector(
    (state) => state.jobs
  );
  const userRole = user?.role;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs());
    if (userRole === "freelancer") {
      dispatch(fetchAppliedJobs(user._id));
    }
  }, [dispatch, userRole, user?._id]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleClearFilters = () => {
    setFilters({ skill: "", location: "" });
  };

  const handleJobClick = (job) => {
    if (userRole === "freelancer" && !job.applied) {
      dispatch(applyToJob(job._id, user._id));
    }
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesSkill =
        !filters.skill ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(filters.skill.toLowerCase())
        );
      const matchesLocation =
        !filters.location ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());
      return matchesSkill && matchesLocation;
    });
  }, [jobs, filters]);

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
        if (entries[0].isIntersecting && hasMore) {
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
            placeholder="Filter by skill"
            value={filters.skill}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <input
            type="text"
            name="location"
            placeholder="Filter by location"
            value={filters.location}
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
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
