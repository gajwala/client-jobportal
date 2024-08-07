import { useMemo } from "react";

const useFilteredJobs = (jobs, filters) => {
  const filteredJobs = useMemo(() => {
    // Extract filter values from refs
    const skill = filters.skillRef?.current?.value || "";
    const minRate = filters.minRateRef?.current?.value || "";
    const maxRate = filters.maxRateRef?.current?.value || "";

    // If all filters are empty, return the full list of jobs
    if (!skill && !minRate && !maxRate) {
      return jobs;
    }

    return jobs.filter((job) => {
      const ratePerHour = Number(
        job.salaryRateForHour.replace(/[^0-9.-]+/g, "")
      );
      const matchesSkill =
        !skill ||
        job.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()));
      const matchesMinRate = !minRate || ratePerHour >= Number(minRate);
      const matchesMaxRate = !maxRate || ratePerHour <= Number(maxRate);

      return matchesSkill && matchesMinRate && matchesMaxRate;
    });
  }, [jobs, filters]);

  return filteredJobs;
};

export default useFilteredJobs;
