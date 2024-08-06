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

const initialState = {
  jobs: [],
  appliedJobs: [],
  employerJobs: [],
  loading: false,
  error: null,
  page: 1,
  applicants: [],
  hasMore: true,
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS_REQUEST:
    case FETCH_APPLIED_JOBS_REQUEST:
    case APPLY_TO_JOB_REQUEST:
    case FETCH_APPLICANTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_JOBS_SUCCESS:
      return {
        ...state,
        jobs:
          action.payload.page === 1
            ? action.payload.jobs
            : [...state.jobs, ...action.payload.jobs],
        loading: false,
        page: action.payload.page,
        hasMore: action.payload.hasMore,
      };
    case FETCH_APPLIED_JOBS_SUCCESS:
      return {
        ...state,
        appliedJobs: action.payload,
        loading: false,
      };
    case APPLY_TO_JOB_SUCCESS:
      return {
        ...state,
        appliedJobs: [...state.appliedJobs, action.payload],
        jobs: state.jobs.map((job) =>
          job._id === action.payload ? { ...job, applied: true } : job
        ),
        loading: false,
      };
    case FETCH_APPLICANTS_SUCCESS:
      return {
        ...state,
        applicants: action.payload,
        loading: false,
      };
    case FETCH_JOBS_FAILURE:
    case FETCH_APPLIED_JOBS_FAILURE:
    case APPLY_TO_JOB_FAILURE:
    case FETCH_APPLICANTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case FETCH_EMPLOYER_JOBS_SUCCESS:
      return { ...state, loading: false, employerJobs: action.payload };
    default:
      return state;
  }
};

export default jobsReducer;
