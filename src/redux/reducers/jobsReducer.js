const initialState = {
  jobs: [],
  appliedJobs: [],
  employerJobs: [],
  loading: false,
  error: null,
};

const jobsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_JOBS_REQUEST":
    case "FETCH_APPLIED_JOBS_REQUEST":
    case "APPLY_TO_JOB_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_JOBS_SUCCESS":
      return {
        ...state,
        jobs: action.payload,
        loading: false,
      };
    case "FETCH_APPLIED_JOBS_SUCCESS":
      return {
        ...state,
        appliedJobs: action.payload,
        loading: false,
      };
    case "APPLY_TO_JOB_SUCCESS":
      return {
        ...state,
        appliedJobs: [...state.appliedJobs, action.payload],
        jobs: state.jobs.map((job) =>
          job._id === action.payload ? { ...job, applied: true } : job
        ),
        loading: false,
      };
    case "FETCH_JOBS_FAILURE":
    case "FETCH_APPLIED_JOBS_FAILURE":
    case "APPLY_TO_JOB_FAILURE":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case "FETCH_EMPLOYER_JOBS_SUCCESS":
      return { ...state, loading: false, employerJobs: action.payload };
    default:
      return state;
  }
};

export default jobsReducer;
