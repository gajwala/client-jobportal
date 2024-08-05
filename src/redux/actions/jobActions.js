import axiosInstance from "../../utils/axiosInstance";

export const fetchJobs = () => async (dispatch) => {
  dispatch({ type: "FETCH_JOBS_REQUEST" });
  try {
    const response = await axiosInstance.get("/jobs");
    dispatch({ type: "FETCH_JOBS_SUCCESS", payload: response.data.jobs });
  } catch (error) {
    dispatch({ type: "FETCH_JOBS_FAILURE", payload: error.message });
  }
};

export const fetchAppliedJobs = (userId) => async (dispatch) => {
  dispatch({ type: "FETCH_APPLIED_JOBS_REQUEST" });
  try {
    const response = await axiosInstance.get(`/jobs/appliedBy/${userId}`);
    dispatch({
      type: "FETCH_APPLIED_JOBS_SUCCESS",
      payload: response.data.appliedJobs,
    });
  } catch (error) {
    dispatch({ type: "FETCH_APPLIED_JOBS_FAILURE", payload: error.message });
  }
};

export const applyToJob = (jobId, userId) => async (dispatch) => {
  dispatch({ type: "APPLY_TO_JOB_REQUEST" });
  try {
    await axiosInstance.post(`/jobs/apply`, { jobId, userId });
    dispatch({ type: "APPLY_TO_JOB_SUCCESS", payload: jobId });
  } catch (error) {
    dispatch({ type: "APPLY_TO_JOB_FAILURE", payload: error.message });
  }
};

export const fetchEmployerJobs = (userId) => async (dispatch) => {
  dispatch({ type: "FETCH_JOBS_REQUEST" });
  try {
    const response = await axiosInstance.get(`/jobs/postedBy/${userId}`);
    dispatch({ type: "FETCH_EMPLOYER_JOBS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "FETCH_JOBS_FAILURE", payload: error.message });
  }
};
