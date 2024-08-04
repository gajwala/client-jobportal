import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import JobCard from "../common/JobCard";
import Loader from "../common/Loader";
import { FixedSizeList as List } from "react-window";

const JobListing = () => {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ skill: "", location: "" });

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get("/jobs")
      .then((response) => {
        setJobs(response.data.jobs);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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

  const handleJobClick = () => {};

  const filteredJobs = jobs.filter((job) => {
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

  const Row = ({ index, style }) => (
    <div style={{ ...style, padding: "0 1rem" }}>
      <JobCard
        key={filteredJobs[index]._id}
        {...filteredJobs[index]}
        onClick={(job) => handleJobClick(job)}
      />
    </div>
  );

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen p-4 w-full">
      {loading && <Loader />}
      <div className="w-full mx-auto">
        <h1 className="text-2xl font-bold mb-4">Job Listings</h1>
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
          <List
            height={window.innerHeight}
            itemCount={filteredJobs.length}
            itemSize={200}
            width="100%"
          >
            {Row}
          </List>
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default JobListing;
