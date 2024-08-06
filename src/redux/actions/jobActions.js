import axiosInstance from "../../utils/axiosInstance";
import {
  FETCH_JOBS_REQUEST,
  FETCH_JOBS_SUCCESS,
  FETCH_JOBS_FAILURE,
  FETCH_APPLIED_JOBS_REQUEST,
  FETCH_APPLIED_JOBS_SUCCESS,
  FETCH_APPLIED_JOBS_FAILURE,
  APPLY_TO_JOB_REQUEST,
  APPLY_TO_JOB_SUCCESS,
  APPLY_TO_JOB_FAILURE,
  FETCH_APPLICANTS_REQUEST,
  FETCH_APPLICANTS_SUCCESS,
  FETCH_APPLICANTS_FAILURE,
  FETCH_EMPLOYER_JOBS_SUCCESS,
} from "../constant";

export const fetchJobs =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    dispatch({ type: FETCH_JOBS_REQUEST });
    try {
      const response = await axiosInstance.get(
        `/jobs?page=${page}&limit=${limit}`
      );
      dispatch({
        type: FETCH_JOBS_SUCCESS,
        payload: {
          jobs: response.data.jobs,
          page,
          hasMore: response.data.jobs.length > 0,
        },
      });
    } catch (error) {
      dispatch({ type: FETCH_JOBS_FAILURE, payload: error.message });
    }
  };

export const fetchAppliedJobs = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_APPLIED_JOBS_REQUEST });
  try {
    const response = await axiosInstance.get(`/jobs/appliedBy/${userId}`);
    dispatch({
      type: FETCH_APPLIED_JOBS_SUCCESS,
      payload: response.data.appliedJobs,
    });
  } catch (error) {
    dispatch({ type: FETCH_APPLIED_JOBS_FAILURE, payload: error.message });
  }
};

export const applyToJob = (jobId, userId) => async (dispatch) => {
  dispatch({ type: APPLY_TO_JOB_REQUEST });
  try {
    const response = await axiosInstance.post(`/jobs/apply`, { jobId, userId });
    dispatch({ type: APPLY_TO_JOB_SUCCESS, payload: response.data.job });
  } catch (error) {
    dispatch({ type: APPLY_TO_JOB_FAILURE, payload: error.message });
  }
};

export const fetchEmployerJobs = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_JOBS_REQUEST });
  try {
    const response = await axiosInstance.get(`/jobs/postedBy/${userId}`);
    dispatch({
      type: FETCH_EMPLOYER_JOBS_SUCCESS,
      payload: response.data.jobs,
    });
  } catch (error) {
    dispatch({ type: FETCH_JOBS_FAILURE, payload: error.message });
  }
};

export const fetchApplicants = (jobId) => async (dispatch) => {
  dispatch({ type: FETCH_APPLICANTS_REQUEST });

  try {
    const response = await axiosInstance.get(`/applications/${jobId}`);
    console.log(response.data);
    dispatch({
      type: FETCH_APPLICANTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_APPLICANTS_FAILURE,
      payload: error.message,
    });
  }
};
