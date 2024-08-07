import React, { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import JobCard from "../common/JobCard";
import Loader from "../common/Loader";
import { fetchEmployerJobs } from "../../redux/actions/jobActions";

const EmployerJobs = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { employerJobs, loading, totalEmployerJobs } = useSelector(
    (state) => state.jobs
  );

  const [page, setPage] = useState(1);
  const observer = useRef();

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEmployerJobs(user._id, page));
    }
  }, [dispatch, user?._id, page]);

  const lastJobElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          employerJobs.length < totalEmployerJobs
        ) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, employerJobs.length, totalEmployerJobs]
  );

  return (
    <div className="flex-grow p-4">
      {loading && <Loader />}
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Job Postings</h1>
        {employerJobs.length > 0 ? (
          employerJobs.map((job, index) => {
            if (employerJobs.length === index + 1) {
              return (
                <div ref={lastJobElementRef} key={job._id}>
                  <JobCard {...job} />
                </div>
              );
            } else {
              return <JobCard key={job._id} {...job} />;
            }
          })
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerJobs;
