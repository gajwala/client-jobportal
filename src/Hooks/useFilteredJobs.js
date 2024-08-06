import { useMemo } from "react";

const useFilteredJobs = (jobs, filters) => {
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const ratePerHour = Number(
        job.salaryRateForHour.replace(/[^0-9.-]+/g, "")
      );
      const matchesSkill =
        !filters.skill ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(filters.skill.toLowerCase())
        );
      const matchesLocation =
        !filters.location ||
        job.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesMinRate =
        !filters.minRate || ratePerHour >= Number(filters.minRate);
      const matchesMaxRate =
        !filters.maxRate || ratePerHour <= Number(filters.maxRate);

      return (
        matchesSkill && matchesLocation && matchesMinRate && matchesMaxRate
      );
    });
  }, [jobs, filters]);

  return filteredJobs;
};

export default useFilteredJobs;
